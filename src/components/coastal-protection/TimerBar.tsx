import React, { useState, useEffect } from 'react';

interface TimerBarProps {
  duration: number;
  onTimeUp?: () => void;
  isRunning?: boolean;
}

const TimerBar: React.FC<TimerBarProps> = ({ 
  duration = 15,
  onTimeUp,
  isRunning = true,
}) => {
  const [progressPercentage, setProgressPercentage] = useState(100);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    // Set start time when component mounts or isRunning becomes true
    setStartTime(Date.now());
    setProgressPercentage(100);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning || !startTime) return;

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000; // in seconds
      const remaining = Math.max(0, duration - elapsed);
      const percentage = (remaining / duration) * 100;
      
      setProgressPercentage(Math.max(0, Math.min(100, percentage)));
      
      if (remaining <= 0) {
        onTimeUp?.();
      }
    };

    // Update immediately
    updateProgress();

    // Update every 100ms for smoother animation
    const interval = setInterval(updateProgress, 100);

    return () => clearInterval(interval);
  }, [isRunning, startTime, duration, onTimeUp]);

  return (
    <div className="flex flex-row items-center w-[621px] h-[53px] rounded-[12px] bg-white px-5 py-3 shadow-sm">
      {/* Clock icon - larger */}
      <div className="flex-shrink-0 mr-4">
        <svg
          width="33"
          height="33"
          viewBox="0 0 34 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16.7614" cy="17.5001" r="14.6122" stroke="black" strokeWidth="3.96262" />
          <rect x="14.5332" y="9.32715" width="3.96262" height="9.41121" fill="black" />
          <rect x="22.458" y="16.7571" width="3.96262" height="7.92523" transform="rotate(90 22.458 16.7571)" fill="black" />
        </svg>
      </div>
      
      {/* Progress bar container - much larger */}
      <div className="relative flex-1 h-[21px] rounded-[10px] overflow-hidden bg-gray-200">
        <div
          className="absolute left-0 top-0 h-full transition-all duration-1000 ease-linear bg-[#002CFF] rounded-[10px]"
          style={{
            width: `${Math.max(0, Math.min(100, progressPercentage))}%`,
          }}
        />
      </div>
    </div>
  );
};

export default TimerBar;