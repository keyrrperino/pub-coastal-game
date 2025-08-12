import React, { useState } from 'react';
import EndingScreen, { EndingType } from '../components/EndingScreen';

export default function EndingScreensDemo() {
  const [currentScreen, setCurrentScreen] = useState<EndingType | null>(null);

  const handleRestart = () => {
    setCurrentScreen(null);
    console.log('Restarting game...');
  };

  const handleMainMenu = () => {
    setCurrentScreen(null);
    console.log('Going to main menu...');
  };

  // Show the selected ending screen
  if (currentScreen) {
    const scores = {
      success: 9500,
      moderate: 7500,
      failure: 3500
    };

    return (
      null
    );
  }

  // Demo selection screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center mb-8">
        <h1 className="text-white text-5xl font-bold mb-4">Unified Ending Screen Demo</h1>
        <p className="text-white/80 text-xl">Choose an ending screen to view</p>
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
            <p className="text-sm">Green theme with positive messaging</p>
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
            <p className="text-sm">Yellow theme with encouraging messaging</p>
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
            <p className="text-sm">Red theme with encouraging retry messaging</p>
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
        <h3 className="text-white text-2xl font-bold mb-4 text-center">How to Use</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div>
            <h4 className="font-bold text-white mb-2">Unified Component:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Single component handles all three ending types</li>
              <li>• Pass <code>endingType</code> prop to switch themes</li>
              <li>• Consistent layout and styling across all endings</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Responsive design for all screen sizes</li>
              <li>• Gradient borders using ::after pseudo-elements</li>
              <li>• Glassmorphism effects and shadows</li>
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
{`import EndingScreen, { EndingType } from './components/EndingScreen';

// Success ending
<EndingScreen 
  endingType="success"
  finalScore={9500}
  onRestart={() => console.log('Restart')}
  onMainMenu={() => console.log('Main Menu')}
/>

// Moderate ending
<EndingScreen 
  endingType="moderate"
  finalScore={7500}
  onRestart={() => console.log('Restart')}
  onMainMenu={() => console.log('Main Menu')}
/>

// Failure ending
<EndingScreen 
  endingType="failure"
  finalScore={3500}
  onRestart={() => console.log('Restart')}
  onMainMenu={() => console.log('Main Menu')}
/>`}
        </pre>
      </div>
    </div>
  );
} 