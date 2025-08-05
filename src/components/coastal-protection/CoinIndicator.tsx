import React from 'react';
import styles from './styles.module.css';

interface CoinIndicatorProps {
  count?: number;
}

const CoinIndicator: React.FC<CoinIndicatorProps> = ({ count = 1 }) => {
  return (
    <div className="flex flex-col gap-[3.99px] w-[15.95px]">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="relative w-full h-[15.97px]">
          {/* Star background */}
          <div className="absolute inset-0 w-[15.97px] h-[15.97px]">
            <svg
              viewBox="0 0 16 16"
              className="w-full h-full"
              style={{ fill: '#EFAD2B', borderRadius: '3.19px' }}
            >
              <polygon points="8,1 10,6 15,6 11,9 12,14 8,11 4,14 5,9 1,6 6,6" />
            </svg>
          </div>
          
          {/* Dollar sign */}
          <div className={`${styles.coinText} absolute text-[9.69px] font-bold leading-[11.63px]`} 
             style={{ left: '5.16px', top: '2.17px' }}>
            $
          </div>
          
          {/* Image overlay */}
          <div 
            className="absolute"
            style={{ 
              left: '-31.6px', 
              top: '-10.89px',
              width: '79.15px',
              height: '37.78px'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CoinIndicator;