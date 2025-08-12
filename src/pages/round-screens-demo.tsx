import React, { useState } from 'react';
import Round1Screen from '../components/Round1Screen';
import Round2Screen from '../components/Round2Screen';
import Round3Screen from '../components/Round3Screen';

type RoundScreenType = 'round1' | 'round2' | 'round3';

export default function RoundScreensDemo() {
  const [currentScreen, setCurrentScreen] = useState<RoundScreenType | null>(null);

  const handleContinue = () => {
    setCurrentScreen(null);
    console.log('Round continued...');
  };

  // Show the selected round screen
  if (currentScreen === 'round1') {
    return <Round1Screen onContinue={handleContinue} />;
  }

  if (currentScreen === 'round2') {
    return <Round2Screen onContinue={handleContinue} />;
  }

  if (currentScreen === 'round3') {
    return <Round3Screen onContinue={handleContinue} />;
  }

  // Demo selection screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center mb-8">
        <h1 className="text-white text-5xl font-bold mb-4">Round Screens Demo</h1>
        <p className="text-white/80 text-xl">Main game round introduction screens</p>
      </div>
      
      {/* Demo Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Round 1 */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Round 1</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🌊 <strong>Year 2025-2050</strong></p>
            <p className="text-sm">First line of defense</p>
            <p className="text-sm">Deploy initial protection measures</p>
            <p className="text-sm">Complex layout with description card</p>
          </div>
          <button
            onClick={() => setCurrentScreen('round1')}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Round 1
          </button>
        </div>

        {/* Round 2 */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Round 2</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🌊 <strong>Year 2050-2075</strong></p>
            <p className="text-sm">Second phase of protection</p>
            <p className="text-sm">Enhanced coastal defenses</p>
            <p className="text-sm">Complex layout with description card</p>
          </div>
          <button
            onClick={() => setCurrentScreen('round2')}
            className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Round 2
          </button>
        </div>

        {/* Round 3 */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Round 3</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🌊 <strong>Year 2075-2100</strong></p>
            <p className="text-sm">Final phase of protection</p>
            <p className="text-sm">Ultimate coastal defense</p>
            <p className="text-sm">Complex layout with description card</p>
          </div>
          <button
            onClick={() => setCurrentScreen('round3')}
            className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Round 3
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Round Screens Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div>
            <h4 className="font-bold text-white mb-2">Design Elements:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Coastal background with dark overlay</li>
              <li>• Large round title and year range</li>
              <li>• Detailed description card with gradient border</li>
              <li>• "3, 2, 1, GO!" continue button</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Navigation:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Click any round button to view full screen</li>
              <li>• Use "3, 2, 1, GO!" to return to demo</li>
              <li>• Each round has unique content and styling</li>
              <li>• Responsive design for all screen sizes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentScreen('round1')}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          🌊 Round 1
        </button>
        <button
          onClick={() => setCurrentScreen('round2')}
          className="px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-colors"
        >
          🌊 Round 2
        </button>
        <button
          onClick={() => setCurrentScreen('round3')}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
        >
          🌊 Round 3
        </button>
      </div>

      {/* Code Example */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Usage Example</h3>
        <pre className="text-white/90 text-sm overflow-x-auto">
{`import Round1Screen from './components/Round1Screen';
import Round2Screen from './components/Round2Screen';
import Round3Screen from './components/Round3Screen';

// Round 1
<Round1Screen onContinue={() => console.log('Round 1 started')} />

// Round 2
<Round2Screen onContinue={() => console.log('Round 2 started')} />

// Round 3
<Round3Screen onContinue={() => console.log('Round 3 started')} />`}
        </pre>
      </div>

      {/* Navigation to Other Demos */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Other Screen Demos</h3>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/player-round-screens-demo"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Player Round Screens
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