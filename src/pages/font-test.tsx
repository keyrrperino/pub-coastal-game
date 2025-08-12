import React from 'react';

const FontTest: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Novecento Bold, Novecento, sans-serif',
      fontSize: '48px',
      color: 'black'
    }}>
      <h1>Novecento Bold Font Test</h1>
      <p>This should display in Novecento Bold font if loaded correctly.</p>
      <p style={{ fontFamily: 'Arial, sans-serif' }}>This is Arial for comparison.</p>
    </div>
  );
};

export default FontTest; 