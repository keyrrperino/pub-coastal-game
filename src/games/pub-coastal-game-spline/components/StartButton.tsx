import React from 'react';

const StartButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children = 'START RAISING WATER', ...props }) => (
  <button
    {...props}
    className="relative flex items-center justify-center w-[420px] h-[70px] rounded-full bg-[#8EC3E6] p-2 shadow-md group cursor-pointer border-none outline-none"
    style={{ border: 'none' }}
  >
    <span className="absolute inset-0 m-2 rounded-full bg-[#3B2992] opacity-90" />
    <span className="relative z-10 font-extrabold text-[32px] text-white tracking-wide" style={{ letterSpacing: 1 }}>
      {children}
    </span>
  </button>
);

export default StartButton; 