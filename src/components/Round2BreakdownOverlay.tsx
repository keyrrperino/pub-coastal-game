import React from 'react';
import RoundBreakdownOverlay from './RoundBreakdownOverlay';

interface Round2BreakdownOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Round2BreakdownOverlay({
  isOpen,
  onClose,
}: Round2BreakdownOverlayProps) {
  const players = [
    { actions: 0, moneySpent: 0 },
    { actions: -200, moneySpent: 6 },
    { actions: -200, moneySpent: 3 }
  ];

  return (
    <RoundBreakdownOverlay
      isOpen={isOpen}
      onClose={onClose}
      round={2}
      previousRoundPoints={9400}
      totalPoints={9000}
      players={players}
    />
  );
} 