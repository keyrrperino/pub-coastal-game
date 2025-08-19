import React from 'react';
import styles from './styles.module.css';
import CoinIndicator from './CoinIndicator';

interface BudgetDisplayProps {
  totalCoins?: number;
}

const BudgetDisplay: React.FC<BudgetDisplayProps> = ({ totalCoins = 10 }) => {
  // Create a single row of coins
  const coins = Array.from({ length: totalCoins });

  return (
    <div className="flex flex-col items-start gap-2">
      <div className={`${styles.novecentoBold} text-[24.51px] font-bold leading-[19.61px] text-white uppercase text-left mb-1`}>
        {totalCoins > 0 ? "OVERALL BUDGET:" : (<>NO MORE COINS</>)}
      </div>
      <CoinIndicator count={totalCoins} direction="row" size={35} columns={5} />    </div>
  );
};

export default BudgetDisplay;