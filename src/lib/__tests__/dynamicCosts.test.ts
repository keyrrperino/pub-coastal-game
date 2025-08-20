import { calculateDynamicCost, createDynamicCostConfig, createDynamicCostRule } from '../dynamicCosts';
import { ActivityTypeEnum } from '../enums';

describe('Dynamic Cost System', () => {
  describe('calculateDynamicCost', () => {
    it('should return static cost when number is provided', () => {
      const cost = calculateDynamicCost(5, 1, new Set());
      expect(cost).toBe(5);
    });

    it('should return default cost when no rules match', () => {
      const costConfig = createDynamicCostConfig(3, [
        createDynamicCostRule([2, 3], 1)
      ]);
      
      const cost = calculateDynamicCost(costConfig, 1, new Set());
      expect(cost).toBe(3); // Default cost for round 1
    });

    it('should apply dynamic cost when round matches', () => {
      const costConfig = createDynamicCostConfig(3, [
        createDynamicCostRule([2, 3], 1) // R2 & R3 cost 1 coin
      ]);
      
      const cost = calculateDynamicCost(costConfig, 2, new Set());
      expect(cost).toBe(1); // Dynamic cost for round 2
    });

    it('should not apply dynamic cost when round does not match', () => {
      const costConfig = createDynamicCostConfig(3, [
        createDynamicCostRule([2, 3], 1) // R2 & R3 cost 1 coin
      ]);
      
      const cost = calculateDynamicCost(costConfig, 1, new Set());
      expect(cost).toBe(3); // Default cost for round 1
    });

    it('should apply dynamic cost when required actions are present', () => {
      const costConfig = createDynamicCostConfig(2, [
        createDynamicCostRule([2, 3], 1, [ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF]);
      const cost = calculateDynamicCost(costConfig, 2, activeActions);
      expect(cost).toBe(1); // Dynamic cost when artificial reef is active
    });

    it('should not apply dynamic cost when required actions are missing', () => {
      const costConfig = createDynamicCostConfig(2, [
        createDynamicCostRule([2, 3], 1, [ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL]);
      const cost = calculateDynamicCost(costConfig, 2, activeActions);
      expect(cost).toBe(2); // Default cost when artificial reef is not active
    });
  });

  describe('Seawall upgrade costs', () => {
    it('should cost 1 coin for 0.5m to 1.15m upgrade in R2 & R3', () => {
      const costConfig = createDynamicCostConfig(2, [
        createDynamicCostRule([2, 3], 1) // R2 & R3: upgrade from 0.5m to 1.15m costs only 1 coin
      ]);
      
      const costRound2 = calculateDynamicCost(costConfig, 2, new Set());
      const costRound3 = calculateDynamicCost(costConfig, 3, new Set());
      
      expect(costRound2).toBe(1);
      expect(costRound3).toBe(1);
    });

    it('should cost 2 coins for 0.5m to 2.00m upgrade in R2 & R3', () => {
      const costConfig = createDynamicCostConfig(3, [
        createDynamicCostRule([2, 3], 2) // R2 & R3: upgrade from 0.5m to 2.00m costs only 2 coins
      ]);
      
      const costRound2 = calculateDynamicCost(costConfig, 2, new Set());
      const costRound3 = calculateDynamicCost(costConfig, 3, new Set());
      
      expect(costRound2).toBe(2);
      expect(costRound3).toBe(2);
    });

    it('should cost 1 coin for 1.15m to 2.00m upgrade in R2 & R3', () => {
      const costConfig = createDynamicCostConfig(3, [
        createDynamicCostRule([2, 3], 1) // R2 & R3: upgrade from 1.15m to 2.00m costs only 1 coin
      ]);
      
      const costRound2 = calculateDynamicCost(costConfig, 2, new Set());
      const costRound3 = calculateDynamicCost(costConfig, 3, new Set());
      
      expect(costRound2).toBe(1);
      expect(costRound3).toBe(1);
    });
  });

  describe('Artificial reef upgrade costs', () => {
    it('should cost 1 coin for Rocky Revet 1.15 to 2.0 upgrade in R2 & R3 when Artificial Reef is active', () => {
      const costConfig = createDynamicCostConfig(2, [
        createDynamicCostRule([2, 3], 1, [ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF]);
      const costRound2 = calculateDynamicCost(costConfig, 2, activeActions);
      const costRound3 = calculateDynamicCost(costConfig, 3, activeActions);
      
      expect(costRound2).toBe(1);
      expect(costRound3).toBe(1);
    });

    it('should cost default 2 coins when Artificial Reef is not active', () => {
      const costConfig = createDynamicCostConfig(2, [
        createDynamicCostRule([2, 3], 1, [ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF])
      ]);
      
      const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL]);
      const costRound2 = calculateDynamicCost(costConfig, 2, activeActions);
      
      expect(costRound2).toBe(2); // Default cost when artificial reef is not active
    });
  });
});