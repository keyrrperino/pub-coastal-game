import React from 'react';
import CoinIndicator from './CoinIndicator';
import styles from './styles.module.css';

interface MeasureOptionProps {
  title: string;
  coinCount: number;
  onClick?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
}

const MeasureOption: React.FC<MeasureOptionProps> = ({ 
  title, 
  coinCount, 
  onClick,
  isSelected = false,
  disabled = false
}) => {
  const getButtonStyle = () => {
    if (isSelected) {
      return {
        background: 'radial-gradient(circle at 10.5% 16.4%, #FFD700 0%, #FFA500 100%)',
        boxShadow: '0px 5.91px 29.56px 0px rgba(255, 215, 0, 0.4), 0px 0px 20px 0px rgba(255, 215, 0, 0.6)',
        borderRadius: '63.28px',
        border: '3px solid #FFD700'
      };
    }
    if (disabled) {
      return {
        background: 'radial-gradient(circle at 10.5% 16.4%, #888888 0%, #666666 100%)',
        boxShadow: '0px 5.91px 29.56px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '63.28px',
        opacity: 0.5
      };
    }
    return {
      background: 'radial-gradient(circle at 10.5% 16.4%, #B6FFF3 0%, #14F4CF 100%)',
      boxShadow: '0px 5.91px 29.56px 0px rgba(0, 0, 0, 0.15)',
      borderRadius: '63.28px'
    };
  };

  const getTextColor = () => {
    if (isSelected) return '#000000';
    if (disabled) return '#CCCCCC';
    return '#202020';
  };

  return (
    <div className={`flex flex-col items-center gap-[6px] ${!disabled && !isSelected ? 'floatAnimation' : ''}`} style={{gap: '6px'}}>
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`${styles.measureOptionButton} flex flex-col justify-center items-center gap-[12.66px] px-[25.31px] w-[76px] h-[76px] rounded-[63.28px] ${isSelected ? 'pulseAnimation' : ''}`}
        style={getButtonStyle()}
      >
        <div className={`text-center text-[14px] font-bold leading-[14px] ${styles.novecentoBold} uppercase`} 
             style={{ color: getTextColor(), lineHeight: '1em' }}>
          {title.split(' ').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </button>
      
      <CoinIndicator count={coinCount} direction="row" />
      
      {isSelected && (
        <div className={`${styles.novecentoBold} text-[12px] font-bold text-yellow-400 uppercase`}>
          SELECTED
        </div>
      )}
    </div>
  );
};

export default MeasureOption;