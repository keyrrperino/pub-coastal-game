import React from 'react';
import PlayerTeamNameScreen from '../../components/PlayerTeamNameScreen';

export default function Player2Page() {
  // Player 2+ doesn't need onSubmit since they can't input team names
  return (
    <PlayerTeamNameScreen
      playerNumber={2}
      onSubmit={undefined}
    />
  );
} 