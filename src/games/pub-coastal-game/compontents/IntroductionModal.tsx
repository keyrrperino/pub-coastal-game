import React, { useEffect, useState } from 'react';
import PlayerTutorialScreen1 from '@/components/PlayerTutorialScreen1';
import PlayerTutorialScreen2 from '@/components/PlayerTutorialScreen2';
import PlayerTutorialScreen3 from '@/components/PlayerTutorialScreen3';
import PlayerTutorialScreen4 from '@/components/PlayerTutorialScreen4';
import PlayerTutorialScreen5 from "@/components/PlayerTutorialScreen5";
import { useServerTime } from '@/components/ServerTimeContext';

// DEV MODE TOGGLE - Set to true to enable manual tutorial controls
const DEV_MODE_MANUAL_TUTORIALS = false; //process.env.NODE_ENV === 'development';

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
  const { getAdjustedCurrentTime } = useServerTime();
  const [timerBasedScreen, setTimerBasedScreen] = useState(1);
  const [manualScreen, setManualScreen] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [phaseStartTime] = useState(getAdjustedCurrentTime());
  
  // Use manual screen in dev mode, otherwise use timer-based
  const currentScreen = DEV_MODE_MANUAL_TUTORIALS ? manualScreen : timerBasedScreen;
  
  // Calculate duration for each tutorial screen (1/5 of total duration since we have 5 screens now)
  const screenDuration = duration / 5;

  
  // Calculate which screen should be shown based on elapsed time
  useEffect(() => {
    if (!isOpen || !syncWithTimestamp) return;

    const updateCurrentScreen = () => {
      const currentTime = getAdjustedCurrentTime();
      const elapsed = Math.floor((currentTime - syncWithTimestamp) / 1000);
      const remaining = Math.max(0, duration - elapsed);
      
      setTimeRemaining(remaining);
      
      if (elapsed < screenDuration) {
        setTimerBasedScreen(1);
      } else if (elapsed < screenDuration * 2) {
        setTimerBasedScreen(2);
      } else if (elapsed < screenDuration * 3) {
        setTimerBasedScreen(3);
      } else if (elapsed < screenDuration * 4) {
        setTimerBasedScreen(4);
      } else if (elapsed < duration) {
        setTimerBasedScreen(5);
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
      setTimerBasedScreen(2);
    }, screenDuration * 1000);

    timer2 = setTimeout(() => {
      setTimerBasedScreen(3);
    }, screenDuration * 2 * 1000);

    timer3 = setTimeout(() => {
      setTimerBasedScreen(4);
    }, screenDuration * 3 * 1000);

    const timer4 = setTimeout(() => {
      setTimerBasedScreen(5);
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
      
      {/* DEV MODE MANUAL CONTROLS */}
      {DEV_MODE_MANUAL_TUTORIALS && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
          <button
            onClick={() => setManualScreen(Math.max(1, manualScreen - 1))}
            disabled={manualScreen === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Previous ({manualScreen > 1 ? manualScreen - 1 : 'Start'})
          </button>
          <div className="px-4 py-2 bg-gray-200 text-black rounded">
            Tutorial {manualScreen} of 5
          </div>
          <button
            onClick={() => setManualScreen(Math.min(5, manualScreen + 1))}
            disabled={manualScreen === 5}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Next ({manualScreen < 5 ? manualScreen + 1 : 'End'})
          </button>
        </div>
      )}
    </div>
  );
};

export default IntroductionModal;