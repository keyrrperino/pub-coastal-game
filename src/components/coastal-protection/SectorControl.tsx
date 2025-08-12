import React, { useCallback, useEffect, useState } from 'react';
import SectorSection from './SectorSection';
import BudgetDisplay from './BudgetDisplay';
import Timer from './Timer';
import InsufficientBudgetModal from './InsufficientBudgetModal';
import { GameRoomService } from '@/lib/gameRoom';
import { ActivityTypeEnum, GameLobbyStatus, LobbyStateEnum } from '@/lib/enums';
import { ActivityLogType, LobbyStateType } from '@/lib/types';
import { SplineTriggersConfig, GAME_ROUND_TIMER } from '@/lib/constants';
import { useGameContext } from '@/games/pub-coastal-game-spline/GlobalGameContext';
import { useProgression } from '@/components/hooks/useProgression';
import { getPhaseDuration } from '@/components/hooks/phaseUtils';
import { useGameFlowController, createDefaultLobbyState } from '@/components/hooks/useGameFlowController';
import { hasAnyConstructionInSector, hasAnySelectableActionsInMeasureType, getCPMCompletionRound, getSectorActions, calculateActiveActions, getActiveCPMPath, calculateRoundStartButtonSet } from '@/lib/progressionUtils';

import { ActionStatus, ActionState } from '@/lib/types';

// Import modal components
import IntroductionModal from '@/games/pub-coastal-game/compontents/IntroductionModal';
import TutorialModal from '@/games/pub-coastal-game/compontents/TutorialModal';
import RoundInstructionsModal from '@/games/pub-coastal-game/compontents/RoundInstructionsModal';
import ScoreBreakdownModal from '@/games/pub-coastal-game/compontents/ScoreBreakdownModal';
import EndingModal from '@/games/pub-coastal-game/compontents/EndingModal';
import TeamNameInputModal from '@/games/pub-coastal-game/compontents/TeamNameInputModal';

interface SectorControlProps {
  sector: string;
}

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
  const [totalCoins, setTotalCoins] = useState(10);

  // Use Firebase round instead of phase-based currentRound for actual game progression
  const firebaseRound = lobbyState?.[LobbyStateEnum.ROUND] || 1;
  
  // Game flow management
  const {
    currentPhase,
    currentRound,
    isTransitioning,
    startGameFlow,
    getPhaseDuration,
    resetGameFlow,
    startActualGameFlow,
  } = useGameFlowController(lobbyState, setLobbyState);

  // Phase timer management - values for Timer component
  const phaseStartTime = lobbyState?.[LobbyStateEnum.PHASE_START_TIME] || 0;
  const phaseDuration = lobbyState?.[LobbyStateEnum.PHASE_DURATION] || GAME_ROUND_TIMER;

  // Modal states for game flow
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showRoundInstructions, setShowRoundInstructions] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [showTeamNameInput, setShowTeamNameInput] = useState(false);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Debug logging for round state
  useEffect(() => {
    console.log('SectorControl currentRound (phase-based):', currentRound);
    console.log('SectorControl firebaseRound (actual game round):', firebaseRound);
  }, [currentRound, firebaseRound]);

  // Game flow phase management
  useEffect(() => {
    // Handle phase-based modal displays and timers
    switch (currentPhase) {
      case GameLobbyStatus.INTRODUCTION:
        setShowIntroduction(true);
        setShowTutorial(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowScoreBreakdown(false);
        break;
      
      case GameLobbyStatus.TUTORIAL:
        setShowIntroduction(false);
        setShowTutorial(true);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowScoreBreakdown(false);
        break;
      
      case GameLobbyStatus.ROUND_INSTRUCTIONS:
        setShowIntroduction(false);
        setShowTutorial(false);
        setShowRoundInstructions(true);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowScoreBreakdown(false);
        break;
      
      case GameLobbyStatus.ROUND_GAMEPLAY:
        setShowIntroduction(false);
        setShowTutorial(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowScoreBreakdown(false);
        break;
      
      case GameLobbyStatus.ROUND_SCORE_BREAKDOWN:
        setShowIntroduction(false);
        setShowTutorial(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowScoreBreakdown(true);
        break;
      
      case GameLobbyStatus.ENDING:
        setShowIntroduction(false);
        setShowTutorial(false);
        setShowRoundInstructions(false);
        setShowEnding(true);
        setShowTeamNameInput(false);
        setShowScoreBreakdown(false);
        // Calculate final score (simplified - you may want to implement proper scoring)
        const calculatedScore = (activityLog?.length || 0) * 100 + (currentRound * 50);
        setFinalScore(calculatedScore);
        break;
      
      case GameLobbyStatus.TEAM_NAME_INPUT:
        setShowIntroduction(false);
        setShowTutorial(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(true);
        setShowScoreBreakdown(false);
        break;
      
      case GameLobbyStatus.LEADERBOARD_DISPLAY:
        setShowIntroduction(false);
        setShowTutorial(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowScoreBreakdown(false);
        break;
      
      default:
        // Hide all modals for other phases
        setShowIntroduction(false);
        setShowTutorial(false);
        setShowRoundInstructions(false);
        setShowEnding(false);
        setShowTeamNameInput(false);
        setShowScoreBreakdown(false);
        break;
    }
  }, [currentPhase, activityLog, currentRound]);

  // Timer is handled via Firebase sync in useTimer hook
  // No need to manually start/stop timers as they sync with Firebase timestamps

  // Handle score breakdown modal auto-advance
  useEffect(() => {
    if (currentPhase === GameLobbyStatus.ROUND_SCORE_BREAKDOWN && showScoreBreakdown) {
      const timer = setTimeout(() => {
        setShowScoreBreakdown(false);
      }, getPhaseDuration(GameLobbyStatus.ROUND_SCORE_BREAKDOWN) * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentPhase, showScoreBreakdown, getPhaseDuration]);



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

  const handleMeasureClick = useCallback(async (activityType: ActivityTypeEnum, coinCost: number, sectorId: string) => {
    // Trigger Spline action
    triggerSingleBuild(activityType as any);
    
    // Update local activity log immediately to prevent UI flicker
    const newActivity: ActivityLogType = {
      id: `temp-${Date.now()}`,
      userId: `Player ${sector.slice(-1)}`,
      userName: `Player ${sector.slice(-1)}`,
      action: activityType,
      value: `${activityType}`,
      round: firebaseRound,
      timestamp: Date.now()
    };
    setActivityLog(prev => [...prev, newActivity]);
    
    // Log activity to game room using public method (this will sync with Firebase)
    const triggerConfig = SplineTriggersConfig[activityType];
    const subSectorFromConfig = triggerConfig?.subSector || sectorId;
    const result = await gameRoomService.addElement(activityType, `${activityType}`, firebaseRound, coinCost, true, subSectorFromConfig as any);
    
    if (result === 'insufficient') {
      console.log('Insufficient coins - showing modal');
      setShowInsufficientBudgetModal(true);
    } else if (result !== 'ok') {
      console.log('Failed to add element:', result);
    }
    // Note: Coin updates are handled via Firebase lobby state listener, not local state
  }, [triggerSingleBuild, gameRoomService, currentRound]);

  const handleDemolishClick = useCallback(async (sectorId: string, actionToDestroy: ActivityTypeEnum) => {
    // Update local activity log immediately to prevent UI flicker
    const demolishActivity: ActivityLogType = {
      id: `temp-demolish-${Date.now()}`,
      userId: `Player ${sector.slice(-1)}`,
      userName: `Player ${sector.slice(-1)}`,
      action: ActivityTypeEnum.DEMOLISH,
      value: sectorId, // Store the specific sector being demolished (e.g., "1A", "1B")
      round: firebaseRound,
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
        mangroves: calculateRoundStartButtonSet(newActivityLog, firebaseRound, sectorId, 'mangroves'),
        seawall: calculateRoundStartButtonSet(newActivityLog, firebaseRound, sectorId, 'seawall'),
        landReclamation: calculateRoundStartButtonSet(newActivityLog, firebaseRound, sectorId, 'land-reclamation'),
        stormSurgeBarrier: calculateRoundStartButtonSet(newActivityLog, firebaseRound, sectorId, 'storm-surge-barrier'),
        artificialReef: calculateRoundStartButtonSet(newActivityLog, firebaseRound, sectorId, 'artificial-reef'),
        hybridMeasure: calculateRoundStartButtonSet(newActivityLog, firebaseRound, sectorId, 'hybrid-measure'),
        revetment: calculateRoundStartButtonSet(newActivityLog, firebaseRound, sectorId, 'revetment'),
      };
      
      return updatedButtonSets;
    });
    setRoundStartActivityLog(newActivityLog);
    
    // Log demolish action to Firebase (DEMOLISH always costs 1 coin, handled in service)
    const result = await gameRoomService.addElement(ActivityTypeEnum.DEMOLISH, sectorId, firebaseRound, 1, false, sectorId as any);
    
    if (result === 'insufficient') {
      console.log('Insufficient coins for demolish - showing modal');
      setShowInsufficientBudgetModal(true);
    } else if (result !== 'ok') {
      console.log('Failed to demolish:', result);
    }
    // Note: Coin updates are handled via Firebase lobby state listener, not local state
  }, [gameRoomService, currentRound, sector, activityLog, calculateButtonSetsForRound]);

  const handlePlayerReady = useCallback(async () => {
    console.log('Player marking as ready...');
    // Set this player as ready
    await gameRoomService.setPlayerReady(true);
    
    // Don't change the game status here - let the useGameFlowController handle it
    // when all players are ready (it monitors readyPlayers and auto-starts when count >= 3)
  }, [gameRoomService]);

  // Monitor player readiness and transition to PREPARING when all players are ready
  useEffect(() => {
    if (lobbyState && lobbyState.gameLobbyStatus === GameLobbyStatus.INITIALIZING) {
      const readyCount = Object.values(lobbyState.readyPlayers || {}).filter(ready => ready).length;
      
      if (readyCount >= 3) { // All 3 players are ready
        console.log('All players are ready! Moving to PREPARING...');
        gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.GAME_LOBBY_STATUS, GameLobbyStatus.PREPARING);
      }
    }
  }, [lobbyState?.readyPlayers, lobbyState?.gameLobbyStatus, gameRoomService]);

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
          setActivityLog(activities);
        });

        // Listen to round changes
        gameRoomService.onRoundChange((round) => {
          console.log('Firebase round changed to:', round);
          setLocalRound(round);
        });

        // Listen to lobby state changes for coin updates
        gameRoomService.onLobbyStateChange((lobbyStateData) => {
          setLobbyState(lobbyStateData);
          // Update coins based on shared lobby state
          const coinsTotalPerRound = lobbyStateData[LobbyStateEnum.COINS_TOTAL_PER_ROUND] ?? 10;
          const coinsSpentByRound = lobbyStateData[LobbyStateEnum.COINS_SPENT_BY_ROUND] ?? {};
          const currentRound = lobbyStateData[LobbyStateEnum.ROUND] ?? 1;
          const coinsSpentThisRound = coinsSpentByRound[currentRound] ?? 0;
          const coinsLeft = coinsTotalPerRound - coinsSpentThisRound;
          setTotalCoins(coinsLeft);
        });
      } catch (error) {
        console.error('Failed to initialize game room:', error);
      }
    };

    initializeGameRoom();

    return () => {
      gameRoomService.disconnect();
    };
  }, [gameRoomService]);



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
                duration={phaseDuration}
                onTimeUp={handleTimeUp} 
                isRunning={currentPhase === GameLobbyStatus.ROUND_GAMEPLAY}
                syncWithTimestamp={phaseStartTime > 0 ? phaseStartTime : undefined}
              />
            </div>
          </div>

          {/* Player Status Area - shown when not in gameplay */}
          {currentPhase !== GameLobbyStatus.ROUND_GAMEPLAY && (
            <div className="w-full flex items-center justify-center mt-8">
              <div className="bg-white rounded-[16px] px-8 py-6">
                <div className="text-center">
                  <div className="text-[24px] font-bold text-black text-center mb-4">
                    {currentPhase.replace(/_/g, ' ')}
                  </div>
                  {!currentPhase || currentPhase === GameLobbyStatus.INITIALIZING ? (
                    <button
                      onClick={handlePlayerReady}
                      className="bg-blue-500 text-white px-6 py-3 rounded text-lg hover:bg-blue-600 transition"
                    >
                      Ready
                    </button>
                  ) : currentPhase === GameLobbyStatus.PREPARING ? (
                    <div className="text-center">
                      <div className="text-lg text-black mb-2">
                        Waiting for all players...
                      </div>
                      <div className="text-sm text-gray-600">
                        Ready: {Object.values(lobbyState?.readyPlayers || {}).filter(ready => ready).length}/3
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* Sector sections - only show during gameplay */}
          {currentPhase === GameLobbyStatus.ROUND_GAMEPLAY && (
            <div className="flex flex-col gap-[40px] mt-[48px] w-full items-center">
              {renderSectorSection(sectorAId, sectorTitles.sectorA, progressionStateA)}
              {renderSectorSection(sectorBId, sectorTitles.sectorB, progressionStateB)}
            </div>
          )}
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
      
      <TutorialModal 
        isOpen={showTutorial}
        onDurationComplete={() => {}}
        duration={getPhaseDuration(GameLobbyStatus.TUTORIAL)}
        syncWithTimestamp={lobbyState?.[LobbyStateEnum.PHASE_START_TIME] || undefined}
      />
      
      <RoundInstructionsModal 
        isOpen={showRoundInstructions}
        round={currentRound as 1 | 2 | 3}
        duration={getPhaseDuration(GameLobbyStatus.ROUND_INSTRUCTIONS)}
        syncWithTimestamp={lobbyState?.[LobbyStateEnum.PHASE_START_TIME] || undefined}
        onDurationComplete={() => {}}
      />
      
      <ScoreBreakdownModal 
        isOpen={showScoreBreakdown}
        breakdown={{ totalPoints: finalScore, roundPoints: Math.floor(finalScore / 3) }}
        roundNumber={currentRound as 1 | 2 | 3}
        syncWithTimestamp={lobbyState?.[LobbyStateEnum.PHASE_START_TIME] || undefined}
        onDurationComplete={() => {}}
      />
      
      <EndingModal 
        isOpen={showEnding}
        onDurationComplete={() => {}}
        finalScore={finalScore}
        duration={getPhaseDuration(GameLobbyStatus.ENDING)}
        syncWithTimestamp={lobbyState?.[LobbyStateEnum.PHASE_START_TIME] || undefined}
      />
      
      <TeamNameInputModal 
        isOpen={showTeamNameInput}
        onSubmit={async (teamName) => {
          // Handle team name submission (you can implement leaderboard logic here)
          console.log('Team name submitted:', teamName, 'Score:', finalScore);
          setShowTeamNameInput(false);
        }}
        finalScore={finalScore}
      />
    </div>
  );
};

export default SectorControl;