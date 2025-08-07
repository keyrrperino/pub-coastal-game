import { ActivityTypeEnum } from './enums';

/**
 * Defines the structure for any player action.
 */
export interface ActionConfig {
  /** A unique identifier corresponding to an ActivityTypeEnum. */
  id: ActivityTypeEnum;

  /** The human-readable name for the UI. */
  displayName: string;

  /** The resource cost of the action (e.g., number of coins). */
  cost: number;

  /** The minimum game round in which this action becomes available. */
  unlocksInRound: number;

  /**
   * Defines prerequisites using OR/AND logic.
   * Format: `[[A, B], [C]]` means "(A AND B) OR C".
   * An empty array `[]` or omitting the property means no prerequisites.
   */
  prerequisites?: ActivityTypeEnum[][];

  /**
   * The ID of the action that this one replaces upon being built.
   * The logic engine will treat the replaced action as no longer active.
   */
  replaces?: ActivityTypeEnum;

  /** An array of action IDs that are mutually exclusive with this one. */
  conflicts?: ActivityTypeEnum[];

  sector: string;
  measureType: 'mangroves' | 'land-reclamation' | 'seawall' | 'storm-surge-barrier' | 'artificial-reef' | 'hybrid-measure' | 'revetment';
}

// =========================================================================
//  ACTION TEMPLATES - Generic logic for each Zone
// =========================================================================

interface TemplateAction {
  displayName: string;
  cost: number;
  unlocksInRound: number;
  prerequisites?: string[][];
  replaces?: string;
  conflicts?: string[];
  measureType: 'mangroves' | 'land-reclamation' | 'seawall' | 'storm-surge-barrier' | 'artificial-reef' | 'hybrid-measure' | 'revetment';
}

const zone1Template: Record<string, TemplateAction> = {
  // --- MANGROVE PATH ---
  PLANT_MANGROVE: {
    displayName: 'Plant', cost: 1, unlocksInRound: 1,
    conflicts: ['BUILD_SEAWALL_0_5', 'BUILD_LAND_RECLAMATION_0_5'],
    measureType: 'mangroves',
  },
  BUILD_BOARDWALK: {
    displayName: 'Build Board Walk', cost: 1, unlocksInRound: 2,
    prerequisites: [['PLANT_MANGROVE']],
    measureType: 'mangroves',
  },
  // --- SEAWALL PATH ---
  BUILD_SEAWALL_0_5: {
    displayName: '0.5m', cost: 1, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_LAND_RECLAMATION_0_5'],
    measureType: 'seawall',
  },
  BUILD_SEAWALL_1_15: {
    displayName: '1.15m', cost: 2, unlocksInRound: 2,
    prerequisites: [['BUILD_SEAWALL_0_5']],
    replaces: 'BUILD_SEAWALL_0_5',
    measureType: 'seawall',
  },
  BUILD_SEAWALL_2: {
    displayName: '2m', cost: 3, unlocksInRound: 2,
    prerequisites: [['BUILD_SEAWALL_0_5'], ['BUILD_SEAWALL_1_15']],
    measureType: 'seawall',
  },
  BUILD_PATH_FROM_SEAWALL: {
    displayName: 'Build Path', cost: 1, unlocksInRound: 2,
    prerequisites: [['BUILD_SEAWALL_0_5'], ['BUILD_SEAWALL_1_15'], ['BUILD_SEAWALL_2']],
    measureType: 'seawall',
  },
  // --- LAND RECLAMATION PATH ---
  BUILD_LAND_RECLAMATION_0_5: {
    displayName: '0.5m', cost: 1, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_SEAWALL_0_5'],
    measureType: 'land-reclamation',
  },
  UPGRADE_LR_TO_SEAWALL_1_15: {
    displayName: '1.15m', cost: 2, unlocksInRound: 2,
    prerequisites: [['BUILD_LAND_RECLAMATION_0_5']],
    measureType: 'land-reclamation',
  },
  UPGRADE_LR_TO_SEAWALL_2: {
    displayName: '2m', cost: 3, unlocksInRound: 2,
    prerequisites: [['BUILD_LAND_RECLAMATION_0_5']],
    measureType: 'land-reclamation',
  },
};

// REVISED: Zone 2 is now fully self-contained with no dependency on Zone 1.
const zone2Template: Record<string, TemplateAction> = {
  // --- MANGROVE PATH ---
  PLANT_MANGROVE: {
    displayName: 'Plant', cost: 1, unlocksInRound: 1,
    conflicts: ['BUILD_SEAWALL_0_5', 'BUILD_COASTAL_BARRIER_0_5'],
    measureType: 'mangroves',
  },
  BUILD_BOARDWALK: {
    displayName: 'Build Board Walk', cost: 1, unlocksInRound: 2,
    prerequisites: [['PLANT_MANGROVE']],
    measureType: 'mangroves',
  },
  // --- SEAWALL PATH ---
  BUILD_SEAWALL_0_5: {
    displayName: '0.5m', cost: 1, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_COASTAL_BARRIER_0_5'],
    measureType: 'seawall',
  },
  BUILD_SEAWALL_1_15: {
    displayName: '1.15m', cost: 2, unlocksInRound: 2,
    prerequisites: [['BUILD_SEAWALL_0_5']],
    replaces: 'BUILD_SEAWALL_0_5',
    measureType: 'seawall',
  },
  BUILD_SEAWALL_2: {
    displayName: '2m', cost: 3, unlocksInRound: 2,
    prerequisites: [['BUILD_SEAWALL_0_5'], ['BUILD_SEAWALL_1_15']],
    measureType: 'seawall',
  },
  BUILD_PATH_FROM_SEAWALL: {
    displayName: 'Build Path', cost: 1, unlocksInRound: 2,
    prerequisites: [['BUILD_SEAWALL_0_5'], ['BUILD_SEAWALL_1_15'], ['BUILD_SEAWALL_2']],
    measureType: 'seawall',
  },
  // --- COASTAL BARRIER (STORM SURGE) PATH ---
  BUILD_COASTAL_BARRIER_0_5: {
    displayName: '0.5m', cost: 2, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_SEAWALL_0_5'],
    measureType: 'storm-surge-barrier',
  },
  BUILD_COASTAL_BARRIER_2: {
    displayName: '2m', cost: 4, unlocksInRound: 2,
    prerequisites: [['BUILD_COASTAL_BARRIER_0_5']],
    replaces: 'BUILD_COASTAL_BARRIER_0_5',
    measureType: 'storm-surge-barrier',
  },
};

// REVISED: Zone 3 is now fully self-contained.
const zone3Template: Record<string, TemplateAction> = {
  // --- ARTIFICIAL REEF PATH ---
  BUILD_ARTIFICIAL_REEF: {
    displayName: 'Build', cost: 2, unlocksInRound: 1,
    conflicts: ['BUILD_SEAWALL_0_5', 'BUILD_HYBRID_MEASURE_0_5'],
    measureType: 'artificial-reef',
  },
  BUILD_REVETMENT_1_15: {
    displayName: '1.15m', cost: 3, unlocksInRound: 2,
    prerequisites: [['BUILD_ARTIFICIAL_REEF']],
    measureType: 'revetment',
  },
  BUILD_REVETMENT_2: {
    displayName: '2m', cost: 4, unlocksInRound: 3,
    prerequisites: [['BUILD_REVETMENT_1_15']],
    replaces: 'BUILD_REVETMENT_1_15',
    measureType: 'revetment',
  },
  // --- SEAWALL PATH ---
  BUILD_SEAWALL_0_5: {
    displayName: '0.5m', cost: 1, unlocksInRound: 1,
    conflicts: ['BUILD_ARTIFICIAL_REEF', 'BUILD_HYBRID_MEASURE_0_5'],
    measureType: 'seawall',
  },
  BUILD_SEAWALL_1_15: {
    displayName: '1.15m', cost: 2, unlocksInRound: 2,
    prerequisites: [['BUILD_SEAWALL_0_5']],
    replaces: 'BUILD_SEAWALL_0_5',
    measureType: 'seawall',
  },
  BUILD_SEAWALL_2: {
    displayName: '2m', cost: 3, unlocksInRound: 2,
    prerequisites: [['BUILD_SEAWALL_0_5'], ['BUILD_SEAWALL_1_15']],
    measureType: 'seawall',
  },
  BUILD_PATH_FROM_SEAWALL: {
    displayName: 'Build Path', cost: 1, unlocksInRound: 2,
    prerequisites: [['BUILD_SEAWALL_0_5'], ['BUILD_SEAWALL_1_15'], ['BUILD_SEAWALL_2']],
    measureType: 'seawall',
  },
  // --- HYBRID MEASURE PATH ---
  BUILD_HYBRID_MEASURE_0_5: {
    displayName: '0.5m', cost: 2, unlocksInRound: 1,
    conflicts: ['BUILD_ARTIFICIAL_REEF', 'BUILD_SEAWALL_0_5'],
    measureType: 'hybrid-measure',
  },
  BUILD_HYBRID_MEASURE_1_15: {
    displayName: '1.15m', cost: 3, unlocksInRound: 2,
    prerequisites: [['BUILD_HYBRID_MEASURE_0_5']],
    replaces: 'BUILD_HYBRID_MEASURE_0_5',
    measureType: 'hybrid-measure',
  },
  BUILD_HYBRID_MEASURE_2: {
    displayName: '2m', cost: 4, unlocksInRound: 2,
    prerequisites: [['BUILD_HYBRID_MEASURE_0_5']],
    measureType: 'hybrid-measure',
  },
};

// =========================================================================
//  ENUM MAPPINGS - Maps generic template keys to specific enums per region
// =========================================================================

const zone1A_enums = {
  PLANT_MANGROVE: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
  BUILD_BOARDWALK: ActivityTypeEnum.R1_1A_BUILD_BOARDWALK,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_1A_BUILD_PATH,
  BUILD_LAND_RECLAMATION_0_5: ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION,
  UPGRADE_LR_TO_SEAWALL_1_15: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL,
  UPGRADE_LR_TO_SEAWALL_2: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL,
};
const zone1B_enums = { // Same structure, different enums
  PLANT_MANGROVE: ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES,
  BUILD_BOARDWALK: ActivityTypeEnum.R1_1B_BUILD_BOARDWALK,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_1B_BUILD_PATH,
  BUILD_LAND_RECLAMATION_0_5: ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION,
  UPGRADE_LR_TO_SEAWALL_1_15: ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL,
  UPGRADE_LR_TO_SEAWALL_2: ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL,
};

const zone2A_enums = {
  PLANT_MANGROVE: ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES,
  BUILD_BOARDWALK: ActivityTypeEnum.R1_2A_BUILD_BOARDWALK,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_2A_BUILD_PATH,
  BUILD_COASTAL_BARRIER_0_5: ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER,
  BUILD_COASTAL_BARRIER_2: ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER,
};
const zone2B_enums = {
  PLANT_MANGROVE: ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES,
  BUILD_BOARDWALK: ActivityTypeEnum.R1_2B_BUILD_BOARDWALK,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_2B_BUILD_PATH,
  BUILD_COASTAL_BARRIER_0_5: ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER,
  BUILD_COASTAL_BARRIER_2: ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER,
};

const zone3A_enums = {
  BUILD_ARTIFICIAL_REEF: ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF,
  BUILD_REVETMENT_1_15: ActivityTypeEnum.R1_3A_BUILD_1_15_REVETMENT,
  BUILD_REVETMENT_2: ActivityTypeEnum.R1_3A_BUILD_2_REVETMENT,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_3A_BUILD_PATH,
  BUILD_HYBRID_MEASURE_0_5: ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE,
  BUILD_HYBRID_MEASURE_1_15: ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE,
  BUILD_HYBRID_MEASURE_2: ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE,
};
const zone3B_enums = {
  BUILD_ARTIFICIAL_REEF: ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF,
  BUILD_REVETMENT_1_15: ActivityTypeEnum.R1_3B_BUILD_1_15_REVETMENT,
  BUILD_REVETMENT_2: ActivityTypeEnum.R1_3B_BUILD_2_REVETMENT,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_3B_BUILD_PATH,
  BUILD_HYBRID_MEASURE_0_5: ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE,
  BUILD_HYBRID_MEASURE_1_15: ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE,
  BUILD_HYBRID_MEASURE_2: ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE,
};

// =========================================================================
//  GENERATOR FUNCTION
// =========================================================================

function createZoneActions(template: Record<string, TemplateAction>, enumMap: Record<string, ActivityTypeEnum>, sector: string): Record<string, ActionConfig> {
  const finalConfig: Record<string, ActionConfig> = {};

  for (const key in template) {
    const templateAction = template[key];
    const finalId = enumMap[key];

    if (!finalId) continue; // Skip if no enum mapping exists

    const newAction: ActionConfig = {
      ...templateAction,
      id: finalId,
      sector,
      prerequisites: templateAction.prerequisites?.map(orGroup =>
        orGroup.map(id => enumMap[id]).filter(Boolean)
      ).filter(group => group.length > 0),
      replaces: templateAction.replaces ? enumMap[templateAction.replaces] : undefined,
      conflicts: templateAction.conflicts?.map(id => enumMap[id]).filter(Boolean),
    };

    finalConfig[finalId as string] = newAction;
  }

  return finalConfig;
}

// =========================================================================
//  FINAL EXPORTED CONFIGURATION
// =========================================================================

export const progressionConfig: Record<string, ActionConfig> = {
  ...createZoneActions(zone1Template, zone1A_enums, '1A'),
  ...createZoneActions(zone1Template, zone1B_enums, '1B'),
  ...createZoneActions(zone2Template, zone2A_enums, '2A'),
  ...createZoneActions(zone2Template, zone2B_enums, '2B'),
  ...createZoneActions(zone3Template, zone3A_enums, '3A'),
  ...createZoneActions(zone3Template, zone3B_enums, '3B'),
};