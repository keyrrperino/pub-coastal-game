import React from 'react';
import CoinIndicator from './CoinIndicator';
import styles from './styles.module.css';
import { ActionStatus } from '@/lib/types';

interface MeasureOptionProps {
  title: string;
  coinCount: number;
  onClick?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
  status?: ActionStatus; // New prop to handle different action states
}

const MeasureOption: React.FC<MeasureOptionProps> = ({ 
  title, 
  coinCount, 
  onClick,
  isSelected = false,
  disabled = false,
  status
}) => {
  const getButtonStyle = () => {
    // Use status if provided, otherwise fall back to legacy props
    if (status) {
      switch (status) {
        case ActionStatus.COMPLETED:
          return {
            background: 'radial-gradient(circle at 10.5% 16.4%, #FFD700 0%, #FFA500 100%)',
            boxShadow: '0px 5.91px 29.56px 0px rgba(255, 215, 0, 0.4), 0px 0px 20px 0px rgba(255, 215, 0, 0.6)',
            borderRadius: '63.28px',
            border: '3px solid #FFD700'
          };
        case ActionStatus.REPLACED:
          return {
            background: 'radial-gradient(circle at 10.5% 16.4%, #DAA520 0%, #CD853F 100%)',
            boxShadow: '0px 5.91px 29.56px 0px rgba(218, 165, 32, 0.3)',
            borderRadius: '63.28px',
            border: '2px solid #CD853F',
            opacity: 0.8
          };
        case ActionStatus.SELECTABLE:
          return {
            background: 'radial-gradient(circle at 10.5% 16.4%, #B6FFF3 0%, #14F4CF 100%)',
            boxShadow: '0px 5.91px 29.56px 0px rgba(0, 0, 0, 0.15)',
            borderRadius: '63.28px'
          };
        case ActionStatus.LOCKED_CONFLICT:
          return {
            background: 'radial-gradient(circle at 10.5% 16.4%, #FF6B6B 0%, #CC5555 100%)',
            boxShadow: '0px 5.91px 29.56px 0px rgba(0, 0, 0, 0.15)',
            borderRadius: '63.28px',
            opacity: 0.6
          };
        case ActionStatus.LOCKED_PREREQUISITE:
          return {
            background: 'radial-gradient(circle at 10.5% 16.4%, #888888 0%, #666666 100%)',
            boxShadow: '0px 5.91px 29.56px 0px rgba(0, 0, 0, 0.15)',
            borderRadius: '63.28px',
            opacity: 0.5
          };
      }
    }
    
    // Legacy styling for backward compatibility
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
    // Use status if provided, otherwise fall back to legacy props
    if (status) {
      switch (status) {
        case ActionStatus.COMPLETED:
          return '#000000';
        case ActionStatus.REPLACED:
          return '#654321';
        case ActionStatus.SELECTABLE:
          return '#202020';
        case ActionStatus.LOCKED_CONFLICT:
          return '#FFFFFF';
        case ActionStatus.LOCKED_PREREQUISITE:
          return '#CCCCCC';
      }
    }
    
    // Legacy styling for backward compatibility
    if (isSelected) return '#000000';
    if (disabled) return '#CCCCCC';
    return '#202020';
  };

  const isButtonDisabled = () => {
    if (status) {
      return status === ActionStatus.LOCKED_CONFLICT || status === ActionStatus.LOCKED_PREREQUISITE || status === ActionStatus.REPLACED;
    }
    return disabled;
  };

  const buttonDisabled = isButtonDisabled();
  const shouldShowAnimation = status ? status === ActionStatus.SELECTABLE : (!disabled && !isSelected);
  const shouldPulse = status ? status === ActionStatus.COMPLETED : isSelected;

  return (
    <div className={`flex flex-col items-center gap-[6px] ${shouldShowAnimation ? 'floatAnimation' : ''}`} style={{gap: '6px'}}>
      <button
        onClick={buttonDisabled ? undefined : onClick}
        disabled={buttonDisabled}
        className={`${styles.measureOptionButton} flex flex-col justify-center items-center gap-[12.66px] px-[25.31px] w-[76px] h-[76px] rounded-[63.28px] ${shouldPulse ? 'pulseAnimation' : ''}`}
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
    </div>
  );
};

export default MeasureOption;