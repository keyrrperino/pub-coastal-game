import { ActivityTypeEnum } from './enums';
import { DynamicCostConfig, DynamicCostRule } from './types';

/**
 * Calculate the dynamic cost for an action based on current game state
 * @param costConfig - Either a static number or DynamicCostConfig object
 * @param currentRound - The current game round
 * @param activeActions - Set of currently active actions
 * @returns The calculated cost as a number
 */
export function calculateDynamicCost(
  costConfig: number | DynamicCostConfig,
  currentRound: number,
  activeActions: Set<ActivityTypeEnum>
): number {
  // If it's a simple number, return it (backwards compatibility)
  if (typeof costConfig === 'number') {
    return costConfig;
  }
  
  // Check dynamic rules in order
  for (const rule of costConfig.dynamicRules || []) {
    // Check if current round matches
    if (!rule.rounds.includes(currentRound)) {
      continue;
    }
    
    // Check if required active actions are present
    if (rule.requiredActiveActions) {
      const hasAllRequired = rule.requiredActiveActions.every(
        action => activeActions.has(action)
      );
      if (!hasAllRequired) {
        continue;
      }
    }
    
    // Rule matches - return dynamic cost
    return rule.cost;
  }
  
  // No dynamic rules matched - return default cost
  return costConfig.defaultCost;
}

/**
 * Helper function to create a dynamic cost config with default cost and rules
 * @param defaultCost - The default cost when no rules match
 * @param rules - Array of dynamic cost rules
 * @returns DynamicCostConfig object
 */
export function createDynamicCostConfig(
  defaultCost: number,
  rules: DynamicCostRule[]
): DynamicCostConfig {
  return {
    defaultCost,
    dynamicRules: rules
  };
}

/**
 * Helper function to create a dynamic cost rule
 * @param rounds - Array of rounds this rule applies to
 * @param cost - The cost when this rule matches
 * @param requiredActiveActions - Optional array of required active actions (can be string[] for template usage)
 * @returns DynamicCostRule object
 */
export function createDynamicCostRule(
  rounds: number[],
  cost: number,
  requiredActiveActions?: ActivityTypeEnum[] | string[]
): DynamicCostRule {
  return {
    rounds,
    cost,
    requiredActiveActions: requiredActiveActions as ActivityTypeEnum[]
  };
}