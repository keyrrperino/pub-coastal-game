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
        
        {/* Fixed clock icon (SVG) */}
        <svg
          width="33.19"
          height="33.19"
          viewBox="0 0 34 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            left: '20.31px',
            top: '9.91px',
            pointerEvents: 'none',
          }}
        >
          <circle cx="16.7614" cy="17.5001" r="14.6122" stroke="black" strokeWidth="3.96262" />
          <rect x="14.5332" y="9.32715" width="3.96262" height="9.41121" fill="black" />
          <rect x="22.458" y="16.7571" width="3.96262" height="7.92523" transform="rotate(90 22.458 16.7571)" fill="black" />
        </svg>
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