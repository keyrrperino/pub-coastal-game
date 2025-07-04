import React, { createContext, useContext, useState } from 'react';

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
  const [seawallValue, setSeawallValue] = useState<number | null>(null);
  const [revetmentValue, setRevetmentValue] = useState<number | null>(null);
  const [isSeaWallBuilding, setIsSeaWallBuilding] = useState(false);
  const [isRevetmentBuilding, setIsRevetmentBuilding] = useState(false);
  const [singleBuild, setSingleBuild] = useState<SplineTriggersEnum | null>(null);
  const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const triggerSeawallBuild = () => setIsSeaWallBuilding(true);
  const triggerRevetmentBuild = () => setIsRevetmentBuilding(true);

  const triggerSingleBuild = (val: SplineTriggersEnum) => {
    if (val === SplineTriggersEnum.RAISE_WATER_BTN) setIsGameStarted(true);
    if (val === SplineTriggersEnum.RESTART_BTN) setIsGameStarted(false);
    setSingleBuild(val);
  };

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