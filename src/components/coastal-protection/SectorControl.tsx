import React from 'react';
import SectorSection from './SectorSection';
import BudgetDisplay from './BudgetDisplay';
import Timer from './Timer';
import Hint from './Hint';

interface SectorControlProps {
  sector: string;
}

const SectorControl: React.FC<SectorControlProps> = ({ sector }) => {
  // TODO: Use sector prop to load different sector configurations
  console.log('Loading sector:', sector);
  // Mock data for Sector 1 (Industrial & Residential)
  const sector1AData = {
    title: 'SEctor 1a: Industrial',
    measures: [
      {
        type: 'land-reclamation' as const,
        title: 'LAND RECLAMATION',
        subtitle: 'Seawall upgrade',
        options: [
          { title: 'build 2m', coinCount: 2 },
          { title: 'build 1.15m', coinCount: 1 },
        ],
      },
      {
        type: 'seawall' as const,
        title: 'SEAWALL',
        options: [
          { title: 'build path', coinCount: 1 },
          { title: 'Raise to 2m', coinCount: 3 },
          { title: 'Raise to 1.15m', coinCount: 2 },
        ],
      },
      {
        type: 'mangroves' as const,
        title: 'Mangroves',
        options: [
          { title: 'build Board walk', coinCount: 1 },
        ],
      },
    ],
    demolishOption: {
      coinCount: 1,
    },
  };

  const sector1BData = {
    title: 'SEctor 1B: residential',
    measures: [
      {
        type: 'land-reclamation' as const,
        title: 'LAND RECLAMATION',
        subtitle: 'Seawall upgrade',
        options: [
          { title: 'build 2m', coinCount: 2 },
          { title: 'build 1.15m', coinCount: 1 },
        ],
      },
      {
        type: 'seawall' as const,
        title: 'SEAWALL',
        options: [
          { title: 'build bike path', coinCount: 1 },
          { title: 'Raise to 2m', coinCount: 3 },
          { title: 'Raise to 1.15m', coinCount: 2 },
        ],
      },
      {
        type: 'mangroves' as const,
        title: 'Mangroves',
        options: [
          { title: 'build Board walk', coinCount: 1 },
        ],
      },
    ],
    demolishOption: {
      coinCount: 1,
    },
  };

  const handleMeasureClick = (measureTitle: string, optionTitle: string) => {
    console.log(`Clicked: ${measureTitle} - ${optionTitle}`);
  };

  const handleDemolishClick = (sectorTitle: string) => {
    console.log(`Demolish clicked for: ${sectorTitle}`);
  };

  const handleTimeUp = () => {
    console.log('Time is up!');
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
        <div className="w-full max-w-[1180px] mx-auto px-4">
          {/* Top bar: Budget left, Timer right, Hint centered below */}
          <div className="w-full flex flex-row items-start justify-between mb-4">
            {/* Budget display left */}
            <div className="flex-1 flex items-start justify-start">
              <BudgetDisplay totalCoins={10} />
            </div>
            {/* Timer right */}
            <div className="flex-1 flex items-start justify-end">
              <Timer initialSeconds={30} onTimeUp={handleTimeUp} />
            </div>
          </div>
          {/* Hint centered below */}
          <div className="w-full flex flex-row items-center justify-center mb-8">
            <Hint text="HINT: DEMOLISH BEFORE YOU CAN BUILD A NEW COASTAL PROTECTION MEASURE" />
          </div>

          {/* Sector sections - now stacked vertically */}
          <div className="flex flex-col gap-[40px] mt-[48px] w-full items-center">
            <SectorSection
              title={sector1AData.title}
              measures={sector1AData.measures.map(measure => ({
                ...measure,
                options: measure.options.map(option => ({
                  ...option,
                  onClick: () => handleMeasureClick(measure.title, option.title),
                })),
              }))}
              demolishOption={{
                ...sector1AData.demolishOption,
                onClick: () => handleDemolishClick(sector1AData.title),
              }}
            />
            <SectorSection
              title={sector1BData.title}
              measures={sector1BData.measures.map(measure => ({
                ...measure,
                options: measure.options.map(option => ({
                  ...option,
                  onClick: () => handleMeasureClick(measure.title, option.title),
                })),
              }))}
              demolishOption={{
                ...sector1BData.demolishOption,
                onClick: () => handleDemolishClick(sector1BData.title),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorControl;