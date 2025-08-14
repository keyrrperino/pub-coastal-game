import React, { useState } from 'react';
import PostRoundModal, { PostRoundPerformance } from '../components/PostRoundModal';
import CoastalGameModal from '../components/CoastalGameModal';

export default function ModalDemoPage() {
  const [showPostRoundModal, setShowPostRoundModal] = useState(false);
  const [showCoastalGameModal, setShowCoastalGameModal] = useState(false);
  const [performance, setPerformance] = useState<PostRoundPerformance>('good');
  const [showPostRoundFeedback, setShowPostRoundFeedback] = useState(false);

  const handlePerformanceChange = (newPerformance: PostRoundPerformance) => {
    setPerformance(newPerformance);
    setShowPostRoundModal(true);
  };

  const handleShowCoastalGame = () => {
    setShowCoastalGameModal(true);
  };

  const handleShowPostRoundFeedback = () => {
    setShowPostRoundFeedback(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center mb-8">
        <h1 className="text-white text-5xl font-bold mb-4">Coastal Game Modal Demo</h1>
        <p className="text-white/80 text-xl">Interactive demo of all modal states</p>
      </div>
      
      {/* Demo Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Post-Round Feedback Section */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Post-Round Feedback Modals</h2>
          
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handlePerformanceChange('good')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              🎉 Show Good Performance
            </button>
            
            <button
              onClick={() => handlePerformanceChange('okay')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
            >
              😐 Show Okay Performance
            </button>
            
            <button
              onClick={() => handlePerformanceChange('bad')}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
            >
              😞 Show Bad Performance
            </button>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <h3 className="text-white font-bold mb-2">Current State:</h3>
            <p className="text-white/80">
              Performance: <span className="font-bold text-white">{performance.toUpperCase()}</span>
            </p>
            <p className="text-white/80">
              Modal Open: <span className="font-bold text-white">{showPostRoundModal ? 'YES' : 'NO'}</span>
            </p>
          </div>
        </div>

        {/* Game Interface Section */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h2 className="text-white text-3xl font-bold mb-6 text-center">Game Interface Modal</h2>
          
          <div className="flex flex-col gap-4">
            <button
              onClick={handleShowCoastalGame}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              🎮 Show Coastal Game Interface
            </button>
            
            <button
              onClick={handleShowPostRoundFeedback}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              📊 Show Post-Round Feedback Overlay
            </button>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <h3 className="text-white font-bold mb-2">Current State:</h3>
            <p className="text-white/80">
              Game Modal: <span className="font-bold text-white">{showCoastalGameModal ? 'OPEN' : 'CLOSED'}</span>
            </p>
            <p className="text-white/80">
              Feedback Overlay: <span className="font-bold text-white">{showPostRoundFeedback ? 'ACTIVE' : 'INACTIVE'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-4xl">
        <h3 className="text-white text-2xl font-bold mb-4 text-center">How to Use</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
          <div>
            <h4 className="font-bold text-white mb-2">Post-Round Feedback:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Click any performance button to see the feedback modal</li>
              <li>• Each state has different colors and messages</li>
              <li>• Click outside or "Continue" to close</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Game Interface:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Shows the full coastal protection game interface</li>
              <li>• Includes timer, budget, and sector information</li>
              <li>• Can overlay with post-round feedback</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Post-Round Modal */}
      {/* <PostRoundModal
        isOpen={showPostRoundModal}
        performance={performance}
        onClose={() => setShowPostRoundModal(false)}
        onContinue={() => {
          setShowPostRoundModal(false);
          console.log('Continuing to next round...');
        }}
      /> */}

      {/* Coastal Game Modal */}
      <CoastalGameModal
        isOpen={showCoastalGameModal}
        onClose={() => setShowCoastalGameModal(false)}
        onContinue={() => {
          setShowCoastalGameModal(false);
          console.log('Continuing to next round...');
        }}
        performance={performance}
        showPostRoundFeedback={showPostRoundFeedback}
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