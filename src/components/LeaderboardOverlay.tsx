import React from 'react';

interface LeaderboardEntry {
  name: string;
  points: number;
}

interface LeaderboardOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  leaderboardData?: LeaderboardEntry[];
  topWinner?: {
    name: string;
    points: number;
  };
}

const defaultLeaderboardData: LeaderboardEntry[] = [
  { name: "JUMANS", points: 9100 },
  { name: "sodapop", points: 9000 },
  { name: "ghiblulat", points: 8600 },
  { name: "Fizzleout", points: 8600 },
  { name: "Bangan", points: 500 },
];

const defaultTopWinner = {
  name: "teamwin",
  points: 9900,
};

export default function LeaderboardOverlay({
  isOpen,
  onClose,
  leaderboardData = defaultLeaderboardData,
  topWinner = defaultTopWinner,
}: LeaderboardOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Main Container - responsive and larger */}
      <div className="relative w-[90vw] max-w-[700px] h-[90vh] max-h-[800px] scale-90">
        {/* Background Container - positioned behind white sections */}
        <div className="absolute top-[32px] left-[28px] w-full h-full bg-[#8491C6] rounded-[24px]" />
        
        {/* White sections that extend to edges */}
        <div className="absolute inset-0 flex flex-col">
          {/* Header Section */}
          <div className="flex-1 bg-white rounded-t-[24px] flex items-center justify-center">
            <h1 className="text-[#202020] text-[clamp(24px,4vw,48px)] font-bold text-center leading-[1.2] tracking-wide font-condensed">
              LEADERBOARD
            </h1>
          </div>
          
          {/* Top Winner Section */}
          <div className="bg-[#2A81FA] px-8 py-6">
            <div className="flex justify-between items-center text-white mb-4">
              <span className="text-[clamp(24px,4vw,44.95px)] font-bold leading-[1.2] font-condensed">TOP 1</span>
              <span className="text-[clamp(24px,4vw,44.95px)] font-bold leading-[1.2] font-condensed">{topWinner.points} pts</span>
            </div>
            <div className="text-[clamp(48px,9vw,96.74px)] font-bold text-white text-center leading-[1.2] tracking-wide font-condensed">
              {topWinner.name}
            </div>
          </div>
          
          {/* Leaderboard List Section */}
          <div className="flex-1 bg-white rounded-b-[24px] px-12 py-10">
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
            
            {/* Leaderboard Entries */}
            <div className="space-y-6">
              {leaderboardData.map((entry, index) => (
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
        </div>
        
        {/* Close Button (optional) */}
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