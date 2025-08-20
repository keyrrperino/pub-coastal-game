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
  clockStyle
}) => {
  // Log for ROUND_GAMEPLAY phase
  useEffect(() => {
    if (duration === 30 && isRunning) {
      console.log('🎮 [PROGRESSBAR] ROUND_GAMEPLAY ProgressBar rendered:', {
        duration,
        isRunning,
        syncWithTimestamp,
        syncTimeStr: syncWithTimestamp ? new Date(syncWithTimestamp).toISOString() : 'none',
        currentTimeStr: new Date().toISOString(),
        deviceName: navigator.userAgent.includes('iPad') ? 'iPad' : 
                   navigator.userAgent.includes('Android') ? 'Android' : 'PC'
      });
    }
  }, [duration, isRunning, syncWithTimestamp]);

  const {
    progressPercentage,
  } = useTimerBar({
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
        className={
          clsx(
            containerClassName,
            "flex items-center h-[1vw] rounded-xl bg-white shadow-md",
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
          style={{...{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: '#fff',
            width: '1.5vw',
            height: '1.5vw',
            border: '0.2vw solid #060606',
            marginRight: '1vw',
          }, ...(clockStyle ?? {})}}
        >
          {/* Simple clock SVG */}
          <svg width="18" height="20" viewBox="0 0 20 20">
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