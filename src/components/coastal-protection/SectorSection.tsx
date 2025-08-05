import React from 'react';
import CoastalProtectionMeasure from './CoastalProtectionMeasure';
import MeasureOption from './MeasureOption';
import CoinIndicator from './CoinIndicator';
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
    <div className="flex flex-col items-center gap-4 w-full">
      <div className={`${styles.novecentoBold} text-[36.8px] font-bold leading-[29.44px] text-center text-white uppercase`}>
        {title}
      </div>
      <div className="flex flex-row items-start justify-center gap-[48px] w-full mt-4 mb-[32px]">
        {/* Demolish button and coin below */}
        {demolishOption && (
          <div className="flex flex-col items-center gap-4 min-w-[135px]">
            <button
              onClick={demolishOption.onClick}
              className={`${styles.demolishButton} flex flex-col justify-center items-center w-[135px] h-[135px] rounded-full border-8 border-cyan-300`}
            >
              <div className={`${styles.novecentoBold} text-[20.3px] font-bold leading-[16.24px] text-white uppercase`}>
                DEMOLISH
              </div>
            </button>
            <CoinIndicator count={demolishOption.coinCount} />
          </div>
        )}
        {/* Measure cards */}
        <div className="flex flex-row items-start gap-[40px] w-full justify-center">
          {measures.map((measure, index) => (
            <CoastalProtectionMeasure
              key={index}
              title={measure.title}
              subtitle={measure.subtitle}
              icon={measure.type}
              options={measure.options}
              isActive={index === 0} // Only the first measure is active for now
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorSection;