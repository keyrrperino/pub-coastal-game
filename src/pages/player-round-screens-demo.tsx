import React, { useState } from 'react';
import PlayerRound1Screen from '../components/player-screens/PlayerRound1Screen';
import PlayerRound2Screen from '../components/player-screens/PlayerRound2Screen';
import PlayerRound3Screen from '../components/player-screens/PlayerRound3Screen';

type PlayerRoundScreenType = 'round1' | 'round2' | 'round3';

export default function PlayerRoundScreensDemo() {
  const [currentScreen, setCurrentScreen] = useState<PlayerRoundScreenType | null>(null);

  const handleContinue = () => {
    setCurrentScreen(null);
    console.log('Player round continued...');
  };

  // Show the selected player round screen
  if (currentScreen === 'round1') {
    return <PlayerRound1Screen onContinue={handleContinue} />;
  }

  if (currentScreen === 'round2') {
    return <PlayerRound2Screen onContinue={handleContinue} />;
  }

  if (currentScreen === 'round3') {
    return <PlayerRound3Screen onContinue={handleContinue} />;
  }

  // Demo selection screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center mb-8">
        <h1 className="text-white text-5xl font-bold mb-4">Player Round Screens Demo</h1>
        <p className="text-white/80 text-xl">Simplified round screens for player displays</p>
      </div>
      
      {/* Demo Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Player Round 1 */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Player Round 1</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🎮 <strong>Year 2025-2050</strong></p>
            <p className="text-sm">Simplified player display</p>
            <p className="text-sm">Game info card with time & coins</p>
            <p className="text-sm">Clean, minimal layout</p>
          </div>
          <button
            onClick={() => setCurrentScreen('round1')}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Player Round 1
          </button>
        </div>

        {/* Player Round 2 */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Player Round 2</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🎮 <strong>Year 2050-2075</strong></p>
            <p className="text-sm">Simplified player display</p>
            <p className="text-sm">Game info card with time & coins</p>
            <p className="text-sm">Clean, minimal layout</p>
          </div>
          <button
            onClick={() => setCurrentScreen('round2')}
            className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Player Round 2
          </button>
        </div>

        {/* Player Round 3 */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Player Round 3</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🎮 <strong>Year 2075-2100</strong></p>
            <p className="text-sm">Simplified player display</p>
            <p className="text-sm">Game info card with time & coins</p>
            <p className="text-sm">Clean, minimal layout</p>
          </div>
          <button
            onClick={() => setCurrentScreen('round3')}
            className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Player Round 3
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Player Round Screens Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div>
            <h4 className="font-bold text-white mb-2">Simplified Design:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Clean, minimal layout for players</li>
              <li>• Round title and year range</li>
              <li>• Game info card (time, coins, sea level)</li>
              <li>• "3, 2, 1, GO!" countdown</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Player-Focused:</h4>
            <ul className="space-y-1 text-sm">
              <li>• No complex descriptions or buttons</li>
              <li>• Essential game information only</li>
              <li>• Perfect for iPad/tablet displays</li>
              <li>• Distraction-free interface</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-6xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Main vs Player Round Screens</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-white/90">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-3">Feature</th>
                <th className="text-center p-3">Main Round Screens</th>
                <th className="text-center p-3">Player Round Screens</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="p-3 font-bold">Complexity</td>
                <td className="p-3 text-center">Complex (description cards)</td>
                <td className="p-3 text-center">Simple (minimal info)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3 font-bold">Purpose</td>
                <td className="p-3 text-center">Game introduction</td>
                <td className="p-3 text-center">Player display</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3 font-bold">Buttons</td>
                <td className="p-3 text-center">Continue button</td>
                <td className="p-3 text-center">No buttons</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3 font-bold">Layout</td>
                <td className="p-3 text-center">Detailed with borders</td>
                <td className="p-3 text-center">Clean and minimal</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Use Case</td>
                <td className="p-3 text-center">Main game interface</td>
                <td className="p-3 text-center">Player devices</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentScreen('round1')}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          🎮 Player Round 1
        </button>
        <button
          onClick={() => setCurrentScreen('round2')}
          className="px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-colors"
        >
          🎮 Player Round 2
        </button>
        <button
          onClick={() => setCurrentScreen('round3')}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
        >
          🎮 Player Round 3
        </button>
      </div>

      {/* Code Example */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Usage Example</h3>
        <pre className="text-white/90 text-sm overflow-x-auto">
{`import PlayerRound1Screen from './components/player-screens/PlayerRound1Screen';
import PlayerRound2Screen from './components/player-screens/PlayerRound2Screen';
import PlayerRound3Screen from './components/player-screens/PlayerRound3Screen';

// Player Round 1
<PlayerRound1Screen onContinue={() => console.log('Player Round 1 started')} />

// Player Round 2
<PlayerRound2Screen onContinue={() => console.log('Player Round 2 started')} />

// Player Round 3
<PlayerRound3Screen onContinue={() => console.log('Player Round 3 started')} />`}
        </pre>
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
            href="/leaderboard-demo"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Leaderboards
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