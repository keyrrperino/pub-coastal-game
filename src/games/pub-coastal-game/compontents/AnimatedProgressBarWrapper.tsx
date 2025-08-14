import React, { useEffect, useState } from "react";
import ProcessBar from "./ProcessBar"; // Adjust the import path as needed

const AnimatedProgressBarWrapper: React.FC = () => {
  // Animation state
  const [dropProgress, setDropProgress] = useState(0);

  // ProgressBar props (replace with your actual logic)
  const progress = 0.7; // Example: 70% filled
  const round = 1;
  const countdownProgressTimer = 10; // Example: 10 seconds left
  const hasTextCountdown = true;

  useEffect(() => {
    setDropProgress(0); // Start at top
    const start = performance.now();
    const duration = 600; // ms

    function animateDrop(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setDropProgress(progress);
      if (progress < 1) {
        requestAnimationFrame(animateDrop);
      }
    }
    requestAnimationFrame(animateDrop);
  }, []);

  // Animate from bottom: 100vh (off-screen top) to bottom: 15vh
  const bottomStart = 100; // vh
  const bottomEnd = 15;    // vh
  const animatedBottom = bottomStart - (bottomStart - bottomEnd) * dropProgress;

  return (
    // <ProcessBar
    //   progress={progress}
    //   round={round}
    //   countdownProgressTimer={countdownProgressTimer}
    //   hasTextCountdown={hasTextCountdown}
    //   containerClassName="fixed z-10 left-[30vw]"
    //   style={{
    //     bottom: `${animatedBottom}vh`,
    //     transition: 'bottom 0.6s cubic-bezier(0.4,0,0.2,1)',
    //   }}
    // />
    null
  );
};

export default AnimatedProgressBarWrapper;