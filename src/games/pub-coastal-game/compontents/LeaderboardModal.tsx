import React from "react";

const leaderboard = [
  { name: "JUMANS", points: 9100 },
  { name: "SODAPOP", points: 9000 },
  { name: "GHIBLULAT", points: 8600 },
  { name: "FIZZLEOUT", points: 8600 },
  { name: "BANGAN", points: 500 },
];

export default function LeaderboardModal({ isOpen }: {
  isOpen: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative">
        {/* Shadow Layer */}
        <div className="absolute top-3 left-3 w-full h-full bg-blue-200 rounded-2xl opacity-60 -z-10"></div>
        {/* Modal Card */}
        <div className="w-[370px] rounded-2xl bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="pt-7 pb-4 px-6">
            <h2 className="text-2xl font-extrabold text-center tracking-wide">LEADERBOARD</h2>
          </div>
          {/* Top 1 Section */}
          <div className="bg-[#3496ff] px-6 py-6 text-center">
            <div className="flex justify-between items-center text-white font-bold text-lg mb-2">
              <span>TOP 1</span>
              <span>9900 PTS</span>
            </div>
            <div className="text-5xl font-extrabold text-white tracking-wide">TEAMWIN</div>
          </div>
          {/* List Section */}
          <div className="px-6 py-6">
            <div className="flex justify-between items-center font-bold text-[#3496ff] text-sm mb-2">
              <span>TEAM NAME</span>
              <span>TOTAL POINTS</span>
            </div>
            <ol className="space-y-2">
              {leaderboard.map((team, idx) => (
                <li key={team.name} className="flex justify-between items-center text-lg font-extrabold">
                  <span className="flex items-center">
                    <span className="text-[#222] mr-2">{idx + 2}.</span>
                    <span className="text-[#222]">{team.name}</span>
                    <span className="flex-1 border-b border-dotted border-gray-300 mx-2" />
                  </span>
                  <span className="text-[#222]">{team.points}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}