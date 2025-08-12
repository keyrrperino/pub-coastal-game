import React, { useEffect } from 'react';
import Modal from './Modal';

interface IntroductionModalProps {
  isOpen: boolean;
  onDurationComplete: () => void;
  duration?: number;
}

const IntroductionModal: React.FC<IntroductionModalProps> = ({ 
  isOpen, 
  onDurationComplete, 
  duration = 15 
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onDurationComplete();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [isOpen, onDurationComplete, duration]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background with coastal theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-700 to-teal-800"></div>
        
        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-blue-600 opacity-50 animate-pulse"></div>
        <div className="absolute bottom-8 left-0 right-0 h-24 bg-blue-500 opacity-40 animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">
            COASTAL PROTECTORS
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Join forces to defend our coastlines against rising seas and build a sustainable future together
          </p>
          
          {/* Animated coastal icons */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="animate-bounce">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                🌱
              </div>
              <p className="text-sm mt-2">Mangroves</p>
            </div>
            <div className="animate-bounce delay-300">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                🧱
              </div>
              <p className="text-sm mt-2">Seawalls</p>
            </div>
            <div className="animate-bounce delay-700">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
                🏗️
              </div>
              <p className="text-sm mt-2">Reclamation</p>
            </div>
          </div>
          
          {/* Countdown timer visual */}
          <div className="w-64 h-2 bg-white bg-opacity-30 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-linear"
              style={{ 
                width: '100%',
                animation: 'shrinkWidth 15s linear forwards'
              }}
            ></div>
          </div>
          
          <style jsx>{`
            @keyframes shrinkWidth {
              from { width: 100%; }
              to { width: 0%; }
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-in-delay {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 1s ease-out forwards;
            }
            .animate-fade-in-delay {
              animation: fade-in-delay 1s ease-out 0.5s forwards;
              opacity: 0;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default IntroductionModal;