import React from 'react';
import MeasureOption from './MeasureOption';
import styles from './styles.module.css';

interface CoastalProtectionMeasureProps {
  title: string;
  subtitle?: string;
  icon: 'land-reclamation' | 'seawall' | 'mangroves' | 'storm-surge-barrier' | 'artificial-reef' | 'hybrid-measure' | 'revetment';
  options: Array<{
    title: string;
    coinCount: number;
    onClick?: () => void;
    isSelected?: boolean;
    disabled?: boolean;
  }>;
  isActive?: boolean;
  hasNoMoreAvailableUpgrades?: boolean;
}

const CoastalProtectionMeasure: React.FC<CoastalProtectionMeasureProps> = ({
  title,
  subtitle,
  icon,
  options,
  isActive = true,
  hasNoMoreAvailableUpgrades = false
}) => {
  const getIconSrc = () => {
    switch (icon) {
      case 'land-reclamation':
        return '/assets/land-reclamation-icon-6b707d.png';
      case 'seawall':
        return '/assets/seawall-icon-41fadd.png';
      case 'mangroves':
        return '/assets/mangroves-icon-3a15a8.png';
      case 'storm-surge-barrier':
        return '/assets/storm-surge-barrier-icon.png';
      case 'artificial-reef':
        return '/assets/artificial-reef-icon.png';
      case 'hybrid-measure':
        return '/assets/hybrid-measure-icon.png';
      case 'revetment':
        return '/assets/seawall-icon-41fadd.png'; // Using seawall icon as fallback
      default:
        return '';
    }
  };

  const getIconBgColor = () => {
    switch (icon) {
      case 'land-reclamation':
        return '#8CFFEC';
      case 'seawall':
        return '#8CFFEC'; // Using same color as land reclamation based on Figma
      case 'mangroves':
        return '#BFFFBE';
      case 'storm-surge-barrier':
        return '#8CFFEC'; // Matches Figma design
      case 'artificial-reef':
        return '#BFFFBE'; // Matches Figma design
      case 'hybrid-measure':
        return '#8CFFEC'; // Matches Figma design
      case 'revetment':
        return '#B0C4DE'; // Light steel blue for revetment
      default:
        return '#FFFFFF';
    }
  };

  return (
    <div
      className={`${styles.coastalProtectionCard} flex flex-col justify-center items-center gap-[15px] xl:gap-[20px] py-[15px] xl:py-[20px] px-[20px] xl:px-[30px] w-auto min-h-[160px] xl:min-h-[194px]`}
      style={{
        opacity: isActive ? 1 : 0.4,
        pointerEvents: isActive ? 'auto' : 'none',
        filter: isActive ? 'none' : 'grayscale(0.7)',
        transition: 'opacity 0.3s, filter 0.3s'
      }}
    >
      <div className="flex items-center gap-[10px] xl:gap-[14.13px] w-full">
        <div 
          className="flex justify-center items-center w-[30px] h-[30px] xl:w-[36.95px] xl:h-[36.95px] rounded-full overflow-hidden"
          style={{ backgroundColor: getIconBgColor() }}
        >
          <img 
            src={getIconSrc()} 
            alt={title}
            className="w-[35px] h-[35px] xl:w-[43.73px] xl:h-[43.73px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-0.5 xl:gap-1">
          <div className={`${styles.novecentoBold} text-[18px] xl:text-[22.07px] font-bold leading-[14px] xl:leading-[17.66px] text-white uppercase`} style={{lineHeight: '0.8em'}}>
            {title}
          </div>
          {subtitle && (
            <div className={`${styles.novecentoBold} text-[10px] xl:text-[12px] font-bold leading-[8px] xl:leading-[9.6px] text-white uppercase`} style={{lineHeight: '0.8em'}}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-center gap-[12px] xl:gap-[16.05px] w-full mt-1.5 xl:mt-2">
        {hasNoMoreAvailableUpgrades ? (
          <div className="flex flex-col items-center gap-[6px]" style={{gap: '6px'}}>
            <div className="flex flex-col justify-center items-center w-[76px] h-[76px]">
              <div className={`${styles.novecentoBold} text-[14px] font-bold leading-[14px] text-white uppercase text-center`}>
                NO MORE<br/>AVAILABLE<br/>UPGRADES
              </div>
            </div>
            <div style={{height: '20px'}}></div> {/* Match CoinIndicator height */}
          </div>
        ) : (
          options.map((option, index) => (
            <MeasureOption
              key={index}
              title={option.title}
              coinCount={option.coinCount}
              onClick={option.onClick}
              isSelected={option.isSelected}
              disabled={option.disabled}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CoastalProtectionMeasure;