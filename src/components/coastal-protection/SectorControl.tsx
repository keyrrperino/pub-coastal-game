import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import SectorSection from './SectorSection';
import BudgetDisplay from './BudgetDisplay';
import Timer from './Timer';
import InsufficientBudgetModal from './InsufficientBudgetModal';
import { GameRoomService, saveTeamScoreToGlobalLeaderboard, getGlobalLeaderboard, ProcessedLeaderboardData } from '@/lib/gameRoom';
import { ActivityTypeEnum, GameLobbyStatus, LobbyStateEnum, SubSectorEnum } from '@/lib/enums';
import { ActivityLogType, LobbyStateType } from '@/lib/types';
import { SplineTriggersConfig, GAME_ROUND_TIMER } from '@/lib/constants';
import { SplineTriggerConfigItem } from '@/lib/types';
import { useGameContext } from '@/games/pub-coastal-game-spline/GlobalGameContext';
import { useProgression } from '@/components/hooks/useProgression';
import { getPhaseDuration } from '@/components/hooks/phaseUtils';
import { useGameFlowController, createDefaultLobbyState } from '@/components/hooks/useGameFlowController';
import { useSectorScores, SectorPerformance } from '@/components/hooks/useSectorScores';
import { hasAnyConstructionInSector, hasAnySelectableActionsInMeasureType, getCPMCompletionRound, getSectorActions, calculateActiveActions, getActiveCPMPath, calculateRoundStartButtonSet } from '@/lib/progressionUtils';

import { ActionStatus, ActionState } from '@/lib/types';

// Import modal components
import IntroductionModal from '@/games/pub-coastal-game/compontents/IntroductionModal';
import RoundInstructionsModal from '@/games/pub-coastal-game/compontents/RoundInstructionsModal';

import EndingModal from '@/games/pub-coastal-game/compontents/EndingModal';
import TeamNameInputModal from '@/games/pub-coastal-game/compontents/TeamNameInputModal';
import StartScreen from '@/components/StartScreen';
import LeaderboardDisplayScreen from '@/components/LeaderboardDisplayScreen';
import LeaderboardOverlay from '@/components/LeaderboardOverlay';
import EndingLeaderboardOverlay from '@/components/EndingLeaderboardOverlay';
import PostRoundModal from '@/components/PostRoundModal';

interface SectorControlProps {
  sector: string;
}

// Helper function to get player number from sector
const getPlayerNumber = (sector: string): number => {
  const match = sector.match(/sector-(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

// Helper function to get sector titles
const getSectorTitles = (sector: string) => {
  const sectorTitles: Record<string, { sectorA: string; sectorB: string }> = {
    'sector-1': {
      sectorA: 'Sector 1A: Industrial',
      sectorB: 'Sector 1B: Residential',
    },
    'sector-2': {
      sectorA: 'Sector 2A: CBD',
      sectorB: 'Sector 2B: Jurong',
    },
    'sector-3': {
      sectorA: 'Sector 3A: Woodlands',
      sectorB: 'Sector 3B: Punggol',
    },
  };
  return sectorTitles[sector] || { sectorA: 'Sector A', sectorB: 'Sector B' };
};

// Type for storing round-start button sets
type RoundStartButtonSets = Record<string, Record<string, { config: any; status: ActionStatus }[]>>;



const SectorControl: React.FC<SectorControlProps> = ({ sector }) => {
  const { triggerSingleBuild } = useGameContext();
  const [gameRoomService] = useState(() => new GameRoomService(`Player ${sector.slice(-1)}`, 'default'));
  const [activityLog, setActivityLog] = useState<ActivityLogType[]>([]);
  const [localRound, setLocalRound] = useState(1);
  const [previousRound, setPreviousRound] = useState(1);
  const [roundStartActivityLog, setRoundStartActivityLog] = useState<ActivityLogType[]>([]);
  const [roundStartButtonSets, setRoundStartButtonSets] = useState<RoundStartButtonSets>({});
  const [showInsufficientBudgetModal, setShowInsufficientBudgetModal] = useState(false);
  const [lobbyState, setLobbyState] = useState<any>(createDefaultLobbyState());

  // Track previous phase for restart detection
  const [previousPhase, setPreviousPhase] = useState<GameLobbyStatus | null>(null);

  // Helper function to reset all local game state
  const resetLocalGameState = useCallback(() => {
    console.log('Resetting all local game state');
    setActivityLog([]);
    setLocalRound(1);
    setPreviousRound(1);
    setRoundStartActivityLog([]);
    setRoundStartButtonSets({});
    setShowInsufficientBudgetModal(false);
  }, []);


  // Use Firebase round instead of phase-based currentRound for actual game progression
  const firebaseRound = lobbyState?.[LobbyStateEnum.ROUND] || 1;
  
  // Calculate totalCoins from Firebase state
  const coinsTotalPerRound = lobbyState?.[LobbyStateEnum.COINS_TOTAL_PER_ROUND] ?? 10;
  const coinsSpentByRound = lobbyState?.[LobbyStateEnum.COINS_SPENT_BY_ROUND] ?? {};
  const coinsSpentThisRound = coinsSpentByRound[firebaseRound] ?? 0;
  const totalCoins = coinsTotalPerRound - coinsSpentThisRound;
  
  // Game flow management
  const {
    currentPhase,
    currentRound,
    isTransitioning,
    startGameFlow,
    resetGameFlow,
    startActualGameFlow,
  } = useGameFlowController(lobbyState, setLobbyState);

  // Phase timer management - values for Timer component
  const phaseStartTime = lobbyState?.[LobbyStateEnum.PHASE_START_TIME] || 0;
  const phaseDuration = lobbyState?.[LobbyStateEnum.PHASE_DURATION] || GAME_ROUND_TIMER;

  // Modal states for game flow
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [showRoundInstructions, setShowRoundInstructions] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [showTeamNameInput, setShowTeamNameInput] = useState(false);

  const [showCutscene, setShowCutscene] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [coinsLeft, setCoinsLeft] = useState(0);
  const [sectorPerformance, setSectorPerformance] = useState<SectorPerformance>('okay');
  const [totalPerformance, setTotalPerformance] = useState<SectorPerformance>('okay');
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  
  // Leaderboard state for ROUND_SCORE_BREAKDOWN phase
  const [showLeaderboardOverlay, setShowLeaderboardOverlay] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<ProcessedLeaderboardData>({
    topWinner: null,
    top5: [],
    currentTeamEntry: null
  });

  // Debug logging for round state
  useEffect(() => {
    console.log('SectorControl currentRound (phase-based):', currentRound);
    console.log('SectorControl firebaseRound (actual game round):', firebaseRound);
  }, [currentRound, firebaseRound]);

  // Handle restart flow - reload when state changes away from RESTARTING
  useEffect(() => {
    if (previousPhase === GameLobbyStatus.RESTARTING && currentPhase !== GameLobbyStatus.RESTARTING) {
      console.log('State changed away from RESTARTING - reloading page');
      window.location.reload();
    }
    setPreviousPhase(currentPhase);
  }, [currentPhase, previousPhase]);

  // Game flow phase management
  useEffect(() => {
    // Close insufficient budget modal when phase changes (user can no longer take actions)
    if (showInsufficientBudgetModal && currentPhase !== GameLobbyStatus.ROUND_GAMEPLAY) {
      console.log('Closing insufficient budget modal due to phase change to:', currentPhase);
      setShowInsufficientBudgetModal(false);
    }
    
    // Handle phase-based modal displays and timers
    switch (currentPhase) {
      case GameLobbyStatus.INTRODUCTION:
        setShowIntroduction(true);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowCutscene(false);
        setShowLeaderboardOverlay(false);
        break;
      
      case GameLobbyStatus.ROUND_STORYLINE:
        setShowIntroduction(false);
        setShowRoundInstructions(true);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowCutscene(false);
        setShowLeaderboardOverlay(false);
        break;
      
      case GameLobbyStatus.ROUND_GAMEPLAY:
        setShowIntroduction(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowCutscene(false);
        setShowLeaderboardOverlay(false);
        break;
      
      case GameLobbyStatus.ROUND_CUTSCENES:
        setShowIntroduction(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowCutscene(true);
        setShowLeaderboardOverlay(false);
        break;
        
      case GameLobbyStatus.ROUND_SCORE_BREAKDOWN:
        setShowIntroduction(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowCutscene(true);
        setShowLeaderboardOverlay(false);
        // Fetch leaderboard data when entering this phase
        const currentTeamNameScore = lobbyState?.[LobbyStateEnum.TEAM_NAME] || undefined;
        getGlobalLeaderboard(currentTeamNameScore).then(data => {
          setLeaderboardData(data);
        });
        break;
      
      case GameLobbyStatus.ENDING:
        setShowIntroduction(false);
        setShowRoundInstructions(false);
        setShowEnding(true);
        setShowTeamNameInput(false);
        setShowCutscene(false);
        setShowLeaderboardOverlay(false);
        // Use totalScore from useSectorScores instead of calculated score
        setFinalScore(totalScore);
        break;
      
      case GameLobbyStatus.TEAM_NAME_INPUT:
        setShowIntroduction(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(true);
        setShowCutscene(false);
        setShowLeaderboardOverlay(false);
        break;
      
      case GameLobbyStatus.LEADERBOARD_DISPLAY:
        setShowIntroduction(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowCutscene(false);
        setShowLeaderboardOverlay(false);
        break;
      
      case GameLobbyStatus.RESTARTING:
        // Don't immediately reload - wait for state to change away from RESTARTING
        console.log('RESTARTING phase detected - waiting for state change');
        break;
      
      default:
        // Hide all modals for other phases
        setShowIntroduction(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowCutscene(false);
        setShowLeaderboardOverlay(false);
        break;
    }
  }, [currentPhase, activityLog, currentRound, showInsufficientBudgetModal]);

  // Timer is handled via Firebase sync in useTimer hook
  // No need to manually start/stop timers as they sync with Firebase timestamps





  // Calculate button sets for round start (handles both round changes and initial load)
  const calculateButtonSetsForRound = useCallback((roundStartLog: ActivityLogType[], round: number) => {
    console.log(`Calculating button sets for round ${round}`);
    const buttonSets: RoundStartButtonSets = {};
    ['1A', '1B', '2A', '2B', '3A', '3B'].forEach(sectorId => {
      buttonSets[sectorId] = {
        mangroves: calculateRoundStartButtonSet(roundStartLog, round, sectorId, 'mangroves'),
        seawall: calculateRoundStartButtonSet(roundStartLog, round, sectorId, 'seawall'),
        landReclamation: calculateRoundStartButtonSet(roundStartLog, round, sectorId, 'land-reclamation'),
        stormSurgeBarrier: calculateRoundStartButtonSet(roundStartLog, round, sectorId, 'storm-surge-barrier'),
        artificialReef: calculateRoundStartButtonSet(roundStartLog, round, sectorId, 'artificial-reef'),
        hybridMeasure: calculateRoundStartButtonSet(roundStartLog, round, sectorId, 'hybrid-measure'),
        revetment: calculateRoundStartButtonSet(roundStartLog, round, sectorId, 'revetment'),
      };
    });
    return buttonSets;
  }, []);

  // Handle round changes - capture round start state
  useEffect(() => {
    if (firebaseRound !== previousRound) {
      console.log(`Round changed from ${previousRound} to ${firebaseRound}`);
      // Capture the activity log state at the start of this round
      const roundStartLog = [...activityLog];
      setRoundStartActivityLog(roundStartLog);
      
      // Calculate button sets for this round
      const buttonSets = calculateButtonSetsForRound(roundStartLog, firebaseRound);
      setRoundStartButtonSets(buttonSets);
    }
    setPreviousRound(firebaseRound);
  }, [firebaseRound, previousRound, activityLog, calculateButtonSetsForRound]);

  // Initialize button sets on first load (R1)
  useEffect(() => {
    if (Object.keys(roundStartButtonSets).length === 0) {
      console.log('Initializing button sets for R1');
      const roundStartLog = [...activityLog];
      setRoundStartActivityLog(roundStartLog);
      const buttonSets = calculateButtonSetsForRound(roundStartLog, firebaseRound);
      setRoundStartButtonSets(buttonSets);
    }
  }, [activityLog, firebaseRound, roundStartButtonSets, calculateButtonSetsForRound]);
  
  // Get sector titles
  const sectorTitles = getSectorTitles(sector);

  // Always call useProgression hooks at the top level to follow Rules of Hooks
  const sectorAId = `${sector.slice(-1)}A`;
  const sectorBId = `${sector.slice(-1)}B`;
  const progressionStateA = useProgression(activityLog, firebaseRound, sectorAId);
  const progressionStateB = useProgression(activityLog, firebaseRound, sectorBId);

  // Use sector scores to calculate performance for this specific sector
  const sectorNumber = sector.slice(-1);
  
  useSectorScores({
    activities: activityLog,
    lobbyState,
    setTotalScore,
    setCoinsLeft,
    setSector1Performance: sectorNumber === '1' ? setSectorPerformance : undefined,
    setSector2Performance: sectorNumber === '2' ? setSectorPerformance : undefined,
    setSector3Performance: sectorNumber === '3' ? setSectorPerformance : undefined,
    setTotalPerformance,
  });

  const handleMeasureClick = useCallback(async (activityType: ActivityTypeEnum, coinCost: number, sectorId: string) => {
    // Get the CURRENT firebaseRound from lobbyState to avoid stale closure
    const currentFirebaseRound = lobbyState?.[LobbyStateEnum.ROUND] || 1;
    
    // Debug logging to check round values
    console.log('🟡 MEASURE CLICK DEBUG:');
    console.log('currentRound (phase-based):', currentRound);
    console.log('firebaseRound (stale):', firebaseRound);
    console.log('currentFirebaseRound (fresh):', currentFirebaseRound);
    console.log('lobbyState round:', lobbyState?.[LobbyStateEnum.ROUND]);
    console.log('Activity type:', activityType, 'Cost:', coinCost);
    
    // Check if we have sufficient coins BEFORE doing anything
    const currentCoinsTotalPerRound = lobbyState?.[LobbyStateEnum.COINS_TOTAL_PER_ROUND] ?? 10;
    const currentCoinsSpentByRound = lobbyState?.[LobbyStateEnum.COINS_SPENT_BY_ROUND] ?? {};
    const currentCoinsSpentThisRound = currentCoinsSpentByRound[currentFirebaseRound] ?? 0;
    const currentTotalCoins = currentCoinsTotalPerRound - currentCoinsSpentThisRound;
    
    if (currentTotalCoins < coinCost) {
      console.log('Insufficient coins - showing modal without taking action');
      setShowInsufficientBudgetModal(true);
      return; // Exit early - don't update UI or Firebase
    }
    
    // Only proceed if we have sufficient coins
    // Trigger Spline action
    triggerSingleBuild(activityType as any);
    
    // Log activity to Firebase FIRST (this will check coins again transactionally)
    const triggerConfig = SplineTriggersConfig[activityType];
    const subSectorFromConfig = triggerConfig?.subSector || sectorId;
    console.log('🔵 Calling addElement with round:', currentFirebaseRound);
    const result = await gameRoomService.addElement(activityType, `${activityType}`, currentFirebaseRound, coinCost, true, subSectorFromConfig as any);
    
    if (result === 'insufficient') {
      console.log('Insufficient coins from Firebase transaction - showing modal');
      setShowInsufficientBudgetModal(true);
      return; // Don't update local UI if Firebase transaction failed
    } else if (result !== 'ok') {
      console.log('Failed to add element:', result);
      return; // Don't update local UI if Firebase operation failed
    }
    
    // Only update local UI if Firebase transaction succeeded
    const newActivity: ActivityLogType = {
      id: `temp-${Date.now()}`,
      userId: `Player ${sector.slice(-1)}`,
      userName: `Player ${sector.slice(-1)}`,
      action: activityType,
      value: `${activityType}`,
      round: currentFirebaseRound,
      timestamp: Date.now()
    };
    setActivityLog(prev => [...prev, newActivity]);
    
    // Note: Coin updates are handled via Firebase lobby state listener, not local state
  }, [triggerSingleBuild, gameRoomService, currentRound, lobbyState, sector]);

  const handleDemolishClick = useCallback(async (sectorId: string, actionToDestroy: ActivityTypeEnum) => {
    // Get the CURRENT firebaseRound from lobbyState to avoid stale closure
    const currentFirebaseRound = lobbyState?.[LobbyStateEnum.ROUND] || 1;
    
    // Check if we have sufficient coins BEFORE doing anything (demolish costs 1 coin)
    const currentCoinsTotalPerRound = lobbyState?.[LobbyStateEnum.COINS_TOTAL_PER_ROUND] ?? 10;
    const currentCoinsSpentByRound = lobbyState?.[LobbyStateEnum.COINS_SPENT_BY_ROUND] ?? {};
    const currentCoinsSpentThisRound = currentCoinsSpentByRound[currentFirebaseRound] ?? 0;
    const currentTotalCoins = currentCoinsTotalPerRound - currentCoinsSpentThisRound;
    
    if (currentTotalCoins < 1) {
      console.log('Insufficient coins for demolish - showing modal without taking action');
      setShowInsufficientBudgetModal(true);
      return; // Exit early - don't update UI or Firebase
    }
    
    // Log demolish action to Firebase FIRST (this will check coins again transactionally)
    const result = await gameRoomService.addElement(ActivityTypeEnum.DEMOLISH, sectorId, currentFirebaseRound, 1, false, sectorId as any);
    
    if (result === 'insufficient') {
      console.log('Insufficient coins for demolish from Firebase transaction - showing modal');
      setShowInsufficientBudgetModal(true);
      return; // Don't update local UI if Firebase transaction failed
    } else if (result !== 'ok') {
      console.log('Failed to demolish:', result);
      return; // Don't update local UI if Firebase operation failed
    }
    
    // Only update local UI if Firebase transaction succeeded
    const demolishActivity: ActivityLogType = {
      id: `temp-demolish-${Date.now()}`,
      userId: `Player ${sector.slice(-1)}`,
      userName: `Player ${sector.slice(-1)}`,
      action: ActivityTypeEnum.DEMOLISH,
      value: sectorId, // Store the specific sector being demolished (e.g., "1A", "1B")
      round: currentFirebaseRound,
      timestamp: Date.now()
    };
    
    // Update activity log with demolish action
    const newActivityLog = [...activityLog, demolishActivity];
    setActivityLog(newActivityLog);
    
    // Recalculate button sets ONLY for the demolished sector to reflect the new state
    // Other sectors should keep their frozen button sets from round start
    console.log(`Recalculating button sets after demolish for sector ${sectorId} only`);
    setRoundStartButtonSets(prevButtonSets => {
      const updatedButtonSets = { ...prevButtonSets };
      
      // Only recalculate for the demolished sector
      updatedButtonSets[sectorId] = {
        mangroves: calculateRoundStartButtonSet(newActivityLog, currentFirebaseRound, sectorId, 'mangroves'),
        seawall: calculateRoundStartButtonSet(newActivityLog, currentFirebaseRound, sectorId, 'seawall'),
        landReclamation: calculateRoundStartButtonSet(newActivityLog, currentFirebaseRound, sectorId, 'land-reclamation'),
        stormSurgeBarrier: calculateRoundStartButtonSet(newActivityLog, currentFirebaseRound, sectorId, 'storm-surge-barrier'),
        artificialReef: calculateRoundStartButtonSet(newActivityLog, currentFirebaseRound, sectorId, 'artificial-reef'),
        hybridMeasure: calculateRoundStartButtonSet(newActivityLog, currentFirebaseRound, sectorId, 'hybrid-measure'),
        revetment: calculateRoundStartButtonSet(newActivityLog, currentFirebaseRound, sectorId, 'revetment'),
      };
      
      return updatedButtonSets;
    });
    setRoundStartActivityLog(newActivityLog);
    
    // Note: Coin updates are handled via Firebase lobby state listener, not local state
  }, [gameRoomService, currentRound, sector, activityLog, calculateButtonSetsForRound, lobbyState]);

  const handleStartGame = useCallback(async () => {
    console.log('Starting game...');
    
    // If we're in LEADERBOARD_DISPLAY phase, set status to RESTARTING instead of starting a new game
    if (currentPhase === GameLobbyStatus.LEADERBOARD_DISPLAY) {
      console.log('In LEADERBOARD_DISPLAY phase - setting status to RESTARTING');
      gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.GAME_LOBBY_STATUS, GameLobbyStatus.RESTARTING);
      return;
    }
    
    // Anyone can start the game - trigger the Spline action first
    const btn = SplineTriggersConfig[ActivityTypeEnum.START_GAME] as SplineTriggerConfigItem;
    await gameRoomService.addElement(btn.activityType!, btn.buttonValue ?? '', 0, 0, false, SubSectorEnum.ONE_A);
    
    // Then update the lobby status to start the game flow
    gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.GAME_LOBBY_STATUS, GameLobbyStatus.PREPARING);
  }, [gameRoomService, currentPhase]);

  const handleShowLeaderboard = useCallback(() => {
    setIsLeaderboardOpen(true);
  }, []);

  const handleCloseLeaderboard = useCallback(() => {
    setIsLeaderboardOpen(false);
  }, []);

  const handleTimeUp = useCallback(() => {
    console.log('Round gameplay time is up! Waiting for admin to move to next phase...');
    // Do nothing - wait for admin-phase-control page to move to next phase
  }, []);

  // Timer is now managed by the game flow system above

  // Initialize game room connection and listen to activity changes
  useEffect(() => {
    const initializeGameRoom = async () => {
      try {
        // Try to join the existing room first
        const joined = await gameRoomService.joinRoom('default');
        if (!joined) {
          // If room doesn't exist, create it
          await gameRoomService.createRoom(true);
          await gameRoomService.joinRoom('default');
        }
        
        // Listen to activity changes
        gameRoomService.onActivityChange((activities) => {
          // Reset local state when Firebase activities are empty (new game)
          if (activities.length === 0 && activityLog.length > 0) {
            console.log('Firebase activities cleared - resetting local state');
            resetLocalGameState();
            return; // Don't set empty activities if we just reset
          }
          setActivityLog(activities);
        });

        // Listen to round changes
        gameRoomService.onRoundChange((round) => {
          console.log('Firebase round changed to:', round);
          setLocalRound(round);
        });

        // Listen to lobby state changes
        gameRoomService.onLobbyStateChange((lobbyStateData) => {
          setLobbyState(lobbyStateData);
          
          // Reset local state when starting a new game (lobby status is INITIALIZING with no prior state)
          if (lobbyStateData && lobbyStateData.gameLobbyStatus === GameLobbyStatus.INITIALIZING) {
            const hasExistingState = Object.keys(lobbyStateData.readyPlayers || {}).length > 0 || 
                                   Object.keys(lobbyStateData.coinsSpentByRound || {}).length > 0;
            
            if (!hasExistingState) {
              console.log('New game detected - clearing local selections');
              resetLocalGameState();
            }
          }
        });
      } catch (error) {
        console.error('Failed to initialize game room:', error);
      }
    };

    initializeGameRoom();

    return () => {
      gameRoomService.disconnect();
    };
  }, [gameRoomService, resetLocalGameState, activityLog.length]);



  // Helper function to render sector section using ProgressionState system
  const renderSectorSection = (sectorId: string, title: string, progressionState: any) => {
    // progression state is now passed as parameter to avoid calling hooks conditionally
    
    // Get additional data needed for comprehensive "No More Available Upgrades" check
    const activeActions = calculateActiveActions(activityLog);
    const sectorActions = getSectorActions(sectorId);
    const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
    
    // Get pre-calculated button sets for this sector (calculated once at round start)
    const sectorButtonSets = roundStartButtonSets[sectorId] || {};
    console.log(`Sector ${sectorId} button sets:`, sectorButtonSets);
    
    // Map measure types to their display names and button sets - sector-specific order
    const getMeasureTypeConfig = (sectorId: string) => {
      const baseConfig = {
        mangroves: { key: 'mangroves', title: 'MANGROVES', subtitle: '', roundStartActions: sectorButtonSets.mangroves || [], currentActions: progressionState.mangroves },
        seawall: { key: 'seawall', title: 'SEAWALL', subtitle: '', roundStartActions: sectorButtonSets.seawall || [], currentActions: progressionState.seawall },
        landReclamation: { key: 'land-reclamation', title: 'LAND RECLAMATION', subtitle: '', roundStartActions: sectorButtonSets.landReclamation || [], currentActions: progressionState.landReclamation },
        coastalBarriers: { key: 'storm-surge-barrier', title: 'COASTAL BARRIERS', subtitle: '', roundStartActions: sectorButtonSets.stormSurgeBarrier || [], currentActions: progressionState.stormSurgeBarrier },
        artificialReef: { key: 'artificial-reef', title: 'ARTIFICIAL REEF', subtitle: '', roundStartActions: sectorButtonSets.artificialReef || [], currentActions: progressionState.artificialReef },
        revetment: { key: 'revetment', title: 'SEAWALL', subtitle: '', roundStartActions: sectorButtonSets.revetment || [], currentActions: progressionState.revetment },
        hybridMeasure: { key: 'hybrid-measure', title: 'HYBRID MEASURE', subtitle: '', roundStartActions: sectorButtonSets.hybridMeasure || [], currentActions: progressionState.hybridMeasure },
      };

      // Sector-specific ordering
      if (sectorId === '1A' || sectorId === '1B') {
        return [baseConfig.mangroves, baseConfig.seawall, baseConfig.landReclamation];
      } else if (sectorId === '2A' || sectorId === '2B') {
        return [baseConfig.mangroves, baseConfig.seawall, baseConfig.coastalBarriers];
      } else if (sectorId === '3A' || sectorId === '3B') {
        return [baseConfig.artificialReef, baseConfig.seawall, baseConfig.hybridMeasure];
      }
      
      // Fallback to all measures
      return Object.values(baseConfig);
    };

    const measureTypeConfig = getMeasureTypeConfig(sectorId);

    // Create measures array - include all measure types, show "Fully Upgraded" for empty ones
    const measures = measureTypeConfig
      .map(config => {
        // Check if this is an active CPM path that was completed in a PREVIOUS round
        const hasAnySelectableInMeasureType = hasAnySelectableActionsInMeasureType(
          config.key, 
          sectorActions, 
          activeActions, 
          activeCPMPath, 
          firebaseRound
        );
        const completionRound = getCPMCompletionRound(config.key, sectorId, activityLog);
        const hasNoMoreAvailableUpgrades = !hasAnySelectableInMeasureType && 
                               activeCPMPath === config.key &&
                               completionRound !== null && 
                               firebaseRound > completionRound;
        
        // If no actions and not active CPM path, don't show the card
        if (config.roundStartActions.length === 0 && !hasNoMoreAvailableUpgrades) {
          return null;
        }
        
        // Normal case: show available actions or no more available upgrades state
        return {
          type: config.key as any,
          title: config.title,
          subtitle: config.subtitle,
          hasNoMoreAvailableUpgrades,
          isActive: !activeCPMPath || activeCPMPath === config.key, // Active if no CPM is built or this is the active CPM
          options: config.roundStartActions
            .map((roundStartActionState: any) => {
              // Find the current state of this action for proper button states
              const currentActionState = config.currentActions.find((a: any) => a.config.id === roundStartActionState.config.id) || roundStartActionState;
              
              const isSelected = currentActionState.status === ActionStatus.COMPLETED;
              const isAvailable = currentActionState.status === ActionStatus.SELECTABLE;
              const disabled = currentActionState.status === ActionStatus.LOCKED_CONFLICT || 
                              currentActionState.status === ActionStatus.LOCKED_PREREQUISITE ||
                              currentActionState.status === ActionStatus.REPLACED;
              
              return {
                title: currentActionState.config.displayName,
                coinCount: currentActionState.config.cost,
                onClick: isAvailable && !disabled ? () => handleMeasureClick(currentActionState.config.id, currentActionState.config.cost, sectorId) : undefined,
                isSelected,
                disabled,
                status: currentActionState.status, // Pass the status for potential UI enhancements
              };
            }),
        };
      })
      .filter(Boolean); // Remove null entries

    // Determine if there are any constructions in this sector across the entire game session
    const canDemolish = hasAnyConstructionInSector(sectorId, activityLog);
    const demolishOption = {
      coinCount: 1,
      onClick: canDemolish ? () => {
        // Demolish all actions for this specific sector
        // We don't need to pass a specific action ID since demolish removes all actions in the sector
        handleDemolishClick(sectorId, ActivityTypeEnum.DEMOLISH);
      } : undefined,
      disabled: !canDemolish,
    };

    return (
      <SectorSection
        key={sectorId}
        title={title}
        measures={measures as any}
        demolishOption={demolishOption}
      />
    );
  };



  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with blur effect */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/assets/controller-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(100px)',
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundColor: sector === 'sector-2' ? 'rgba(95, 143, 51, 0.6)' : 
                          sector === 'sector-3' ? 'rgba(143, 51, 102, 0.6)' : 
                          'rgba(51, 92, 143, 0.6)' // sector-1 default
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-[1160px] mx-auto px-[20px] py-[20px]">
          {/* Render content based on current phase */}
          {(() => {
            // Gameplay phases: Show Timer, Budget, and Sectors
            if (currentPhase === GameLobbyStatus.ROUND_GAMEPLAY || 
                currentPhase === GameLobbyStatus.ROUND_CUTSCENES || 
                currentPhase === GameLobbyStatus.ROUND_SCORE_BREAKDOWN) {
              return (
                <>
                  {/* Top bar: Budget left and Timer right */}
                  <div className="w-full flex flex-row items-start justify-between">
                    {/* Budget display left */}
                    <div className="flex-1 flex items-start justify-start">
                      <BudgetDisplay totalCoins={totalCoins} />
                    </div>
                    {/* Timer right */}
                    <div className="flex-1 flex items-start justify-end">
                      <Timer 
                        key={`${currentRound}-${currentPhase}`}
                        duration={showCutscene ? 0 : phaseDuration}
                        onTimeUp={handleTimeUp} 
                        isRunning={currentPhase === GameLobbyStatus.ROUND_GAMEPLAY && !showCutscene}
                        syncWithTimestamp={showCutscene ? undefined : (phaseStartTime > 0 ? phaseStartTime : undefined)}
                      />
                    </div>
                  </div>

                  {/* Sector sections */}
                  <div className="flex flex-col gap-[40px] mt-[48px] w-full items-center">
                    {renderSectorSection(sectorAId, sectorTitles.sectorA, progressionStateA)}
                    {renderSectorSection(sectorBId, sectorTitles.sectorB, progressionStateB)}
                  </div>
                </>
              );
            }

            // LEADERBOARD_DISPLAY phase: Show main menu screen
            if (currentPhase === GameLobbyStatus.LEADERBOARD_DISPLAY) {
              return (
                <div className="absolute inset-0 z-20">
                  <LeaderboardDisplayScreen
                    onBackToMainMenu={handleStartGame}
                    playerNumber={getPlayerNumber(sector)}
                  />
                </div>
              );
            }

            // Start/Lobby phases: Show StartScreen
            if (!currentPhase || 
                currentPhase === GameLobbyStatus.INITIALIZING) {
              return (
                <div className="absolute inset-0 z-20">
                  <StartScreen
                    onStartGame={handleStartGame}
                    onShowLeaderboard={handleShowLeaderboard}
                    playerNumber={getPlayerNumber(sector)}
                  />
                  <LeaderboardOverlay
                    isOpen={isLeaderboardOpen}
                    onClose={handleCloseLeaderboard}
                  />
                </div>
              );
            }

            // Preparing phase: Show loading message
            if (currentPhase === GameLobbyStatus.PREPARING) {
              return (
                <div className="w-full flex items-center justify-center mt-8">
                  <div className="bg-white rounded-[16px] px-8 py-6">
                    <div className="text-center">
                      <div className="text-[24px] font-bold text-black text-center mb-4">
                        Game Starting...
                      </div>
                      <div className="text-lg text-black mb-2">
                        Please wait while the game loads
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Other phases: Show circular loader
            return (
              <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Insufficient Budget Modal */}
      <InsufficientBudgetModal 
        isOpen={showInsufficientBudgetModal}
        onClose={() => setShowInsufficientBudgetModal(false)}
      />

      {/* Game Flow Modals */}
      <IntroductionModal 
        isOpen={showIntroduction}
        onDurationComplete={() => {}}
        duration={getPhaseDuration(GameLobbyStatus.INTRODUCTION)}
        syncWithTimestamp={lobbyState?.[LobbyStateEnum.PHASE_START_TIME] || undefined}
      />
      
      <RoundInstructionsModal 
        isOpen={showRoundInstructions}
        round={firebaseRound as 1 | 2 | 3}
        duration={getPhaseDuration(GameLobbyStatus.ROUND_STORYLINE)}
        syncWithTimestamp={lobbyState?.[LobbyStateEnum.PHASE_START_TIME] || undefined}
        onDurationComplete={() => {}}
      />
      
      <PostRoundModal 
        isOpen={showCutscene}
        performance={sectorPerformance}
      />

      <EndingModal 
        isOpen={showEnding}
        onDurationComplete={() => {}}
        finalScore={finalScore}
        duration={getPhaseDuration(GameLobbyStatus.ENDING)}
        syncWithTimestamp={lobbyState?.[LobbyStateEnum.PHASE_START_TIME] || undefined}
        totalPerformance={totalPerformance}
      />
      
      <TeamNameInputModal 
        isOpen={showTeamNameInput}
        onSubmit={async (teamName) => {
          try {
            // Save team name to lobby state first
            await gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.TEAM_NAME, teamName);
            console.log('Team name saved to lobby state:', teamName);
            
            // Try using the gameRoomService method first
            if (typeof gameRoomService.saveTeamScore === 'function') {
              await gameRoomService.saveTeamScore(teamName, finalScore);
              console.log('Team score saved via gameRoomService:', teamName, 'Score:', finalScore);
            } else {
              // Fallback to standalone function
              console.log('Using fallback function to save team score');
              await saveTeamScoreToGlobalLeaderboard(
                teamName, 
                finalScore, 
                'default',
                `Player ${sector.slice(-1)}`
              );
              console.log('Team score saved via standalone function:', teamName, 'Score:', finalScore);
            }
            setShowTeamNameInput(false);
          } catch (error) {
            console.error('Failed to save team score:', error);
            // Still close the modal even if save fails
            setShowTeamNameInput(false);
          }
        }}
        playerNumber={getPlayerNumber(sector)}
      />

      {/* Leaderboard Overlay for ROUND_SCORE_BREAKDOWN phase */}
      <EndingLeaderboardOverlay
        isOpen={showLeaderboardOverlay}
        topWinner={leaderboardData.topWinner || undefined}
        leaderboardData={leaderboardData.top5}
        bottomHighlight={leaderboardData.currentTeamEntry || { 
          name: lobbyState?.[LobbyStateEnum.TEAM_NAME] || `P${getPlayerNumber(sector)}`, 
          points: totalScore, 
          position: 10 
        }}
      />

    </div>
  );
};

export default SectorControl;