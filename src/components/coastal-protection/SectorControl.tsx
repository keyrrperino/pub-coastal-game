import React, { useCallback, useEffect, useState } from 'react';
import SectorSection from './SectorSection';
import BudgetDisplay from './BudgetDisplay';
import Timer from './Timer';
import { GameRoomService } from '@/lib/gameRoom';
import { ActivityTypeEnum } from '@/lib/enums';
import { ActivityLogType } from '@/lib/types';
import { useGameContext } from '@/games/pub-coastal-game-spline/GlobalGameContext';
import { useProgression } from '@/components/hooks/useProgression';
import { ActionConfig, progressionConfig } from '@/lib/progression.config';

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

// Helper function to group actions by measure type
const groupActionsByMeasureType = (actions: ActionConfig[]) => {
  const groups: Record<string, ActionConfig[]> = {};
  
  actions.forEach(action => {
    const key = action.measureType;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(action);
  });

  // Sort actions within each group by cost
  Object.keys(groups).forEach(key => {
    groups[key].sort((a, b) => a.cost - b.cost);
  });

  return groups;
};

// Helper function to get display title for measure types
const getMeasureTypeTitle = (measureType: string): string => {
  const titles: Record<string, string> = {
    'mangroves': 'MANGROVES',
    'land-reclamation': 'LAND RECLAMATION',
    'seawall': 'SEAWALL',
    'storm-surge-barrier': 'STORM SURGE BARRIER',
    'artificial-reef': 'ARTIFICIAL REEF',
    'hybrid-measure': 'HYBRID MEASURE',
  };
  return titles[measureType] || measureType.toUpperCase();
};

// Helper function to get subtitle for measure types
const getMeasureTypeSubtitle = (measureType: string): string | undefined => {
  const subtitles: Record<string, string> = {
    'land-reclamation': 'Seawall upgrade',
    'storm-surge-barrier': 'Premium protection',
    'artificial-reef': 'Eco-friendly solution',
    'hybrid-measure': 'Combined approach',
  };
  return subtitles[measureType];
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

  // Use the progression system
  const { getActionsForSector } = useProgression(activityLog, currentRound);

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

  const handleDemolishClick = useCallback((actionToDestroy: ActivityTypeEnum) => {
    // Update local activity log immediately to prevent UI flicker
    const demolishActivity: ActivityLogType = {
      id: `temp-demolish-${Date.now()}`,
      userId: `Player ${sector.slice(-1)}`,
      userName: `Player ${sector.slice(-1)}`,
      action: ActivityTypeEnum.DEMOLISH,
      value: actionToDestroy,
      round: currentRound,
      timestamp: Date.now()
    };
    setActivityLog(prev => [...prev, demolishActivity]);
    
    // Log demolish action to Firebase
    gameRoomService.addElement(ActivityTypeEnum.DEMOLISH, actionToDestroy, currentRound);
    
    // Demolish costs 1 coin
    setTotalCoins(prev => prev - 1);
    
    console.log(`Demolish action triggered for: ${actionToDestroy}`);
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

  // Helper function to create measure data - show all CPMs available for current round
  const createMeasureData = (measureType: string, sectorId: string, availableActions: ActionConfig[], activeActions: ActionConfig[], displayableActions: ActionConfig[]) => {
    // Get ALL possible actions for this measure type in this sector (from progression config)
    const allPossibleActions = Object.values(progressionConfig).filter(action => 
      action.measureType === measureType && 
      action.sector === sectorId &&
      action.unlocksInRound <= currentRound
    );

    // If no actions exist for this measure type in current round, don't show the card
    if (allPossibleActions.length === 0) {
      return null;
    }

    return {
      type: measureType as any,
      title: getMeasureTypeTitle(measureType),
      subtitle: getMeasureTypeSubtitle(measureType),
      options: allPossibleActions.map(action => {
        const isSelected = activeActions.some(activeAction => activeAction.id === action.id);
        const isAvailable = availableActions.some(availableAction => availableAction.id === action.id);
        const isDisplayable = displayableActions.some(displayableAction => displayableAction.id === action.id);
        
        const disabled = !isDisplayable && !isSelected;
        
        return {
          title: action.displayName,
          coinCount: action.cost,
          onClick: isAvailable ? () => handleMeasureClick(action.id, action.cost) : undefined,
          isSelected,
          disabled,
        };
      }),
    };
  };

  // Helper function to render sector section
  const renderSectorSection = (sectorId: string, title: string) => {
    const { activeActions, availableActions, displayableActions } = getActionsForSector(sectorId);
    const groupedAvailable = groupActionsByMeasureType(availableActions);
    const groupedActive = groupActionsByMeasureType(activeActions);

    // Get ALL possible measure types for this sector (from progression config)
    const allPossibleMeasureTypes = new Set(
      Object.values(progressionConfig)
        .filter(action => action.sector === sectorId && action.unlocksInRound <= currentRound)
        .map(action => action.measureType)
    );

    // Create measures array for ALL measure types (show everything, disable what's not available)
    const groupedDisplayable = groupActionsByMeasureType(displayableActions);
    const measures = Array.from(allPossibleMeasureTypes)
      .map(measureType => createMeasureData(
        measureType, 
        sectorId,
        groupedAvailable[measureType] || [], 
        groupedActive[measureType] || [],
        groupedDisplayable[measureType] || []
      ))
      .filter(Boolean);

    // Determine if there are any active actions that can be demolished
    const canDemolish = activeActions.length > 0;
    const demolishOption = {
      coinCount: 1,
      onClick: canDemolish ? () => {
        // For now, demolish the first active action (could be enhanced to show a selection)
        if (activeActions.length > 0) {
          handleDemolishClick(activeActions[0].id);
        }
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