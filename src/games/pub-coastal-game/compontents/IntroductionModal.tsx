import React, { useEffect, useState } from 'react';
import { useTimer } from '@/components/hooks/useTimer';
import TutorialScreen1 from '@/components/TutorialScreen1';
import TutorialScreen2 from '@/components/TutorialScreen2';
import TutorialScreen3 from '@/components/TutorialScreen3';
import TutorialScreen4 from '@/components/TutorialScreen4';

interface IntroductionModalProps {
  isOpen: boolean;
  onDurationComplete?: () => void;
  duration?: number;
  syncWithTimestamp?: number;
}

const IntroductionModal: React.FC<IntroductionModalProps> = ({ 
  isOpen, 
  onDurationComplete, 
  duration = 15,
  syncWithTimestamp
}) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  
  // Calculate duration for each tutorial screen (1/3 of total duration)
  const screenDuration = Math.floor(duration / 3);
  
  // Calculate which screen should be shown based on elapsed time
  useEffect(() => {
    if (!isOpen || !syncWithTimestamp) return;

    const updateCurrentScreen = () => {
      const currentTime = Date.now();
      const elapsed = Math.floor((currentTime - syncWithTimestamp) / 1000);
      const remaining = Math.max(0, duration - elapsed);
      
      setTimeRemaining(remaining);
      
      if (elapsed < screenDuration) {
        setCurrentScreen(1);
      } else if (elapsed < screenDuration * 2) {
        setCurrentScreen(2);
      } else if (elapsed < duration) {
        setCurrentScreen(3);
      } else {
        // Time is up, trigger completion
        onDurationComplete?.();
        return;
      }
    };

    // Update immediately
    updateCurrentScreen();

    // Update every second
    const interval = setInterval(updateCurrentScreen, 1000);

    return () => clearInterval(interval);
  }, [isOpen, syncWithTimestamp, screenDuration, duration, onDurationComplete]);

  // Fallback timer for when sync is not available
  useEffect(() => {
    if (!isOpen || syncWithTimestamp) return;

    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    // Set up sequential timers
    timer1 = setTimeout(() => {
      setCurrentScreen(2);
    }, screenDuration * 1000);

    timer2 = setTimeout(() => {
      setCurrentScreen(3);
    }, screenDuration * 2 * 1000);

    timer3 = setTimeout(() => {
      onDurationComplete?.();
    }, duration * 1000);

    // Countdown timer for fallback mode
    countdownInterval = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(countdownInterval);
    };
  }, [isOpen, onDurationComplete, duration, screenDuration, syncWithTimestamp]);

  if (!isOpen) return null;

  // Render the appropriate tutorial screen
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 1:
        return <TutorialScreen1 onContinue={() => {}} />;
      case 2:
        return <TutorialScreen2 onContinue={() => {}} />;
      case 3:
        return <TutorialScreen3 onContinue={() => {}} />;
      case 3:
        return <TutorialScreen4 onContinue={() => {}} timeRemaining={timeRemaining} />;
      default:
        return <TutorialScreen1 onContinue={() => {}} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {renderCurrentScreen()}
    </div>
  );
};

export default IntroductionModal;