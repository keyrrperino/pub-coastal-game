import React from 'react';

interface LeaderboardEntry {
  name: string;
  points: number;
}

interface EndingLeaderboardOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  leaderboardData?: LeaderboardEntry[];
  topWinner?: {
    name: string;
    points: number;
  };
  bottomHighlight?: LeaderboardEntry | null;
}

// Figma data (463:8091)
const figmaTopWinner = { name: 'PUB', points: 2500 };
const figmaLeaderboard: LeaderboardEntry[] = [
  { name: 'KEN', points: 2400 },
  { name: 'MZH', points: 2400 },
  { name: 'TOM', points: 2400 },
  { name: 'KIR', points: 2300 },
];
const figmaBottomHighlight: LeaderboardEntry = { name: 'RfF', points: 500 };

export default function EndingLeaderboardOverlay({
  isOpen,
  onClose,
  leaderboardData = figmaLeaderboard,
  topWinner = figmaTopWinner,
  bottomHighlight = figmaBottomHighlight,
}: EndingLeaderboardOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Main Container - match original overlay size */}
      <div className="relative w-[90vw] max-w-[700px] h-[90vh] max-h-[800px] scale-90">
        {/* Background block behind white sections */}
        <div className="absolute top-[32px] left-[28px] w-full h-full bg-[#8491C6] rounded-[24px]" />

        {/* Foreground card */}
        <div className="absolute inset-0 flex flex-col">
          {/* Header (white) */}
          <div className="flex-1 bg-white rounded-t-[24px] flex items-center justify-center px-12 py-6">
            <h2 className="text-[#202020] text-[clamp(24px,4vw,48px)] font-bold text-center leading-[1.2] tracking-wide font-condensed">
              LEADERBOARD
            </h2>
          </div>

          {/* Top winner (blue) */}
          <div className="bg-[#2A81FA] text-white px-12 py-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[clamp(24px,4vw,44.95px)] font-bold leading-[1.2] font-condensed">TOP 1</span>
              <span className="text-[clamp(24px,4vw,44.95px)] font-bold leading-[1.2] font-condensed">{topWinner.points} pts</span>
            </div>
            <div className="text-[clamp(48px,9vw,96.74px)] font-bold text-white text-center leading-[1.2] tracking-wide font-condensed">
              {topWinner.name}
            </div>
          </div>

          {/* Leaderboard list (white) */}
          <div className="flex-1 bg-white px-12 py-10">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[#2A81FA] text-[clamp(16px,2.5vw,24px)] font-bold leading-[1.2] font-condensed">
                Team name
              </span>
              <div className="flex-1 mx-3 border-b border-dotted border-[#2A81FA] border-[1.84px]" />
              <span className="text-[#2A81FA] text-[clamp(16px,2.5vw,24px)] font-bold leading-[1.2] text-right font-condensed">
                Total points
              </span>
            </div>

            {/* Entries */}
            <div className="space-y-6">
              {leaderboardData.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <span className="text-[#202020] text-[clamp(20px,3.5vw,34.28px)] font-bold leading-[1.2] font-condensed">
                    {entry.name}
                  </span>
                  <div className="flex-1 mx-3 border-b border-dotted border-[#2A81FA] border-[1.84px]" />
                  <span className="text-[#202020] text-[clamp(20px,3.5vw,34.28px)] font-bold leading-[1.2] text-right font-condensed">
                    {entry.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom yellow bar highlight with trailing dots */}
          {bottomHighlight && (
            <div className="bg-[#FFE169] rounded-b-[24px] px-12 py-6">
              <div className="flex items-center justify-between">
                <span className="text-[#202020] text-[clamp(20px,3.5vw,34.28px)] font-bold leading-[1.2] font-condensed">
                  {bottomHighlight.name}
                </span>
                <div className="flex-1 mx-3 border-b border-dotted border-[#2A81FA] border-[1.84px]" />
                <span className="text-[#202020] text-[clamp(20px,3.5vw,34.28px)] font-bold leading-[1.2] text-right font-condensed">
                  {bottomHighlight.points}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Optional close */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-bold transition-colors"
            aria-label="Close leaderboard"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}