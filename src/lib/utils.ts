import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ActivityTypeEnum, CutScenesEnum, GameLobbyStatus, UserSectorEnum } from "./enums";
import { ActivityLogType } from "./types";
import { userIdToSector } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomEffectValue(): number {
  const values = [0.5, 1, 2];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}


export function isGameOnGoing(value: GameLobbyStatus) {
  return ![GameLobbyStatus.ENDED, GameLobbyStatus.INITIALIZING, GameLobbyStatus.PREPAIRING].includes(value);
}

export function isCountdownExpired(countdownStartTime: number, countdown: number = 30): boolean {
  if (!countdownStartTime) return false; // or true, depending on your logic
  const now = Date.now();
  return now - countdownStartTime >= countdown * 1000;
}

export function getCutScenes(minSeaLevel = 0.3, randomizeEffect: number, activities: ActivityLogType[]) {
  console.log("activities", activities)
  const subSectors = [
    { sector: 1, subSector: "1A", activities: [
      "None",
      ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
      ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION,
      ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION,
      ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION,
      ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
      ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL,
      ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL,
    ]},
    { sector: 1, subSector: "1B", activities: [
      "None",
      ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES,
      ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION,
      ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION,
      ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION,
      ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL,
      ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL,
      ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL,
    ]},
    { sector: 2, subSector: "2A", activities: [
      "None",
      ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES,
      ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER,
      ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER,
      ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER,
      ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL,
      ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL,
      ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL,
    ]},
    { sector: 2, subSector: "2B", activities: [
      "None",
      ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES,
      ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER,
      ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER,
      ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER,
      ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL,
      ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL,
      ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL,
    ]},
    { sector: 3, subSector: "3A", activities: [
      "None",
      ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF,
      ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL,
      ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL,
      ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL,
    ]},
    { sector: 3, subSector: "3B", activities: [
      "None",
      ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF,
      ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL,
      ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL,
      ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL,
    ]},
  ];

  function extractSubSector(value: string): string | null {
    // Example value: "R1 1A / BUILD PLANT MANGROVES"
    // We want "1A", "1B", "2A", "2B", "3A", "3B"
    const match = value.match(/^R1 (\d[AB])/);
    return match ? match[1] : null;
  }

  const sceneSectorConfigurations: { [key: string]: { score: number; cutscene: CutScenesEnum } } = {
    // None
    "1_1A_None-0.3-1": { score: -30, cutscene: CutScenesEnum.R1_1A_0 },
    "1_1A_None-0.3-0.5": { score: -20, cutscene: CutScenesEnum.R1_1A_0 },
    "1_1A_None-0.3-2": { score: -60, cutscene: CutScenesEnum.R1_1A_0 },
    // Mangrove
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: -30, cutscene: CutScenesEnum.R1_1A_1 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: -20, cutscene: CutScenesEnum.R1_1A_1 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: -60, cutscene: CutScenesEnum.R1_1A_1 },
    // Land Reclamation 0.5
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1A_2 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1A_2 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-2`]: { score: -10, cutscene: CutScenesEnum.R1_1A_2 },
    // Land Reclamation 1.15
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1A_2 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1A_2 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_1A_2 },
    // Land Reclamation 2
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1A_2 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1A_2 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_1A_2 },
    // Seawall 0.5
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1A_3 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1A_3 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, cutscene: CutScenesEnum.R1_1A_3 },
    // Seawall 1.15
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1A_3 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1A_3 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_1A_3 },
    // Seawall 2
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1A_3 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1A_3 },
    [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_1A_3 },
  
    // --- SECTOR 1B (Player 1) ---
    "1_1B_None-0.3-1": { score: -30, cutscene: CutScenesEnum.R1_1B_0 },
    "1_1B_None-0.3-0.5": { score: -20, cutscene: CutScenesEnum.R1_1B_0 },
    "1_1B_None-0.3-2": { score: -60, cutscene: CutScenesEnum.R1_1B_0 },
    // Mangrove
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: -30, cutscene: CutScenesEnum.R1_1B_0 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: -20, cutscene: CutScenesEnum.R1_1B_0 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: -60, cutscene: CutScenesEnum.R1_1B_0 },
    // Land Reclamation 0.5
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1B_2 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1B_2 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-2`]: { score: -10, cutscene: CutScenesEnum.R1_1B_2 },
    // Land Reclamation 1.15
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1B_2 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1B_2 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_1B_2 },
    // Land Reclamation 2
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1B_2 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1B_2 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_1B_2 },
    // Seawall 0.5
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1B_3 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1B_3 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, cutscene: CutScenesEnum.R1_1B_3 },
    // Seawall 1.15
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1B_3 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1B_3 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_1B_3 },
    // Seawall 2
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_1B_3 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_1B_3 },
    [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_1B_3 },
  
    // --- SECTOR 2A (Player 2) ---
    "2_2A_None-0.3-1": { score: -30, cutscene: CutScenesEnum.R1_2A_0 },
    "2_2A_None-0.3-0.5": { score: -20, cutscene: CutScenesEnum.R1_2A_0 },
    "2_2A_None-0.3-2": { score: -60, cutscene: CutScenesEnum.R1_2A_0 },
    // Storm Surge Barrier 0.5
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_2A_1 },
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_2A_1 },
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: { score: -20, cutscene: CutScenesEnum.R1_2A_1 },
    // Seawall 0.5
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_2A_2 },
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_2A_2 },
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, cutscene: CutScenesEnum.R1_2A_2 },
    // Seawall 1.15
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_2A_2 },
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_2A_2 },
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_2A_2 },
    // Seawall 2
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_2A_2 },
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_2A_2 },
    [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_2A_2 },
  
    // --- SECTOR 2B (Player 2) ---
    "2_2B_None-0.3-1": { score: -30, cutscene: CutScenesEnum.R1_2B_0 },
    "2_2B_None-0.3-0.5": { score: -20, cutscene: CutScenesEnum.R1_2B_0 },
    "2_2B_None-0.3-2": { score: -60, cutscene: CutScenesEnum.R1_2B_0 },
    // Storm Surge Barrier 0.5
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_2B_1 },
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_2B_1 },
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: { score: -20, cutscene: CutScenesEnum.R1_2B_1 },
    // Seawall 0.5
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_2B_2 },
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_2B_2 },
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, cutscene: CutScenesEnum.R1_2B_2 },
    // Seawall 1.15
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_2B_2 },
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_2B_2 },
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_2B_2 },
    // Seawall 2
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_2B_2 },
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_2B_2 },
    [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_2B_2 },
  
    // --- SECTOR 3A (Player 3) ---
    "3_3A_None-0.3-1": { score: -30, cutscene: CutScenesEnum.R1_3A_0 },
    "3_3A_None-0.3-0.5": { score: -20, cutscene: CutScenesEnum.R1_3A_0 },
    "3_3A_None-0.3-2": { score: -60, cutscene: CutScenesEnum.R1_3A_0 },
    // Artificial Reef
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-1`]: { score: -20, cutscene: CutScenesEnum.R1_3A_1 },
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: { score: -10, cutscene: CutScenesEnum.R1_3A_1 },
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-2`]: { score: -50, cutscene: CutScenesEnum.R1_3A_1 },
    // Seawall 0.5
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, cutscene: CutScenesEnum.R1_3A_2 },
    // Seawall 1.15
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_3A_2 },
    // Seawall 2
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_3A_2 },
  
    // --- SECTOR 3B (Player 3) ---
    "3_3B_None-0.3-1": { score: -30, cutscene: CutScenesEnum.R1_3B_0 },
    "3_3B_None-0.3-0.5": { score: -20, cutscene: CutScenesEnum.R1_3B_0 },
    "3_3B_None-0.3-2": { score: -60, cutscene: CutScenesEnum.R1_3B_0 },
    // Artificial Reef
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-1`]: { score: -20, cutscene: CutScenesEnum.R1_3B_1 },
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: { score: -10, cutscene: CutScenesEnum.R1_3B_1 },
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-2`]: { score: -50, cutscene: CutScenesEnum.R1_3B_1 },
    // Seawall 0.5
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_3B_2 },
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_3B_2 },
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, cutscene: CutScenesEnum.R1_3B_2 },
    // Seawall 1.15
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_3B_2 },
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_3B_2 },
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_3B_2 },
    // Seawall 2
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, cutscene: CutScenesEnum.R1_3B_2 },
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, cutscene: CutScenesEnum.R1_3B_2 },
    [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, cutscene: CutScenesEnum.R1_3B_2 },
  };

  console.log(sceneSectorConfigurations);

  // For each sub-sector, find the latest activity and get the cutscene
  const cutScenes: CutScenesEnum[] = subSectors.map(({ sector, subSector }) => {
    // Find the latest activity for this sector/subSector
    const activity = activities
      .filter((a) => {
        const actSector = userIdToSector[a.userId];
        const actSubSector = extractSubSector(a.value);
        return actSector === sector && actSubSector === subSector;
      })
      .slice(-1)[0];

    let key: string;
    if (activity) {
      const activityType: string = activity.action || "None";
      if (activityType !== "None") {
        key = `${sector}_${subSector}_${activityType}-${minSeaLevel}-${randomizeEffect}`;
      } else {
        key = `${sector}_${subSector}_None-${minSeaLevel}-${randomizeEffect}`;
      }
    } else {
      key = `${sector}_${subSector}_None-${minSeaLevel}-${randomizeEffect}`;
    }

    console.log("key: ", key, sceneSectorConfigurations[key]);

    const config = sceneSectorConfigurations[key];
    return config ? config.cutscene : null;
  }).filter((value) => !!value);

  return cutScenes; // [1A, 1B, 2A, 2B, 3A, 3B]

  // return an array of cutscenes
}
