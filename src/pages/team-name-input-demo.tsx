import React, { useState } from 'react';
import TeamNameInputScreen, { EndingScenario } from '../components/TeamNameInputScreen';

export default function TeamNameInputDemo() {
  const [currentScenario, setCurrentScenario] = useState<EndingScenario | null>(null);

  const handleSubmit = (teamName: string) => {
    console.log('Team name submitted:', teamName);
    alert(`Team name "${teamName}" submitted successfully for ${currentScenario} scenario!`);
    setCurrentScenario(null);
  };

  // Show the selected scenario
  if (currentScenario) {
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
        <h1 className="text-white text-5xl font-bold mb-4">Ending Screens Demo</h1>
        <p className="text-white/80 text-xl">Choose a scenario to view the team name input screen after game completion</p>
      </div>
      
      {/* Demo Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Success Scenario */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Success Scenario</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🎉 <strong>Congratulations!</strong></p>
            <p className="text-sm">Perfect defense of Singapore's shores</p>
            <p className="text-sm">Score: 9,500</p>
            <p className="text-sm">Green theme with positive messaging</p>
          </div>
          <button
            onClick={() => setCurrentScenario('success')}
            className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Success Screen
          </button>
        </div>

        {/* Moderate Scenario */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Moderate Scenario</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">😐 <strong>Well done!</strong></p>
            <p className="text-sm">Good progress protecting coasts</p>
            <p className="text-sm">Score: 7,500</p>
            <p className="text-sm">Yellow theme with encouraging messaging</p>
          </div>
          <button
            onClick={() => setCurrentScenario('moderate')}
            className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Moderate Screen
          </button>
        </div>

        {/* Failure Scenario */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Failure Scenario</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">😞 <strong>Oh no</strong></p>
            <p className="text-sm">Floods breached defenses</p>
            <p className="text-sm">Score: 3,500</p>
            <p className="text-sm">Red theme with encouraging retry messaging</p>
          </div>
          <button
            onClick={() => setCurrentScenario('failure')}
            className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View Failure Screen
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">How to Use</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div>
            <h4 className="font-bold text-white mb-2">Reusable Component:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Single component handles all three scenarios</li>
              <li>• Pass <code>endingScenario</code> prop to switch themes</li>
              <li>• Consistent layout and input functionality</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Three-letter team name input with OTP-style interface</li>
              <li>• Different colors and messaging for each scenario</li>
              <li>• Responsive design for all screen sizes</li>
              <li>• Gradient borders and glassmorphism effects</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Usage Example</h3>
        <pre className="text-white/90 text-sm overflow-x-auto">
{`import TeamNameInputScreen, { EndingScenario } from './components/TeamNameInputScreen';

// Success scenario
<TeamNameInputScreen 
  endingScenario="success"
  finalScore={9500}
  onSubmit={(teamName) => console.log('Team name:', teamName)}
/>

// Moderate scenario
<TeamNameInputScreen 
  endingScenario="moderate"
  finalScore={7500}
  onSubmit={(teamName) => console.log('Team name:', teamName)}
/>

// Failure scenario
<TeamNameInputScreen 
  endingScenario="failure"
  finalScore={3500}
  onSubmit={(teamName) => console.log('Team name:', teamName)}
/>`}
        </pre>
      </div>

      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-2xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Other Demos</h3>
        <div className="flex gap-4 justify-center">
          <a
            href="/player-screens-demo"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Player Screens Demo
          </a>
          <a
            href="/input-team-name-demo"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Original Demo
          </a>
        </div>
      </div>
    </div>
  );
} 