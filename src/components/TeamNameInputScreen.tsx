import React, { useState, useRef, useEffect } from 'react';
import styles from './TeamNameInputScreen.module.css';
import { SectorPerformance } from './hooks/useSectorScores';
import { PlayerEndingType } from './PlayerEndingScreen';

export type EndingScenario = 'success' | 'moderate' | 'failure';

interface TeamNameInputScreenProps {
  performance: SectorPerformance;
  finalScore: number;
  teamName: string;
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
  performance,
  finalScore,
  teamName,
}) => {
  const [letters, setLetters] = useState(['', '', '']);
  const [currentFocus, setCurrentFocus] = useState(0);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const getEndingType = (performance: SectorPerformance): PlayerEndingType => {
    switch (performance) {
      case 'good':
        return 'success';
      case 'okay':
        return 'moderate';
      case 'bad':
        return 'failure';
      default:
        return 'moderate';
    }
  };

  const endingScenario = getEndingType(performance);

  const config = scenarioConfigs[endingScenario];


  const handleInputClick = (index: number) => {
    setCurrentFocus(index);
  };

  useEffect(() => {
    if (inputRefs.current[currentFocus]) {
      inputRefs.current[currentFocus]?.focus();
    }
  }, [currentFocus]);

  const newTeamName = teamName ?? '';

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
          {/* <p className={styles.congratulationsText}>
            {config.subtitle}
          </p> */}
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
                <br />
              </label>
              <div className={styles.letterInputContainer}>
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className={`${styles.letterInput} ${currentFocus === index ? styles.focused : ''} drop-shadow-[0px_2.823094606399536px_2.823094606399536px_0px_rgba(148,107,199,1)]`}
                    onBlur={() => setCurrentFocus(-1)}
                    onFocus={() => setCurrentFocus(index)}
                  >
                    <span className={styles.letterDisplay}>
                      {newTeamName[index] || ''}
                    </span>
                    <span className={`${styles.dashUnderneath} drop-shadow-[0px_2.823094606399536px_2.823094606399536px_0px_rgba(148,107,199,1)]`}>
                      {newTeamName[index] ? '' : '_'}
                    </span>
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