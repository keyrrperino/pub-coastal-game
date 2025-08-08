import React from 'react';
import CoastalProtectionMeasure from './CoastalProtectionMeasure';
import CoinIndicator from './CoinIndicator';
import styles from './styles.module.css';

interface SectorSectionProps {
  title: string;
  measures: Array<{
    type: 'land-reclamation' | 'seawall' | 'mangroves' | 'storm-surge-barrier' | 'artificial-reef' | 'hybrid-measure' | 'revetment';
    title: string;
    subtitle?: string;
    hasNoMoreAvailableUpgrades?: boolean;
    isActive?: boolean;
    options: Array<{
      title: string;
      coinCount: number;
      onClick?: () => void;
      isSelected?: boolean;
      disabled?: boolean;
    }>;
  }>;
  demolishOption?: {
    coinCount: number;
    onClick?: () => void;
    disabled?: boolean;
  };
}

const SectorSection: React.FC<SectorSectionProps> = ({ 
  title, 
  measures, 
  demolishOption 
}) => {
  return (
    <div className="flex flex-col items-center gap-[25px] w-full">
      <div className={`${styles.novecentoBold} text-[36.8px] font-bold leading-[29.44px] text-center text-white uppercase`}>
        {title}
      </div>
      <div className="flex flex-row items-center justify-center gap-[20px] w-full mt-4 mb-[32px]">
        {/* Demolish button and coin below */}
        {demolishOption && (
          <div className="flex flex-col items-center gap-[11px] min-w-[135px]">
            <button
              onClick={demolishOption.disabled ? undefined : demolishOption.onClick}
              disabled={demolishOption.disabled}
              className={`${styles.demolishButton} flex flex-col justify-center items-center w-[135px] h-[135px] rounded-full border-[8px] border-cyan-300 ${demolishOption.disabled ? 'opacity-50 cursor-not-allowed' : 'pulseAnimation'}`}
            >
              <div className={`${styles.novecentoBold} text-[20.3px] font-bold leading-[16.24px] text-white uppercase`}>
                DEMOLISH
              </div>
            </button>
            <CoinIndicator count={demolishOption.coinCount} direction="row" />
          </div>
        )}
        {/* Measure cards */}
        <div className="flex flex-row items-start gap-[25px] w-full justify-center">
          {measures.map((measure, index) => (
            <CoastalProtectionMeasure
              key={index}
              title={measure.title}
              subtitle={measure.subtitle}
              icon={measure.type}
              options={measure.options}
              isActive={measure.isActive ?? true}
              hasNoMoreAvailableUpgrades={measure.hasNoMoreAvailableUpgrades}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorSection;