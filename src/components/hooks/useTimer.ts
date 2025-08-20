import { useState, useEffect, useCallback, useRef } from 'react';
import { useServerTime } from '@/components/ServerTimeContext';

export interface UseTimerProps {
  duration: number;
  onTimeUp?: () => void;
  onTick?: (timeRemaining: number) => void;
  startImmediately?: boolean;
  syncWithTimestamp?: number; // Firebase phaseStartTime
}

export interface UseTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  progress: number; // 0 to 1 (1 = full time, 0 = no time)
  progressPercentage: number; // 0 to 100
  isAlmostUp: boolean; // true when ≤ 10 seconds remaining
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
}

export const useTimer = ({
  duration,
  onTimeUp,
  onTick,
  startImmediately = false,
  syncWithTimestamp,
}: UseTimerProps): UseTimerReturn => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpRef = useRef(onTimeUp);
  const onTickRef = useRef(onTick);
  const { getAdjustedCurrentTime } = useServerTime();

  // Update refs when callbacks change
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
    onTickRef.current = onTick;
  }, [onTimeUp, onTick]);

  // Clear interval helper
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Calculate time remaining based on Firebase sync with server time adjustment
  const calculateTimeRemaining = useCallback((): number => {
    if (!syncWithTimestamp || syncWithTimestamp === 0) {
      return duration; // Default to full duration if no sync timestamp
    }

    const currentTime = getAdjustedCurrentTime(); // Use server-adjusted time
    const elapsed = Math.floor((currentTime - syncWithTimestamp) / 1000);
    const remaining = Math.max(0, duration - elapsed);
    
    return remaining;
  }, [syncWithTimestamp, duration, getAdjustedCurrentTime]);

  // Main timer effect - runs every second when timer is active
  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return;
    }

    // Update time immediately
    const remaining = calculateTimeRemaining();
    setTimeRemaining(remaining);
    
    if (remaining <= 0) {
      setIsRunning(false);
      onTimeUpRef.current?.();
      return;
    }

    // Set up interval to update every second
    intervalRef.current = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
      onTickRef.current?.(remaining);

      if (remaining <= 0) {
        setIsRunning(false);
        clearTimer();
        onTimeUpRef.current?.();
      }
    }, 1000);

    return () => clearTimer();
  }, [isRunning, calculateTimeRemaining, clearTimer]);

  // Update time when sync timestamp or duration changes
  useEffect(() => {
    const remaining = calculateTimeRemaining();
    setTimeRemaining(remaining);
    
    // Auto-start if startImmediately is true and we have a valid sync timestamp
    if (startImmediately && syncWithTimestamp && syncWithTimestamp > 0 && remaining > 0) {
      setIsRunning(true);
    }
  }, [syncWithTimestamp, duration, calculateTimeRemaining, startImmediately]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    const remaining = calculateTimeRemaining();
    setTimeRemaining(remaining);
    clearTimer();
  }, [calculateTimeRemaining, clearTimer]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  // Derived values
  const progress = duration > 0 ? timeRemaining / duration : 0;
  const progressPercentage = progress * 100;
  const isAlmostUp = timeRemaining <= 10 && timeRemaining > 0 && isRunning;

  return {
    timeRemaining,
    isRunning,
    progress,
    progressPercentage,
    isAlmostUp,
    startTimer,
    stopTimer,
    resetTimer,
    pauseTimer,
    resumeTimer,
  };
};