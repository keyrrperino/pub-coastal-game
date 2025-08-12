import React from 'react';
import PlayerTeamNameScreen from '@/components/PlayerTeamNameScreen';

interface TeamNameInputModalProps {
  isOpen: boolean;
  onSubmit: (teamName: string) => void;
  onChange?: (teamName: string) => void;
  playerNumber: number;
}

const TeamNameInputModal: React.FC<TeamNameInputModalProps> = ({ 
  isOpen, 
  onSubmit, 
  onChange,
  playerNumber 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <PlayerTeamNameScreen 
        playerNumber={playerNumber}
        onSubmit={onSubmit}
        onChange={onChange}
      />
    </div>
  );
};

export default TeamNameInputModal;