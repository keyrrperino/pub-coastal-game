import React, { useState, useRef, useEffect } from 'react';
import styles from './InputTeamNameScreen.module.css';

interface InputTeamNameScreenProps {
  finalScore: number;
  onSubmit: (teamName: string) => void;
}

const InputTeamNameScreen: React.FC<InputTeamNameScreenProps> = ({ 
  finalScore, 
  onSubmit 
}) => {
  const [letters, setLetters] = useState(['', '', '']);
  const [currentFocus, setCurrentFocus] = useState(0);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      const teamName = letters.join('').toUpperCase();
      if (teamName.length === 3) {
        onSubmit(teamName);
      }
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      const newLetters = [...letters];
      if (newLetters[index] === '') {
        // Move to previous input and clear it
        if (index > 0) {
          newLetters[index - 1] = '';
          setLetters(newLetters);
          setCurrentFocus(index - 1);
        }
      } else {
        // Clear current input
        newLetters[index] = '';
        setLetters(newLetters);
      }
      return;
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      setCurrentFocus(index - 1);
      return;
    }

    if (e.key === 'ArrowRight' && index < 2) {
      e.preventDefault();
      setCurrentFocus(index + 1);
      return;
    }

    // Handle letter input
    if (e.key.length === 1 && /[A-Za-z]/.test(e.key)) {
      e.preventDefault();
      const newLetters = [...letters];
      newLetters[index] = e.key.toUpperCase();
      setLetters(newLetters);
      
      // Move to next input if not at the end
      if (index < 2) {
        setCurrentFocus(index + 1);
      }
    }
    
    // Prevent any other input
    if (e.key.length === 1 && !/[A-Za-z]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputClick = (index: number) => {
    setCurrentFocus(index);
  };

  useEffect(() => {
    if (inputRefs.current[currentFocus]) {
      inputRefs.current[currentFocus]?.focus();
    }
  }, [currentFocus]);

  return (
    <div className={styles.container} style={{ fontFamily: 'initial' }}>
      {/* Background Image */}
      <div className={styles.backgroundImage} />
      
      {/* Overlay */}
      <div className={styles.overlay} />
      
      {/* Content */}
      <div className={styles.content}>
        {/* Congratulations Section */}
        <div className={styles.congratulationsSection}>
          <h1 className={styles.congratulationsTitle}>
            Congratulations!
          </h1>
          <p className={styles.congratulationsText}>
            You've successfully defended Singapore's shores from rising sea levels.
          </p>
          <div className={styles.scoreSection}>
            <p className={styles.scoreText}>
              YOUR FINAL SCORE:
            </p>
            <p className={styles.scoreValue}>
              {finalScore.toLocaleString()}
            </p>
          </div>
        </div>

                {/* Input Section */}
        <div className={styles.inputSection}>
          <div 
            className={styles.inputContainer}
            style={{ backgroundColor: 'rgba(175, 255, 178, 0.3)' }}
          >
            <div className={styles.inputWrapper}>
              <label className={`${styles.inputLabel} drop-shadow-[0px_2.823094606399536px_2.823094606399536px_0px_rgba(148,107,199,1)]`}>
                PLAYER 1, INPUT TEAM NAME:
              </label>
              <div className={styles.letterInputContainer}>
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className={`${styles.letterInput} ${currentFocus === index ? styles.focused : ''} drop-shadow-[0px_2.823094606399536px_2.823094606399536px_0px_rgba(148,107,199,1)]`}
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onClick={() => handleInputClick(index)}
                    onBlur={() => setCurrentFocus(-1)}
                    onFocus={() => setCurrentFocus(index)}
                  >
                    <div className={styles.letterDisplay}>
                      {letters[index] || ''}
                    </div>
                    <div className={`${styles.dashUnderneath} drop-shadow-[0px_2.823094606399536px_2.823094606399536px_0px_rgba(148,107,199,1)]`}>
                      {letters[index] ? '' : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputTeamNameScreen; 