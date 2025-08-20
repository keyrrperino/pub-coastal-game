import { RoundType } from "@/lib/types";
import React, { useEffect, useRef } from "react";

type RoundStartAnimationModalProps = {
  isOpen: boolean;
  round: number;
};

// Displays a full-screen modal animating:
// 1) "ROUND" zooming out to its final size
// 2) The round number dropping in
// 3) A gentle ongoing random zoom/breathe effect afterwards
const RoundStartAnimationModal: React.FC<RoundStartAnimationModalProps> = ({ isOpen, round }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const roundTextRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const roundEl = roundTextRef.current;
    const numEl = numberRef.current;
    const contEl = containerRef.current;
    if (!roundEl || !numEl || !contEl) return;

    // Reset styles
    roundEl.style.transformOrigin = "center";
    roundEl.style.transition = "none";
    roundEl.style.transform = "scale(3)"; // start large, zoom out to 1
    roundEl.style.opacity = "1";

    numEl.style.transformOrigin = "center";
    numEl.style.transition = "none";
    numEl.style.transform = "translateY(-50vh)"; // start above and drop
    numEl.style.opacity = "0";

    // Step 1: ROUND zoom-out
    const zoomDuration = 700;
    const dropDelay = 100; // small delay before starting drop after zoom
    const dropDuration = 600;

    const startZoomTimeout = window.setTimeout(() => {
      roundEl.style.transition = `transform ${zoomDuration}ms cubic-bezier(.36,.07,.19,.97)`;
      roundEl.style.transform = "scale(1)";
    }, 20);

    // Step 2: Number drop after ROUND zoom-out completes
    const startDropTimeout = window.setTimeout(() => {
      numEl.style.transition = `transform ${dropDuration}ms cubic-bezier(.22,1,.36,1), opacity 200ms ease-out`;
      numEl.style.opacity = "1";
      numEl.style.transform = "translateY(0)";
    }, zoomDuration + dropDelay);

    // Step 3: Gentle random zoom/breathe after drop completes
    let running = true;
    const startBreatheTimeout = window.setTimeout(() => {
      function randomZoom() {
        if (!running || !contEl) return;
        const scale = 1 + Math.random() * 0.09; // subtle 0-3%
        const duration = 400 + Math.random() * 800;
        contEl.style.transition = `transform ${duration}ms cubic-bezier(.36,.07,.19,.97)`;
        contEl.style.transform = `scale(${scale})`;
        window.setTimeout(() => {
          if (!running || !contEl) return;
          contEl.style.transition = `transform ${duration}ms cubic-bezier(.36,.07,.19,.97)`;
          contEl.style.transform = "scale(1)";
          window.setTimeout(() => {
            if (running) randomZoom();
          }, duration);
        }, duration);
      }
      randomZoom();
    }, zoomDuration + dropDuration + 50);

    return () => {
      running = false;
      window.clearTimeout(startZoomTimeout);
      window.clearTimeout(startDropTimeout);
      window.clearTimeout(startBreatheTimeout);
    };
  }, [isOpen, round]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.7)]">
      <div ref={containerRef} className="flex flex-col items-center justify-center select-none">
        <div
          ref={roundTextRef}
          className="font-bold text-white tracking-[0.1em] text-center"
          style={{ fontSize: "7vw", lineHeight: 1 }}
        >
          ROUND
        </div>
        <div
          ref={numberRef}
          className="text-white font-bold tracking-[0.05em] text-center"
          style={{ fontSize: "13vw", lineHeight: 1, marginTop: "1vh" }}
        >
          {round}
        </div>
      </div>
    </div>
  );
};

export default RoundStartAnimationModal;


