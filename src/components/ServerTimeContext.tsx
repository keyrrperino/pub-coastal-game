import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameRoomService } from '@/lib/gameRoom';

interface ServerTimeContextType {
  clockOffset: number;
  lastSyncTime: number;
  isTimeSynced: boolean;
  getAdjustedCurrentTime: () => number;
  updateFromGameRoomService: (gameRoomService: GameRoomService | null) => void;
}

const ServerTimeContext = createContext<ServerTimeContextType>({
  clockOffset: 0,
  lastSyncTime: 0,
  isTimeSynced: false,
  getAdjustedCurrentTime: () => Date.now(),
  updateFromGameRoomService: () => {},
});

interface ServerTimeProviderProps {
  children: ReactNode;
}

export const ServerTimeProvider: React.FC<ServerTimeProviderProps> = ({ children }) => {
  const [gameRoomServiceRef, setGameRoomServiceRef] = useState<GameRoomService | null>(null);

  const getAdjustedCurrentTime = () => {
    if (!gameRoomServiceRef) {
      // Fallback to local time if no service available
      if (Math.random() < 0.01) { // 1% chance to log
        console.log('🕒 [SERVER TIME] No GameRoomService reference, using local time');
      }
      return Date.now();
    }

    const adjustedTime = gameRoomServiceRef.getAdjustedCurrentTime();
    // Log for debugging purposes - only log occasionally to avoid spam
    if (Math.random() < 0.01) { // 1% chance to log
      console.log('🕒 [SERVER TIME] getAdjustedCurrentTime called:', {
        localTime: Date.now(),
        clockOffset: gameRoomServiceRef.getClockOffset(),
        adjustedTime,
        deviceName: navigator.userAgent.includes('iPad') ? 'iPad' : 
                   navigator.userAgent.includes('Android') ? 'Android' : 'PC'
      });
    }
    return adjustedTime;
  };

  const updateFromGameRoomService = (gameRoomService: GameRoomService | null) => {
    if (!gameRoomService) {
      console.log('🕒 [SERVER TIME CONTEXT] No gameRoomService provided, clearing reference');
      setGameRoomServiceRef(null);
      return;
    }

    console.log('🕒 [SERVER TIME CONTEXT] Storing GameRoomService reference:', {
      currentOffset: gameRoomService.getClockOffset(),
      lastSyncTime: gameRoomService.getLastSyncTime(),
      isTimeSynced: gameRoomService.getLastSyncTime() > 0,
      syncTimeReadable: gameRoomService.getLastSyncTime() > 0 ? new Date(gameRoomService.getLastSyncTime()).toLocaleTimeString() : 'never'
    });
    
    setGameRoomServiceRef(gameRoomService);
  };

  // Computed values that are always fresh from the service
  const clockOffset = gameRoomServiceRef?.getClockOffset() || 0;
  const lastSyncTime = gameRoomServiceRef?.getLastSyncTime() || 0;
  const isTimeSynced = lastSyncTime > 0;

  // Log when GameRoomService reference changes
  useEffect(() => {
    if (gameRoomServiceRef) {
      const syncTime = gameRoomServiceRef.getLastSyncTime();
      const offset = gameRoomServiceRef.getClockOffset();
      console.log(`🕒 ServerTime context reference updated: offset ${offset}ms, synced at ${syncTime > 0 ? new Date(syncTime).toLocaleTimeString() : 'never'}`);
    } else {
      console.log('🕒 ServerTime context reference cleared');
    }
  }, [gameRoomServiceRef]);

  return (
    <ServerTimeContext.Provider 
      value={{
        clockOffset,
        lastSyncTime,
        isTimeSynced,
        getAdjustedCurrentTime,
        updateFromGameRoomService,
      }}
    >
      {children}
    </ServerTimeContext.Provider>
  );
};

export const useServerTime = (): ServerTimeContextType => {
  const context = useContext(ServerTimeContext);
  if (!context) {
    throw new Error('useServerTime must be used within a ServerTimeProvider');
  }
  return context;
};