import React from 'react';

const FontTest: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'novecento-sans-narrow, sans-serif',
      fontWeight: 700,
      fontSize: '48px',
      color: 'black'
    }}>
      <h1>novecento-sans-narrow Font Test</h1>
      <p>This should display in novecento-sans-narrow font if loaded correctly.</p>
      <p style={{ fontFamily: 'Arial, sans-serif' }}>This is Arial for comparison.</p>
    </div>
  );
};

export default FontTest; 