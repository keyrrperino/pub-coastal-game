import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { HINTS } from '@/lib/hints';

interface HintProps {
  text: string;
}

const Hint: React.FC<HintProps> = ({ text }) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHintIndex(prev => (prev + 1) % HINTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.novecentoBold} text-[16px] xl:text-[20.7px] font-bold text-center max-w-[400px] xl:max-w-[600px] text-white uppercase leading-[1.1] flex items-center justify-center h-[22px] xl:h-[28px] animate-pulse`}>
      {HINTS[currentHintIndex]}
    </div>
  );
};

export default Hint;