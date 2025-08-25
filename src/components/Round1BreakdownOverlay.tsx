import React from 'react';
import RoundBreakdownOverlay from './RoundBreakdownOverlay';

interface Round1BreakdownOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Round1BreakdownOverlay({
  isOpen,
  onClose,
}: Round1BreakdownOverlayProps) {
  const players = [
    { actions: -200, moneySpent: 5 },
    { actions: -200, moneySpent: 3 },
    { actions: -400, moneySpent: 2 }
  ];

  return (
    <RoundBreakdownOverlay
      isOpen={isOpen}
      onClose={onClose}
      round={1}
      totalPoints={9400}
      players={players}
    />
  );
} 