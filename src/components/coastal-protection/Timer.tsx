import React, { useState, useEffect } from 'react';
import Hint from './Hint';
import styles from './styles.module.css';

interface TimerProps {
  initialSeconds?: number;
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds = 30, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  // Reset timer when initialSeconds changes
  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

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
  }, [onTimeUp, initialSeconds]);

  const progressPercentage = (seconds / initialSeconds) * 100;
  const isAlmostUp = seconds <= 10 && seconds > 0;

  return (
    <div className="flex flex-row items-center gap-8 w-full">
      {/* Left: column with white box (clock+bar) and hint below */}
      <div className="flex flex-col justify-center" style={{ minWidth: 600, maxWidth: 700 }}>
        {/* White box: clock + bar */}
        <div className="flex flex-row items-center w-full rounded-[16px] bg-white px-4 py-2 mb-2">
          {/* Clock icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 34 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
          >
            <circle cx="16.7614" cy="17.5001" r="14.6122" stroke="black" strokeWidth="3.96262" />
            <rect x="14.5332" y="9.32715" width="3.96262" height="9.41121" fill="black" />
            <rect x="22.458" y="16.7571" width="3.96262" height="7.92523" transform="rotate(90 22.458 16.7571)" fill="black" />
          </svg>
          {/* Progress bar */}
          <div className="relative flex-1 h-[20px] rounded-[10px] overflow-hidden bg-white">
            <div
              className="absolute left-0 top-0 h-full transition-all duration-1000 ease-linear bg-[#002CFF]"
              style={{
                width: `${progressPercentage}%`,
                borderRadius: '10px',
              }}
            />
          </div>
        </div>
        {/* Hint below, outside the white box */}
        <div className="text-left mt-2">
          <Hint text="HINT: DEMOLISH BEFORE YOU CAN BUILD A NEW COASTAL PROTECTION MEASURE" />
        </div>
      </div>
      {/* Timer value */}
      <div className={`flex items-baseline ml-4 ${isAlmostUp ? styles.timerWiggle : ''}`}>
        <div
          className={`${styles.novecentoBold} text-[120px] font-bold leading-[1] text-white uppercase w-[150px] text-center`}
        >
          {seconds}
        </div>
        <div
          className={`${styles.novecentoBold} text-[42.75px] font-bold leading-[1] text-white uppercase ml-2`}
        >
          s
        </div>
      </div>
    </div>
  );
};

export default Timer;