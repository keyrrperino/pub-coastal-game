import React from 'react';
import RoundBreakdownOverlay from './RoundBreakdownOverlay';

interface Round3BreakdownOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Round3BreakdownOverlay({
  isOpen,
  onClose,
}: Round3BreakdownOverlayProps) {
  const players = [
    { actions: -500, moneySpent: 5 },
    { actions: -400, moneySpent: 4 },
    { actions: -100, moneySpent: 1 }
  ];

  return (
    <RoundBreakdownOverlay
      isOpen={isOpen}
      onClose={onClose}
      round={3}
      previousRoundPoints={9000}
      totalPoints={8000}
      players={players}
    />
  );
} 