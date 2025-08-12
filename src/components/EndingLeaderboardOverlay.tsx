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
const figmaBottomHighlight = { name: 'RfF', points: 500, position: 15 };

export default function EndingLeaderboardOverlay({
  isOpen,
  onClose,
  leaderboardData = figmaLeaderboard,
  topWinner = figmaTopWinner,
  bottomHighlight = figmaBottomHighlight,
}: EndingLeaderboardOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.7)]">
      {/* Main Container - match Figma dimensions */}
      <div className="relative w-[656px] h-[817px]">
        {/* Background container */}
        <div className="absolute inset-0 w-full h-full">
          {/* Blue background rounded rectangle */}
          
          {/* Header section (white) */}
          <div className="absolute top-0 left-0 w-[636px] h-[145px] bg-white rounded-t-[24px] flex items-center justify-center">
            <h2 className="text-[#202020] text-[48px] font-bold text-center leading-[1.2] tracking-wide" 
                style={{ fontFamily: 'Novecento Bold, sans-serif' }}>
              LEADERBOARD
            </h2>
          </div>

          {/* Top winner section (blue) */}
          <div className="absolute top-[145px] left-0 w-[636px] h-[239px] bg-[#2A81FA] flex flex-col items-center justify-center px-[84px] py-[34px]">
            <div className="flex items-stretch justify-between w-full mb-2">
              <span className="text-white text-[44.95px] font-bold leading-[1.2]" 
                    style={{ fontFamily: 'Novecento Bold, sans-serif' }}>
                TOP 1
              </span>
              <span className="text-white text-[44.95px] font-bold leading-[1.2]" 
                    style={{ fontFamily: 'Novecento Bold, sans-serif' }}>
                {topWinner?.points || 0} pts
              </span>
            </div>
            <div className="text-white text-[96.74px] font-bold text-center leading-[1.2] tracking-wide" 
                 style={{ fontFamily: 'Novecento Bold, sans-serif' }}>
              {topWinner?.name || 'N/A'}
            </div>
          </div>

          {/* Regular leaderboard section (white) */}
          <div className="absolute top-[384px] left-0 w-[636px] bg-white px-[57px] py-[26px]">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-[18px]">
              <span className="text-[#2A81FA] text-[24px] font-bold leading-[1.2]" 
                    style={{ fontFamily: 'Novecento Cond Bold, sans-serif' }}>
                Team name
              </span>
              <div className="flex-1 mx-[9px] border-b border-dotted border-[#2A81FA]" style={{ borderWidth: '1.84px' }} />
              <span className="text-[#2A81FA] text-[24px] font-bold leading-[1.2] text-right" 
                    style={{ fontFamily: 'Novecento Cond Bold, sans-serif' }}>
                Total points
              </span>
            </div>

            {/* Leaderboard entries */}
            <div className="space-y-[18px]">
              {leaderboardData.map((entry, index) => {
                // Calculate position based on bottomHighlight position
                const basePosition = bottomHighlight && bottomHighlight.position <= 5 
                  ? bottomHighlight.position + 1 
                  : 2;
                const displayPosition = basePosition + index;
                
                return (
                  <div key={entry.name} className="flex items-center justify-between">
                    <span className="text-[#202020] text-[34.28px] font-bold leading-[1.2]" 
                          style={{ fontFamily: 'Novecento Cond Bold, sans-serif' }}>
                      {displayPosition}. {entry.name}
                    </span>
                    <div className="flex-1 mx-[10px] border-b border-dotted border-[#2A81FA]" style={{ borderWidth: '1.84px' }} />
                    <span className="text-[#202020] text-[34.28px] font-bold leading-[1.2] text-right" 
                          style={{ fontFamily: 'Novecento Bold, sans-serif' }}>
                      {entry.points}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom highlight section (yellow) - current team */}
          {bottomHighlight && (
            <div className="absolute top-[700px] left-0 w-[636px] h-[97px] bg-[#FFE169] rounded-b-[24px] px-[57px] flex items-center">
              <div className="flex items-center justify-between w-full">
                <span className="text-[#202020] text-[34.28px] font-bold leading-[1.2]" 
                      style={{ fontFamily: 'Novecento Cond Bold, sans-serif' }}>
                  {bottomHighlight.position}. {bottomHighlight.name}
                </span>
                <div className="flex-1 mx-[10px] border-b border-dotted border-[#2A81FA]" style={{ borderWidth: '1.84px' }} />
                <span className="text-[#202020] text-[34.28px] font-bold leading-[1.2] text-right" 
                      style={{ fontFamily: 'Novecento Bold, sans-serif' }}>
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