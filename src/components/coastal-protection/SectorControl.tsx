import React, { useCallback, useEffect } from 'react';
import SectorSection from './SectorSection';
import BudgetDisplay from './BudgetDisplay';
import Timer from './Timer';
import { GameRoomService } from '@/lib/gameRoom';
import { ActivityTypeEnum } from '@/lib/enums';
import { useGameContext } from '@/games/pub-coastal-game-spline/GlobalGameContext';

interface SectorControlProps {
  sector: string;
}

interface MeasureOption {
  title: string;
  coinCount: number;
  activityType: ActivityTypeEnum;
}

interface MeasureData {
  type: 'mangroves' | 'land-reclamation' | 'seawall' | 'storm-surge-barrier' | 'artificial-reef' | 'hybrid-measure';
  title: string;
  subtitle?: string;
  options: MeasureOption[];
}

interface SectorData {
  title: string;
  measures: MeasureData[];
  demolishOption: {
    coinCount: number;
  };
}

const SECTOR_CONFIGURATIONS: Record<string, { sectorA: SectorData; sectorB: SectorData }> = {
  'sector-1': {
    sectorA: {
      title: 'Sector 1A: Industrial',
      measures: [
        {
          type: 'mangroves',
          title: 'MANGROVES',
          options: [
            { title: 'Build Board Walk', coinCount: 1, activityType: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES },
          ],
        },
        {
          type: 'land-reclamation',
          title: 'LAND RECLAMATION',
          subtitle: 'Seawall upgrade',
          options: [
            { title: 'Build 0.5m', coinCount: 1, activityType: ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION },
            { title: 'Build 1.15m', coinCount: 2, activityType: ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION },
            { title: 'Build 2m', coinCount: 3, activityType: ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION },
          ],
        },
        {
          type: 'seawall',
          title: 'SEAWALL',
          options: [
            { title: 'Build Path', coinCount: 1, activityType: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL },
            { title: 'Raise to 1.15m', coinCount: 2, activityType: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL },
            { title: 'Raise to 2m', coinCount: 3, activityType: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL },
          ],
        },
      ],
      demolishOption: {
        coinCount: 1,
      },
    },
    sectorB: {
      title: 'Sector 1B: Residential',
      measures: [
        {
          type: 'mangroves',
          title: 'MANGROVES',
          options: [
            { title: 'Build Board Walk', coinCount: 1, activityType: ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES },
          ],
        },
        {
          type: 'land-reclamation',
          title: 'LAND RECLAMATION',
          subtitle: 'Seawall upgrade',
          options: [
            { title: 'Build 0.5m', coinCount: 1, activityType: ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION },
            { title: 'Build 1.15m', coinCount: 2, activityType: ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION },
            { title: 'Build 2m', coinCount: 3, activityType: ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION },
          ],
        },
        {
          type: 'seawall',
          title: 'SEAWALL',
          options: [
            { title: 'Build Bike Path', coinCount: 1, activityType: ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL },
            { title: 'Raise to 1.15m', coinCount: 2, activityType: ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL },
            { title: 'Raise to 2m', coinCount: 3, activityType: ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL },
          ],
        },
      ],
      demolishOption: {
        coinCount: 1,
      },
    },
  },
  'sector-2': {
    sectorA: {
      title: 'Sector 2A: CBD',
      measures: [
        {
          type: 'mangroves',
          title: 'MANGROVES',
          options: [
            { title: 'Build Board Walk', coinCount: 1, activityType: ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES },
          ],
        },
        {
          type: 'storm-surge-barrier',
          title: 'STORM SURGE BARRIER',
          subtitle: 'Premium protection',
          options: [
            { title: 'Build 0.5m', coinCount: 2, activityType: ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER },
            { title: 'Build 1.15m', coinCount: 3, activityType: ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER },
            { title: 'Build 2m', coinCount: 4, activityType: ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER },
          ],
        },
        {
          type: 'seawall',
          title: 'SEAWALL',
          options: [
            { title: 'Build Path', coinCount: 1, activityType: ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL },
            { title: 'Raise to 1.15m', coinCount: 2, activityType: ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL },
            { title: 'Raise to 2m', coinCount: 3, activityType: ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL },
          ],
        },
      ],
      demolishOption: {
        coinCount: 1,
      },
    },
    sectorB: {
      title: 'Sector 2B: Jurong',
      measures: [
        {
          type: 'mangroves',
          title: 'MANGROVES',
          options: [
            { title: 'Build Board Walk', coinCount: 1, activityType: ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES },
          ],
        },
        {
          type: 'storm-surge-barrier',
          title: 'STORM SURGE BARRIER',
          subtitle: 'Premium protection',
          options: [
            { title: 'Build 0.5m', coinCount: 2, activityType: ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER },
            { title: 'Build 1.15m', coinCount: 3, activityType: ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER },
            { title: 'Build 2m', coinCount: 4, activityType: ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER },
          ],
        },
        {
          type: 'seawall',
          title: 'SEAWALL',
          options: [
            { title: 'Build Path', coinCount: 1, activityType: ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL },
            { title: 'Raise to 1.15m', coinCount: 2, activityType: ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL },
            { title: 'Raise to 2m', coinCount: 3, activityType: ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL },
          ],
        },
      ],
      demolishOption: {
        coinCount: 1,
      },
    },
  },
  'sector-3': {
    sectorA: {
      title: 'Sector 3A: Woodlands',
      measures: [
        {
          type: 'artificial-reef',
          title: 'ARTIFICIAL REEF',
          subtitle: 'Eco-friendly solution',
          options: [
            { title: 'Build Reef', coinCount: 2, activityType: ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF },
          ],
        },
        {
          type: 'hybrid-measure',
          title: 'HYBRID MEASURE',
          subtitle: 'Combined approach',
          options: [
            { title: 'Build 0.5m', coinCount: 2, activityType: ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE },
            { title: 'Build 1.15m', coinCount: 3, activityType: ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE },
            { title: 'Build 2m', coinCount: 4, activityType: ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE },
          ],
        },
        {
          type: 'seawall',
          title: 'SEAWALL',
          options: [
            { title: 'Build Path', coinCount: 1, activityType: ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL },
            { title: 'Raise to 1.15m', coinCount: 2, activityType: ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL },
            { title: 'Raise to 2m', coinCount: 3, activityType: ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL },
          ],
        },
      ],
      demolishOption: {
        coinCount: 1,
      },
    },
    sectorB: {
      title: 'Sector 3B: Punggol',
      measures: [
        {
          type: 'artificial-reef',
          title: 'ARTIFICIAL REEF',
          subtitle: 'Eco-friendly solution',
          options: [
            { title: 'Build Reef', coinCount: 2, activityType: ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF },
          ],
        },
        {
          type: 'hybrid-measure',
          title: 'HYBRID MEASURE',
          subtitle: 'Combined approach',
          options: [
            { title: 'Build 0.5m', coinCount: 2, activityType: ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE },
            { title: 'Build 1.15m', coinCount: 3, activityType: ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE },
            { title: 'Build 2m', coinCount: 4, activityType: ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE },
          ],
        },
        {
          type: 'seawall',
          title: 'SEAWALL',
          options: [
            { title: 'Build Path', coinCount: 1, activityType: ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL },
            { title: 'Raise to 1.15m', coinCount: 2, activityType: ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL },
            { title: 'Raise to 2m', coinCount: 3, activityType: ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL },
          ],
        },
      ],
      demolishOption: {
        coinCount: 1,
      },
    },
  },
};

const SectorControl: React.FC<SectorControlProps> = ({ sector }) => {
  const { triggerSingleBuild } = useGameContext();
  const [gameRoomService] = React.useState(() => new GameRoomService(`Player ${sector.slice(-1)}`));
  const [totalCoins, setTotalCoins] = React.useState(10);

  const config = SECTOR_CONFIGURATIONS[sector];
  if (!config) {
    throw new Error(`Invalid sector: ${sector}`);
  }

  const { sectorA, sectorB } = config;

  const handleMeasureClick = useCallback((activityType: ActivityTypeEnum, coinCost: number) => {
    if (totalCoins >= coinCost) {
      // Trigger Spline action
      triggerSingleBuild(activityType as any);
      
      // Log activity to game room using public method
      gameRoomService.addElement(activityType, `${activityType}`, 1);
      
      // Update coins
      setTotalCoins(prev => prev - coinCost);
      
      console.log(`Action triggered: ${activityType}, Cost: ${coinCost} coins`);
    } else {
      console.log('Insufficient coins');
    }
  }, [totalCoins, triggerSingleBuild, gameRoomService]);

  const handleDemolishClick = useCallback((sectorTitle: string) => {
    // Refund 1 coin for demolish
    setTotalCoins(prev => prev + 1);
    console.log(`Demolish clicked for: ${sectorTitle}`);
  }, []);

  const handleTimeUp = useCallback(() => {
    console.log('Time is up!');
    // Handle round end logic here
  }, []);

  // Initialize game room connection
  useEffect(() => {
    const initializeGameRoom = async () => {
      try {
        await gameRoomService.createRoom(true);
        await gameRoomService.joinRoom('default');
      } catch (error) {
        console.error('Failed to initialize game room:', error);
      }
    };

    initializeGameRoom();

    return () => {
      // Cleanup if needed
    };
  }, [gameRoomService]);

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
            <SectorSection
              title={sectorA.title}
              measures={[
                ...sectorA.measures
                  .filter(m => m.type === 'mangroves' || m.type === 'artificial-reef')
                  .map(measure => ({
                    ...measure,
                    options: measure.options
                      .slice()
                      .sort((a, b) => a.coinCount - b.coinCount)
                      .map(option => ({
                        title: option.title,
                        coinCount: option.coinCount,
                        onClick: () => handleMeasureClick(option.activityType, option.coinCount),
                      })),
                  })),
                ...sectorA.measures
                  .filter(m => m.type === 'seawall')
                  .map(measure => ({
                    ...measure,
                    options: measure.options
                      .slice()
                      .sort((a, b) => a.coinCount - b.coinCount)
                      .map(option => ({
                        title: option.title,
                        coinCount: option.coinCount,
                        onClick: () => handleMeasureClick(option.activityType, option.coinCount),
                      })),
                  })),
                ...sectorA.measures
                  .filter(m => m.type === 'land-reclamation' || m.type === 'storm-surge-barrier' || m.type === 'hybrid-measure')
                  .map(measure => ({
                    ...measure,
                    options: measure.options
                      .slice()
                      .sort((a, b) => a.coinCount - b.coinCount)
                      .map(option => ({
                        title: option.title,
                        coinCount: option.coinCount,
                        onClick: () => handleMeasureClick(option.activityType, option.coinCount),
                      })),
                  })),
              ]}
              demolishOption={{
                ...sectorA.demolishOption,
                onClick: () => handleDemolishClick(sectorA.title),
              }}
            />
            <SectorSection
              title={sectorB.title}
              measures={[
                ...sectorB.measures
                  .filter(m => m.type === 'mangroves' || m.type === 'artificial-reef')
                  .map(measure => ({
                    ...measure,
                    options: measure.options
                      .slice()
                      .sort((a, b) => a.coinCount - b.coinCount)
                      .map(option => ({
                        title: option.title,
                        coinCount: option.coinCount,
                        onClick: () => handleMeasureClick(option.activityType, option.coinCount),
                      })),
                  })),
                ...sectorB.measures
                  .filter(m => m.type === 'seawall')
                  .map(measure => ({
                    ...measure,
                    options: measure.options
                      .slice()
                      .sort((a, b) => a.coinCount - b.coinCount)
                      .map(option => ({
                        title: option.title,
                        coinCount: option.coinCount,
                        onClick: () => handleMeasureClick(option.activityType, option.coinCount),
                      })),
                  })),
                ...sectorB.measures
                  .filter(m => m.type === 'land-reclamation' || m.type === 'storm-surge-barrier' || m.type === 'hybrid-measure')
                  .map(measure => ({
                    ...measure,
                    options: measure.options
                      .slice()
                      .sort((a, b) => a.coinCount - b.coinCount)
                      .map(option => ({
                        title: option.title,
                        coinCount: option.coinCount,
                        onClick: () => handleMeasureClick(option.activityType, option.coinCount),
                      })),
                  })),
              ]}
              demolishOption={{
                ...sectorB.demolishOption,
                onClick: () => handleDemolishClick(sectorB.title),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorControl;