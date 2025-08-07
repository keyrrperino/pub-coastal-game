import React, { useCallback, useEffect, useState } from 'react';
import SectorSection from './SectorSection';
import BudgetDisplay from './BudgetDisplay';
import Timer from './Timer';
import { GameRoomService } from '@/lib/gameRoom';
import { ActivityTypeEnum } from '@/lib/enums';
import { ActivityLogType } from '@/lib/types';
import { useGameContext } from '@/games/pub-coastal-game-spline/GlobalGameContext';
import { useProgression } from '@/components/hooks/useProgression';
import { ActionConfig } from '@/lib/progression.config';

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

  // Use the progression system
  const { getActionsForSector } = useProgression(activityLog, currentRound);
  
  // Get sector titles
  const sectorTitles = getSectorTitles(sector);

  const handleMeasureClick = useCallback((activityType: ActivityTypeEnum, coinCost: number) => {
    if (totalCoins >= coinCost) {
      // Trigger Spline action
      triggerSingleBuild(activityType as any);
      
      // Log activity to game room using public method
      gameRoomService.addElement(activityType, `${activityType}`, currentRound);
      
      // Update coins
      setTotalCoins(prev => prev - coinCost);
      
      console.log(`Action triggered: ${activityType}, Cost: ${coinCost} coins`);
    } else {
      console.log('Insufficient coins');
    }
  }, [totalCoins, triggerSingleBuild, gameRoomService, currentRound]);

  const handleDemolishClick = useCallback((actionToDestroy: ActivityTypeEnum) => {
    // Log demolish action
    gameRoomService.addElement(ActivityTypeEnum.DEMOLISH, actionToDestroy, currentRound);
    
    // Refund 1 coin for demolish
    setTotalCoins(prev => prev + 1);
    
    console.log(`Demolish action triggered for: ${actionToDestroy}`);
  }, [gameRoomService, currentRound]);

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
      } catch (error) {
        console.error('Failed to initialize game room:', error);
      }
    };

    initializeGameRoom();

    return () => {
      gameRoomService.disconnect();
    };
  }, [gameRoomService]);

  // Helper function to create measure data from actions
  const createMeasureData = (measureType: string, actions: ActionConfig[]) => {
    if (actions.length === 0) return null;

    return {
      type: measureType as any,
      title: getMeasureTypeTitle(measureType),
      subtitle: getMeasureTypeSubtitle(measureType),
      options: actions.map(action => ({
        title: action.displayName,
        coinCount: action.cost,
        onClick: () => handleMeasureClick(action.id, action.cost),
      })),
    };
  };

  // Helper function to render sector section
  const renderSectorSection = (sectorId: string, title: string) => {
    const { activeActions, availableActions } = getActionsForSector(sectorId);
    const groupedAvailable = groupActionsByMeasureType(availableActions);
    const groupedActive = groupActionsByMeasureType(activeActions);

    // Create measures array from available actions
    const measures = Object.entries(groupedAvailable)
      .map(([measureType, actions]) => createMeasureData(measureType, actions))
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
          {/* Top bar: Budget left, Timer right, Hint centered below */}
          <div className="w-full flex flex-row items-start justify-between">
            {/* Budget display left */}
            <div className="flex-1 flex items-start justify-start">
              <BudgetDisplay totalCoins={totalCoins} />
            </div>
            {/* Timer right */}
            <div className="flex-1 flex items-start justify-end">
              <Timer initialSeconds={30} onTimeUp={handleTimeUp} />
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