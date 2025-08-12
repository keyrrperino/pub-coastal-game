import React, { useEffect } from 'react';
import Modal from './Modal';

interface RoundInstructionsModalProps {
  isOpen: boolean;
  onDurationComplete: () => void;
  round: number;
  duration?: number;
}

const RoundInstructionsModal: React.FC<RoundInstructionsModalProps> = ({ 
  isOpen, 
  onDurationComplete, 
  round,
  duration = 15 
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onDurationComplete();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [isOpen, onDurationComplete, duration]);

  const getRoundContent = (roundNumber: number) => {
    switch (roundNumber) {
      case 1:
        return {
          title: "Round 1: 2025-2050",
          subtitle: "The First Challenge",
          years: "2025 - 2050",
          challenge: "Sea levels begin to rise. Initial protection measures are crucial.",
          focus: "Focus: Build foundational defenses",
          color: "from-blue-600 to-blue-800"
        };
      case 2:
        return {
          title: "Round 2: 2050-2075",
          subtitle: "Escalating Threats",
          years: "2050 - 2075",
          challenge: "Rising seas accelerate. Upgrade your defenses.",
          focus: "Focus: Strengthen and expand protections",
          color: "from-orange-600 to-red-800"
        };
      case 3:
        return {
          title: "Round 3: 2075-2100",
          subtitle: "Final Stand",
          years: "2075 - 2100",
          challenge: "Maximum sea level rise. Your final chance to save the coast.",
          focus: "Focus: Ultimate protection strategies",
          color: "from-red-700 to-purple-900"
        };
      default:
        return {
          title: `Round ${roundNumber}`,
          subtitle: "Coastal Defense",
          years: "Future",
          challenge: "Protect your sector from rising seas.",
          focus: "Focus: Coastal protection measures",
          color: "from-blue-600 to-blue-800"
        };
    }
  };

  const roundContent = getRoundContent(round);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Dynamic background based on round */}
        <div className={`absolute inset-0 bg-gradient-to-br ${roundContent.color}`}></div>
        
        {/* Animated water effect */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-blue-600 opacity-30 animate-wave"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-8 max-w-4xl mx-auto">
          {/* Round indicator */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white bg-opacity-20 backdrop-blur-sm border-4 border-white border-opacity-30">
              <span className="text-4xl font-bold">{round}</span>
            </div>
          </div>

          {/* Title and subtitle */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {roundContent.title}
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 opacity-90">
            {roundContent.subtitle}
          </h2>

          {/* Years display */}
          <div className="text-xl md:text-2xl mb-12 px-6 py-3 bg-white bg-opacity-10 rounded-full inline-block backdrop-blur-sm">
            {roundContent.years}
          </div>

          {/* Challenge and focus */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">🌊 Challenge</h3>
              <p className="text-lg leading-relaxed">
                {roundContent.challenge}
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">🎯 Focus</h3>
              <p className="text-lg leading-relaxed">
                {roundContent.focus}
              </p>
            </div>
          </div>

          {/* Quick tips */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">💡 Quick Tips</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl mb-2">💰</div>
                <p>Manage your budget wisely</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl mb-2">🤝</div>
                <p>Coordinate with your team</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl mb-2">⏱️</div>
                <p>Act quickly within time limit</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="w-full h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000 ease-linear"
                style={{ 
                  width: '100%',
                  animation: 'shrinkWidth 15s linear forwards'
                }}
              ></div>
            </div>
            <p className="text-sm mt-2 opacity-80">Get ready...</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RoundInstructionsModal;