import React, { useEffect, useState } from 'react';

const FontDebug: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if font is loaded
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        const isLoaded = document.fonts.check('1em novecento-sans-narrow');
        setFontLoaded(isLoaded);
        console.log('novecento-sans-narrow loaded:', isLoaded);
      });
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Font Debug Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Font Loading Status</h2>
        <p>novecento-sans-narrow loaded: {fontLoaded ? 'Yes' : 'No'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Font Tests</h2>
        
        <div style={{ 
          fontFamily: 'novecento-sans-narrow, sans-serif',
          fontWeight: 700,
          fontSize: '24px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          padding: '10px'
        }}>
          Test 1: novecento-sans-narrow (CSS font-family)
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
/* Font loaded from Typekit CSS in _document.tsx */
@font-face {
  font-family: 'novecento-sans-narrow';
  src: url('https://use.typekit.net/af/2e4142/00000000000000007735cd12/31/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('woff2');
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
          <li>https://use.typekit.net/sam0gkj.css (Typekit CSS)</li>
          <li>https://use.typekit.net/af/2e4142/00000000000000007735cd12/31/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3 (Font file)</li>
        </ul>
      </div>
    </div>
  );
};

export default FontDebug; 