import React, { useCallback, useEffect, useState } from 'react';
import SectorSection from './SectorSection';
import BudgetDisplay from './BudgetDisplay';
import Timer from './Timer';
import { GameRoomService } from '@/lib/gameRoom';
import { ActivityTypeEnum } from '@/lib/enums';
import { ActivityLogType } from '@/lib/types';
import { useGameContext } from '@/games/pub-coastal-game-spline/GlobalGameContext';
import { useProgression } from '@/components/hooks/useProgression';

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



const SectorControl: React.FC<SectorControlProps> = ({ sector }) => {
  const { triggerSingleBuild } = useGameContext();
  const [gameRoomService] = useState(() => new GameRoomService(`Player ${sector.slice(-1)}`));
  const [totalCoins, setTotalCoins] = useState(10);
  const [activityLog, setActivityLog] = useState<ActivityLogType[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [previousRound, setPreviousRound] = useState(1);

  // Debug logging for round state
  useEffect(() => {
    console.log('SectorControl currentRound state:', currentRound);
  }, [currentRound]);



  // Handle round changes - reset coins only
  useEffect(() => {
    if (currentRound !== previousRound && previousRound !== 1) {
      console.log(`Round changed from ${previousRound} to ${currentRound}`);
      // Reset coins to starting amount for new round
      setTotalCoins(10);
    }
    setPreviousRound(currentRound);
  }, [currentRound, previousRound]);
  
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
    const progressionState = useProgression(activityLog, currentRound, sectorId);
    
    // Map measure types to their display names and progression state properties
    const measureTypeConfig = [
      { key: 'mangroves', title: 'MANGROVES', actions: progressionState.mangroves },
      { key: 'seawall', title: 'SEAWALL', actions: progressionState.seawall },
      { key: 'land-reclamation', title: 'LAND RECLAMATION', subtitle: 'Seawall upgrade', actions: progressionState.landReclamation },
      { key: 'storm-surge-barrier', title: 'STORM SURGE BARRIER', subtitle: 'Premium protection', actions: progressionState.stormSurgeBarrier },
      { key: 'artificial-reef', title: 'ARTIFICIAL REEF', subtitle: 'Eco-friendly solution', actions: progressionState.artificialReef },
      { key: 'hybrid-measure', title: 'HYBRID MEASURE', subtitle: 'Combined approach', actions: progressionState.hybridMeasure },
      { key: 'revetment', title: 'REVETMENT', actions: progressionState.revetment },
    ];

    // Create measures array - only include measure types that have actions
    const measures = measureTypeConfig
      .filter(config => config.actions.length > 0)
      .map(config => ({
        type: config.key as any,
        title: config.title,
        subtitle: config.subtitle,
        options: config.actions.map(actionState => {
          const isSelected = actionState.status === ActionStatus.COMPLETED;
          const isAvailable = actionState.status === ActionStatus.SELECTABLE;
          const disabled = actionState.status === ActionStatus.LOCKED_CONFLICT || 
                          actionState.status === ActionStatus.LOCKED_PREREQUISITE ||
                          actionState.status === ActionStatus.REPLACED;
          
          return {
            title: actionState.config.displayName,
            coinCount: actionState.config.cost,
            onClick: isAvailable && !disabled ? () => handleMeasureClick(actionState.config.id, actionState.config.cost) : undefined,
            isSelected,
            disabled,
            status: actionState.status, // Pass the status for potential UI enhancements
          };
        }),
      }));

    // Determine if there are any completed actions that can be demolished
    const completedActions = Object.values(progressionState)
      .filter((value): value is ActionState[] => Array.isArray(value))
      .flat()
      .filter(actionState => actionState.status === ActionStatus.COMPLETED);
    
    const canDemolish = completedActions.length > 0;
    const demolishOption = {
      coinCount: 1,
      onClick: canDemolish ? () => {
        // Demolish all actions for this specific sector
        handleDemolishClick(sectorId, completedActions[0].config.id);
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