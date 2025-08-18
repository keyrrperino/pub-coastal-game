import React from "react";
import styles from '@/components/coastal-protection/styles.module.css';

type PlayerCutsceneModalProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const PlayerCutsceneModal: React.FC<PlayerCutsceneModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={handleBackdropClick}
    >
      {/* Complete Modal Container - Match Figma Frame 2403 */}
      <div 
        className="flex flex-col items-center animate-nudgeUp"
        style={{ gap: '-4px' }}
      >
        {/* Arrow Vector - Match Figma Vector (upward pointing arrow above modal) */}
        <div>
          <img 
            src="/assets/modal-arrow.svg"
            alt="Arrow"
            width={44}
            height={42}
          />
        </div>
        
        {/* Main Modal Container - Match Figma Frame 2361 */}
        <div 
          className="flex flex-col items-center gap-5 p-10 rounded-[26px] border-2 border-white shadow-lg"
          style={{
            backgroundColor: 'rgba(196, 191, 255, 0.5)',
            backdropFilter: 'blur(17.388822555541992px)',
            boxShadow: '0px 5.911163806915283px 29.555814743041992px 0px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Content Container - Text should be stacked vertically */}
          <div className="flex flex-col items-center gap-2.5">
            {/* Main title - Match Figma style_3I6Q52 */}
            <h2 
              className={`${styles.novecentoBold} text-white font-bold text-center uppercase`}
              style={{ 
                fontSize: '70px',
                lineHeight: '0.8em'
              }}
            >
              end of round
            </h2>
            {/* Subtitle - Match Figma style_91C9M6 */}
            <p 
              className={`${styles.novecentoBold} text-white font-bold text-center`}
              style={{ 
                fontSize: '30px',
                lineHeight: '0.8em'
              }}
            >
              Please look at the main screen
            </p>
          </div>
        </div>
      </div>
      
      {/* Custom Animations */}
      <style jsx>{`
        .animate-nudgeUp {
          animation: nudgeUp 1.5s ease-in-out infinite;
        }
        
        @keyframes nudgeUp {
          0%, 70%, 100% {
            transform: translateY(0);
          }
          15%, 35% {
            transform: translateY(-8px);
          }
          25% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </div>
  );
};

export default PlayerCutsceneModal;