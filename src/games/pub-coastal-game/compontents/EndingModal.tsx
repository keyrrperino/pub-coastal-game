import React, { useEffect } from 'react';
import { useTimer } from '@/components/hooks/useTimer';
import Modal from './Modal';

interface EndingModalProps {
  isOpen: boolean;
  onDurationComplete?: () => void;
  finalScore?: number;
  duration?: number;
  syncWithTimestamp?: number;
}

const EndingModal: React.FC<EndingModalProps> = ({ 
  isOpen, 
  onDurationComplete, 
  finalScore = 0,
  duration = 15,
  syncWithTimestamp
}) => {
  const { timeRemaining, progressPercentage } = useTimer({
    duration,
    onTimeUp: onDurationComplete,
    startImmediately: isOpen,
    syncWithTimestamp,
  });

  // Fallback for when sync is not available
  useEffect(() => {
    if (!isOpen || syncWithTimestamp) return;

    const timer = setTimeout(() => {
      onDurationComplete?.();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [isOpen, onDurationComplete, duration, syncWithTimestamp]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Celebration background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900"></div>
        
        {/* Animated celebration elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-8 max-w-4xl mx-auto">
          {/* Success icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-green-500 bg-opacity-20 backdrop-blur-sm border-4 border-green-400 border-opacity-50">
              <span className="text-6xl">🎉</span>
            </div>
          </div>

          {/* Congratulations title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-bounce">
            CONGRATULATIONS!
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl mb-8 opacity-90">
            You've Protected the Coast!
          </h2>

          {/* Final score display */}
          <div className="mb-12">
            <div className="inline-block bg-white bg-opacity-10 rounded-3xl p-8 backdrop-blur-sm border border-white border-opacity-20">
              <div className="text-lg mb-2 opacity-80">Final Score</div>
              <div className="text-6xl md:text-8xl font-bold text-yellow-400">
                {finalScore.toLocaleString()}
              </div>
              <div className="text-lg mt-2 opacity-80">points</div>
            </div>
          </div>

          {/* Achievement messages */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-3">🌊</div>
              <h3 className="text-lg font-semibold mb-2">Coastal Defender</h3>
              <p className="text-sm opacity-80">Successfully protected your sector from rising seas</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold mb-2">Team Player</h3>
              <p className="text-sm opacity-80">Worked together with your team for maximum impact</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-lg font-semibold mb-2">Strategy Master</h3>
              <p className="text-sm opacity-80">Made smart choices under pressure</p>
            </div>
          </div>

          {/* Thank you message */}
          <div className="mb-8">
            <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
              Thank you for playing Coastal Protectors! 
              <br />
              Together, we can build a more resilient future.
            </p>
          </div>

          {/* Continue prompt */}
          <div className="bg-white bg-opacity-10 rounded-full px-8 py-4 inline-block backdrop-blur-sm">
            <p className="text-lg">Get ready to enter your team name...</p>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto mt-8">
            <div className="w-full h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400 transition-all duration-1000 ease-linear"
                style={{ 
                  width: '100%',
                  animation: 'shrinkWidth 15s linear forwards'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default EndingModal;