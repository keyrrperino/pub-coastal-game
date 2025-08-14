import React, { useState } from 'react';
import PostRoundModal, { PostRoundPerformance } from './PostRoundModal';
import CoastalGameModal from './CoastalGameModal';

export default function ModalDemo() {
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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-white text-4xl font-bold mb-8">Coastal Game Modal Demo</h1>
      
      {/* Demo Controls */}
      <div className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-white text-2xl font-bold mb-4">Post-Round Feedback Modals</h2>
        
        <div className="flex gap-4">
          <button
            onClick={() => handlePerformanceChange('good')}
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
          >
            Show Good Performance
          </button>
          
          <button
            onClick={() => handlePerformanceChange('okay')}
            className="px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Show Okay Performance
          </button>
          
          <button
            onClick={() => handlePerformanceChange('bad')}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
          >
            Show Bad Performance
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-white text-2xl font-bold mb-4">Game Interface Modal</h2>
        
        <div className="flex gap-4">
          <button
            onClick={handleShowCoastalGame}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Show Coastal Game Interface
          </button>
          
          <button
            onClick={handleShowPostRoundFeedback}
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Show Post-Round Feedback Overlay
          </button>
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