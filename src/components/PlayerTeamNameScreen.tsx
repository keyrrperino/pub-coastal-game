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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isPlayer1 = playerNumber === 1;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.toUpperCase();
    
    // Take only the last character entered (handles multiple character input on mobile)
    const lastChar = value.slice(-1);
    
    if (/[A-Z0-9]/.test(lastChar) || lastChar === '') {
      const newLetters = [...letters];
      newLetters[index] = lastChar;
      setLetters(newLetters);
      
      // Move to next input if character was entered and not at the end
      if (lastChar && index < 2) {
        setCurrentFocus(index + 1);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      const teamName = letters.join('').toUpperCase();
      if (teamName.length === 3 && onSubmit) {
        onSubmit(teamName);
      }
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault(); // Always prevent default to avoid race conditions
      const newLetters = [...letters];
      
      if (letters[index] !== '') {
        // Current box has content, clear it
        newLetters[index] = '';
        setLetters(newLetters);
      } else if (index > 0) {
        // Current box is empty, move to previous input and clear it
        newLetters[index - 1] = '';
        setLetters(newLetters);
        setCurrentFocus(index - 1);
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
  };

  const handleInputClick = (index: number) => {
    setCurrentFocus(index);
    // Ensure the input gets focus
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleContainerClick = (index: number) => {
    // Click on the container should focus the input
    handleInputClick(index);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
    setCurrentFocus(index);
    // Select all text so typing overwrites existing content
    e.target.select();
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

  // Auto-focus first input on mount for Player 1
  useEffect(() => {
    if (isPlayer1 && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
        setCurrentFocus(0);
      }, 100); // Small delay to ensure component is fully mounted
    }
  }, [isPlayer1]);

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
                    className={`${styles.letterInput} ${currentFocus === index ? styles.focused : ''} drop-shadow-[0px_2.823094606399536px_2.823094606399536px_0px_rgba(148,107,199,1)]`}
                    onClick={() => handleContainerClick(index)}
                  >
                    <input
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      value={letters[index]}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}

                      onBlur={() => setCurrentFocus(-1)}
                      onFocus={(e) => handleInputFocus(e, index)}
                      maxLength={1}
                      className={styles.letterDisplay}
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        outline: 'none',
                        textAlign: 'center',
                        width: '100%',
                        height: '100%',
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                        color: 'inherit'
                      }}
                    />
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