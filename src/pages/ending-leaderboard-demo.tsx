import React, { useState } from 'react';
import EndingLeaderboardOverlay from '../components/EndingLeaderboardOverlay';

export default function EndingLeaderboardDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-8">
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow"
      >
        Show Ending Leaderboard
      </button>

      <EndingLeaderboardOverlay isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}