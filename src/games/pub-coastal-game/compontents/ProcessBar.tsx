import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number;
  containerClassName?: string;
  round: number;
  countdownProgressTimer?: number;
  hasTextCountdown?: boolean;
  topToBottomAnimation?: boolean;
  style?: React.CSSProperties; // <-- added
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  containerClassName,
  round,
  hasTextCountdown,
  countdownProgressTimer,
  style // <-- added
}) => {

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
            className="absolute left-0 top-0 h-full bg-[#342eff]"
            style={{
              width: `${progress * 100}%`,
              transition: 'width 0.1s linear',
              opacity: 0.9,
            }}
          />
        </div>
        {hasTextCountdown &&
          <span
            style={{
              marginLeft: '1vw',
              fontWeight: 700,
              fontSize: '1.2vw',
              color: '#060606',
              minWidth: '2vw',
              textAlign: 'right',
            }}
          >
            {((countdownProgressTimer ?? 0) <= 1 ? 1 : countdownProgressTimer)}s
          </span>}
      </div>
    </>
  );
};

export default ProgressBar;