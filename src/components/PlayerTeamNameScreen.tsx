import React, { useState, useRef, useEffect } from 'react';
import styles from './PlayerTeamNameScreen.module.css';

interface PlayerTeamNameScreenProps {
  playerNumber: number;
  onSubmit?: (teamName: string) => void;
  onChange?: (teamName: string) => void;
}

const PlayerTeamNameScreen: React.FC<PlayerTeamNameScreenProps> = ({ 
  playerNumber,
  onSubmit,
  onChange 
}) => {
  const [letters, setLetters] = useState(['', '', '']);
  const [currentFocus, setCurrentFocus] = useState(0);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isPlayer1 = playerNumber === 1;

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      const teamName = letters.join('').toUpperCase();
      if (teamName.length === 3 && onSubmit) {
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

    // Handle any single character input
    if (e.key.length === 1) {
      e.preventDefault();
      
      // Accept letters and numbers
      if (/[A-Za-z0-9]/.test(e.key)) {
        const newLetters = [...letters];
        newLetters[index] = e.key.toUpperCase();
        setLetters(newLetters);
        
        // Move to next input if not at the end
        if (index < 2) {
          setCurrentFocus(index + 1);
        }
      }
      // For invalid characters, we prevent the default but don't update state
      // This ensures the cursor behavior is consistent
    }
  };

  const handleInputClick = (index: number) => {
    setCurrentFocus(index);
  };

  const handleSave = () => {
    const teamName = letters.join('').toUpperCase();
    if (teamName.length === 3 && onSubmit) {
      onSubmit(teamName);
    }
  };

  useEffect(() => {
    if (inputRefs.current[currentFocus]) {
      inputRefs.current[currentFocus]?.focus();
    }
  }, [currentFocus]);

  // Call onChange whenever letters change
  useEffect(() => {
    if (onChange) {
      const teamName = letters.join('').toUpperCase();
      onChange(teamName);
    }
  }, [letters, onChange]);

  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.backgroundImage} />
      
      {/* Overlay */}
      <div className={styles.overlay} />
      
      {/* Content */}
      <div className={styles.content}>
        {isPlayer1 ? (
          // Player 1 - Input Screen
          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              <label className={`${styles.inputLabel} drop-shadow-[0px_2.823094606399536px_2.823094606399536px_0px_rgba(148,107,199,1)]`}>
                input team name:
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
            <button 
              className={styles.saveButton}
              onClick={handleSave}
              disabled={letters.join('').length !== 3}
            >
              Save
            </button>
          </div>
        ) : (
          // Other Players - Informational Screen
          <div className={styles.infoSection}>
            <h1 className={`${styles.infoTitle} drop-shadow-[0px_2.823094606399536px_2.823094606399536px_0px_rgba(148,107,199,1)]`}>
              Choose a team name
            </h1>
            <p className={`${styles.infoText} drop-shadow-[0px_1.6955209970474243px_1.6955209970474243px_0px_rgba(148,107,199,1)]`}>
              and go to player 1 to save your team's name. See how you did on the leaderboards!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerTeamNameScreen; 