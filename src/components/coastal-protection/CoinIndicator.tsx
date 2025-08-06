import React from 'react';
import styles from './styles.module.css';

interface CoinIndicatorProps {
  count?: number;
  direction?: 'row' | 'col';
  size?: number; // px, default 15.97
  columns?: number; // for grid layout
}

const CoinIndicator: React.FC<CoinIndicatorProps> = ({ count = 1, direction = 'row', size = 15.97, columns }) => {
  const coins = Array.from({ length: count });
  if (columns) {
    return (
      <div
        className={`grid gap-x-[12px] gap-y-[12px]`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, width: 'auto', marginTop: direction === 'row' ? '8px' : '0' }}
      >
        {coins.map((_, index) => (
          <div key={index} className="relative flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
            {/* Circle background */}
            <div className="absolute inset-0 rounded-full" style={{ width: `${size}px`, height: `${size}px`, backgroundColor: '#EFAD2B' }}></div>
            {/* Dollar sign */}
            <span
              className={`${styles.coinText} font-bold text-white z-10`}
              style={{
                fontSize: `${size * 0.607}px`,
                lineHeight: `${size * 0.728}px`,
                marginTop: '1px',
              }}
            >
              $
            </span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col'} gap-[3.99px] w-auto items-center`} style={{marginTop: direction === 'row' ? '8px' : '0'}}>
      {coins.map((_, index) => (
        <div key={index} className="relative flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
          {/* Circle background */}
          <div className="absolute inset-0 rounded-full" style={{ width: `${size}px`, height: `${size}px`, backgroundColor: '#EFAD2B' }}></div>
          {/* Dollar sign */}
          <span
            className={`${styles.coinText} font-bold text-white z-10`}
            style={{
              fontSize: `${size * 0.607}px`,
              lineHeight: `${size * 0.728}px`,
              marginTop: '1px',
            }}
          >
            $
          </span>
        </div>
      ))}
    </div>
  );
};

export default CoinIndicator;