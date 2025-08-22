import React, { useState, useRef } from 'react';
import Image from 'next/image';
import CreditsModal from './CreditsModal';
import { cn } from '@/lib/utils';
import Logo from './Logo';

interface StartScreenProps {
  onStartGame: () => void;
  onShowLeaderboard: () => void;
  playerNumber: number;
  isLeaderboardOpen: boolean;
}

export default function StartScreen({
  onStartGame,
  onShowLeaderboard,
  playerNumber,
  isLeaderboardOpen,
}: StartScreenProps) {
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const clickCountRef = useRef(0);
  const firstClickTimeRef = useRef<number | null>(null);

  const handleLogoClick = () => {
    const now = Date.now();

    // Reset if more than 15 seconds have passed since first click
    if (
      firstClickTimeRef.current &&
      now - firstClickTimeRef.current > 15000
    ) {
      clickCountRef.current = 0;
      firstClickTimeRef.current = null;
    }

    // Set first click time if this is the first click
    if (firstClickTimeRef.current === null) {
      firstClickTimeRef.current = now;
    }

    clickCountRef.current++;

    // Check if we've reached 10 clicks within 15 seconds
    if (
      clickCountRef.current >= 10 &&
      firstClickTimeRef.current &&
      now - firstClickTimeRef.current <= 15000
    ) {
      setIsCreditsModalOpen(true);
      // Reset the counter
      clickCountRef.current = 0;
      firstClickTimeRef.current = null;
    }
  };
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/start-screen-bg-updated.webp"
          alt="Coastal background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay with Blur */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[12px]" />

      {/* Content Container */}
      <div
        className={cn(
          'relative z-10 flex flex-col items-center justify-center h-full py-8',
          isCreditsModalOpen && 'opacity-0',
        )}
      >
        {/* Main Content Centered */}
        <div className="flex flex-col items-center gap-20">
          {/* Title Section */}
          <div className="flex flex-col items-center gap-4 max-w-[645px]">
            <h1
              className="text-white text-8xl text-center leading-[0.9] tracking-wide drop-shadow-[0_4px_4px_rgba(148,107,199,1)]"
              style={{
                fontFamily: 'novecento-sans-narrow, sans-serif',
                fontWeight: 700,
              }}
            >
              COASTAL PROTECTORS
            </h1>
            <h2
              className="text-white text-7xl text-center leading-[0.8] drop-shadow-[0_4px_4px_rgba(148,107,199,1)]"
              style={{
                fontFamily: 'novecento-sans-narrow, sans-serif',
                fontWeight: 700,
              }}
            >
              2025-2100
            </h2>
            <p
              className="text-white text-4xl text-center leading-[0.8] drop-shadow-[0_4px_4px_rgba(148,107,199,1)]"
              style={{
                fontFamily: 'novecento-sans-narrow, sans-serif',
                fontWeight: 700,
              }}
            >
              an interactive timeline game
            </p>
          </div>

          {/* Player and Buttons Section */}
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Player Indicator */}
            <div className="px-3 py-2.5">
              <span
                className="text-white text-3xl"
                style={{
                  fontFamily: 'novecento-sans-narrow, sans-serif',
                  fontWeight: 700,
                }}
              >
                ˗ˏˋ Player {playerNumber} ˎˊ˗
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-row justify-center gap-5 w-full">
              <button
                onClick={onStartGame}
                className="min-w-[450px] h-[83px] py-4 px-8 bg-[#005DFF] text-white text-2xl rounded-full hover:bg-[#0052e6] active:scale-95 transition-all duration-200 whitespace-nowrap"
                style={{
                  fontFamily: 'novecento-sans-narrow, sans-serif',
                  fontWeight: 700,
                }}
              >
                Start Game For All
              </button>

              <button
                onClick={onShowLeaderboard}
                className="min-w-[450px] h-[83px] py-4 px-8 bg-white text-[#005DFF] text-2xl rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 whitespace-nowrap"
                style={{
                  fontFamily: 'novecento-sans-narrow, sans-serif',
                  fontWeight: 700,
                }}
              >
                {isLeaderboardOpen
                  ? 'Hide Leaderboard'
                  : 'Show Leaderboard'}
              </button>
            </div>
          </div>
        </div>

        {/* PUB Logo - Fixed at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleLogoClick}
            className="focus:outline-none"
            aria-label="PUB Logo"
          >
            <Logo width={123} height={76} />
          </button>
        </div>
      </div>

      {/* Credits Modal */}
      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
      />
    </div>
  );
}

