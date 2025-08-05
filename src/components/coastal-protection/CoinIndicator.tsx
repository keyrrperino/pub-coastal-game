import React from 'react';
import styles from './styles.module.css';

interface CoinIndicatorProps {
  count?: number;
  direction?: 'row' | 'col';
}

const CoinIndicator: React.FC<CoinIndicatorProps> = ({ count = 1, direction = 'row' }) => {
  return (
    <div className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col'} gap-[2px] w-auto items-center`} style={{marginTop: direction === 'row' ? '8px' : '0'}}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="relative w-[20px] h-[20px]">
          {/* Circle background */}
          <div className="absolute inset-0 w-[20px] h-[20px] rounded-full bg-yellow-500" style={{ backgroundColor: '#EFAD2B' }}>
          </div>
          
          {/* Dollar sign */}
          <div className={`${styles.coinText} absolute text-[12px] font-bold leading-[14px] text-white`} 
             style={{ left: '7px', top: '3px' }}>
            $
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinIndicator;