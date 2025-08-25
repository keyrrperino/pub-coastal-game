import { useTimer } from '@/components/hooks/useTimer';
import { useTimerBar } from '@/components/hooks/useTimerBar';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp?: () => void;
  isRunning?: boolean;
  syncWithTimestamp?: number;
  hintText?: string;
  showHint?: boolean;
  containerClassName?: string;
  style?: React.CSSProperties; // <-- added
  clockStyle?: React.CSSProperties;
}

const ProgressBar: React.FC<TimerProps> = ({
  duration,
  onTimeUp,
  isRunning = true,
  syncWithTimestamp,
  containerClassName,
  style,
  clockStyle,
}) => {
  // Log for ROUND_GAMEPLAY phase
  useEffect(() => {
    if (duration === 30 && isRunning) {
      console.log(
        '🎮 [PROGRESSBAR] ROUND_GAMEPLAY ProgressBar rendered:',
        {
          duration,
          isRunning,
          syncWithTimestamp,
          syncTimeStr: syncWithTimestamp
            ? new Date(syncWithTimestamp).toISOString()
            : 'none',
          currentTimeStr: new Date().toISOString(),
          deviceName: navigator.userAgent.includes('iPad')
            ? 'iPad'
            : navigator.userAgent.includes('Android')
              ? 'Android'
              : 'PC',
        },
      );
    }
  }, [duration, isRunning, syncWithTimestamp]);

  const { progressPercentage } = useTimerBar({
    duration,
    onTimeUp,
    startImmediately: isRunning,
    syncWithTimestamp,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in after a short delay (e.g., 10ms)
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={clsx(
          containerClassName,
          'flex items-center h-[1vw] rounded-xl bg-white shadow-md',
        )}
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s cubic-bezier(0.4,0,0.2,1)',
          ...style,
        }}
      >
        {/* Clock Icon */}
        <div className="flex-shrink-0 mr-4">
          <svg
            width="74"
            height="74"
            viewBox="0 0 34 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16.7614"
              cy="17.5001"
              r="14.6122"
              stroke="black"
              strokeWidth="3.96262"
            />
            <rect
              x="14.5332"
              y="9.32715"
              width="3.96262"
              height="9.41121"
              fill="black"
            />
            <rect
              x="22.458"
              y="16.7571"
              width="3.96262"
              height="7.92523"
              transform="rotate(90 22.458 16.7571)"
              fill="black"
            />
          </svg>
        </div>
        {/* Progress Bar Track */}
        <div
          className="relative flex-1 h-[1vw] bg-white border-0"
          style={{
            overflow: 'hidden',
          }}
        >
          {/* Progress Fill */}
          <div
            className="absolute left-0 top-0 h-full transition-all duration-1000 ease-linear bg-[#002CFF]"
            style={{
              width: `${progressPercentage}%`,
              borderRadius: '10px',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProgressBar;

