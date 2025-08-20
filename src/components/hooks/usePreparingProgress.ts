import { useEffect, useRef, useState } from "react";
import { GAME_ROUND_TIMER } from "@/lib/constants";
import { GameLobbyStatus } from "@/lib/enums";
import { isGameOnGoing } from "@/lib/utils";
import { useServerTime } from "@/components/ServerTimeContext";

export function usePreparingProgress(
  countdown: number = GAME_ROUND_TIMER,
  gameLobbyStatus: GameLobbyStatus,
  compareGameLobbyStatus: GameLobbyStatus,
  triggersLoading: boolean,
  countdownStartTime: number,
  delayBeforeStart: number = 0 // in seconds
) {
  const { getAdjustedCurrentTime } = useServerTime();
  const [progress, setProgress] = useState(1);
  const [isStarting, setIsStarting] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!(gameLobbyStatus === compareGameLobbyStatus) || triggersLoading) {
      setProgress(1);
      setIsStarting(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const now = getAdjustedCurrentTime();
      const elapsed = now - countdownStartTime;

      if (elapsed < delayBeforeStart * 1000) {
        setProgress(1); // Still in delay phase
        setIsStarting(true);
      } else {
        setIsStarting(false);
        const countdownElapsed = elapsed - delayBeforeStart * 1000;
        const duration = countdown * 1000;
        const newProgress = Math.max(0, 1 - countdownElapsed / duration);
        setProgress(newProgress);

        if (newProgress <= 0.01) {
          clearInterval(intervalRef.current!);
        }
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [countdown, triggersLoading, gameLobbyStatus, countdownStartTime, delayBeforeStart]);

  // Calculate the countdown number to display
  let countdownDisplay = 0;
  const now = getAdjustedCurrentTime();
  const elapsed = now - countdownStartTime;
  if (isStarting) {
    // During delay phase
    countdownDisplay = Math.ceil(delayBeforeStart - elapsed / 1000);
  } else {
    // During countdown phase
    countdownDisplay = Math.floor(progress * countdown); // Changed to Math.floor
  }
  if (countdownDisplay < 0) countdownDisplay = 0;

  return { progress, isStarting, countdownProgressTimer: countdownDisplay };
}