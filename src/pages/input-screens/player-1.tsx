import React from 'react';
import PlayerTeamNameScreen from '../../components/PlayerTeamNameScreen';

export default function Player1Page() {
  const handleSubmit = (teamName: string) => {
    console.log('Player 1 submitted team name:', teamName);
    // Here you can integrate with your game logic
    // For demo purposes, we'll show an alert
    alert(`Team name "${teamName}" saved successfully!`);
  };

  return (
    <PlayerTeamNameScreen
      playerNumber={1}
      onSubmit={handleSubmit}
    />
  );
} 