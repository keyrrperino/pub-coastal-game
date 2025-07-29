import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ActivityTypeEnum, CutScenesEnum, GameLobbyStatus, UserSectorEnum } from "./enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomEffectValue(): number {
  const values = [0.5, 1, 2];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}


export function isGameOnGoing(value: GameLobbyStatus) {
  return ![GameLobbyStatus.ENDED, GameLobbyStatus.INITIALIZING, GameLobbyStatus.IS_STARTING, GameLobbyStatus.PREPAIRING].includes(value);
}

export function isCountdownExpired(countdownStartTime: number, countdown: number = 30): boolean {
  if (!countdownStartTime) return false; // or true, depending on your logic
  const now = Date.now();
  return now - countdownStartTime >= countdown * 1000;
}

export function getCutScenes(userSector: UserSectorEnum, minSeaLevel = 0.3, randomizeEffect: number) {
  const sceneSectorConfigurations = {
    // Sector 1
    "1_1A_0.3-1": {
      score: -30,
      cutscene: CutScenesEnum.R1_1A_0
    },
    "1_1B_0.3-1": {
      score: -30,
      cutscene: CutScenesEnum.R1_1B_0
    },
    "1_1A_0.3-0.5": {
      score: -20,
      cutscene: CutScenesEnum.R1_1A_0
    },
    "1_1B_0.3-0.5": {
      score: -20,
      cutscene: CutScenesEnum.R1_1B_0
    },
    "1_1A_0.3-2": {
      score: -60,
      cutscene: CutScenesEnum.R1_1A_0
    },
    "1_1B_0.3-2": {
      score: -60,
      cutscene: CutScenesEnum.R1_1B_0
    },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-1`]: {
      score: -30,
      cutscene: CutScenesEnum.R1_1A_1
    },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-1`]: {
      score: -30,
      cutscene: CutScenesEnum.R1_1B_1
    },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-0.5`]: {
      score: -20,
      cutscene: CutScenesEnum.R1_1A_1
    },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-0.5`]: {
      score: -20,
      cutscene: CutScenesEnum.R1_1B_1
    },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-2`]: {
      score: -60,
      cutscene: CutScenesEnum.R1_1A_1
    },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-2`]: {
      score: -60,
      cutscene: CutScenesEnum.R1_1B_1
    },

    // Sector 2
    "2_1A_0.3-1": {
      score: -30,
      cutscene: CutScenesEnum.R1_2A_0
    },
    "2_1A_0.3-0.5": {
      score: -20,
      cutscene: CutScenesEnum.R1_2A_0
    },
    "2_1A_0.3-2": {
      score: -60,
      cutscene: CutScenesEnum.R1_2A_0
    },
    "2_1B_0.3-1": {
      score: -30,
      cutscene: CutScenesEnum.R1_2B_0
    },
    "2_1B_0.3-0.5": {
      score: -20,
      cutscene: CutScenesEnum.R1_2B_0
    },
    "2_1B_0.3-2": {
      score: -60,
      cutscene: CutScenesEnum.R1_2B_0
    },
    [`2_1A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: {
      score: 0,
      cutscene: CutScenesEnum.R1_2A_1
    },
    [`2_1A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: {
      score: 0,
      cutscene: CutScenesEnum.R1_2A_1
    },
    [`2_1A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: {
      score: -20,
      cutscene: CutScenesEnum.R1_2A_1
    },

    [`2_1B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: {
      score: 0,
      cutscene: CutScenesEnum.R1_2B_1
    },
    [`2_1B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: {
      score: 0,
      cutscene: CutScenesEnum.R1_2B_1
    },
    [`2_1B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: {
      score: -20,
      cutscene: CutScenesEnum.R1_2B_1
    },

    // SECTOR 3
    "3_1A_0.3-1": {
      score: -30,
      cutscene: CutScenesEnum.R1_3A_0
    },
    "3_1A_0.3-0.5": {
      score: -20,
      cutscene: CutScenesEnum.R1_3A_0
    },
    "3_1A_0.3-2": {
      score: -60,
      cutscene: CutScenesEnum.R1_3A_0
    },
    "3_1B_0.3-1": {
      score: -30,
      cutscene: CutScenesEnum.R1_3B_0
    },
    "3_1B_0.3-0.5": {
      score: -20,
      cutscene: CutScenesEnum.R1_3B_0
    },
    "3_1B_0.3-2": {
      score: -60,
      cutscene: CutScenesEnum.R1_3B_0
    },
    [`3_1A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-1`]: {
      score: -20,
      cutscene: CutScenesEnum.R1_3A_1
    },
    [`3_1A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: {
      score: -10,
      cutscene: CutScenesEnum.R1_3A_1
    },
    [`3_1A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-2`]: {
      score: -50,
      cutscene: CutScenesEnum.R1_3A_1
    },
    [`3_1B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-1`]: {
      score: -20,
      cutscene: CutScenesEnum.R1_3B_1
    },
    [`3_1B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: {
      score: -10,
      cutscene: CutScenesEnum.R1_3B_1
    },
    [`3_1A_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-2`]: {
      score: -50,
      cutscene: CutScenesEnum.R1_3B_1
    },
  };

  return sceneSectorConfigurations;
}
