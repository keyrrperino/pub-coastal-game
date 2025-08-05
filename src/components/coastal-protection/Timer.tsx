import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface TimerProps {
  initialSeconds?: number;
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds = 30, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const progressPercentage = (seconds / initialSeconds) * 100;

  return (
    <div className="flex items-center gap-6">
      <div 
        className="relative w-[621.14px] h-[53px] rounded-[11.89px] overflow-hidden"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Progress bar background */}
        <div 
          className="absolute h-[20.8px] rounded-[10.4px]"
          style={{ 
            left: '68.85px', 
            top: '15.85px',
            width: '532.48px',
            backgroundColor: '#002CFF'
          }}
        />
        
        {/* Progress bar fill */}
        <div 
          className="absolute h-[20.8px] rounded-[10.4px] transition-all duration-1000 ease-linear"
          style={{ 
            left: '68.85px', 
            top: '15.85px',
            width: `${(532.48 * progressPercentage) / 100}px`,
            backgroundColor: '#000000'
          }}
        />
        
        {/* Circle indicator */}
        <div 
          className="absolute w-[33.19px] h-[33.19px] rounded-full border-[3.96px] border-black transition-all duration-1000 ease-linear"
          style={{ 
            left: `${20.31 + (532.48 * progressPercentage) / 100 - 16.595}px`, 
            top: '9.91px'
          }}
        />
        
        {/* Pause lines */}
        <div 
          className="absolute w-[3.96px] h-[9.41px] bg-black transition-all duration-1000 ease-linear"
          style={{ 
            left: `${34.67 + (532.48 * progressPercentage) / 100 - 16.595}px`, 
            top: '18.33px'
          }}
        />
        <div 
          className="absolute w-[7.93px] h-[3.96px] bg-black transition-all duration-1000 ease-linear"
          style={{ 
            left: `${34.67 + (532.48 * progressPercentage) / 100 - 16.595}px`, 
            top: '25.76px'
          }}
        />
      </div>
      
      <div className="flex items-baseline">
        <div className={`${styles.novecentoBold} text-[157.81px] font-bold leading-[126.25px] text-white uppercase`}
             style={{ width: '199px', height: '119px' }}>
          {seconds}
        </div>
        <div className={`${styles.novecentoBold} text-[42.75px] font-bold leading-[34.2px] text-white uppercase`}>
          s
        </div>
      </div>
    </div>
  );
};

export default Timer;