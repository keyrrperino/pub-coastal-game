import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { getGlobalLeaderboard, ProcessedLeaderboardData } from '@/lib/gameRoom';

interface LeaderboardEntry {
  name: string;
  points: number;
}

interface LeaderboardOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
}

// Fallback data in case of no global data
const fallbackLeaderboardData: LeaderboardEntry[] = [
  { name: "JUMANS", points: 9100 },
  { name: "sodapop", points: 9000 },
  { name: "ghiblulat", points: 8600 },
  { name: "Fizzleout", points: 8600 },
  { name: "Bangan", points: 500 },
];

const fallbackTopWinner = {
  name: "teamwin",
  points: 9900,
};

export default function LeaderboardOverlay({
  isOpen,
  onClose,
}: LeaderboardOverlayProps) {
  const [leaderboardData, setLeaderboardData] = useState<ProcessedLeaderboardData>({
    topWinner: fallbackTopWinner,
    top5: fallbackLeaderboardData,
    currentTeamEntry: null
  });

  // Fetch leaderboard data when component opens
  useEffect(() => {
    if (isOpen) {
      const fetchLeaderboard = async () => {
        try {
          const data = await getGlobalLeaderboard();
          setLeaderboardData(data);
        } catch (error) {
          console.error('Failed to fetch leaderboard data:', error);
          // Keep fallback data if fetch fails
        }
      };
      
      fetchLeaderboard();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Main Container - match Figma dimensions */}
      <div className="relative w-[1256px] h-[1570px]">
        {/* Background container */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full z-20 drop-shadow-[20px_20px_0_#8491C6]">
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
                  {leaderboardData.topWinner?.points || 0} pts
                </span>
              </div>
              <div
                className="text-white text-[10vh] font-bold text-center leading-[1.2] tracking-wide"
                style={{
                  fontFamily: 'novecento-sans-narrow, sans-serif',
                  fontWeight: 700,
                }}
              >
                {leaderboardData.topWinner?.name || 'N/A'}
              </div>
            </div>

            {/* Regular leaderboard section (white) - extends to bottom */}
            <div className="w-full h-[826px] bg-white rounded-b-[48px] px-[114px] py-[26px]">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-[18px]">
                <motion.span
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="text-[#2A81FA] text-5xl font-bold leading-[1.2]"
                  style={{
                    fontFamily: 'novecento-sans-condensed, sans-serif',
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
                    fontFamily: 'novecento-sans-condensed, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  Total points
                </motion.span>
              </div>

              {/* Leaderboard entries - show top 5 teams */}
              <div className="space-y-[18px] overflow-y-auto overflow-x-hidden max-h-[640px]">
                {leaderboardData.top5.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between">
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
                        fontFamily: 'novecento-sans-condensed, sans-serif',
                        fontWeight: 700,
                      }}
                    >
                      {index + 2}. {entry.name}
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
                      className="text-[#202020] font-bold leading-[1.2] text-right text-7xl"
                      style={{
                        fontFamily: 'novecento-sans-narrow, sans-serif',
                        fontWeight: 700,
                      }}
                    >
                      {entry.points}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Close Button (optional) */}
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