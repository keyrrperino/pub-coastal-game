import React, { useEffect } from 'react';
import { useTimer } from '@/components/hooks/useTimer';
import PlayerEndingScreen, { PlayerEndingType } from '@/components/PlayerEndingScreen';
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

  // Map performance to PlayerEndingType
  const getEndingType = (performance: SectorPerformance): PlayerEndingType => {
    switch (performance) {
      case 'good':
        return 'success';
      case 'okay':
        return 'moderate';
      case 'bad':
        return 'failure';
      default:
        return 'moderate';
    }
  };

  const endingType = getEndingType(totalPerformance);
  console.log('🟢 ENDING MODAL: Rendering PlayerEndingScreen with type:', endingType, 'for performance:', totalPerformance);

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen">
      <PlayerEndingScreen 
        endingType={endingType}
        finalScore={finalScore}
      />
    </div>
  );
};

export default EndingModal;