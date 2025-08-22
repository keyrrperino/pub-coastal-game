import React, { useEffect, useState } from 'react';
import PlayerRound1Screen from '@/components/player-screens/PlayerRound1Screen';
import PlayerRound2Screen from '@/components/player-screens/PlayerRound2Screen';
import PlayerRound3Screen from '@/components/player-screens/PlayerRound3Screen';
import { useServerTime } from '@/components/ServerTimeContext';

interface RoundInstructionsModalProps {
  isOpen: boolean;
  onDurationComplete?: () => void;
  round: number;
  duration?: number;
  syncWithTimestamp?: number;
}

const RoundInstructionsModal: React.FC<RoundInstructionsModalProps> = ({ 
  isOpen, 
  onDurationComplete, 
  round,
  duration = 15,
  syncWithTimestamp
}) => {
  const { getAdjustedCurrentTime } = useServerTime();
  const [timeRemaining, setTimeRemaining] = useState(duration);

  // Synchronized timer with Firebase timestamp
  useEffect(() => {
    if (!isOpen) return;

    let interval: NodeJS.Timeout;

    if (syncWithTimestamp) {
      // Use Firebase sync timestamp
      interval = setInterval(() => {
        const now = getAdjustedCurrentTime();
        const elapsed = (now - syncWithTimestamp) / 1000;
        const remaining = Math.max(0, duration - elapsed);
        
        setTimeRemaining(remaining);
        
        if (remaining <= 0) {
          onDurationComplete?.();
        }
      }, 100);
    } else {
      // Fallback timer when sync is not available
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = Math.max(0, prev - 0.1);
          if (newTime <= 0) {
            onDurationComplete?.();
          }
          return newTime;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isOpen, duration, syncWithTimestamp, onDurationComplete]);

  // Reset time when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeRemaining(duration);
    }
  }, [isOpen, duration]);

  if (!isOpen) return null;

  // Determine which round screen to show
  const getRoundScreen = () => {
    const showCountdown = timeRemaining <= 3;
    
    switch (round) {
      case 1:
        return <PlayerRound1Screen isControlScreen timeRemaining={showCountdown ? timeRemaining : undefined} />;
      case 2:
        return <PlayerRound2Screen isControlScreen timeRemaining={showCountdown ? timeRemaining : undefined} />;
      case 3:
        return <PlayerRound3Screen isControlScreen timeRemaining={showCountdown ? timeRemaining : undefined} />;
      default:
        return <PlayerRound1Screen isControlScreen timeRemaining={showCountdown ? timeRemaining : undefined} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {getRoundScreen()}
    </div>
  );
};

export default RoundInstructionsModal;