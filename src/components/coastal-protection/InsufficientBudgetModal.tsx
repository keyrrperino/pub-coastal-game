import React from 'react';
import styles from './styles.module.css';

interface InsufficientBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InsufficientBudgetModal: React.FC<InsufficientBudgetModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center ${styles.modalBackdrop}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={handleBackdropClick}
    >
      <div 
        className={`relative flex flex-col items-center gap-[20px] py-[20px] px-[30px] rounded-[26.08px] backdrop-blur-[17.39px] ${styles.modalContent}`}
        style={{
          background: 'rgba(255, 123, 152, 0.3)',
          width: '812px',
          maxWidth: '90vw',
          boxShadow: '0px 5.91px 29.56px 0px rgba(0, 0, 0, 0.15)',
          border: '2.17px solid #91E2FF'
        }}
      >
        <div 
          className={`${styles.novecentoBold} text-center text-white font-bold leading-[1.2em]`}
          style={{
            fontSize: '36.8px',
            width: '590px',
            maxWidth: '100%'
          }}
        >
          Oh no! Your team does not have enough budget for this!
          <br />
          <br />
          Speak to your team to better plan your spending next round
        </div>
      </div>
    </div>
  );
};

export default InsufficientBudgetModal;