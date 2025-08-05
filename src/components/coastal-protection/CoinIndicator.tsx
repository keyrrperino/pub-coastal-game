import React from 'react';
import styles from './styles.module.css';

interface CoinIndicatorProps {
  count?: number;
  direction?: 'row' | 'col';
}

const CoinIndicator: React.FC<CoinIndicatorProps> = ({ count = 1, direction = 'row' }) => {
  return (
    <div className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col'} gap-[3.99px] w-auto items-center`} style={{marginTop: direction === 'row' ? '8px' : '0'}}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="relative w-[15.97px] h-[15.97px]">
          {/* Circle background */}
          <div className="absolute inset-0 w-[15.97px] h-[15.97px] rounded-full" style={{ backgroundColor: '#EFAD2B' }}></div>
          {/* Dollar sign */}
          <span className={`${styles.coinText} text-[9.69px] font-bold leading-[11.63px] text-white z-10`} style={{lineHeight: '1.2em', position: 'absolute', left: '50%', top: '56%', transform: 'translate(-50%, -50%)'}}>$</span>
        </div>
      ))}
    </div>
  );
};

export default CoinIndicator;