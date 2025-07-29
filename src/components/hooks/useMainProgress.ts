// ... existing code ...
import { GAME_ROUND_TIMER } from "@/lib/constants";
import { GameLobbyStatus } from "@/lib/enums";
import { isGameOnGoing } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function useMainProgress(
  countdown: number = GAME_ROUND_TIMER,
  gameLobbyStatus: GameLobbyStatus,
  triggersLoading: boolean,
  countdownStartTime: number // <-- new param
) {
  const [progress, setProgress] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isGameOnGoing(gameLobbyStatus)) {
      setProgress(1);
      return;
    }

    if (triggersLoading) {
      setProgress(1);
      return;
    }

    // Calculate initial progress based on countdownStartTime
    const now = Date.now();
    const elapsed = now - countdownStartTime;
    const duration = countdown * 1000;
    let initialProgress = Math.max(0, 1 - elapsed / duration);
    setProgress(initialProgress);

    if (initialProgress <= 0) {
      return;
    }

    // Clear any previous timer
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - countdownStartTime;
      const newProgress = Math.max(0, 1 - elapsed / duration);
      setProgress(newProgress);

      if (newProgress <= 0.01) {
        clearInterval(intervalRef.current!);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [countdown, triggersLoading, gameLobbyStatus, countdownStartTime]);

  return progress;
}