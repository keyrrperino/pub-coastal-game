import React, { useState } from 'react';
import PlayerEndingScreen, { PlayerEndingType } from '../components/PlayerEndingScreen';

export default function PlayerEndingScreensDemo() {
  const [currentScreen, setCurrentScreen] = useState<PlayerEndingType | null>(null);

  // Show the selected ending screen
  if (currentScreen) {
    const scores = {
      success: 9500,
      moderate: 7500,
      failure: 3500
    };

    return (
      <PlayerEndingScreen
        endingType={currentScreen}
        finalScore={scores[currentScreen]}
      />
    );
  }

  // Demo selection screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center mb-8">
        <h1 className="text-white text-5xl font-bold mb-4">Player Ending Screens Demo</h1>
        <p className="text-white/80 text-xl">Simple ending screens for player displays</p>
      </div>
      
      {/* Demo Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Success Ending */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Success Ending</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🎉 <strong>Congratulations!</strong></p>
            <p className="text-sm">Perfect defense of Singapore's shores</p>
            <p className="text-sm">Score: 9,500</p>
            <p className="text-sm">Simple, clean player display</p>
          </div>
          <button
            onClick={() => setCurrentScreen('success')}
            className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Success Ending
          </button>
        </div>

        {/* Moderate Ending */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Moderate Ending</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">😐 <strong>Well done!</strong></p>
            <p className="text-sm">Good progress protecting coasts</p>
            <p className="text-sm">Score: 7,500</p>
            <p className="text-sm">Simple, clean player display</p>
          </div>
          <button
            onClick={() => setCurrentScreen('moderate')}
            className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Moderate Ending
          </button>
        </div>

        {/* Failure Ending */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Failure Ending</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">😞 <strong>Oh no</strong></p>
            <p className="text-sm">Floods breached defenses</p>
            <p className="text-sm">Score: 3,500</p>
            <p className="text-sm">Simple, clean player display</p>
          </div>
          <button
            onClick={() => setCurrentScreen('failure')}
            className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Failure Ending
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Player Ending Screens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div>
            <h4 className="font-bold text-white mb-2">Simple Design:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Clean, minimal layout for player displays</li>
              <li>• Title, subtitle, and final score only</li>
              <li>• No action buttons or complex UI</li>
              <li>• Perfect for iPad/tablet screens</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Responsive design for all screen sizes</li>
              <li>• Beautiful coastal background image</li>
              <li>• Text shadows for readability</li>
              <li>• Customizable final scores</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentScreen('success')}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
          🎉 Success
        </button>
        <button
          onClick={() => setCurrentScreen('moderate')}
          className="px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-colors"
        >
          😐 Moderate
        </button>
        <button
          onClick={() => setCurrentScreen('failure')}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
        >
          😞 Failure
        </button>
      </div>

      {/* Code Example */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Usage Example</h3>
        <pre className="text-white/90 text-sm overflow-x-auto">
{`import PlayerEndingScreen, { PlayerEndingType } from './components/PlayerEndingScreen';

// Success ending
<PlayerEndingScreen 
  endingType="success"
  finalScore={9500}
/>

// Moderate ending
<PlayerEndingScreen 
  endingType="moderate"
  finalScore={7500}
/>

// Failure ending
<PlayerEndingScreen 
  endingType="failure"
  finalScore={3500}
/>`}
        </pre>
      </div>

      {/* Navigation to Main Ending Screens */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Other Ending Screens</h3>
        <div className="flex gap-4 justify-center">
          <a
            href="/ending-screens-demo"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Main Ending Screens
          </a>
          <a
            href="/modal-demo"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Modal Components
          </a>
        </div>
      </div>
    </div>
  );
} 