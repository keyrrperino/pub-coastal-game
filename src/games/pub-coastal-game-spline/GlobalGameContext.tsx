import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';

export enum SplineTriggersEnum {
  EAST_EARTH_BUNDS_BTN = 'East Earth Bunds Btn',
  SOUTH_MANGROVES_BTN = 'South Mangroves Btn',
  EAST_MANGROVES_BTN = 'East Mangroves Btn',
  WEST_MANGROVES_BTN = 'West Mangroves Btn',
  EAST_RECLAMATION_BTN = 'East Reclamation Btn',
  WEST_RECLAMATION_BTN = 'West Reclamation Btn',
  RV_CLICKER_20 = 'rv clicker 20',
  RV_CLICKER_10 = 'rv clicker 10',
  RV_BUILD_BTN = 'RV Build Btn',
  SW_CLICKER_15 = 'sw clicker 15',
  SW_CLICKER_10 = 'sw clicker 10',
  SW_CLICKER_5 = 'sw clicker 5',
  RAISE_WATER_BTN = 'Raise Water Btn',
  RESTART_BTN = 'Restart Btn'
}

interface GameState {
  isGameLoaded: boolean;
  isGameStarted: boolean;
  seawallValue: number | null;
  revetmentValue: number | null;
  singleBuild: SplineTriggersEnum | null;
  setSeawallValue: (val: number) => void;
  setRevetmentValue: (val: number) => void;
  isSeaWallBuilding: boolean;
  setIsSeaWallBuilding: (val: boolean) => void;
  triggerSeawallBuild: () => void;
  isRevetmentBuilding: boolean;
  setIsRevetmentBuilding: (val: boolean) => void;
  triggerRevetmentBuild: () => void;
  triggerSingleBuild: (val: SplineTriggersEnum) => void;
  setIsGameLoaded: (val: boolean) => void;
  setIsGameStarted: (val: boolean) => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used within GameProvider');
  return ctx;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [seawallValue, setSeawallValueState] = useState<number | null>(null);
  const [revetmentValue, setRevetmentValueState] = useState<number | null>(null);
  const [isSeaWallBuilding, setIsSeaWallBuildingState] = useState(false);
  const [isRevetmentBuilding, setIsRevetmentBuildingState] = useState(false);
  const [singleBuild, setSingleBuildState] = useState<SplineTriggersEnum | null>(null);
  const [isGameLoaded, setIsGameLoadedState] = useState<boolean>(false);
  const [isGameStarted, setIsGameStartedState] = useState<boolean>(false);

  // Firebase sync helpers
  useEffect(() => {
    const unsub = [
      onValue(ref(database, 'gameState/seawallValue'), snap => setSeawallValueState(snap.val())),
      onValue(ref(database, 'gameState/revetmentValue'), snap => setRevetmentValueState(snap.val())),
      onValue(ref(database, 'gameState/isSeaWallBuilding'), snap => setIsSeaWallBuildingState(!!snap.val())),
      onValue(ref(database, 'gameState/isRevetmentBuilding'), snap => setIsRevetmentBuildingState(!!snap.val())),
      onValue(ref(database, 'gameState/singleBuild'), snap => {
        // Reset single build state when Firebase value is null (indicating a new game)
        const value = snap.val();
        setSingleBuildState(value);
        
        // If the value is null and we had a previous value, reset all related states
        if (value === null) {
          console.log('Spline game state cleared - resetting Spline states');
          setSeawallValueState(null);
          setRevetmentValueState(null);
          setIsSeaWallBuildingState(false);
          setIsRevetmentBuildingState(false);
          setIsGameLoadedState(false);
          setIsGameStartedState(false);
        }
      }),
      onValue(ref(database, 'gameState/isGameLoaded'), snap => setIsGameLoadedState(!!snap.val())),
      onValue(ref(database, 'gameState/isGameStarted'), snap => setIsGameStartedState(!!snap.val())),
    ];
    return () => { unsub.forEach(u => typeof u === 'function' && u()); };
  }, []);

  const setSeawallValue = useCallback((val: number) => {
    set(ref(database, 'gameState/seawallValue'), val);
  }, []);
  const setRevetmentValue = useCallback((val: number) => {
    set(ref(database, 'gameState/revetmentValue'), val);
  }, []);
  const setIsSeaWallBuilding = useCallback((val: boolean) => {
    set(ref(database, 'gameState/isSeaWallBuilding'), val);
  }, []);
  const setIsRevetmentBuilding = useCallback((val: boolean) => {
    set(ref(database, 'gameState/isRevetmentBuilding'), val);
  }, []);
  const setIsGameLoaded = useCallback((val: boolean) => {
    set(ref(database, 'gameState/isGameLoaded'), val);
  }, []);
  const setSingleBuild = useCallback((val: SplineTriggersEnum | null) => {
    set(ref(database, 'gameState/singleBuild'), val);
  }, []);

  const setIsGameStarted = useCallback((val: boolean) => {
    set(ref(database, 'gameState/isGameStarted'), val);
  }, []);

  // Triggers
  const triggerSeawallBuild = () => setIsSeaWallBuilding(true);
  const triggerRevetmentBuild = () => setIsRevetmentBuilding(true);

  const triggerSingleBuild = (val: SplineTriggersEnum) => {
    if (val === SplineTriggersEnum.RAISE_WATER_BTN) setIsGameStarted(true);
    if (val === SplineTriggersEnum.RESTART_BTN) setIsGameStarted(false);
    setSingleBuild(val);
  };

  console.log(singleBuild);

  return (
    <GameContext.Provider value={{
      seawallValue,
      revetmentValue,
      setSeawallValue,
      setRevetmentValue,
      isSeaWallBuilding,
      setIsSeaWallBuilding,
      triggerSeawallBuild,
      isRevetmentBuilding,
      setIsRevetmentBuilding,
      triggerRevetmentBuild,
      triggerSingleBuild,
      singleBuild,
      isGameLoaded,
      setIsGameLoaded,
      setIsGameStarted,
      isGameStarted
    }}>
      {children}
    </GameContext.Provider>
  );
}; 