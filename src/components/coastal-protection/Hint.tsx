import React from 'react';
import styles from './styles.module.css';

interface HintProps {
  text: string;
}

const Hint: React.FC<HintProps> = ({ text }) => {
  return (
    <div className={`${styles.novecentoBold} text-[20.7px] font-bold leading-[22.77px] text-center max-w-[600px] text-white`}
         style={{ lineHeight: '1.1' }}>
      {text}
    </div>
  );
};

export default Hint;