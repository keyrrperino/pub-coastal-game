import React, { useState, useRef, useEffect } from 'react';
import styles from './TeamNameInputScreen.module.css';

export type EndingScenario = 'success' | 'moderate' | 'failure';

interface TeamNameInputScreenProps {
  endingScenario: EndingScenario;
  finalScore: number;
  onSubmit: (teamName: string) => void;
}

interface ScenarioConfig {
  title: string;
  subtitle: string;
  bgColor: string;
  borderGradient: string;
}

const scenarioConfigs: Record<EndingScenario, ScenarioConfig> = {
  success: {
    title: "Congratulations!",
    subtitle: "You've successfully defended Singapore's shores from rising sea levels.",
    bgColor: "rgba(175, 255, 178, 0.3)",
    borderGradient: "linear-gradient(135deg, #91E2FF 0%, #FFFFFF 100%)"
  },
  moderate: {
    title: "Well done!",
    subtitle: "You've made important progress protecting Singapore's coasts.",
    bgColor: "rgba(255, 238, 175, 0.3)",
    borderGradient: "linear-gradient(135deg, #FFEEAF 0%, #FFFFFF 100%)"
  },
  failure: {
    title: "Oh no",
    subtitle: "too many floods have breached Singapore's defenses this time. But don't give up!",
    bgColor: "rgba(255, 175, 175, 0.3)",
    borderGradient: "linear-gradient(135deg, rgba(17, 68, 153, 0) 0%, #FFFFFF 100%)"
  }
};

const TeamNameInputScreen: React.FC<TeamNameInputScreenProps> = ({ 
  endingScenario,
  finalScore, 
  onSubmit 
}) => {
  const [letters, setLetters] = useState(['', '', '']);
  const [currentFocus, setCurrentFocus] = useState(0);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const config = scenarioConfigs[endingScenario];

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
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.backgroundImage} />
      
      {/* Overlay */}
      <div className={styles.overlay} />
      
      {/* Content */}
      <div className={styles.content}>
        {/* Congratulations Section */}
        <div className={styles.congratulationsSection}>
          <h1 className={styles.congratulationsTitle}>
            {config.title}
          </h1>
          <p className={styles.congratulationsText}>
            {config.subtitle}
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
          <style jsx>{`
            div::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 55.7px;
              padding: 4.64px;
              background: ${config.borderGradient};
              -webkit-mask: 
                linear-gradient(#fff 0 0) content-box, 
                linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask: 
                linear-gradient(#fff 0 0) content-box, 
                linear-gradient(#fff 0 0);
              mask-composite: exclude;
              pointer-events: none;
            }
          `}</style>
          <div 
            className={styles.inputContainer}
            style={{ backgroundColor: config.bgColor }}
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

export default TeamNameInputScreen; 