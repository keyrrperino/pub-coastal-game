import React, { useCallback, useEffect, useState } from 'react';
import SectorSection from './SectorSection';
import BudgetDisplay from './BudgetDisplay';
import Timer from './Timer';
import { GameRoomService } from '@/lib/gameRoom';
import { ActivityTypeEnum } from '@/lib/enums';
import { ActivityLogType } from '@/lib/types';
import { useGameContext } from '@/games/pub-coastal-game-spline/GlobalGameContext';
import { useProgression } from '@/components/hooks/useProgression';
import { hasAnyConstructionInSector, hasAnySelectableActionsInMeasureType, getCPMCompletionRound, getSectorActions, calculateActiveActions, getActiveCPMPath, calculateRoundStartButtonSet } from '@/lib/progressionUtils';

import { ActionStatus, ActionState } from '@/lib/types';

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
  const [gameRoomService] = useState(() => new GameRoomService(`Player ${sector.slice(-1)}`));
  const [totalCoins, setTotalCoins] = useState(10);
  const [activityLog, setActivityLog] = useState<ActivityLogType[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [previousRound, setPreviousRound] = useState(1);
  const [roundStartActivityLog, setRoundStartActivityLog] = useState<ActivityLogType[]>([]);
  const [roundStartButtonSets, setRoundStartButtonSets] = useState<RoundStartButtonSets>({});

  // Debug logging for round state
  useEffect(() => {
    console.log('SectorControl currentRound state:', currentRound);
  }, [currentRound]);



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

  // Handle round changes - reset coins and capture round start state
  useEffect(() => {
    if (currentRound !== previousRound) {
      console.log(`Round changed from ${previousRound} to ${currentRound}`);
      // Capture the activity log state at the start of this round
      const roundStartLog = [...activityLog];
      setRoundStartActivityLog(roundStartLog);
      
      // Calculate button sets for this round
      const buttonSets = calculateButtonSetsForRound(roundStartLog, currentRound);
      setRoundStartButtonSets(buttonSets);
      
      if (previousRound !== 1) {
        // Reset coins to starting amount for new round
        setTotalCoins(10);
      }
    }
    setPreviousRound(currentRound);
  }, [currentRound, previousRound, activityLog, calculateButtonSetsForRound]);

  // Initialize button sets on first load (R1)
  useEffect(() => {
    if (Object.keys(roundStartButtonSets).length === 0) {
      console.log('Initializing button sets for R1');
      const roundStartLog = [...activityLog];
      setRoundStartActivityLog(roundStartLog);
      const buttonSets = calculateButtonSetsForRound(roundStartLog, currentRound);
      setRoundStartButtonSets(buttonSets);
    }
  }, [activityLog, currentRound, roundStartButtonSets, calculateButtonSetsForRound]);
  
  // Get sector titles
  const sectorTitles = getSectorTitles(sector);

  const handleMeasureClick = useCallback((activityType: ActivityTypeEnum, coinCost: number) => {
    if (totalCoins >= coinCost) {
      // Trigger Spline action
      triggerSingleBuild(activityType as any);
      
      // Update local activity log immediately to prevent UI flicker
      const newActivity: ActivityLogType = {
        id: `temp-${Date.now()}`,
        userId: `Player ${sector.slice(-1)}`,
        userName: `Player ${sector.slice(-1)}`,
        action: activityType,
        value: `${activityType}`,
        round: currentRound,
        timestamp: Date.now()
      };
      setActivityLog(prev => [...prev, newActivity]);
      
      // Log activity to game room using public method (this will sync with Firebase)
      gameRoomService.addElement(activityType, `${activityType}`, currentRound);
      
      // Update coins
      setTotalCoins(prev => prev - coinCost);
      
      console.log(`Action triggered: ${activityType}, Cost: ${coinCost} coins`);
    } else {
      console.log('Insufficient coins');
    }
  }, [totalCoins, triggerSingleBuild, gameRoomService, currentRound]);

  const handleDemolishClick = useCallback((sectorId: string, actionToDestroy: ActivityTypeEnum) => {
    // Update local activity log immediately to prevent UI flicker
    const demolishActivity: ActivityLogType = {
      id: `temp-demolish-${Date.now()}`,
      userId: `Player ${sector.slice(-1)}`,
      userName: `Player ${sector.slice(-1)}`,
      action: ActivityTypeEnum.DEMOLISH,
      value: sectorId, // Store the specific sector being demolished (e.g., "1A", "1B")
      round: currentRound,
      timestamp: Date.now()
    };
    setActivityLog(prev => [...prev, demolishActivity]);
    
    // Log demolish action to Firebase
    gameRoomService.addElement(ActivityTypeEnum.DEMOLISH, sectorId, currentRound);
    
    // Demolish costs 1 coin
    setTotalCoins(prev => prev - 1);
    
    console.log(`Demolish action triggered for sector ${sectorId}, destroying: ${actionToDestroy}`);
  }, [gameRoomService, currentRound, sector]);

  const handleTimeUp = useCallback(() => {
    console.log('Time is up!');
    // Handle round end logic here
  }, []);

  // Initialize game room connection and listen to activity changes
  useEffect(() => {
    const initializeGameRoom = async () => {
      try {
        await gameRoomService.createRoom(true);
        await gameRoomService.joinRoom('default');
        
        // Listen to activity changes
        gameRoomService.onActivityChange((activities) => {
          setActivityLog(activities);
        });

        // Listen to round changes
        gameRoomService.onRoundChange((round) => {
          console.log('Firebase round changed to:', round);
          setCurrentRound(round);
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
  const renderSectorSection = (sectorId: string, title: string) => {
    // Use current state for button states (active/disabled/selected)
    const progressionState = useProgression(activityLog, currentRound, sectorId);
    
    // Get additional data needed for comprehensive "No More Available Upgrades" check
    const activeActions = calculateActiveActions(activityLog);
    const sectorActions = getSectorActions(sectorId);
    const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
    
    // Get pre-calculated button sets for this sector (calculated once at round start)
    const sectorButtonSets = roundStartButtonSets[sectorId] || {};
    console.log(`Sector ${sectorId} button sets:`, sectorButtonSets);
    
    // Map measure types to their display names and button sets
    const measureTypeConfig = [
      { key: 'mangroves', title: 'MANGROVES', roundStartActions: sectorButtonSets.mangroves || [], currentActions: progressionState.mangroves },
      { key: 'seawall', title: 'SEAWALL', roundStartActions: sectorButtonSets.seawall || [], currentActions: progressionState.seawall },
      { key: 'land-reclamation', title: 'LAND RECLAMATION', subtitle: 'Seawall upgrade', roundStartActions: sectorButtonSets.landReclamation || [], currentActions: progressionState.landReclamation },
      { key: 'storm-surge-barrier', title: 'STORM SURGE BARRIER', subtitle: 'Premium protection', roundStartActions: sectorButtonSets.stormSurgeBarrier || [], currentActions: progressionState.stormSurgeBarrier },
      { key: 'artificial-reef', title: 'ARTIFICIAL REEF', subtitle: 'Eco-friendly solution', roundStartActions: sectorButtonSets.artificialReef || [], currentActions: progressionState.artificialReef },
      { key: 'hybrid-measure', title: 'HYBRID MEASURE', subtitle: 'Combined approach', roundStartActions: sectorButtonSets.hybridMeasure || [], currentActions: progressionState.hybridMeasure },
      { key: 'revetment', title: 'REVETMENT', roundStartActions: sectorButtonSets.revetment || [], currentActions: progressionState.revetment },
    ];

    // Create measures array - include all measure types, show "Fully Upgraded" for empty ones
    const measures = measureTypeConfig
      .map(config => {
        // Check if this is an active CPM path that was completed in a PREVIOUS round
        const hasAnySelectableInMeasureType = hasAnySelectableActionsInMeasureType(
          config.key, 
          sectorActions, 
          activeActions, 
          activeCPMPath, 
          currentRound
        );
        const completionRound = getCPMCompletionRound(config.key, sectorId, activityLog);
        const hasNoMoreAvailableUpgrades = !hasAnySelectableInMeasureType && 
                               activeCPMPath === config.key &&
                               completionRound !== null && 
                               currentRound > completionRound;
        
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
                onClick: isAvailable && !disabled ? () => handleMeasureClick(currentActionState.config.id, currentActionState.config.cost) : undefined,
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
          backgroundImage: 'url(/assets/background-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(100px)',
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: 'rgba(51, 92, 143, 0.6)' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-[1160px] mx-auto px-[20px] py-[20px]">
          {/* Top bar: Budget left, Round center, Timer right */}
          <div className="w-full flex flex-row items-start justify-between">
            {/* Budget display left */}
            <div className="flex-1 flex items-start justify-start">
              <BudgetDisplay totalCoins={totalCoins} />
            </div>
            {/* Round display center */}
            <div className="flex-1 flex items-start justify-center">
              <div className="bg-white rounded-[16px] px-6 py-3">
                <div className="text-[24px] font-bold text-black text-center">
                  ROUND {currentRound}
                </div>
                {/* Temporary test buttons for round transitions */}
                <div className="flex gap-1 mt-2 justify-center">
                  <button 
                    onClick={() => gameRoomService.updateLobbyStateKeyValue('round' as any, 1)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    R1
                  </button>
                  <button 
                    onClick={() => gameRoomService.updateLobbyStateKeyValue('round' as any, 2)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    R2
                  </button>
                  <button 
                    onClick={() => gameRoomService.updateLobbyStateKeyValue('round' as any, 3)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                  >
                    R3
                  </button>
                </div>
              </div>
            </div>
            {/* Timer right */}
            <div className="flex-1 flex items-start justify-end">
              <Timer key={currentRound} initialSeconds={30} onTimeUp={handleTimeUp} />
            </div>
          </div>

          {/* Sector sections - now stacked vertically */}
          <div className="flex flex-col gap-[40px] mt-[48px] w-full items-center">
            {renderSectorSection(`${sector.slice(-1)}A`, sectorTitles.sectorA)}
            {renderSectorSection(`${sector.slice(-1)}B`, sectorTitles.sectorB)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorControl;