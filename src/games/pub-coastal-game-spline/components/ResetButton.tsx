import React from 'react';

const ResetButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children = 'RESET SCENE', ...props }) => (
  <button
    {...props}
    className="relative flex items-center justify-center w-[380px] h-[70px] rounded-full bg-[#8EC3E6] p-2 shadow-md group cursor-pointer border-none outline-none"
    style={{ border: 'none' }}
  >
    <span className="absolute inset-0 m-2 rounded-full bg-[#FFB6A6] opacity-90" style={{ backgroundImage: 'repeating-linear-gradient(135deg, #FFB6A6 0 10px, #FFD6C1 10px 20px)' }} />
    <span className="relative z-10 font-extrabold text-[32px] text-[#2A2992] tracking-wide" style={{ letterSpacing: 1 }}>
      {children}
    </span>
  </button>
);

export default ResetButton; 