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
    <div className="flex flex-col items-start gap-1.5 xl:gap-2">
      <div className={`${styles.novecentoBold} text-[20px] xl:text-[24.51px] font-bold leading-[16px] xl:leading-[19.61px] text-white uppercase text-left mb-0.5 xl:mb-1`}>
        {totalCoins > 0 ? "TEAM BUDGET:" : (<>NO MORE COINS</>)}
      </div>
      <CoinIndicator count={totalCoins} direction="row" size={30} columns={5} />    </div>
  );
};

export default BudgetDisplay;