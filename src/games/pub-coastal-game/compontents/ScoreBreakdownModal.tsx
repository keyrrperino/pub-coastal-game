import React from "react";

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
}: {
  isOpen: boolean;
  breakdown: any; // from getRoundBreakdownByPlayer
  roundNumber: 1 | 2 | 3;
}) {
  if (!isOpen || !breakdown) return null;

  const color = roundColorMap[roundNumber];
  const prevRoundPoints =
    roundNumber === 1
      ? breakdown.totalPoints
      : roundNumber === 2
      ? breakdown.roundPoints
      : roundNumber === 3
      ? breakdown.roundPoints
      : 0;

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
            {Object.entries(playerLabels).map(([playerKey, label]) => (
              <div key={playerKey} className="mb-2">
                <div className="flex justify-between items-center text-white font-bold text-lg">
                  <span>{label} ACTIONS</span>
                  <span
                    className={
                      breakdown.playerBreakdown[playerKey].actionsScore < 0
                        ? "text-red-400"
                        : "text-white"
                    }
                  >
                    {breakdown.playerBreakdown[playerKey].actionsScore > 0
                      ? `+${breakdown.playerBreakdown[playerKey].actionsScore}`
                      : breakdown.playerBreakdown[playerKey].actionsScore}
                  </span>
                </div>
                <div className="flex justify-between items-center text-white font-bold text-lg">
                  <span>{label} MONEY SPENT</span>
                  <div className="flex">
                    {Array.from({
                      length: breakdown.playerBreakdown[playerKey].coinsSpent,
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
            ))}
          </div>
          {/* Footer */}
          <div className={`px-6 py-6 text-center`}>
            <div
              className={`text-2xl font-extrabold ${color.text} tracking-wide`}
            >
              ROUND {roundNumber} POINTS
            </div>
            <div className="text-5xl font-extrabold text-[#222] tracking-wide">
              {breakdown.roundPoints.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}