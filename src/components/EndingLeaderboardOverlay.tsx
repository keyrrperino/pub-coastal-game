import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React from 'react';

interface LeaderboardDisplayEntry {
  name: string;
  points: number;
  position?: number;
}

interface EndingLeaderboardOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  leaderboardData?: LeaderboardDisplayEntry[];
  topWinner?: {
    name: string;
    points: number;
  } | null;
  bottomHighlight?: {
    name: string;
    points: number;
    position: number;
  } | null;
}

// Figma data (463:8094)
const figmaTopWinner = { name: 'PUB', points: 2500 };
const figmaLeaderboard: LeaderboardDisplayEntry[] = [
  { name: 'KEN', points: 2400, position: 2 },
  { name: 'MZH', points: 2400, position: 3 },
  { name: 'TOM', points: 2400, position: 4 },
  { name: 'KIR', points: 2300, position: 5 },
];
const figmaBottomHighlight = {
  name: 'RfF',
  points: 500,
  position: 15,
};

export default function EndingLeaderboardOverlay({
  isOpen,
  onClose,
  leaderboardData = figmaLeaderboard,
  topWinner = figmaTopWinner,
  bottomHighlight = figmaBottomHighlight,
}: EndingLeaderboardOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Main Container - match Figma dimensions */}
      <div className="relative w-[1256px] h-[1570px]">
        {/* Background container */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full z-20 drop-shadow-[40px_40px_0_#8491C6]">
            {/* Header section (white) */}
            <div className="w-full h-[290px] bg-white rounded-t-[48px] flex items-center justify-center">
              <h2
                className="text-[#202020] text-[6vh] font-bold text-center leading-[1.2] tracking-wide"
                style={{
                  fontFamily: 'novecento-sans-narrow, sans-serif',
                  fontWeight: 700,
                }}
              >
                LEADERBOARD
              </h2>
            </div>

            {/* Top winner section (blue) */}
            <div className="w-full h-[478px] bg-[#2A81FA] flex flex-col items-center justify-center px-[84px] py-[34px]">
              <div className="flex items-stretch justify-between w-full mb-2">
                <span
                  className="text-white text-[90px] font-bold leading-[1.2]"
                  style={{
                    fontFamily: 'novecento-sans-narrow, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  TOP 1
                </span>
                <span
                  className="text-white font-bold leading-[1.2] text-[90px]"
                  style={{
                    fontFamily: 'novecento-sans-narrow, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {topWinner?.points || 0} pts
                </span>
              </div>
              <div
                className="text-white text-[10vh] font-bold text-center leading-[1.2] tracking-wide"
                style={{
                  fontFamily: 'novecento-sans-narrow, sans-serif',
                  fontWeight: 700,
                }}
              >
                {topWinner?.name || 'N/A'}
              </div>
            </div>

            {/* Regular leaderboard section (white) */}
            <div
              className={cn(
                'w-full bg-white px-[114px] py-[26px]',
                bottomHighlight ? 'h-[632px]' : 'h-[826px]',
              )}
            >
              {/* Header Row */}
              <div className="flex items-center justify-between mb-[18px]">
                <motion.span
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="text-[#2A81FA] text-5xl font-bold leading-[1.2]"
                  style={{
                    fontFamily:
                      'novecento-sans-condensed, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  Team name
                </motion.span>
                <motion.div
                  className="flex-1 mx-4 border-b-[3.7px] border-dashed border-[#2A81FA]"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
                <motion.span
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="text-[#2A81FA] text-5xl font-bold leading-[1.2] text-right"
                  style={{
                    fontFamily:
                      'novecento-sans-condensed, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  Total points
                </motion.span>
              </div>

              {/* Leaderboard entries */}
              <div className="space-y-[18px]">
                {leaderboardData.map((entry, index) => {
                  // Calculate position based on bottomHighlight position
                  const basePosition =
                    bottomHighlight && bottomHighlight.position <= 5
                      ? bottomHighlight.position + 1
                      : 2;
                  const displayPosition = basePosition + index;

                  return (
                    <div
                      key={entry.name}
                      className="flex items-center justify-between"
                    >
                      <motion.span
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 * index,
                          ease: 'easeInOut',
                        }}
                        className="text-[#202020] text-7xl font-bold leading-[1.2]"
                        style={{
                          fontFamily:
                            'novecento-sans-condensed, sans-serif',
                          fontWeight: 700,
                        }}
                      >
                        {displayPosition}. {entry.name}
                      </motion.span>
                      <motion.div
                        className="flex-1 mx-4 border-b-[3.7px] border-dashed border-[#2A81FA]"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 * index,
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.span
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 * index,
                          ease: 'easeInOut',
                        }}
                        className="text-[#202020] text-7xl font-bold leading-[1.2] text-right"
                        style={{
                          fontFamily:
                            'novecento-sans-narrow, sans-serif',
                          fontWeight: 700,
                        }}
                      >
                        {entry.points}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Bottom highlight section (yellow) - current team */}
            {bottomHighlight && (
              <div className="w-full h-[194px] bg-[#FFE169] rounded-b-[48px] px-[114px] flex items-center">
                <motion.span
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="text-[#202020] text-7xl font-bold leading-[1.2]"
                  style={{
                    fontFamily:
                      'novecento-sans-condensed, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {bottomHighlight.position}. {bottomHighlight.name}
                </motion.span>
                <motion.div
                  className="flex-1 mx-4 border-b-[3.7px] border-dashed border-[#2A81FA]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.4, ease: 'easeIn' }}
                />
                <motion.span
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="text-[#202020] text-7xl font-bold leading-[1.2] text-right"
                  style={{
                    fontFamily: 'novecento-sans-narrow, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {bottomHighlight.points}
                </motion.span>
              </div>
            )}
          </div>
        </div>

        {/* Optional close */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-bold transition-colors z-10"
            aria-label="Close leaderboard"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

