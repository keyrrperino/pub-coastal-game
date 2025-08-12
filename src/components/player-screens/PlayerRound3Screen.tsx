import React from 'react';
import Image from 'next/image';

interface PlayerRound3ScreenProps {
  onContinue?: () => void;
  timeRemaining?: number;
}

export default function PlayerRound3Screen({ onContinue, timeRemaining }: PlayerRound3ScreenProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/start-screen-bg.png"
          alt="Coastal background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center gap-10 max-w-4xl w-full">
          {/* Round Title and Year */}
          <div className="flex flex-col items-center">
            <h1 className="text-white text-7xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
              ROUND 3
            </h1>
            <h2 className="text-white text-5xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_2px_2px_rgba(148,107,199,1)]">
              YEAR 2075-2100
            </h2>
          </div>
          
          {/* Game Info Card */}
          <div className="max-w-4xl w-full mx-8">
            <div className="bg-[rgba(175,240,255,0.3)] backdrop-blur-[22px] border-2 border-gradient-to-br from-[#91E2FF] to-white rounded-[26px] px-8 py-4 shadow-[0_6px_30px_rgba(0,0,0,0.15)]">
              <p className="text-white text-2xl text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                30 seconds, 10 coins, "built to x sea level rise"
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="">
            {timeRemaining !== undefined ? (
              <h3 className="text-white text-7xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
                {Math.ceil(timeRemaining) === 0 ? 'GO!' : Math.ceil(timeRemaining)}
              </h3>
            ) : (
              <h3 className="text-white text-7xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
                3, 2, 1, GO!
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 