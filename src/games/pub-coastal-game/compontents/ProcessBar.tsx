import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  progress: number;
  containerClassName?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, containerClassName }) => {

  return (
    <div
      className={
        clsx("flex items-center w-[40vw] h-[1vw] rounded-xl bg-white shadow-md px-[1vw] py-[1.4vw]", containerClassName)
      }
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
          {/* <circle cx="10" cy="10" r="8" stroke="black" strokeWidth="2" fill="none" /> */}
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
    </div>
  );
};

export default ProgressBar;