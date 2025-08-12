import React, { useState } from 'react';
import LeaderboardOverlay from '../components/LeaderboardOverlay';
import LeaderboardModal from '../games/pub-coastal-game/compontents/LeaderboardModal';

type LeaderboardType = 'overlay' | 'modal';

export default function LeaderboardDemo() {
  const [currentLeaderboard, setCurrentLeaderboard] = useState<LeaderboardType | null>(null);

  const handleClose = () => {
    setCurrentLeaderboard(null);
  };

  // Sample leaderboard data
  const sampleLeaderboardData = [
    { name: "JUMANS", points: 9100 },
    { name: "SODAPOP", points: 9000 },
    { name: "GHIBLULAT", points: 8600 },
    { name: "FIZZLEOUT", points: 8600 },
    { name: "BANGAN", points: 500 },
  ];

  const sampleTopWinner = {
    name: "TEAMWIN",
    points: 9900,
  };

  // Show the selected leaderboard
  if (currentLeaderboard === 'overlay') {
    return (
      <LeaderboardOverlay
        isOpen={true}
        onClose={handleClose}
      />
    );
  }

  if (currentLeaderboard === 'modal') {
    return (
      <LeaderboardModal isOpen={true} />
    );
  }

  // Demo selection screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center mb-8">
        <h1 className="text-white text-5xl font-bold mb-4">Leaderboard Demo</h1>
        <p className="text-white/80 text-xl">Different leaderboard component styles</p>
      </div>
      
      {/* Demo Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Leaderboard Overlay */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Leaderboard Overlay</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🏆 <strong>Full Screen Overlay</strong></p>
            <p className="text-sm">Large, responsive design</p>
            <p className="text-sm">Top winner section</p>
            <p className="text-sm">Team list with points</p>
            <p className="text-sm">Close button included</p>
          </div>
          <button
            onClick={() => setCurrentLeaderboard('overlay')}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Leaderboard Overlay
          </button>
        </div>

        {/* Leaderboard Modal */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Leaderboard Modal</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🏆 <strong>Compact Modal</strong></p>
            <p className="text-sm">Smaller, focused design</p>
            <p className="text-sm">Top winner highlight</p>
            <p className="text-sm">Compact team list</p>
            <p className="text-sm">Fixed size modal</p>
          </div>
          <button
            onClick={() => setCurrentLeaderboard('modal')}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Leaderboard Modal
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Leaderboard Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div>
            <h4 className="font-bold text-white mb-2">Leaderboard Overlay:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Full screen overlay design</li>
              <li>• Responsive layout for all screens</li>
              <li>• Prominent top winner section</li>
              <li>• Detailed team rankings</li>
              <li>• Close button functionality</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Leaderboard Modal:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Compact modal design</li>
              <li>• Fixed size for consistency</li>
              <li>• Highlighted top performer</li>
              <li>• Clean, focused interface</li>
              <li>• Perfect for overlays</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sample Data Display */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-6xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Sample Leaderboard Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-white font-bold mb-3">Top Winner:</h4>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-white/90"><strong>Name:</strong> TEAMWIN</p>
              <p className="text-white/90"><strong>Points:</strong> 9,900</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Team Rankings:</h4>
            <div className="bg-white/10 p-4 rounded-lg space-y-2">
              {sampleLeaderboardData.map((team, index) => (
                <div key={team.name} className="flex justify-between text-white/90">
                  <span>{index + 1}. {team.name}</span>
                  <span>{team.points.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentLeaderboard('overlay')}
          className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
        >
          🏆 Leaderboard Overlay
        </button>
        <button
          onClick={() => setCurrentLeaderboard('modal')}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          🏆 Leaderboard Modal
        </button>
      </div>

      {/* Code Example */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Usage Example</h3>
        <pre className="text-white/90 text-sm overflow-x-auto">
{`import LeaderboardOverlay from './components/LeaderboardOverlay';
import LeaderboardModal from './games/pub-coastal-game/compontents/LeaderboardModal';

// Leaderboard Overlay
<LeaderboardOverlay
  isOpen={true}
  onClose={() => setShowLeaderboard(false)}
  leaderboardData={[
    { name: "JUMANS", points: 9100 },
    { name: "SODAPOP", points: 9000 },
    // ... more teams
  ]}
  topWinner={{
    name: "TEAMWIN",
    points: 9900
  }}
/>

// Leaderboard Modal
<LeaderboardModal isOpen={true} />`}
        </pre>
      </div>

      {/* Comparison Table */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-6xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Leaderboard Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-white/90">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-3">Feature</th>
                <th className="text-center p-3">Leaderboard Overlay</th>
                <th className="text-center p-3">Leaderboard Modal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="p-3 font-bold">Size</td>
                <td className="p-3 text-center">Full screen responsive</td>
                <td className="p-3 text-center">Fixed compact size</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3 font-bold">Layout</td>
                <td className="p-3 text-center">Large, detailed sections</td>
                <td className="p-3 text-center">Compact, focused</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3 font-bold">Close Button</td>
                <td className="p-3 text-center">Optional close function</td>
                <td className="p-3 text-center">No close button</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3 font-bold">Use Case</td>
                <td className="p-3 text-center">Main leaderboard display</td>
                <td className="p-3 text-center">Game overlay</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Customization</td>
                <td className="p-3 text-center">Highly customizable</td>
                <td className="p-3 text-center">Fixed design</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation to Other Demos */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Other Screen Demos</h3>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/round-screens-demo"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Main Round Screens
          </a>
          <a
            href="/player-round-screens-demo"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Player Round Screens
          </a>
          <a
            href="/ending-screens-demo"
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Main Ending Screens
          </a>
          <a
            href="/player-ending-screens-demo"
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Player Ending Screens
          </a>
        </div>
      </div>
    </div>
  );
} 