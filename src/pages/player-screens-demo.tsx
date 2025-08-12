import React from 'react';

export default function PlayerScreensDemo() {

  // Demo selection screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center mb-8">
        <h1 className="text-white text-5xl font-bold mb-4">Player Screens Demo</h1>
        <p className="text-white/80 text-xl">Choose a player to view their team name screen</p>
      </div>
      
      {/* Player Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Player 1</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">🎮 <strong>Input Screen</strong></p>
            <p className="text-sm">• Has input field for team name</p>
            <p className="text-sm">• Three-letter input with dashes</p>
            <p className="text-sm">• Blue "Save" button</p>
            <p className="text-sm">• Only player who can save team name</p>
          </div>
          <a
            href="/input-screens/player-1"
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg text-center block"
          >
            View Player 1 Screen
          </a>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Player 2+</h2>
          <div className="text-white/80 mb-6">
            <p className="mb-2">📋 <strong>Informational Screen</strong></p>
            <p className="text-sm">• Shows "Choose a team name"</p>
            <p className="text-sm">• Instructions to go to Player 1</p>
            <p className="text-sm">• No input field or save button</p>
            <p className="text-sm">• Purely informational display</p>
          </div>
          <a
            href="/input-screens/player-2"
            className="w-full px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105 shadow-lg text-center block"
          >
            View Player 2+ Screen
          </a>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">How Player Screens Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div>
            <h4 className="font-bold text-white mb-2">Player 1 (Input):</h4>
            <ul className="space-y-1 text-sm">
              <li>• Only player who can input team name</li>
              <li>• Three-letter input with OTP-style interface</li>
              <li>• Save button enabled when 3 letters entered</li>
              <li>• Keyboard navigation (arrows, backspace)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Player 2+ (Info):</h4>
            <ul className="space-y-1 text-sm">
              <li>• Informational screen only</li>
              <li>• No interaction or input</li>
              <li>• Directs players to Player 1</li>
              <li>• Shows leaderboard reference</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Usage Example</h3>
        <pre className="text-white/90 text-sm overflow-x-auto">
{`// Player 1 Page (/input-screens/player-1)
import PlayerTeamNameScreen from '../../components/PlayerTeamNameScreen';

export default function Player1Page() {
  const handleSubmit = (teamName: string) => {
    // Integrate with your game logic here
    console.log('Team name:', teamName);
  };

  return (
    <PlayerTeamNameScreen
      playerNumber={1}
      onSubmit={handleSubmit}
    />
  );
}

// Player 2+ Page (/input-screens/player-2)
export default function Player2Page() {
  return (
    <PlayerTeamNameScreen
      playerNumber={2}
      onSubmit={undefined}
    />
  );
}`}
        </pre>
      </div>

      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-2xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">Other Demos</h3>
        <div className="flex gap-4 justify-center">
          <a
            href="/team-name-input-demo"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Ending Screens Demo
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