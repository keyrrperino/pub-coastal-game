import { useTimer } from '@/components/hooks/useTimer';
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
}

const ProgressBar: React.FC<TimerProps> = ({ 
  duration,
  onTimeUp,
  isRunning = true,
  syncWithTimestamp,
  containerClassName,
  style,
}) => {
  const {
    progressPercentage,
  } = useTimer({
    duration,
    onTimeUp,
    startImmediately: isRunning,
    syncWithTimestamp,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in after a short delay (e.g., 10ms)
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={
          clsx(
            "flex items-center w-[40vw] h-[1vw] rounded-xl bg-white shadow-md px-[1vw] py-[1.4vw]",
            containerClassName
          )
        }
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s cubic-bezier(0.4,0,0.2,1)',
          ...style,
        }}
      >
        {/* Clock Icon */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2vw',
            height: '2vw',
            borderRadius: '50%',
            background: '#fff',
            border: '0.3vw solid #060606',
            marginRight: '1vw',
          }}
        >
          {/* Simple clock SVG */}
          <svg width="20" height="20" viewBox="0 0 20 20">
            <rect x="8" y="5" width="3" height="6" fill="#565660" />
            <rect x="8" y="10" width="5" height="3" fill="#565660" transform="rotate(0 0 0)" />
          </svg>
        </span>
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