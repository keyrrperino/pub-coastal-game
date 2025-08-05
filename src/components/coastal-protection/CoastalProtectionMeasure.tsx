import React from 'react';
import MeasureOption from './MeasureOption';
import styles from './styles.module.css';

interface CoastalProtectionMeasureProps {
  title: string;
  subtitle?: string;
  icon: 'land-reclamation' | 'seawall' | 'mangroves';
  options: Array<{
    title: string;
    coinCount: number;
    onClick?: () => void;
  }>;
}

const CoastalProtectionMeasure: React.FC<CoastalProtectionMeasureProps> = ({
  title,
  subtitle,
  icon,
  options
}) => {
  const getIconSrc = () => {
    switch (icon) {
      case 'land-reclamation':
        return '/assets/land-reclamation-icon-6b707d.png';
      case 'seawall':
        return '/assets/seawall-icon-41fadd.png';
      case 'mangroves':
        return '/assets/mangroves-icon-3a15a8.png';
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
      default:
        return '#FFFFFF';
    }
  };

  return (
    <div className={`${styles.coastalProtectionCard} flex flex-col justify-center items-center gap-5 p-5 w-full`}>
      <div className="flex items-center gap-[14.13px]">
        <div 
          className="flex justify-center items-center w-[36.95px] h-[36.95px] rounded-[274.64px]"
          style={{ backgroundColor: getIconBgColor() }}
        >
          <img 
            src={getIconSrc()} 
            alt={title}
            className="w-[43.73px] h-[43.73px] object-cover"
            style={{ 
              marginLeft: '-3.08px', 
              marginTop: '-3.08px' 
            }}
          />
        </div>
        
        <div className="flex flex-col justify-center gap-1">
          <div className={`${styles.novecentoBold} text-[22.07px] font-bold leading-[17.66px] text-white`}>
            {title}
          </div>
          {subtitle && (
            <div className={`${styles.novecentoBold} text-[12px] font-bold leading-[9.6px] text-white`}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col justify-center gap-[16.05px] w-full">
        {options.map((option, index) => (
          <MeasureOption
            key={index}
            title={option.title}
            coinCount={option.coinCount}
            onClick={option.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CoastalProtectionMeasure;