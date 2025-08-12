import React from 'react';
import InputTeamNameScreen from '../components/InputTeamNameScreen';

const InputTeamNameDemo: React.FC = () => {
  const handleSubmit = (teamName: string) => {
    console.log('Team name submitted:', teamName);
    alert(`Team name "${teamName}" submitted successfully!`);
  };

  return (
    <InputTeamNameScreen
      finalScore={123134325}
      onSubmit={handleSubmit}
    />
  );
};

export default InputTeamNameDemo; 