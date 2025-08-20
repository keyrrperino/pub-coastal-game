import { calculateDynamicCost, createDynamicCostConfig, createDynamicCostRule } from '../dynamicCosts';
import { ActivityTypeEnum } from '../enums';

describe('Dynamic Cost System', () => {
  describe('calculateDynamicCost', () => {
    it('should return static cost when number is provided', () => {
      const cost = calculateDynamicCost(5, new Set());
      expect(cost).toBe(5);
    });

    it('should return default cost when no rules match', () => {
      const costConfig = createDynamicCostConfig(3, [
        createDynamicCostRule(1, [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL])
      ]);
      
      const cost = calculateDynamicCost(costConfig, new Set());
      expect(cost).toBe(3); // Default cost when required action is not present
    });

    it('should apply dynamic cost when required actions are present', () => {
      const costConfig = createDynamicCostConfig(2, [
        createDynamicCostRule(1, [ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF]);
      const cost = calculateDynamicCost(costConfig, activeActions);
      expect(cost).toBe(1); // Dynamic cost when artificial reef is active
    });

    it('should not apply dynamic cost when required actions are missing', () => {
      const costConfig = createDynamicCostConfig(2, [
        createDynamicCostRule(1, [ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL]);
      const cost = calculateDynamicCost(costConfig, activeActions);
      expect(cost).toBe(2); // Default cost when artificial reef is not active
    });

    it('should apply dynamic cost for seawall upgrade when 0.5m seawall is present', () => {
      const costConfig = createDynamicCostConfig(2, [
        createDynamicCostRule(1, [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
      const cost = calculateDynamicCost(costConfig, activeActions);
      expect(cost).toBe(1); // Upgrade cost from 0.5m to 1.15m
    });

    it('should apply default cost when seawall is not present', () => {
      const costConfig = createDynamicCostConfig(2, [
        createDynamicCostRule(1, [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const cost = calculateDynamicCost(costConfig, activeActions);
      expect(cost).toBe(2); // Default cost when no seawall is present
    });

    it('should handle multiple required actions', () => {
      const costConfig = createDynamicCostConfig(3, [
        createDynamicCostRule(1, [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const cost = calculateDynamicCost(costConfig, activeActions);
      expect(cost).toBe(1); // Dynamic cost when both required actions are present
    });

    it('should not apply dynamic cost when only some required actions are present', () => {
      const costConfig = createDynamicCostConfig(3, [
        createDynamicCostRule(1, [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
      const cost = calculateDynamicCost(costConfig, activeActions);
      expect(cost).toBe(3); // Default cost when only one required action is present
    });

    it('should apply first matching rule when multiple rules exist', () => {
      const costConfig = createDynamicCostConfig(5, [
        createDynamicCostRule(1, [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]),
        createDynamicCostRule(2, [ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const cost = calculateDynamicCost(costConfig, activeActions);
      expect(cost).toBe(1); // First matching rule applies
    });

    it('should handle empty dynamic rules array', () => {
      const costConfig = createDynamicCostConfig(3, []);
      
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
      const cost = calculateDynamicCost(costConfig, activeActions);
      expect(cost).toBe(3); // Default cost when no rules
    });

    it('should handle empty dynamic rules array', () => {
      const costConfig = createDynamicCostConfig(3, []);
      
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
      const cost = calculateDynamicCost(costConfig, activeActions);
      expect(cost).toBe(3); // Default cost when no rules
    });
  });
});