import React from "react";


const getRandomRays = (count = 12) => {
  const rays = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const innerRadius = 22 + Math.random() * 3; // start a bit outside the sun
    const outerRadius = innerRadius + 8 + Math.random() * 8; // random length
    const x1 = 60 + Math.cos(angle) * innerRadius;
    const y1 = 38 + Math.sin(angle) * innerRadius;
    const x2 = 60 + Math.cos(angle) * outerRadius;
    const y2 = 38 + Math.sin(angle) * outerRadius;
    rays.push({ x1, y1, x2, y2, key: i });
  }
  return rays;
};

const rays = getRandomRays(5);

function CoastalLoadingSVG() {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="coastal-bounce"
      >
        {/* Sun Rays */}
        {rays.map(ray => (
          <line
            key={ray.key}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            stroke="#FFD700"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        {/* Sun */}
        <circle cx="60" cy="38" r="18" fill="#FFD700" />
        {/* Waves */}
        <path
          d="M10 90 Q 30 80 50 90 T 90 90 Q 110 100 120 90"
          stroke="#00BFFF"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M20 100 Q 40 110 60 100 T 100 100"
          stroke="#1E90FF"
          strokeWidth="3"
          fill="none"
        />
        {/* Sand */}
        <ellipse
          cx="60"
          cy="110"
          rx="50"
          ry="10"
          fill="#FFE4B5"
          opacity="0.8"
        />
      </svg>
      <span className="text-[white] text-[5vw] mt-4 font-semibold text-lg">Preparing...</span>
    </div>
  );
}

type ModalProps = {
  isOpen: boolean;
};

const LoadingModal: React.FC<ModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.7)]">
      <div className="rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        {/*  here svg coastal bouncing */}
        {CoastalLoadingSVG()}
      </div>
    </div>
  );
};

export default LoadingModal;