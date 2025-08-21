import React, { useEffect } from 'react';
import { useTimer } from '@/components/hooks/useTimer';
import Hint from './Hint';
import styles from './styles.module.css';

interface TimerProps {
  duration: number;
  onTimeUp?: () => void;
  isRunning?: boolean;
  syncWithTimestamp?: number;
  hintText?: string;
  showHint?: boolean;
  currentRound?: number;
}

const Timer: React.FC<TimerProps> = ({ 
  duration,
  onTimeUp,
  isRunning = true,
  syncWithTimestamp,
  hintText = "HINT: DEMOLISH BEFORE YOU CAN BUILD A NEW COASTAL PROTECTION MEASURE",
  showHint = true,
  currentRound,
}) => {
  const {
    timeRemaining,
    progressPercentage,
    isAlmostUp,
  } = useTimer({
    duration,
    onTimeUp,
    startImmediately: isRunning,
    syncWithTimestamp,
  });

  return (
    <div className="flex flex-row items-center justify-center gap-4 xl:gap-8">
      {/* Left: column with white box (clock+bar) and hint below */}
      <div className="flex flex-col justify-start items-center" style={{ minWidth: 500, maxWidth: 700 }}>
        {/* Round indicator */}
        {currentRound && (
          <div className={`${styles.novecentoBold} text-white text-lg xl:text-xl font-bold uppercase mb-2 text-center`}>
            ROUND {currentRound}
          </div>
        )}
        {/* White box: clock + bar */}
        <div className="flex flex-row items-center w-full rounded-[12px] xl:rounded-[16px] bg-white px-3 xl:px-4 py-1.5 xl:py-2 mb-1.5 xl:mb-2">
          {/* Clock icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 34 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 xl:mr-3 xl:w-8 xl:h-8"
          >
            <circle cx="16.7614" cy="17.5001" r="14.6122" stroke="black" strokeWidth="3.96262" />
            <rect x="14.5332" y="9.32715" width="3.96262" height="9.41121" fill="black" />
            <rect x="22.458" y="16.7571" width="3.96262" height="7.92523" transform="rotate(90 22.458 16.7571)" fill="black" />
          </svg>
          {/* Progress bar */}
          <div className="relative flex-1 h-[16px] xl:h-[20px] rounded-[8px] xl:rounded-[10px] overflow-hidden bg-white">
            <div
              className="absolute left-0 top-0 h-full transition-all duration-1000 ease-linear bg-[#002CFF]"
              style={{
                width: `${progressPercentage}%`,
                borderRadius: '8px',
              }}
            />
          </div>
        </div>
        {/* Hint below, outside the white box */}
        {showHint && (
          <div className="text-center mt-3 xl:mt-4">
            <Hint text={hintText} />
          </div>
        )}
      </div>
      {/* Timer value */}
      <div className={`flex items-baseline ${isAlmostUp ? styles.timerWiggle : ''}`}>
        <div
          className={`${styles.novecentoBold} text-[80px] xl:text-[120px] font-bold leading-[1] text-white uppercase w-[100px] xl:w-[150px] text-center timer-number`}
        >
          {timeRemaining}
        </div>
        <div
          className={`${styles.novecentoBold} text-[28px] xl:text-[42.75px] font-bold leading-[1] text-white uppercase ml-1 xl:ml-2`}
        >
          s
        </div>
      </div>
    </div>
  );
};

export default Timer;