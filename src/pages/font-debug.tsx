import React, { useEffect, useState } from 'react';

const FontDebug: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if font is loaded
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.fonts.check('1em Novecento Bold').then((isLoaded) => {
          setFontLoaded(isLoaded);
          console.log('Novecento Bold loaded:', isLoaded);
        });
      });
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Font Debug Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Font Loading Status</h2>
        <p>Novecento Bold loaded: {fontLoaded ? 'Yes' : 'No'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Font Tests</h2>
        
        <div style={{ 
          fontFamily: 'Novecento Bold, Novecento, sans-serif',
          fontSize: '24px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          padding: '10px'
        }}>
          Test 1: Novecento Bold (CSS font-family)
        </div>

        <div style={{ 
          fontFamily: 'Arial, sans-serif',
          fontSize: '24px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          padding: '10px'
        }}>
          Test 2: Arial (for comparison)
        </div>

        <div style={{ 
          fontFamily: 'serif',
          fontSize: '24px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          padding: '10px'
        }}>
          Test 3: Serif (fallback)
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Font Face Information</h2>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {`
@font-face {
  font-family: 'Novecento Bold';
  src: url('/games/pub-coastal-spline/fonts/novecento-bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
          `}
        </pre>
      </div>

      <div>
        <h2>Available Fonts</h2>
        <p>Check browser developer tools to see if the font files are being loaded.</p>
        <p>Network tab should show requests for:</p>
        <ul>
          <li>/games/pub-coastal-spline/fonts/novecento-bold.ttf</li>
          <li>/games/pub-coastal-spline/fonts/novecento.woff2</li>
        </ul>
      </div>
    </div>
  );
};

export default FontDebug; 