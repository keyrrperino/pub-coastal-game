import React from 'react';
import Image from 'next/image';

interface StartScreenProps {
  onStartGame: () => void;
  onShowLeaderboard: () => void;
  playerNumber: number;
}

export default function StartScreen({
  onStartGame,
  onShowLeaderboard,
  playerNumber,
}: StartScreenProps) {
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
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-36 py-20">
        {/* Title */}
        <h1 className="text-white text-8xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_4px_4px_rgba(148,107,199,1)] max-w-[645px]">
          Coastal Protectors
        </h1>
        
        {/* Player and Buttons Section */}
        <div className="flex flex-col items-center gap-4 max-w-[406px] w-full">
          {/* Player Indicator */}
          <div className="px-3 py-2.5 bg-white/10 backdrop-blur-sm rounded-lg">
            <span className="text-white text-3xl font-bold">
              ˗ˏˋ PLAYER {playerNumber} ˎˊ˗
            </span>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col gap-5 w-full">
            <button
              onClick={onStartGame}
              className="w-full py-9 px-11 bg-[#005DFF] text-white text-3xl font-bold rounded-full hover:bg-[#0052e6] transition-colors duration-200"
            >
              START GAME
            </button>
            
            <button
              onClick={onShowLeaderboard}
              className="w-full py-9 px-11 bg-white text-[#005DFF] text-3xl font-bold rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              SHOW LEADERBOARD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
