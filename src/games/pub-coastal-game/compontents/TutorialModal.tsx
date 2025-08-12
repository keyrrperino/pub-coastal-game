import React, { useEffect, useState } from 'react';
import { useTimer } from '@/components/hooks/useTimer';
import Modal from './Modal';

interface TutorialModalProps {
  isOpen: boolean;
  onDurationComplete?: () => void;
  duration?: number;
  syncWithTimestamp?: number;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ 
  isOpen, 
  onDurationComplete, 
  duration = 15,
  syncWithTimestamp
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Coastal Protectors!",
      content: "Work together with your team to protect our coastlines from rising sea levels.",
      icon: "🌊"
    },
    {
      title: "Your Mission",
      content: "Each player controls a sector. Choose coastal protection measures wisely within your budget.",
      icon: "🎯"
    },
    {
      title: "Protection Measures",
      content: "Plant mangroves, build seawalls, or reclaim land. Each has different costs and benefits.",
      icon: "🛡️"
    },
    {
      title: "Team Strategy",
      content: "Coordinate with your team members. Your choices affect everyone's success!",
      icon: "🤝"
    },
    {
      title: "Ready to Play!",
      content: "Protect your sector and save the coast. The future is in your hands!",
      icon: "🚀"
    }
  ];

  const { timeRemaining, progressPercentage } = useTimer({
    duration,
    onTimeUp: onDurationComplete,
    startImmediately: isOpen,
    syncWithTimestamp,
  });

  // Update current step based on remaining time
  useEffect(() => {
    if (!isOpen || !syncWithTimestamp) return;
    
    const elapsed = duration - timeRemaining;
    const stepDuration = duration / tutorialSteps.length;
    const calculatedStep = Math.floor(elapsed / stepDuration);
    setCurrentStep(Math.min(calculatedStep, tutorialSteps.length - 1));
  }, [timeRemaining, isOpen, duration, tutorialSteps.length, syncWithTimestamp]);

  // Fallback for local timing when sync is not available
  useEffect(() => {
    if (!isOpen || syncWithTimestamp) return;

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= tutorialSteps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, duration * 1000 / tutorialSteps.length);

    const completeTimer = setTimeout(() => {
      onDurationComplete?.();
    }, duration * 1000);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(completeTimer);
    };
  }, [isOpen, onDurationComplete, duration, tutorialSteps.length, syncWithTimestamp]);

  if (!isOpen) return null;

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-teal-800 to-green-900">
      <div className="relative w-full max-w-4xl mx-auto p-8">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-white bg-opacity-10 rounded-3xl backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white">
          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-white' : 'bg-white bg-opacity-30'
                }`}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="mb-8">
            <div className="text-6xl mb-6 animate-bounce">
              {currentTutorial.icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {currentTutorial.title}
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
              {currentTutorial.content}
            </p>
          </div>

          {/* Visual representation */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 bg-opacity-80 rounded-full flex items-center justify-center text-2xl mb-2">
                🌱
              </div>
              <p className="text-sm">Mangroves</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-400 bg-opacity-80 rounded-full flex items-center justify-center text-2xl mb-2">
                🧱
              </div>
              <p className="text-sm">Seawalls</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-600 bg-opacity-80 rounded-full flex items-center justify-center text-2xl mb-2">
                🏗️
              </div>
              <p className="text-sm">Reclamation</p>
            </div>
          </div>

          {/* Step counter */}
          <div className="text-lg opacity-80">
            Step {currentStep + 1} of {tutorialSteps.length}
          </div>

          {/* Overall progress bar */}
          <div className="w-full max-w-md mx-auto mt-8">
            <div className="w-full h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000 ease-linear"
                style={{ 
                  width: `${((currentStep + 1) / tutorialSteps.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;