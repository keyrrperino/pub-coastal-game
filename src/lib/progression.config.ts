import { ActivityTypeEnum } from './enums';
import { ActionConfig, DynamicCostConfig } from './types';

// Re-export ActionConfig for backward compatibility
export type { ActionConfig } from './types';

// Template-specific types for configuration
interface TemplateDynamicCostRule {
  /** Prerequisites that must be active for this cost to apply (template keys) */
  requiredActiveActions?: string[];
  /** The cost when this rule matches */
  cost: number;
}

interface TemplateDynamicCostConfig {
  /** Default cost (current system) */
  defaultCost: number;
  /** Rules for dynamic costs */
  dynamicRules?: TemplateDynamicCostRule[];
}

// =========================================================================
//  ACTION TEMPLATES - Generic logic for each Zone
// =========================================================================

interface TemplateAction {
  /** The human-readable name for the UI. */
  displayName: string;
  /** The resource cost of the action (e.g., number of coins). Can be static or dynamic. */
  cost: number | TemplateDynamicCostConfig;
  /** The minimum game round in which this action becomes available. */
  unlocksInRound: number;
  /**
   * Defines prerequisites using OR/AND logic.
   * Format: `[['A', 'B'], ['C']]` means "(A AND B) OR C".
   * Uses template keys that will be mapped to ActivityTypeEnum values.
   */
  prerequisites?: string[][];
  /**
   * The template keys of actions that this one replaces upon being built.
   * The logic engine will treat the replaced actions as no longer active.
   */
  replaces?: string[];
  /** Template keys of actions that are mutually exclusive with this one. */
  conflicts?: string[];
  /** 
   * Template keys of actions that become unavailable when this action is built.
   * Used for cases like Build Path blocking seawall upgrades.
   */
  blocksActions?: string[];
  /** The type of coastal protection measure this action represents. */
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
  // --- SEAWALL PATH (NEW: All heights available in R1, but with upgrade chain) ---
  BUILD_SEAWALL_0_5: {
    displayName: '0.5m', cost: 1, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_LAND_RECLAMATION_0_5'],
    measureType: 'seawall',
  },
  BUILD_SEAWALL_1_15: {
    displayName: '1.15m', 
    cost: {
      defaultCost: 2,
      dynamicRules: [
        {
          requiredActiveActions: ['BUILD_SEAWALL_0_5'],
          cost: 1 // Upgrade from 0.5m to 1.15m costs only 1 coin
        }
      ]
    }, 
    unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_LAND_RECLAMATION_0_5'],
    replaces: ['BUILD_SEAWALL_0_5'],
    measureType: 'seawall',
  },
  BUILD_SEAWALL_2: {
    displayName: '2m', 
    cost: {
      defaultCost: 3,
      dynamicRules: [
        {
          requiredActiveActions: ['BUILD_SEAWALL_0_5'],
          cost: 2 // Upgrade from 0.5m to 2.00m costs only 2 coins
        },
        {
          requiredActiveActions: ['BUILD_SEAWALL_1_15'],
          cost: 1 // Upgrade from 1.15m to 2.00m costs only 1 coin
        }
      ]
    }, 
    unlocksInRound: 2,
    conflicts: ['PLANT_MANGROVE', 'BUILD_LAND_RECLAMATION_0_5'],
    replaces: ['BUILD_SEAWALL_0_5', 'BUILD_SEAWALL_1_15'],
    measureType: 'seawall',
  },
  BUILD_PATH_FROM_SEAWALL: {
    displayName: 'Build Path', cost: 1, unlocksInRound: 3,
    prerequisites: [['BUILD_SEAWALL_0_5'], ['BUILD_SEAWALL_1_15'], ['BUILD_SEAWALL_2']],
    blocksActions: ['BUILD_SEAWALL_0_5', 'BUILD_SEAWALL_1_15', 'BUILD_SEAWALL_2'],
    measureType: 'seawall',
  },
  // --- LAND RECLAMATION PATH ---
  BUILD_LAND_RECLAMATION_0_5: {
    displayName: '0.5m', cost: 3, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_SEAWALL_0_5'],
    blocksActions: ['BUILD_LAND_RECLAMATION_1_15', 'BUILD_LAND_RECLAMATION_2'],
    measureType: 'land-reclamation',
  },
  BUILD_LAND_RECLAMATION_1_15: {
    displayName: '1.15m', cost: 4, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_SEAWALL_0_5'],
    blocksActions: ['BUILD_LAND_RECLAMATION_0_5', 'BUILD_LAND_RECLAMATION_2'],
    measureType: 'land-reclamation',
  },
  BUILD_LAND_RECLAMATION_2: {
    displayName: '2m', cost: 5, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_SEAWALL_0_5'],
    blocksActions: ['BUILD_LAND_RECLAMATION_0_5', 'BUILD_LAND_RECLAMATION_1_15'],
    measureType: 'land-reclamation',
  },
  UPGRADE_LR_TO_SEAWALL_1_15: {
    displayName: 'Sea Wall 1.15m', cost: 2, unlocksInRound: 2,
    prerequisites: [['BUILD_LAND_RECLAMATION_0_5']],
    blocksActions: ['BUILD_LAND_RECLAMATION_0_5', 'BUILD_LAND_RECLAMATION_1_15', 'BUILD_LAND_RECLAMATION_2'],
    measureType: 'land-reclamation',
  },
  UPGRADE_LR_TO_SEAWALL_2: {
    displayName: 'Sea Wall 2m', cost: 3, unlocksInRound: 2,
    prerequisites: [['BUILD_LAND_RECLAMATION_0_5'], ['BUILD_LAND_RECLAMATION_1_15']],
    replaces: ['UPGRADE_LR_TO_SEAWALL_1_15'],
    blocksActions: ['BUILD_LAND_RECLAMATION_0_5', 'BUILD_LAND_RECLAMATION_1_15', 'BUILD_LAND_RECLAMATION_2'],
    measureType: 'land-reclamation',
  },
  UPGRADE_LR_TO_SEAWALL_3: {
    displayName: 'Sea Wall 3m', cost: 4, unlocksInRound: 2,
    prerequisites: [['BUILD_LAND_RECLAMATION_1_15'], ['BUILD_LAND_RECLAMATION_2']],
    replaces: ['UPGRADE_LR_TO_SEAWALL_1_15', 'UPGRADE_LR_TO_SEAWALL_2'],
    blocksActions: ['BUILD_LAND_RECLAMATION_0_5', 'BUILD_LAND_RECLAMATION_1_15', 'BUILD_LAND_RECLAMATION_2'],
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
  // --- SEAWALL PATH (NEW: All heights available in R1, but with upgrade chain) ---
  BUILD_SEAWALL_0_5: {
    displayName: '0.5m', cost: 1, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_COASTAL_BARRIER_0_5'],
    measureType: 'seawall',
  },
  BUILD_SEAWALL_1_15: {
    displayName: '1.15m', 
    cost: {
      defaultCost: 2,
      dynamicRules: [
        {
          requiredActiveActions: ['BUILD_SEAWALL_0_5'],
          cost: 1 // Upgrade from 0.5m to 1.15m costs only 1 coin
        }
      ]
    }, 
    unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_COASTAL_BARRIER_0_5'],
    replaces: ['BUILD_SEAWALL_0_5'],
    measureType: 'seawall',
  },
  BUILD_SEAWALL_2: {
    displayName: '2m', 
    cost: {
      defaultCost: 3,
      dynamicRules: [
        {
          requiredActiveActions: ['BUILD_SEAWALL_0_5'],
          cost: 2 // Upgrade from 0.5m to 2.00m costs only 2 coins
        },
        {
          requiredActiveActions: ['BUILD_SEAWALL_1_15'],
          cost: 1 // Upgrade from 1.15m to 2.00m costs only 1 coin
        }
      ]
    }, 
    unlocksInRound: 2,
    conflicts: ['PLANT_MANGROVE', 'BUILD_COASTAL_BARRIER_0_5'],
    replaces: ['BUILD_SEAWALL_0_5', 'BUILD_SEAWALL_1_15'],
    measureType: 'seawall',
  },
  BUILD_PATH_FROM_SEAWALL: {
    displayName: 'Build Path', cost: 1, unlocksInRound: 3,
    prerequisites: [['BUILD_SEAWALL_0_5'], ['BUILD_SEAWALL_1_15'], ['BUILD_SEAWALL_2']],
    blocksActions: ['BUILD_SEAWALL_0_5', 'BUILD_SEAWALL_1_15', 'BUILD_SEAWALL_2'],
    measureType: 'seawall',
  },
  // --- COASTAL BARRIERS PATH ---
  BUILD_COASTAL_BARRIER_0_5: {
    displayName: '0.5m', cost: 3, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_SEAWALL_0_5'],
    blocksActions: ['BUILD_COASTAL_BARRIER_2'],
    measureType: 'storm-surge-barrier',
  },
  BUILD_COASTAL_BARRIER_2: {
    displayName: '2m', cost: 5, unlocksInRound: 1,
    conflicts: ['PLANT_MANGROVE', 'BUILD_SEAWALL_0_5'],
    blocksActions: ['BUILD_COASTAL_BARRIER_0_5'],
    measureType: 'storm-surge-barrier',
  },
};

// REVISED: Zone 3 is now fully self-contained.
const zone3Template: Record<string, TemplateAction> = {
  // --- ARTIFICIAL REEF PATH ---
  BUILD_ARTIFICIAL_REEF: {
    displayName: 'Build', cost: 1, unlocksInRound: 1,
    conflicts: ['BUILD_SEAWALL_0_5', 'BUILD_HYBRID_MEASURE_0_5'],
    measureType: 'artificial-reef',
  },
  BUILD_REVETMENT_1_15: {
    displayName: 'Rocky Revet 1.15m', cost: 1, unlocksInRound: 2,
    prerequisites: [['BUILD_ARTIFICIAL_REEF']],
    measureType: 'artificial-reef',
  },
  BUILD_REVETMENT_2: {
    displayName: 'Rocky Revet 2m', 
    cost: {
      defaultCost: 2,
      dynamicRules: [
        {
          requiredActiveActions: ['BUILD_REVETMENT_1_15'],
          cost: 1 // Artificial Reef + Rocky Revet 1.15 upgrade to Rocky Revet 2.0 costs only 1 coin
        }
      ]
    }, 
    unlocksInRound: 2,
    prerequisites: [['BUILD_ARTIFICIAL_REEF']],
    replaces: ['BUILD_REVETMENT_1_15'],
    measureType: 'artificial-reef',
  },
  // --- SEAWALL PATH (NEW: All heights available in R1, but with upgrade chain) ---
  BUILD_SEAWALL_0_5: {
    displayName: '0.5m', cost: 1, unlocksInRound: 1,
    conflicts: ['BUILD_ARTIFICIAL_REEF', 'BUILD_HYBRID_MEASURE_0_5'],
    measureType: 'seawall',
  },
  BUILD_SEAWALL_1_15: {
    displayName: '1.15m', 
    cost: {
      defaultCost: 2,
      dynamicRules: [
        {
          requiredActiveActions: ['BUILD_SEAWALL_0_5'],
          cost: 1 // Upgrade from 0.5m to 1.15m costs only 1 coin
        }
      ]
    }, 
    unlocksInRound: 1,
    conflicts: ['BUILD_ARTIFICIAL_REEF', 'BUILD_HYBRID_MEASURE_0_5'],
    replaces: ['BUILD_SEAWALL_0_5'],
    measureType: 'seawall',
  },
  BUILD_SEAWALL_2: {
    displayName: '2m', 
    cost: {
      defaultCost: 3,
      dynamicRules: [
        {
          requiredActiveActions: ['BUILD_SEAWALL_0_5'],
          cost: 2 // Upgrade from 0.5m to 2.00m costs only 2 coins
        },
        {
          requiredActiveActions: ['BUILD_SEAWALL_1_15'],
          cost: 1 // Upgrade from 1.15m to 2.00m costs only 1 coin
        }
      ]
    }, 
    unlocksInRound: 2,
    conflicts: ['BUILD_ARTIFICIAL_REEF', 'BUILD_HYBRID_MEASURE_0_5'],
    replaces: ['BUILD_SEAWALL_0_5', 'BUILD_SEAWALL_1_15'],
    measureType: 'seawall',
  },
  BUILD_PATH_FROM_SEAWALL: {
    displayName: 'Build Path', cost: 1, unlocksInRound: 3,
    prerequisites: [['BUILD_SEAWALL_0_5'], ['BUILD_SEAWALL_1_15'], ['BUILD_SEAWALL_2']],
    blocksActions: ['BUILD_SEAWALL_0_5', 'BUILD_SEAWALL_1_15', 'BUILD_SEAWALL_2'],
    measureType: 'seawall',
  },
  // --- HYBRID MEASURE PATH ---
  BUILD_HYBRID_MEASURE_0_5: {
    displayName: '0.5m', cost: 1, unlocksInRound: 1,
    conflicts: ['BUILD_ARTIFICIAL_REEF', 'BUILD_SEAWALL_0_5'],
    measureType: 'hybrid-measure',
  },
  BUILD_HYBRID_MEASURE_1_15: {
    displayName: '1.15m', 
    cost: {
      defaultCost: 2,
      dynamicRules: [
        {
          requiredActiveActions: ['BUILD_HYBRID_MEASURE_0_5'],
          cost: 1 // Upgrade from 0.5m to 1.15m costs only 1 coin
        }
      ]
    }, 
    unlocksInRound: 1,
    conflicts: ['BUILD_ARTIFICIAL_REEF', 'BUILD_SEAWALL_0_5'],
    replaces: ['BUILD_HYBRID_MEASURE_0_5'],
    measureType: 'hybrid-measure',
  },
  BUILD_HYBRID_MEASURE_2: {
    displayName: '2m', 
    cost: {
      defaultCost: 3,
      dynamicRules: [
        {
          requiredActiveActions: ['BUILD_HYBRID_MEASURE_0_5'],
          cost: 2 // Upgrade from 0.5m to 2.00m costs only 2 coins
        },
        {
          requiredActiveActions: ['BUILD_HYBRID_MEASURE_1_15'],
          cost: 1 // Upgrade from 1.15m to 2.00m costs only 1 coin
        }
      ]
    }, 
    unlocksInRound: 2,
    conflicts: ['BUILD_ARTIFICIAL_REEF', 'BUILD_SEAWALL_0_5'],
    replaces: ['BUILD_HYBRID_MEASURE_0_5', 'BUILD_HYBRID_MEASURE_1_15'],
    measureType: 'hybrid-measure',
  },
  BUILD_PATH_FROM_HYBRID: {
    displayName: 'Build Path', cost: 1, unlocksInRound: 3,
    prerequisites: [['BUILD_HYBRID_MEASURE_0_5'], ['BUILD_HYBRID_MEASURE_1_15'], ['BUILD_HYBRID_MEASURE_2']],
    blocksActions: ['BUILD_HYBRID_MEASURE_0_5', 'BUILD_HYBRID_MEASURE_1_15', 'BUILD_HYBRID_MEASURE_2'],
    measureType: 'hybrid-measure',
  },
};

// =========================================================================
//  ENUM MAPPINGS - Maps generic template keys to specific enums per region
// =========================================================================

const zone1A_enums = {
  PLANT_MANGROVE: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
  BUILD_BOARDWALK: ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH,
  BUILD_LAND_RECLAMATION_0_5: ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION,
  BUILD_LAND_RECLAMATION_1_15: ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION,
  BUILD_LAND_RECLAMATION_2: ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION,
  UPGRADE_LR_TO_SEAWALL_1_15: ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL,
  UPGRADE_LR_TO_SEAWALL_2: ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL,
  UPGRADE_LR_TO_SEAWALL_3: ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL,
};
const zone1B_enums = { // Same structure, different enums
  PLANT_MANGROVE: ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES,
  BUILD_BOARDWALK: ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH,
  BUILD_LAND_RECLAMATION_0_5: ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION,
  BUILD_LAND_RECLAMATION_1_15: ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION,
  BUILD_LAND_RECLAMATION_2: ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION,
  UPGRADE_LR_TO_SEAWALL_1_15: ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15,
  UPGRADE_LR_TO_SEAWALL_2: ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2,
  UPGRADE_LR_TO_SEAWALL_3: ActivityTypeEnum.R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL,
};

const zone2A_enums = {
  PLANT_MANGROVE: ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES,
  BUILD_BOARDWALK: ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH,
  BUILD_COASTAL_BARRIER_0_5: ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER,
  BUILD_COASTAL_BARRIER_2: ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER,
};
const zone2B_enums = {
  PLANT_MANGROVE: ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES,
  BUILD_BOARDWALK: ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH,
  BUILD_COASTAL_BARRIER_0_5: ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER,
  BUILD_COASTAL_BARRIER_2: ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER,
};

const zone3A_enums = {
  BUILD_ARTIFICIAL_REEF: ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF,
  BUILD_REVETMENT_1_15: ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT,
  BUILD_REVETMENT_2: ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH,
  BUILD_HYBRID_MEASURE_0_5: ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE,
  BUILD_HYBRID_MEASURE_1_15: ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE,
  BUILD_HYBRID_MEASURE_2: ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE,
  BUILD_PATH_FROM_HYBRID: ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH,
};
const zone3B_enums = {
  BUILD_ARTIFICIAL_REEF: ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF,
  BUILD_REVETMENT_1_15: ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT,
  BUILD_REVETMENT_2: ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT,
  BUILD_SEAWALL_0_5: ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL,
  BUILD_SEAWALL_1_15: ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL,
  BUILD_SEAWALL_2: ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL,
  BUILD_PATH_FROM_SEAWALL: ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH,
  BUILD_HYBRID_MEASURE_0_5: ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE,
  BUILD_HYBRID_MEASURE_1_15: ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE,
  BUILD_HYBRID_MEASURE_2: ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE,
  BUILD_PATH_FROM_HYBRID: ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH,
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

    // Handle dynamic cost configuration - map template keys to ActivityTypeEnum values
    let cost = templateAction.cost;
    if (typeof cost === 'object' && cost !== null && 'dynamicRules' in cost) {
      const dynamicRules = cost.dynamicRules?.map(rule => ({
        cost: rule.cost,
        requiredActiveActions: rule.requiredActiveActions?.map(
          templateKey => enumMap[templateKey]
        ).filter(Boolean) as ActivityTypeEnum[]
      }));
      
      cost = {
        defaultCost: cost.defaultCost,
        dynamicRules
      } as DynamicCostConfig;
    }

    const newAction: ActionConfig = {
      ...templateAction,
      id: finalId,
      cost: cost as number | DynamicCostConfig,
      sector,
      prerequisites: templateAction.prerequisites?.map(orGroup =>
        orGroup.map(id => enumMap[id]).filter(Boolean)
      ).filter(group => group.length > 0),
      replaces: templateAction.replaces ? 
        templateAction.replaces.map(r => enumMap[r]).filter(Boolean) : undefined,
      conflicts: templateAction.conflicts?.map(id => enumMap[id]).filter(Boolean),
      blocksActions: templateAction.blocksActions?.map(id => enumMap[id]).filter(Boolean),
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