import React, { useEffect, useState } from 'react';
import PlayerTutorialScreen1 from '@/components/PlayerTutorialScreen1';
import PlayerTutorialScreen2 from '@/components/PlayerTutorialScreen2';
import PlayerTutorialScreen3 from '@/components/PlayerTutorialScreen3';
import PlayerTutorialScreen4 from '@/components/PlayerTutorialScreen4';
import PlayerTutorialScreen5 from "@/components/PlayerTutorialScreen5";

interface IntroductionModalProps {
  isOpen: boolean;
  onDurationComplete?: () => void;
  duration: number;
  syncWithTimestamp?: number;
}

const IntroductionModal: React.FC<IntroductionModalProps> = ({ 
  isOpen, 
  onDurationComplete, 
  duration,
  syncWithTimestamp
}) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [phaseStartTime] = useState(Date.now());
  
  // Calculate duration for each tutorial screen (1/5 of total duration since we have 5 screens now)
  const screenDuration = duration / 5;
  
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
      } else if (elapsed < screenDuration * 3) {
        setCurrentScreen(3);
      } else if (elapsed < screenDuration * 4) {
        setCurrentScreen(4);
      } else if (elapsed < duration) {
        setCurrentScreen(5);
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
      setCurrentScreen(4);
    }, screenDuration * 3 * 1000);

    const timer4 = setTimeout(() => {
      setCurrentScreen(5);
    }, screenDuration * 4 * 1000);

    const timer5 = setTimeout(() => {
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
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearInterval(countdownInterval);
    };
  }, [isOpen, onDurationComplete, duration, screenDuration, syncWithTimestamp]);

  if (!isOpen) return null;

  // Render the appropriate tutorial screen
  const renderCurrentScreen = () => {
    const screenTimingProps = {
      phaseStartTime: phaseStartTime,
      timeRemaining: timeRemaining,
      screenDuration: screenDuration
    };

    switch (currentScreen) {
      case 1:
        return <PlayerTutorialScreen1 {...screenTimingProps} />;
      case 2:
        return <PlayerTutorialScreen2 {...screenTimingProps} />;
      case 3:
        return <PlayerTutorialScreen3 {...screenTimingProps} />;
      case 4:
        return <PlayerTutorialScreen4 {...screenTimingProps} />;
      case 5:
        return <PlayerTutorialScreen5 {...screenTimingProps} />;
      default:
        return <PlayerTutorialScreen1 {...screenTimingProps} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {renderCurrentScreen()}
    </div>
  );
};

export default IntroductionModal;