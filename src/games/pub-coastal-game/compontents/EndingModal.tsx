import React, { useEffect } from 'react';
import { useTimer } from '@/components/hooks/useTimer';
import EndingScreen1 from '@/components/EndingScreen1';
import EndingScreen2 from '@/components/EndingScreen2';
import EndingScreen3 from '@/components/EndingScreen3';
import { SectorPerformance } from '@/components/hooks/useSectorScores';

interface EndingModalProps {
  isOpen: boolean;
  onDurationComplete?: () => void;
  finalScore?: number;
  duration?: number;
  syncWithTimestamp?: number;
  totalPerformance?: SectorPerformance;
}

const EndingModal: React.FC<EndingModalProps> = ({ 
  isOpen, 
  onDurationComplete, 
  finalScore = 0,
  duration = 15,
  syncWithTimestamp,
  totalPerformance = 'okay'
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

  console.log('🟢 ENDING MODAL: Rendering ending screen for performance:', totalPerformance);

  // Render appropriate ending screen based on performance
  switch (totalPerformance) {
    case 'good':
      console.log('🟢 ENDING MODAL: Rendering EndingScreen1 for good performance');
      return (
        <EndingScreen1 
          finalScore={finalScore}
          onRestart={() => {}}
          onMainMenu={() => {}}
        />
      );
      
    case 'okay':
      console.log('🟢 ENDING MODAL: Rendering EndingScreen2 for okay performance');
      return (
        <EndingScreen2 
          finalScore={finalScore}
          onRestart={() => {}}
          onMainMenu={() => {}}
        />
      );
      
    case 'bad':
      console.log('🟢 ENDING MODAL: Rendering EndingScreen3 for bad performance');
      return (
        <EndingScreen3 
          finalScore={finalScore}
          onRestart={() => {}}
          onMainMenu={() => {}}
        />
      );
      
    default:
      console.log('🟢 ENDING MODAL: Rendering default EndingScreen2 for unknown performance');
      return (
        <EndingScreen2 
          finalScore={finalScore}
          onRestart={() => {}}
          onMainMenu={() => {}}
        />
      );
  }
};

export default EndingModal;