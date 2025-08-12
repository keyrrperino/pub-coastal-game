import React, { useEffect } from "react";
import { useTimer } from '@/components/hooks/useTimer';
import { getPhaseDuration } from '@/components/hooks/phaseUtils';
import { GameLobbyStatus } from '@/lib/enums';

interface ScoreBreakdownModalProps {
  isOpen: boolean;
  breakdown: any;
  roundNumber: 1 | 2 | 3;
  syncWithTimestamp?: number;
  onDurationComplete?: () => void;
}

// Example: breakdown = getRoundBreakdownByPlayer(...)
// roundNumber: 1, 2, or 3
// color: "blue" | "yellow" | "red"
const roundColorMap = {
  1: {
    bg: "bg-[#3496ff]",
    border: "border-[#3496ff]",
    text: "text-[#3496ff]",
    shadow: "bg-blue-200",
  },
  2: {
    bg: "bg-[#ffc43a]",
    border: "border-[#ffc43a]",
    text: "text-[#ffc43a]",
    shadow: "bg-yellow-200",
  },
  3: {
    bg: "bg-[#ff3a5e]",
    border: "border-[#ff3a5e]",
    text: "text-[#ff3a5e]",
    shadow: "bg-red-200",
  },
};

const playerLabels = {
  P1: "P1",
  P2: "P2",
  P3: "P3",
};

export default function ScoreBreakdownModal({
  isOpen,
  breakdown,
  roundNumber,
  syncWithTimestamp,
  onDurationComplete,
}: ScoreBreakdownModalProps) {
  const duration = getPhaseDuration(GameLobbyStatus.ROUND_SCORE_BREAKDOWN);
  
  const { timeRemaining } = useTimer({
    duration,
    onTimeUp: onDurationComplete,
    startImmediately: isOpen,
    syncWithTimestamp,
  });

  // Fallback timer for when sync is not available
  useEffect(() => {
    if (!isOpen || syncWithTimestamp || !onDurationComplete) return;

    const timer = setTimeout(() => {
      onDurationComplete();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [isOpen, onDurationComplete, duration, syncWithTimestamp]);

  if (!isOpen || !breakdown) return null;

  const color = roundColorMap[roundNumber];
  // Dummy data - will be implemented later
  const prevRoundPoints = breakdown?.totalPoints || breakdown?.roundPoints || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.7)]">
      <div className="relative">
        {/* Shadow Layer */}
        <div
          className={`absolute top-3 left-3 w-full h-full ${color.shadow} rounded-2xl opacity-60 -z-10`}
        ></div>
        {/* Modal Card */}
        <div className="w-[370px] rounded-2xl bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="pt-7 pb-4 px-6">
            <h2 className="text-2xl font-extrabold text-center tracking-wide">
              ROUND {roundNumber} BREAKDOWN
            </h2>
          </div>
          {/* Colored Section */}
          <div className={`${color.bg} px-6 py-6 text-center`}>
            <div className="flex justify-between items-center text-white font-bold text-lg mb-2">
              <span>
                {roundNumber === 1
                  ? "TOTAL POINTS"
                  : `ROUND ${roundNumber - 1} POINTS`}
              </span>
              <span>
                {prevRoundPoints.toLocaleString()}
              </span>
            </div>
            {Object.entries(playerLabels).map(([playerKey, label]) => {
              // Dummy data - will be implemented later
              const playerData = breakdown?.playerBreakdown?.[playerKey] || {
                actionsScore: 0,
                coinsSpent: 0
              };
              
              return (
                <div key={playerKey} className="mb-2">
                  <div className="flex justify-between items-center text-white font-bold text-lg">
                    <span>{label} ACTIONS</span>
                    <span
                      className={
                        playerData.actionsScore < 0
                          ? "text-red-400"
                          : "text-white"
                      }
                    >
                      {playerData.actionsScore > 0
                        ? `+${playerData.actionsScore}`
                        : playerData.actionsScore}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white font-bold text-lg">
                    <span>{label} MONEY SPENT</span>
                    <div className="flex">
                      {Array.from({
                        length: playerData.coinsSpent,
                      }).map((_, i) => (
                        <img
                          key={'bcoin-' + i}
                          src="/games/pub-coastal-spline/images/coin.svg"
                          alt="coin"
                          className="w-[0.8vw] h-[0.8vw]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Footer */}
          <div className={`px-6 py-6 text-center`}>
            <div
              className={`text-2xl font-extrabold ${color.text} tracking-wide`}
            >
              ROUND {roundNumber} POINTS
            </div>
            <div className="text-5xl font-extrabold text-[#222] tracking-wide">
              {(breakdown?.roundPoints || 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}