import React from 'react';
import CoinIndicator from './CoinIndicator';
import styles from './styles.module.css';

interface MeasureOptionProps {
  title: string;
  coinCount: number;
  onClick?: () => void;
}

const MeasureOption: React.FC<MeasureOptionProps> = ({ 
  title, 
  coinCount, 
  onClick 
}) => {
  return (
    <div className="flex items-center gap-[5.91px]">
      <button
        onClick={onClick}
        className="flex flex-col justify-center items-center gap-[12.66px] p-[50.63px] w-[76px] h-[76px]"
        style={{
          background: 'radial-gradient(circle, #B6FFF3 0%, #14F4CF 100%)',
          boxShadow: '0px 5.91px 29.56px 0px rgba(0, 0, 0, 0.15)',
          borderRadius: '63.28px'
        }}
      >
        <div className={`text-center text-[14px] font-bold leading-[14px] ${styles.novecentoBold}`} 
             style={{ color: '#202020' }}>
          {title.split(' ').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </button>
      
      <CoinIndicator count={coinCount} />
    </div>
  );
};

export default MeasureOption;