import { useState, useEffect, useCallback, useRef } from 'react';
import { GameLobbyStatus } from '@/lib/enums';

interface UsePhaseTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  progress: number; // 0 to 1
  startTimer: (duration: number) => void;
  stopTimer: () => void;
  resetTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
}

const PHASE_DURATIONS: Record<GameLobbyStatus, number> = {
  [GameLobbyStatus.INTRODUCTION]: 15,
  [GameLobbyStatus.TUTORIAL]: 15,
  [GameLobbyStatus.ROUND_STORYLINE]: 15,
  [GameLobbyStatus.ROUND_INSTRUCTIONS]: 15,
  [GameLobbyStatus.ROUND_GAMEPLAY]: 30,
  [GameLobbyStatus.ROUND_CUTSCENES]: 30,
  [GameLobbyStatus.ROUND_SCORE_BREAKDOWN]: 5,
  [GameLobbyStatus.ENDING]: 15,
  [GameLobbyStatus.LEADERBOARD_DISPLAY]: 5,
  [GameLobbyStatus.TEAM_NAME_INPUT]: 0, // Manual transition
  [GameLobbyStatus.INITIALIZING]: 0,
  [GameLobbyStatus.PREPARING]: 0,
  [GameLobbyStatus.STARTED]: 0,
  [GameLobbyStatus.ENDED]: 0,
  [GameLobbyStatus.RESTARTING]: 0,
  [GameLobbyStatus.ROUND_ONE_GAME_ENDED]: 0,
  [GameLobbyStatus.ROUND_TWO_GAME_ENDED]: 0,
  [GameLobbyStatus.ROUND_THREE_THREE_GAME_ENDED]: 0,
};

export function usePhaseTimer(
  onTimeUp: () => void,
  onTick?: (timeRemaining: number) => void
): UsePhaseTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const onTimeUpRef = useRef<() => void>(onTimeUp);
  const onTickRef = useRef<(timeRemaining: number) => void>(onTick || (() => {}));

  // Update refs when callbacks change
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
    onTickRef.current = onTick || (() => {});
  }, [onTimeUp, onTick]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const startTimer = useCallback((duration: number) => {
    clearTimer();
    
    if (duration <= 0) {
      onTimeUpRef.current();
      return;
    }

    durationRef.current = duration;
    startTimeRef.current = Date.now();
    setTimeRemaining(duration);
    setProgress(1);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, durationRef.current - Math.floor(elapsed / 1000));
      const currentProgress = remaining / durationRef.current;

      setTimeRemaining(remaining);
      setProgress(currentProgress);
      onTickRef.current(remaining);

      if (remaining <= 0) {
        clearTimer();
        onTimeUpRef.current();
      }
    }, 100); // Update every 100ms for smooth progress
  }, [clearTimer]);

  const stopTimer = useCallback(() => {
    clearTimer();
    setTimeRemaining(0);
    setProgress(0);
  }, [clearTimer]);

  const resetTimer = useCallback(() => {
    clearTimer();
    setTimeRemaining(durationRef.current);
    setProgress(1);
  }, [clearTimer]);

  const pauseTimer = useCallback(() => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
      
      // Update duration to reflect remaining time
      durationRef.current = timeRemaining;
    }
  }, [isRunning, timeRemaining]);

  const resumeTimer = useCallback(() => {
    if (!isRunning && timeRemaining > 0) {
      startTimeRef.current = Date.now();
      setIsRunning(true);

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, durationRef.current - Math.floor(elapsed / 1000));
        const currentProgress = remaining / durationRef.current;

        setTimeRemaining(remaining);
        setProgress(currentProgress);
        onTickRef.current(remaining);

        if (remaining <= 0) {
          clearTimer();
          onTimeUpRef.current();
        }
      }, 100);
    }
  }, [isRunning, timeRemaining, clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    timeRemaining,
    isRunning,
    progress,
    startTimer,
    stopTimer,
    resetTimer,
    pauseTimer,
    resumeTimer,
  };
}

// Utility function to get phase duration
export function getPhaseDuration(phase: GameLobbyStatus): number {
  return PHASE_DURATIONS[phase] || 0;
}

// Utility function to check if phase has automatic timing
export function hasAutomaticTiming(phase: GameLobbyStatus): boolean {
  return PHASE_DURATIONS[phase] > 0;
}