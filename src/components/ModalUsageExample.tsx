import React, { useState } from 'react';
import PostRoundModal, { PostRoundPerformance } from './PostRoundModal';
import CoastalGameModal from './CoastalGameModal';

// Example usage in a game component
export default function ModalUsageExample() {
  const [gameState, setGameState] = useState<'playing' | 'postRound' | 'feedback'>('playing');
  const [performance, setPerformance] = useState<PostRoundPerformance>('good');
  const [showGameModal, setShowGameModal] = useState(false);

  // Example function to end a round and show feedback
  const endRound = (roundPerformance: PostRoundPerformance) => {
    setPerformance(roundPerformance);
    setGameState('postRound');
  };

  // Example function to continue to next round
  const continueToNextRound = () => {
    setGameState('playing');
    // Reset game state, start new round, etc.
    console.log('Starting next round...');
  };

  // Example function to show the full game interface
  const showGameInterface = () => {
    setShowGameModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-white text-3xl font-bold text-center mb-8">
          Coastal Protection Game
        </h1>

        {/* Game Status */}
        <div className="text-center mb-8">
          <p className="text-white text-lg mb-4">
            Current Game State: <span className="font-bold">{gameState.toUpperCase()}</span>
          </p>
          <p className="text-white text-sm opacity-80">
            Performance: <span className="font-bold">{performance.toUpperCase()}</span>
          </p>
        </div>

        {/* Game Controls */}
        <div className="flex flex-col gap-4">
          <button
            onClick={showGameInterface}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Show Game Interface
          </button>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => endRound('good')}
              className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors"
            >
              End Round (Good)
            </button>
            <button
              onClick={() => endRound('okay')}
              className="px-4 py-2 bg-yellow-600 text-white font-bold rounded hover:bg-yellow-700 transition-colors"
            >
              End Round (Okay)
            </button>
            <button
              onClick={() => endRound('bad')}
              className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors"
            >
              End Round (Bad)
            </button>
          </div>
        </div>

        {/* Game Instructions */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg">
          <h3 className="text-white font-bold mb-2">How to use:</h3>
          <ul className="text-white text-sm space-y-1">
            <li>• Click "Show Game Interface" to see the full coastal protection game modal</li>
            <li>• Use the "End Round" buttons to simulate different performance outcomes</li>
            <li>• The modals will show appropriate feedback based on performance</li>
            <li>• Click outside or use the continue button to close modals</li>
          </ul>
        </div>
      </div>

      {/* Post-Round Feedback Modal */}
      {/* <PostRoundModal
        isOpen={gameState === 'postRound'}
        performance={performance}
        onClose={() => setGameState('playing')}
        onContinue={continueToNextRound}
      /> */}

      {/* Coastal Game Interface Modal */}
      <CoastalGameModal
        isOpen={showGameModal}
        onClose={() => setShowGameModal(false)}
        onContinue={() => {
          setShowGameModal(false);
          // Handle game continuation logic
        }}
        performance={performance}
        showPostRoundFeedback={gameState === 'postRound'}
        timeRemaining={30}
        budget={30}
        sector1A={{
          landReclamation: { height: '2m', coins: 3 },
          seawall: { height: '1.15m', coins: 2 },
          mangroves: { planted: false, coins: 1 }
        }}
        sector1B={{
          landReclamation: { height: '0.5m', coins: 1 },
          seawall: { height: '2m', coins: 3 },
          mangroves: { planted: true, coins: 1 }
        }}
      />
    </div>
  );
} 