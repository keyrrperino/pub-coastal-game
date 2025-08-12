import { useState, useEffect, useCallback } from 'react';
import { LobbyStateEnum, GameLobbyStatus } from '@/lib/enums';
import { LobbyStateType } from '@/lib/types';

interface UseSynchronizedPhaseTimerProps {
  lobbyState: LobbyStateType | null;
  onTimeUp?: () => void;
  defaultDuration?: number;
}

interface UseSynchronizedPhaseTimerReturn {
  seconds: number;
  isRunning: boolean;
  timeRemaining: number;
  progress: number;
  resetTimer: (duration?: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  getRemainingTime: () => number;
  startTimer: (duration: number) => void;
  stopTimer: () => void;
}

export const useSynchronizedPhaseTimer = ({
  lobbyState,
  onTimeUp,
  defaultDuration = 30,
}: UseSynchronizedPhaseTimerProps): UseSynchronizedPhaseTimerReturn => {
  const [seconds, setSeconds] = useState(defaultDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<number>(Date.now());

  // Calculate remaining time based on Firebase timestamps
  const calculateSynchronizedTime = useCallback((): number => {
    if (!lobbyState) {
      return defaultDuration;
    }

    const phaseStartTime = lobbyState[LobbyStateEnum.PHASE_START_TIME] || 0;
    const phaseDuration = lobbyState[LobbyStateEnum.PHASE_DURATION] || defaultDuration;

    if (phaseStartTime === 0) {
      return defaultDuration;
    }

    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - phaseStartTime) / 1000);
    const remaining = Math.max(0, phaseDuration - elapsed);

    return remaining;
  }, [lobbyState, defaultDuration]);

  // Synchronize with Firebase state
  useEffect(() => {
    if (!lobbyState) {
      return;
    }

    const phaseStartTime = lobbyState[LobbyStateEnum.PHASE_START_TIME] || 0;
    const phaseDuration = lobbyState[LobbyStateEnum.PHASE_DURATION] || defaultDuration;

    // Only run timer if we have a valid start time
    if (phaseStartTime > 0) {
      setIsRunning(true);
      setLastSyncTime(Date.now());
      
      // Calculate initial remaining time
      const remaining = calculateSynchronizedTime();
      setSeconds(remaining);

      // Check if timer should end
      if (remaining <= 0) {
        setIsRunning(false);
        onTimeUp?.();
      }
    } else {
      setIsRunning(false);
      setSeconds(defaultDuration);
    }
  }, [lobbyState, calculateSynchronizedTime, onTimeUp, defaultDuration]);

  // Update timer every second when running
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      const remaining = calculateSynchronizedTime();
      setSeconds(remaining);

      if (remaining <= 0) {
        setIsRunning(false);
        onTimeUp?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, calculateSynchronizedTime, onTimeUp]);

  const resetTimer = useCallback((duration?: number) => {
    const newDuration = duration || defaultDuration;
    setSeconds(newDuration);
    setIsRunning(true);
    setLastSyncTime(Date.now());
  }, [defaultDuration]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (lobbyState && lobbyState[LobbyStateEnum.PHASE_START_TIME] > 0) {
      setIsRunning(true);
      setLastSyncTime(Date.now());
    }
  }, [lobbyState]);

  const getRemainingTime = useCallback((): number => {
    return calculateSynchronizedTime();
  }, [calculateSynchronizedTime]);

  const startTimer = useCallback((duration: number) => {
    setSeconds(duration);
    setIsRunning(true);
    setLastSyncTime(Date.now());
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const timeRemaining = seconds;
  const progress = defaultDuration > 0 ? (defaultDuration - seconds) / defaultDuration : 0;

  return {
    seconds,
    isRunning,
    timeRemaining,
    progress,
    resetTimer,
    pauseTimer,
    resumeTimer,
    getRemainingTime,
    startTimer,
    stopTimer,
  };
};

// Helper function to get phase duration
export const getSynchronizedPhaseDuration = (phase: GameLobbyStatus): number => {
  const phaseDurations: Record<GameLobbyStatus, number> = {
    [GameLobbyStatus.INTRODUCTION]: 10,
    [GameLobbyStatus.TUTORIAL]: 15,
    [GameLobbyStatus.ROUND_STORYLINE]: 10,
    [GameLobbyStatus.ROUND_INSTRUCTIONS]: 10,
    [GameLobbyStatus.ROUND_GAMEPLAY]: 180, // 3 minutes
    [GameLobbyStatus.ROUND_CUTSCENES]: 10,
    [GameLobbyStatus.ROUND_SCORE_BREAKDOWN]: 10,
    [GameLobbyStatus.ENDING]: 15,
    [GameLobbyStatus.TEAM_NAME_INPUT]: 0, // No timer - user input
    [GameLobbyStatus.LEADERBOARD_DISPLAY]: 0, // No timer - display only
    [GameLobbyStatus.INITIALIZING]: 0,
    [GameLobbyStatus.PREPARING]: 0,
    [GameLobbyStatus.STARTED]: 0,
    [GameLobbyStatus.ENDED]: 0,
    [GameLobbyStatus.RESTARTING]: 0,
    [GameLobbyStatus.ROUND_ONE_GAME_ENDED]: 0,
    [GameLobbyStatus.ROUND_TWO_GAME_ENDED]: 0,
    [GameLobbyStatus.ROUND_THREE_THREE_GAME_ENDED]: 0,
  };
  
  return phaseDurations[phase] || 0;
};