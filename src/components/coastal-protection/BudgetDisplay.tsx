import React from 'react';
import styles from './styles.module.css';

interface BudgetDisplayProps {
  totalCoins?: number;
}

const BudgetDisplay: React.FC<BudgetDisplayProps> = ({ totalCoins = 10 }) => {
  // Create a single row of coins
  const coins = Array.from({ length: totalCoins });

  return (
    <div className="flex flex-col items-start gap-2">
      <div className={`${styles.novecentoBold} text-[24.51px] font-bold leading-[19.61px] text-white uppercase text-left mb-1`}>
        OVERALL BUDGET:
      </div>
      <div className="grid grid-cols-5 gap-x-[12px] gap-y-[12px]">
        {coins.map((_, index) => (
          <div key={`coin-${index}`} className="relative w-[35px] h-[35px]">
            {/* Circle background */}
            <div className="absolute inset-0 w-[35px] h-[35px] rounded-full" style={{ backgroundColor: '#EFAD2B' }}>
            </div>
            {/* Dollar sign */}
            <div 
              className={`${styles.coinTextLarge} absolute text-[21px] font-bold leading-[25px] text-white`}
              style={{ 
                left: '11px', 
                top: '6px'
              }}
            >
              $
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetDisplay;