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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Main Container - match Figma dimensions */}
      <div className="relative w-[656px] h-[817px]">
        {/* Background container */}
        <div className="absolute inset-0 w-full h-full">
          {/* Blue background rounded rectangle */}
          <div className="absolute top-[32px] left-[28px] w-[628px] h-[785px] bg-[#8491C6] rounded-[24px]" />
          
          {/* Header section (white) */}
          <div className="absolute top-0 left-0 w-[636px] h-[145px] bg-white rounded-t-[24px] flex items-center justify-center">
            <h2 className="text-[#202020] text-[48px] font-bold text-center leading-[1.2] tracking-wide" 
                style={{ fontFamily: 'novecento-sans-narrow, sans-serif', fontWeight: 700 }}>
              LEADERBOARD
            </h2>
          </div>

          {/* Top winner section (blue) */}
          <div className="absolute top-[145px] left-0 w-[636px] h-[239px] bg-[#2A81FA] flex flex-col items-center justify-center px-[84px] py-[34px]">
            <div className="flex items-stretch justify-between w-full mb-2">
              <span className="text-white text-[44.95px] font-bold leading-[1.2]" 
                    style={{ fontFamily: 'novecento-sans-narrow, sans-serif', fontWeight: 700 }}>
                TOP 1
              </span>
              <span className="text-white text-[44.95px] font-bold leading-[1.2] number-enhanced" 
                    style={{ fontFamily: 'novecento-sans-narrow, sans-serif', fontWeight: 700 }}>
                {leaderboardData.topWinner?.points || 0} pts
              </span>
            </div>
            <div className="text-white text-[96.74px] font-bold text-center leading-[1.2] tracking-wide" 
                 style={{ fontFamily: 'novecento-sans-narrow, sans-serif', fontWeight: 700 }}>
              {leaderboardData.topWinner?.name || 'N/A'}
            </div>
          </div>

          {/* Regular leaderboard section (white) - extends to bottom without yellow section */}
          <div className="absolute top-[384px] left-0 w-[636px] h-[413px] bg-white rounded-b-[24px] px-[57px] py-[26px]">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-[18px]">
              <span className="text-[#2A81FA] text-[24px] font-bold leading-[1.2]" 
                    style={{ fontFamily: 'novecento-sans-condensed, sans-serif', fontWeight: 700 }}>
                Team name
              </span>
              <div className="flex-1 mx-[9px] border-b border-dotted border-[#2A81FA]" style={{ borderWidth: '1.84px' }} />
              <span className="text-[#2A81FA] text-[24px] font-bold leading-[1.2] text-right" 
                    style={{ fontFamily: 'novecento-sans-condensed, sans-serif', fontWeight: 700 }}>
                Total points
              </span>
            </div>

            {/* Leaderboard entries - show top 5 teams (positions 2-6 if no top winner, or 2-5 + more) */}
            <div className="space-y-[18px] overflow-y-auto max-h-[320px]">
              {leaderboardData.top5.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <span className="text-[#202020] text-[34.28px] font-bold leading-[1.2]" 
                        style={{ fontFamily: 'novecento-sans-condensed, sans-serif', fontWeight: 700 }}>
                    {index + 2}. {entry.name}
                  </span>
                  <div className="flex-1 mx-[10px] border-b border-dotted border-[#2A81FA]" style={{ borderWidth: '1.84px' }} />
                  <span className="text-[#202020] text-[34.28px] font-bold leading-[1.2] text-right number-enhanced" 
                        style={{ fontFamily: 'novecento-sans-narrow, sans-serif', fontWeight: 700 }}>
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