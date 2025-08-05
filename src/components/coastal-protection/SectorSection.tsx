import React from 'react';
import CoastalProtectionMeasure from './CoastalProtectionMeasure';
import MeasureOption from './MeasureOption';
import styles from './styles.module.css';

interface SectorSectionProps {
  title: string;
  measures: Array<{
    type: 'land-reclamation' | 'seawall' | 'mangroves';
    title: string;
    subtitle?: string;
    options: Array<{
      title: string;
      coinCount: number;
      onClick?: () => void;
    }>;
  }>;
  demolishOption?: {
    coinCount: number;
    onClick?: () => void;
  };
}

const SectorSection: React.FC<SectorSectionProps> = ({ 
  title, 
  measures, 
  demolishOption 
}) => {
  return (
    <div className="flex flex-col items-center gap-[16px]">
      <div className={`${styles.novecentoBold} text-[36.8px] font-bold leading-[29.44px] text-center text-white`}>
        {title}
      </div>
      
      <div className="flex flex-col justify-center items-center gap-[24.99px]">
        {measures.map((measure, index) => (
          <CoastalProtectionMeasure
            key={index}
            title={measure.title}
            subtitle={measure.subtitle}
            icon={measure.type}
            options={measure.options}
          />
        ))}
        
        {demolishOption && (
          <div className="flex items-center gap-[12px]">
            <button
              onClick={demolishOption.onClick}
              className={`${styles.demolishButton} flex flex-col justify-center items-center gap-[12.66px] p-[50.63px] w-[135px] h-[135px] rounded-[200px]`}
            >
              <div className={`${styles.novecentoBold} text-[20.3px] font-bold leading-[16.24px] text-white`}>
                Demolish
              </div>
            </button>
            
            <MeasureOption
              title=""
              coinCount={demolishOption.coinCount}
              onClick={demolishOption.onClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectorSection;