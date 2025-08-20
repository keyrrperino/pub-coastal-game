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
  const [clockOffset, setClockOffset] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState(0);
  const [isTimeSynced, setIsTimeSynced] = useState(false);

  const getAdjustedCurrentTime = () => {
    return Date.now() + clockOffset;
  };

  const updateFromGameRoomService = (gameRoomService: GameRoomService | null) => {
    if (!gameRoomService) {
      setClockOffset(0);
      setLastSyncTime(0);
      setIsTimeSynced(false);
      return;
    }

    const offset = gameRoomService.getClockOffset();
    const syncTime = gameRoomService.getLastSyncTime();
    
    setClockOffset(offset);
    setLastSyncTime(syncTime);
    setIsTimeSynced(syncTime > 0);
  };

  // Update context when clock offset changes
  useEffect(() => {
    if (lastSyncTime > 0) {
      console.log(`🕒 ServerTime context updated: offset ${clockOffset}ms, synced at ${new Date(lastSyncTime).toLocaleTimeString()}`);
    }
  }, [clockOffset, lastSyncTime]);

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