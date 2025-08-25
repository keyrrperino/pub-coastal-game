import { ActivityTypeEnum, CutScenesEnum } from "./enums";
import { ScenarioConfigurationType } from "./types";

export const roundOneScenarioConfiguration: ScenarioConfigurationType = {
  // Sector 1A
  // None
  "1_1A_None-0.3-1": { score: 30, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  "1_1A_None-0.3-0.5": { score: 20, cutscene: CutScenesEnum.R1_1A_0, coin: 0, },
  "1_1A_None-0.3-2": { score: 60, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  // Mangrove
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_1A_1 },
  // Land Reclamation 0.5
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-2`]: { score: 10, coin: 3, cutscene: CutScenesEnum.R1_1A_4 },
  // Land Reclamation 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.3-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1A_2 },
  // Land Reclamation 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.3-2`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_1A_2 },
  // Seawall 0.5
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_1A_5 },
  // Seawall 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  // Seawall 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },

  // --- SECTOR 1B (Player 1) ---
  "1_1B_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_1B_0 },
  "1_1B_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_1B_0 },
  "1_1B_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_1B_0 },
  // Mangrove
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_1B_1 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_1B_1 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_1B_1 },
  // Land Reclamation 0.5
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-2`]: { score: 10, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  // Land Reclamation 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1B_2 },
  // Land Reclamation 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 5,  cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 5,  cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-2`]: { score: 0, coin: 5,  cutscene: CutScenesEnum.R1_1B_2 },
  // Seawall 0.5
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 15, coin: 1, cutscene: CutScenesEnum.R1_1B_5 },
  // Seawall 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R1_1B_4 },
  // Seawall 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 5, coin: 3, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 5, coin: 3, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 5, coin: 3, cutscene: CutScenesEnum.R1_1B_4 },

  // --- SECTOR 2A (Player 2) ---
  "2_2A_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_2A_0 },
  "2_2A_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_2A_0 },
  "2_2A_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_2A_0 },
  
  // Mangrove
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_2A_3 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_2A_3 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_2A_3 },

  // Storm Surge Barrier 0.5
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: { score: 10, coin: 3, cutscene: CutScenesEnum.R1_2A_4 },
  // Storm Surge Barrier 2
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.3-2`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2A_1 },
  // Seawall 0.5
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_2A_5 },
  // Seawall 1.15
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2A_2 },
  // Seawall 2
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_2 },

  // --- SECTOR 2B (Player 2) ---
  "2_2B_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_2B_0 },
  "2_2B_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_2B_0 },
  "2_2B_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_2B_0 },
  
  // Mangrove
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_2B_4 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_2B_4 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_2B_4 },

  // Storm Surge Barrier 0.5
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: { score: 10, coin: 3, cutscene: CutScenesEnum.R1_2B_2 },
  // Storm Surge Barrier 2
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.3-2`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2B_1 },
  // Seawall 0.5
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_2B_5 },
  // Seawall 1.15
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2B_3 },
  // Seawall 2
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_3 },

  // --- SECTOR 3A (Player 3) ---
  "3_3A_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_3A_0 },
  "3_3A_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_3A_0 },
  "3_3A_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_3A_0 },
  // Artificial Reef
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_3A_1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_3A_1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_3A_1 },

  // Hybrid Measure 0.5
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
  // Hybrid Measure 1.15
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_2 },
  // Hybrid Measure 2
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_2 },

  // Seawall 0.5
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 15, coin: 1, cutscene: CutScenesEnum.R1_3A_4 },
  // Seawall 1.15
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R1_3A_3 },
  // Seawall 2
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 5, coin: 3, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 5, coin: 3, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 5, coin: 3, cutscene: CutScenesEnum.R1_3A_3 },

  // --- SECTOR 3B (Player 3) ---
  "3_3B_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_3B_0 },
  "3_3B_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_3B_0 },
  "3_3B_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_3B_0 },
  // Artificial Reef
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_3B_1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_3B_1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_3B_1 },
  // Hybrid Measure 0.5
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  // Hybrid Measure 1.15
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_2 },
  // Hybrid Measure 2
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_2 },

  // Seawall 0.5
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 15, coin: 1, cutscene: CutScenesEnum.R1_3B_4 },
  // Seawall 1.15
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R1_3B_3 },
  // Seawall 2
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 5, coin: 3, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 5, coin: 3, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 5, coin: 3, cutscene: CutScenesEnum.R1_3B_3 },
};

export const roundTwoScenarioConfiguration: ScenarioConfigurationType = {
  "1_1A_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_1A_0, coin: 0 },
  "1_1A_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_1A_0, coin: 0 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_1A_9, coin: 1 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_1A_9, coin: 1 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 2 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_1A_9, coin: 2 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 3 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 3 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_1A_2, coin: 1 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_1A_2, coin: 1 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_1A_0, coin: 3 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_1A_0, coin: 3 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 4 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.7-2`]: { score: 25, cutscene: CutScenesEnum.R2_1A_0, coin: 4 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 5 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 5 },

  // Seawall 0.5 No uprades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_1A_4 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_1A_4 },

  // Seawall 0.5 -> 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_1A_4 },

  // Seawall 0.5 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_1 },

  // Seawall 0.5 > Build bike path and new park along the seawall
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 110, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },

  // Seawall 1.15 No uprades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_1A_10 },

  // Seawall 1.15 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 45, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },

  // Seawall 2 No uprades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },

  // Seawall 2 No uprades land reclamations
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_1A_11},
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_1A_11 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_1A_11 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },

  // Land and build seawall
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 35, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1A_2 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-0.7-1`]: { score: 70, coin: 1, cutscene: CutScenesEnum.R2_1A_8 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-0.7-2`]: { score: 150, coin: 1, cutscene: CutScenesEnum.R2_1A_8 },  


  // SECTOR 1B
  "1_1B_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_1B_0, coin: 0 },
  "1_1B_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_1B_0, coin: 0 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_1B_1, coin: 1 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_1B_1, coin: 1 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 10, cutscene: CutScenesEnum.R2_1B_2, coin: 2 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_1B_1, coin: 2 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 10, cutscene: CutScenesEnum.R2_1B_2, coin: 3 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 10, cutscene: CutScenesEnum.R2_1B_2, coin: 3 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_1B_3, coin: 1 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.7-2`]: { score: 140, cutscene: CutScenesEnum.R2_1B_3, coin: 1 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_1B_5, coin: 3 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_1B_5, coin: 3 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 4 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_1B_9, coin: 4 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 5 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 5 },

  // Seawall 0.5 No uprades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_1B_10 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_1B_10 },

  // Seawall 0.5 -> 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 40, coin: 1, cutscene: CutScenesEnum.R2_1B_10 },

  // Seawall 0.5 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R2_1B_11 },

  // Seawall 2 -> Build bike path and new park along the seawall
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 110, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },

  // Seawall 1.15 No uprades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_1B_10 },

  // Seawall 1.15 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R2_1B_11 },
  
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 45, coin: 1, cutscene: CutScenesEnum.R2_1B_12 },

  // Seawall 2 No uprades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 5, coin: 0, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 5, coin: 0, cutscene: CutScenesEnum.R2_1B_11 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },

  // Seawall 2 No uprades land reclamations
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_1B_13 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_1B_13 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_1B_14 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  // Land and build seawall
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-2`]: { score: 35, coin: 2, cutscene: CutScenesEnum.R2_1B_14 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: 140, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-0.7-1`]: { score: 80, coin: 1, cutscene: CutScenesEnum.R2_1B_8 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-0.7-2`]: { score: 150, coin: 1, cutscene: CutScenesEnum.R2_1B_8 },


  // SECTOR 2A
  "2_2A_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_2A_0, coin: 0 },
  "2_2A_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_2A_0, coin: 0 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_2A_1, coin: 1 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_2A_1, coin: 1 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_2A_2, coin: 3 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_2A_2, coin: 3 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_3, coin: 5 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_2A_3, coin: 5 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_2A_4, coin: 1 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_2A_4, coin: 1 },
  
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 2 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_2A_4, coin: 2 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 3 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 3 },
  
  // Seawall 0.5 No uprades
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_2A_9 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_2A_9 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_10 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_10 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2A_5 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 100, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },


  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },


  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },


  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_2A_8 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: 140, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-0.7-1`]: { score: 80, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-0.7-2`]: { score: 150, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },

  // Sector 2B
  "2_2B_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_2B_0, coin: 0 },
  "2_2B_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_2B_0, coin: 0 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_2B_1, coin: 0 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_2B_1, coin: 0 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_2B_4, coin: 3 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_2B_4, coin: 3 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_2, coin: 5 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_2B_2, coin: 5 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 25, cutscene: CutScenesEnum.R2_2B_8, coin: 1 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 105, cutscene: CutScenesEnum.R2_2B_8, coin: 1 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 5, cutscene: CutScenesEnum.R2_2B_3, coin: 2 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 40, cutscene: CutScenesEnum.R2_2B_8, coin: 2 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 5, cutscene: CutScenesEnum.R2_2B_3, coin: 3 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 5, cutscene: CutScenesEnum.R2_2B_3, coin: 3 },


  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_2B_4 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_2B_4 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_2 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_2B_8 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_2B_8 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 100, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },


  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_2B_8 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },


  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },



  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: 140, coin: 0, cutscene: CutScenesEnum.R2_2B_1 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-0.7-1`]: { score: 80, coin: 1, cutscene: CutScenesEnum.R2_2B_7 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-0.7-2`]: { score: 150, coin: 1, cutscene: CutScenesEnum.R2_2B_7 },


  // Sector 3A
  "3_3A_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  "3_3A_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 25, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 105, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 5, cutscene: CutScenesEnum.R2_3A_2, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 40, cutscene: CutScenesEnum.R2_3A_3, coin: 2 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 5, cutscene: CutScenesEnum.R2_3A_2, coin: 3 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 5, cutscene: CutScenesEnum.R2_3A_2, coin: 3 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3A_9, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_9, coin: 2 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 3 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 3 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },
  
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-None-0.7-1`]: { score: 50, cutscene: CutScenesEnum.R2_3A_1, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-None-0.7-2`]: { score: 130, cutscene: CutScenesEnum.R2_3A_1, coin: 0 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_10, coin: 1 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_11, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-None-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3A_9, coin: 0 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_12, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3A_6, coin: 1 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_11, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_9, coin: 1 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_11, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_11, coin: 2 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },

  // Hybrid Measure (1.15m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-None-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_9, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_12, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_13, coin: 1 },

  // Hybrid Measure (2m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_12, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_12, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_12, coin: 1 },

  // Seawall (0.5m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 25, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 105, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 5, cutscene: CutScenesEnum.R2_3A_2, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 40, cutscene: CutScenesEnum.R2_3A_3, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 5, cutscene: CutScenesEnum.R2_3A_2, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 5, cutscene: CutScenesEnum.R2_3A_2, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 25, cutscene: CutScenesEnum.R2_3A_14, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 105, cutscene: CutScenesEnum.R2_3A_14, coin: 1 },

  // Seawall (1.15m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 5, cutscene: CutScenesEnum.R2_3A_2, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 40, cutscene: CutScenesEnum.R2_3A_3, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 5, cutscene: CutScenesEnum.R2_3A_2, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 5, cutscene: CutScenesEnum.R2_3A_2, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_15, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3A_14, coin: 1 },

  // Seawall (2m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 5 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 5 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_15, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_15, coin: 1 },


  // Sector 3B
  "3_3B_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  "3_3B_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_3B_1, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_1, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3B_0, coin: 2 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_0, coin: 2 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 3 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 3 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },

  // Artificial Reef Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-None-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_3B_1, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-None-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_1, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_11, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },

  // Hybrid Measure (0.5m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-None-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3B_4, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3B_6, coin: 1 },

  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_4, coin: 1 },

  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 2 },

  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 2 },

  // Hybrid Measure (1.15m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-None-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_4, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_6, coin: 1 },

  // Hybrid Measure (2m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },

  // Seawall (0.5m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },

  // Seawall (1.15m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },

  // Seawall (2m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
};

export const roundThreeScenarioConfiguration: ScenarioConfigurationType = {
  // SECTOR 1A
  "1_1A_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_1A_12, coin: 0 },
  "1_1A_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_1A_12, coin: 0 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_1A_13, coin: 1 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_1A_13, coin: 1 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 2 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_1A_13, coin: 2 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 3 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 3 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_1A_14, coin: 1 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_1A_14, coin: 1 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_1A_0, coin: 3 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_1A_0, coin: 3 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 4 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_1A_0, coin: 4 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 5 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 5 },

  // Seawall 0.5 No upgrades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_1A_14 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1A_14 },

  // Seawall 0.5 -> 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_1A_14 },

  // Seawall 0.5 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_1 },

  // Seawall 0.5 -> Build promenade
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 75, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 160, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },

  // Seawall 1.15 No upgrades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_1A_15 },

  // Seawall 1.15 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },

  // Seawall 1.15 -> Build promenade
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 95, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },

  // Seawall 2 No upgrades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },

  // Seawall 2 -> Build promenade
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },

  // Land Reclamation (0.5m) -> None
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_1A_16 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1A_16 },

  // Land Reclamation (1.15m) -> None
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_1A_16 },

  // Land Reclamation (2m) -> None
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },

  // Land Reclamation (0.5m) -> Build Sea Wall (1.15m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 35, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (0.5m) -> Build Sea Wall (2m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (1.15m) -> Build Sea Wall (1.15m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (1.15m) -> Build Sea Wall (2m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (2m) -> Build Sea Wall (1.15m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (2m) -> Build Sea Wall (2m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1A_6 },

  // Mangroves -> None
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_1A_17 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_1A_17 },

  // Mangroves -> Build mangrove board walk
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-1.15-1`]: { score: 115, coin: 1, cutscene: CutScenesEnum.R2_1A_8 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-1.15-2`]: { score: 200, coin: 1, cutscene: CutScenesEnum.R2_1A_8 },

  // // Mangroves -> Remove
  // [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-Remove-1.15-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  // [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-Remove-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },


  // SECTOR 1B
  "1_1B_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_1B_0, coin: 0 },
  "1_1B_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_1B_0, coin: 0 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_1B_1, coin: 1 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_1B_1, coin: 1 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 10, cutscene: CutScenesEnum.R2_1B_2, coin: 2 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_1B_1, coin: 2 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 10, cutscene: CutScenesEnum.R2_1B_2, coin: 3 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 10, cutscene: CutScenesEnum.R2_1B_2, coin: 3 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_1B_3, coin: 1 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_1B_3, coin: 1 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_1B_5, coin: 3 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_1B_5, coin: 3 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 4 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_1B_9, coin: 4 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 5 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 5 },

  // Seawall 0.5 No upgrades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_1B_10 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1B_10 },

  // Seawall 0.5 -> 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_10 },

  // Seawall 0.5 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 10, coin: 2, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 10, coin: 2, cutscene: CutScenesEnum.R2_1B_11 },

  // Seawall 0.5 -> Build bike path
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 75, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 160, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },

  // Seawall 1.15 No upgrades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_10 },

  // Seawall 1.15 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_11 },

  // Seawall 1.15 -> Build bike path
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_1B_12 },

  // Seawall 2 No upgrades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_11 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_11 },

  // Seawall 2 -> Build bike path
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },

  // Land Reclamation (0.5m) -> None
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_1B_13 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1B_13 },

  // Land Reclamation (1.15m) -> None
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_1B_14 },

  // Land Reclamation (2m) -> None
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (0.5m) -> Build Sea Wall (1.15m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-2`]: { score: 35, coin: 2, cutscene: CutScenesEnum.R2_1B_14 },

  // Land Reclamation (0.5m) -> Build Sea Wall (2m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (1.15m) -> Build Sea Wall (1.15m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (1.15m) -> Build Sea Wall (2m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (2m) -> Build Sea Wall (1.15m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (2m) -> Build Sea Wall (2m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R2_1B_6 },

  // Mangroves -> None
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },

  // Mangroves -> Build mangrove board walk
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-1.15-1`]: { score: 115, coin: 1, cutscene: CutScenesEnum.R2_1B_8 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-1.15-2`]: { score: 200, coin: 1, cutscene: CutScenesEnum.R2_1B_8 },

  // SECTOR 2A
  "2_2A_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_2A_0, coin: 0 },
  "2_2A_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_2A_0, coin: 0 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_2A_1, coin: 1 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_2A_1, coin: 1 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_2A_2, coin: 3 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_2A_2, coin: 3 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_3, coin: 5 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_2A_3, coin: 5 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_2A_4, coin: 1 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_2A_4, coin: 1 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 2 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_2A_4, coin: 2 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 3 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 3 },

  // Coastal Barrier (0.5m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_2A_9 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2A_9 },

  // Coastal Barrier (0.5m) -> Demolish
  // [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-Demolish-1.15-1`]: { score: 30, coin: 6, cutscene: CutScenesEnum.R2_2A_3 },

  // Coastal Barrier (2m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_10 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_10 },

  // Coastal Barrier (2m) -> Demolish
  // [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-Demolish-1.15-1`]: { score: 50, coin: 2, cutscene: CutScenesEnum.R2_2A_3 },

  // Seawall (0.5m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  // Seawall (0.5m) -> Raise to 1.15m
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },

  // Seawall (0.5m) -> Raise to 2m
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2A_5 },

  // Seawall (0.5m) -> Build promenade
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },

  // Seawall (1.15m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  // Seawall (1.15m) -> Raise to 2m
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },

  // Seawall (1.15m) -> Build promenade
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },

  // Seawall (2m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },

  // Seawall (2m) -> Build promenade
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },

  // Mangroves -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_2A_8 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  // Mangroves -> Build mangrove board walk
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-1.15-1`]: { score: 115, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-1.15-2`]: { score: 200, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },

  // Mangroves -> Remove
  // [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-Remove-1.15-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_2A_3 },
  // [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-Remove-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_2A_3 },


  // SECTOR 2B
  "2_2B_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_2B_9, coin: 0 },
  "2_2B_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_2B_9, coin: 0 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_2B_1, coin: 1 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_2B_1, coin: 1 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_2B_4, coin: 3 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_2B_4, coin: 3 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_2, coin: 5 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_2B_2, coin: 5 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_2B_8, coin: 1 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_2B_8, coin: 1 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_3, coin: 2 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_2B_8, coin: 2 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_3, coin: 3 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_2B_3, coin: 3 },

  // Coastal Barrier (0.5m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_2B_4 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2B_4 },

  // Coastal Barrier (0.5m) -> Demolish
  // [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-Demolish-1.15-1`]: { score: 30, coin: 6, cutscene: CutScenesEnum.R2_2B_3 },

  // Coastal Barrier (2m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_2 },

  // Coastal Barrier (2m) -> Demolish
  // [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-Demolish-1.15-2`]: { score: 50, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (0.5m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2B_8 },

  // Seawall (0.5m) -> Raise to 1.15m
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_2B_8 },

  // Seawall (0.5m) -> Raise to 2m
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (0.5m) -> Build promenade
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },

  // Seawall (1.15m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_2B_8 },

  // Seawall (1.15m) -> Raise to 2m
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (1.15m) -> Build promenade
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },

  // Seawall (2m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (2m) -> Build promenade
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },

  // Mangroves -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_2B_1 },

  // Mangroves -> Build mangrove board walk
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-1.15-1`]: { score: 115, coin: 1, cutscene: CutScenesEnum.R2_2B_7 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-1.15-2`]: { score: 200, coin: 1, cutscene: CutScenesEnum.R2_2B_7 },

  // Mangroves -> Remove
  // [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-Remove-1.15-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  // [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-Remove-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  
  
  // SECTOR 3A
  "3_3A_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  "3_3A_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3A_3, coin: 2 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_8, coin: 3 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_8, coin: 3 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3A_9, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_9, coin: 2 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 3 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 3 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_10, coin: 0 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3A_14, coin: 0 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3A_14, coin: 0 },


  // Artificial Reef -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-None-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_3A_1, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-None-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_3A_1, coin: 0 },

  // Artificial Reef -> Build Rocky Revetment Behind Reef (1.15m)
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_10, coin: 1 },

  // Artificial Reef -> Build Rocky Revetment Behind Reef (2m)
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },

  
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 1 },

  // Hybrid Measure (0.5m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-None-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3A_11, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-None-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3A_9, coin: 0 },

  // Hybrid Measure (0.5m) -> Raise Revetment to 1.15m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  // Hybrid Measure (0.5m) -> Raise Revetment to 2m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },

  // Hybrid Measure (0.5m) -> Add a bike path
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3A_6, coin: 1 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_11, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_9, coin: 1 },

  // Hybrid Measure (1.15m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-None-1.15-1`]: { score: 20, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-None-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_9, coin: 0 },

  // Hybrid Measure (1.15m) -> Raise Revetment to 2m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_11, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_11, coin: 2 },

  // Hybrid Measure (1.15m) -> Add a bike path
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_12, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_13, coin: 1 },

  // Hybrid Measure (2m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },

  // Hybrid Measure (2m) -> Add a bike path
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_12, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_12, coin: 1 },

  // Seawall (0.5m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },

  // Seawall (0.5m) -> Raise to 1.15m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3A_3, coin: 1 },

  // Seawall (0.5m) -> Raise to 2m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 2 },

  // Seawall (0.5m) -> Build a promenade
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3A_14, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3A_14, coin: 1 },

  // Seawall (1.15m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3A_3, coin: 0 },

  // Seawall (1.15m) -> Raise to 2m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },

  // Seawall (1.15m) -> Build a promenade
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_15, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3A_14, coin: 1 },

  // Seawall (2m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 0 },

  // Seawall (2m) -> Build a promenade
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_15, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_15, coin: 1 },


  // SECTOR 3B
  "3_3B_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  "3_3B_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_3B_1, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_3B_1, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3B_0, coin: 2 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3B_2, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_0, coin: 2 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 3 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 3 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 0 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_5, coin: 0 },


  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_11, coin: 0 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3B_7, coin: 0 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_7, coin: 0 },

  // Artificial Reef -> Demolish
  // [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-Demolish-1.15-1`]: { score: 10, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  // Artificial Reef -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-None-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_3B_1, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-None-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_3B_1, coin: 0 },

  // Artificial Reef -> Build Rocky Revetment Behind Reef (1.15m)
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_11, coin: 1 },

  // Artificial Reef -> Build Rocky Revetment Behind Reef (2m)
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },

  // Hybrid Measure (0.5m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-None-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-None-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3B_4, coin: 0 },

  // Hybrid Measure (0.5m) -> Raise Revetment to 1.15m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_4, coin: 1 },

  // Hybrid Measure (0.5m) -> Raise Revetment to 2m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 2 },

  // Hybrid Measure (0.5m) -> Add a bike path
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3B_6, coin: 1 },

  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_4, coin: 1 },

  // Hybrid Measure (1.15m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-None-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_4, coin: 0 },

  // Hybrid Measure (1.15m) -> Raise Revetment to 2m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },

  // Hybrid Measure (1.15m) -> Add a bike path
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_6, coin: 1 },

  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 1 },

  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },

  // Hybrid Measure (2m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_10, coin: 0 },

  // Hybrid Measure (2m) -> Add a bike path
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },

  // Seawall (0.5m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },

  // Seawall (0.5m) -> Raise to 1.15m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  // Seawall (0.5m) -> Raise to 2m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 2 },

  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },

  // Seawall (0.5m) -> Build a promenade
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },

  // Seawall (1.15m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },

  // Seawall (1.15m) -> Raise to 2m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 1 },

  // Seawall (1.15m) -> Build a promenade
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },

  // Seawall (2m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_12, coin: 0 },

  // Seawall (2m) -> Build a promenade
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
}

export const optionalScenarioConfiguration: ScenarioConfigurationType = {
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-1`]: { score: 25, coin: 0, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-2`]: { score: 80, coin: 0, cutscene: CutScenesEnum.R2_1A_6 },


  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },


  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },


  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-2`]: { score: 80, coin: 0, cutscene: CutScenesEnum.R2_1B_7 },

  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_1B_14 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },


  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-1`]: { score: 80, coin: 0, cutscene: CutScenesEnum.R2_1B_8 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1B_8 },


  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_2A_6 },
  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-2`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_2A_6 },

  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-1`]: { score: 80, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },


  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-1`]: { score: 15, coin: 0, cutscene: CutScenesEnum.R2_2B_5 },
  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_2B_5 },

  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-1`]: { score: 80, coin: 0, cutscene: CutScenesEnum.R2_2B_7 },
  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2B_7 },

  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_10, coin: 0 },

  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },

  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-1`]: { score: 25, cutscene: CutScenesEnum.R2_3A_14, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-2`]: { score: 70, cutscene: CutScenesEnum.R2_3A_14, coin: 0 },

  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_12, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-0.7-2`]: { score: 50, cutscene: CutScenesEnum.R2_3A_6, coin: 0 },  

  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-1`]: { score: 25, cutscene: CutScenesEnum.R2_3B_8, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-2`]: { score: 105, cutscene: CutScenesEnum.R2_3B_8, coin: 0 },

  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_11, coin: 0 },

  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-0.7-2`]: { score: 50, cutscene: CutScenesEnum.R2_3B_6, coin: 0 },


  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-None-1.15-1`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-None-1.15-2`]: { score: 90, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-None-1.15-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_5 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_5 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-None-1.15-1`]: { score: 60, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL}-None-1.15-2`]: { score: 30, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-2`]: { score: 60, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_14 },
  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_2A_6 },
  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 120, coin: 0, cutscene: CutScenesEnum.R2_2A_6 },
  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 30, coin: 0, cutscene: CutScenesEnum.R2_2B_5 },
  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_2B_5 },
  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_2B_7 },
  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_2B_7 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_10, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3A_14, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 120, cutscene: CutScenesEnum.R2_3A_14, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-1.15-2`]: { score: 100, cutscene: CutScenesEnum.R2_3A_6, coin: 0 },  
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3B_7, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 120, cutscene: CutScenesEnum.R2_3B_7, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_11, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3B_5, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-1.15-2`]: { score: 100, cutscene: CutScenesEnum.R2_3B_6, coin: 0 },

}
