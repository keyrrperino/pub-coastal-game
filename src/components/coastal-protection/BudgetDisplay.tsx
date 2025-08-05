import React from 'react';
import styles from './styles.module.css';

interface BudgetDisplayProps {
  totalCoins?: number;
}

const BudgetDisplay: React.FC<BudgetDisplayProps> = ({ totalCoins = 20 }) => {
  // Create a 2x5 grid of coins (10 coins per row, 2 rows)
  const coins = Array.from({ length: totalCoins });

  return (
    <div className="flex items-end gap-[18.94px]">
      <div className={`${styles.novecentoBold} text-[24.51px] font-bold leading-[19.61px] text-white`}>
        Overall Budget:
      </div>
      
      <div className="flex gap-[11.55px]">
        {/* First column */}
        <div className="flex flex-col gap-[11.55px] w-[219.11px]">
          {coins.slice(0, 5).map((_, index) => (
            <div key={`col1-${index}`} className="flex-1 flex flex-col gap-[8.65px]">
              <div className="relative w-full h-[34.64px]">
                {/* Star background */}
                <div className="absolute inset-0 w-[34.64px] h-[34.64px]">
                  <svg
                    viewBox="0 0 35 35"
                    className="w-full h-full"
                    style={{ fill: '#EFAD2B', borderRadius: '6.92px' }}
                  >
                    <polygon points="17.5,2 21.75,13 33.5,13 24.25,20.5 28.5,31.5 17.5,24 6.5,31.5 10.75,20.5 1.5,13 13.25,13" />
                  </svg>
                </div>
                
                {/* Dollar sign */}
                <div 
                  className="absolute text-[21.01px] font-bold leading-[25.21px]"
                  style={{ 
                    left: '11.19px', 
                    top: '4.7px',
                    fontFamily: 'Novecento Bold',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    WebkitTextStroke: '0.14px linear-gradient(to bottom, #FFFFFF, #A6A6A6)',
                    textShadow: '0px 0.22px 0.22px rgba(193, 129, 0, 1)'
                  }}
                >
                  $
                </div>
                
                {/* Image overlay */}
                <div 
                  className="absolute"
                  style={{ 
                    left: '-68.53px', 
                    top: '-23.62px',
                    width: '171.67px',
                    height: '81.94px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Second column */}
        <div className="flex flex-col gap-[11.55px] w-[219.11px]">
          {coins.slice(5, 10).map((_, index) => (
            <div key={`col2-${index}`} className="flex-1 flex flex-col gap-[8.65px]">
              <div className="relative w-full h-[34.64px]">
                {/* Star background */}
                <div className="absolute inset-0 w-[34.64px] h-[34.64px]">
                  <svg
                    viewBox="0 0 35 35"
                    className="w-full h-full"
                    style={{ fill: '#EFAD2B', borderRadius: '6.92px' }}
                  >
                    <polygon points="17.5,2 21.75,13 33.5,13 24.25,20.5 28.5,31.5 17.5,24 6.5,31.5 10.75,20.5 1.5,13 13.25,13" />
                  </svg>
                </div>
                
                {/* Dollar sign */}
                <div 
                  className="absolute text-[21.01px] font-bold leading-[25.21px]"
                  style={{ 
                    left: '11.19px', 
                    top: '4.7px',
                    fontFamily: 'Novecento Bold',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    WebkitTextStroke: '0.14px linear-gradient(to bottom, #FFFFFF, #A6A6A6)',
                    textShadow: '0px 0.22px 0.22px rgba(193, 129, 0, 1)'
                  }}
                >
                  $
                </div>
                
                {/* Image overlay */}
                <div 
                  className="absolute"
                  style={{ 
                    left: '-68.53px', 
                    top: '-23.62px',
                    width: '171.67px',
                    height: '81.94px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetDisplay;