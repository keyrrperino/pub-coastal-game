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
    title: "SEctor 1a: Industrial",
    measures: [
      {
        type: 'land-reclamation' as const,
        title: "LAND RECLAMATION",
        subtitle: "Seawall upgrade",
        options: [
          { title: "build 2m", coinCount: 2 },
          { title: "build 1.15m", coinCount: 1 }
        ]
      },
      {
        type: 'seawall' as const,
        title: "SEAWALL",
        options: [
          { title: "build path", coinCount: 1 },
          { title: "Raise to 2m", coinCount: 3 },
          { title: "Raise to 1.15m", coinCount: 2 }
        ]
      },
      {
        type: 'mangroves' as const,
        title: "Mangroves",
        options: [
          { title: "build Board walk", coinCount: 1 }
        ]
      }
    ],
    demolishOption: {
      coinCount: 1
    }
  };

  const sector1BData = {
    title: "SEctor 1B: residential",
    measures: [
      {
        type: 'land-reclamation' as const,
        title: "LAND RECLAMATION",
        subtitle: "Seawall upgrade",
        options: [
          { title: "build 2m", coinCount: 2 },
          { title: "build 1.15m", coinCount: 1 }
        ]
      },
      {
        type: 'seawall' as const,
        title: "SEAWALL",
        options: [
          { title: "build bike path", coinCount: 1 },
          { title: "Raise to 2m", coinCount: 3 },
          { title: "Raise to 1.15m", coinCount: 2 }
        ]
      },
      {
        type: 'mangroves' as const,
        title: "Mangroves",
        options: [
          { title: "build Board walk", coinCount: 1 }
        ]
      }
    ],
    demolishOption: {
      coinCount: 1
    }
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
        className="absolute inset-0 w-[2098px] h-[1001px]"
        style={{ 
          left: '-452px', 
          top: '-84px',
          backgroundImage: 'url(/assets/background-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(100px)'
        }}
      />
      
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 w-[1274px] h-[892px]"
        style={{ 
          left: '-40px', 
          top: '-20px',
          backgroundColor: 'rgba(51, 92, 143, 0.6)'
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Timer and Hint */}
        <div className="absolute top-[51.5px] left-[285.86px] flex flex-col gap-4">
          <Timer initialSeconds={30} onTimeUp={handleTimeUp} />
          <Hint text="HINT: DEMOLISH BEFORE YOU CAN BUILD A NEW COASTAL PROTECTION MEASURE" />
        </div>
        
        {/* Budget display */}
        <div className="absolute top-[38px] left-[19.89px]">
          <BudgetDisplay totalCoins={20} />
        </div>
        
        {/* Sector sections */}
        <div className="flex gap-[60px] mt-[224.96px]">
          <SectorSection
            title={sector1AData.title}
            measures={sector1AData.measures.map(measure => ({
              ...measure,
              options: measure.options.map(option => ({
                ...option,
                onClick: () => handleMeasureClick(measure.title, option.title)
              }))
            }))}
            demolishOption={{
              ...sector1AData.demolishOption,
              onClick: () => handleDemolishClick(sector1AData.title)
            }}
          />
          
          <SectorSection
            title={sector1BData.title}
            measures={sector1BData.measures.map(measure => ({
              ...measure,
              options: measure.options.map(option => ({
                ...option,
                onClick: () => handleMeasureClick(measure.title, option.title)
              }))
            }))}
            demolishOption={{
              ...sector1BData.demolishOption,
              onClick: () => handleDemolishClick(sector1BData.title)
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SectorControl;