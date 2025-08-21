import { ActivityTypeEnum } from '../enums';
import { ActionStatus, ActivityLogType } from '../types';
import {
  prerequisitesAreMet,
  getActionState,
  getActiveCPMPath,
  calculateActiveActions,
  getActionsForMeasureType,
  getSectorActions,
  isActionReplaced,
  hasAnyConstructionInSector,
  getActionWithDynamicCost
} from '../progressionUtils';
import { progressionConfig } from '../progression.config';

describe('Progression Utils', () => {
  
  describe('prerequisitesAreMet', () => {
    it('should return true when no prerequisites are provided', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const result = prerequisitesAreMet([], activeActions);
      expect(result).toBe(true);
    });

    it('should return true when OR logic prerequisites are met', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      // [[PLANT_MANGROVES], [BUILD_SEAWALL]] means "PLANT_MANGROVES OR BUILD_SEAWALL"
      const prerequisites = [
        [ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES],
        [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]
      ];
      const result = prerequisitesAreMet(prerequisites, activeActions);
      expect(result).toBe(true);
    });

    it('should return true when AND logic prerequisites are met', () => {
      const activeActions = new Set([
        ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
        ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK
      ]);
      // [[PLANT_MANGROVES, BUILD_BOARDWALK]] means "PLANT_MANGROVES AND BUILD_BOARDWALK"
      const prerequisites = [
        [ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK]
      ];
      const result = prerequisitesAreMet(prerequisites, activeActions);
      expect(result).toBe(true);
    });

    it('should return false when prerequisites are not met', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const prerequisites = [
        [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL] // Only seawall required, but we have mangroves
      ];
      const result = prerequisitesAreMet(prerequisites, activeActions);
      expect(result).toBe(false);
    });
  });

  describe('New Seawall Behavior - All Heights Available in R1', () => {
    it('should detect seawall path when 1.15m is selected in R1', () => {
      // New behavior: Player selects 1.15m directly in R1 (no replacement)
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test User', round: 1 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Should detect seawall path
      expect(activeCPMPath).toBe('seawall');
      expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL)).toBe(true);
      expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL)).toBe(false); // Not selected
    });

    it('should show correct seawall options after 1.15m selection in R1', () => {
      // New behavior: 1.15m selected directly in R1
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test User', round: 1 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Get seawall actions for Round 2
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2);
      
      // Should show seawall actions (0.5m, 1.15m, 2m)
      expect(seawallActions.length).toBe(3);
      
      // Find the 0.5m action - should be REPLACED (1.15m replaces 0.5m)
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      expect(action05?.status).toBe(ActionStatus.REPLACED);
      
      // Find the 1.15m action - should be COMPLETED
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      expect(action115?.status).toBe(ActionStatus.COMPLETED);
      
      // Find the 2m action - should be SELECTABLE
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      expect(action2m?.status).toBe(ActionStatus.SELECTABLE);
      
      // Build Path unlocks in Round 3, not Round 2, so we test it separately
      const seawallActionsR3 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3);
      const buildPath = seawallActionsR3.find(a => a.config.displayName === 'Build Path');
      expect(buildPath?.status).toBe(ActionStatus.SELECTABLE);
    });

    it('should show correct seawall options after 2m upgrade', () => {
      // Test the full upgrade chain: 0.5m → 1.15m → 2m
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test User' },
        { id: '2', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 2000, value: '', userId: 'test', userName: 'Test User' },
        { id: '3', action: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL, timestamp: 3000, value: '', userId: 'test', userName: 'Test User' }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Get seawall actions for Round 2
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2);
      
      // Debug: Verify the replacement chain works correctly
      // Active actions after 2m upgrade should only contain the 2m seawall
      // 0.5m and 1.15m should both show as REPLACED due to transitive replacement logic
      
      // Find the 0.5m action - should be REPLACED (it was replaced by 1.15m!)
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      expect(action05?.status).toBe(ActionStatus.REPLACED);
      
      // Find the 1.15m action - should be REPLACED (it was replaced by 2m!)
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      expect(action115?.status).toBe(ActionStatus.REPLACED);
      
      // Find the 2m action - should be COMPLETED
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      expect(action2m?.status).toBe(ActionStatus.COMPLETED);
    });
  });

  describe('isActionReplaced', () => {
    it('should return true when action is replaced by an active action', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL]);
      const result = isActionReplaced(ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, activeActions);
      expect(result).toBe(true);
    });

    it('should return false when action is not replaced', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const result = isActionReplaced(ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, activeActions);
      expect(result).toBe(false);
    });

    it('should return false when no actions are active', () => {
      const activeActions = new Set<ActivityTypeEnum>();
      const result = isActionReplaced(ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, activeActions);
      expect(result).toBe(false);
    });

    it('should handle transitive replacements (0.5m → 1.15m → 2m)', () => {
      // When 2m is active, both 1.15m and 0.5m should be considered replaced
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL]);
      
      // Direct replacement: 2m replaces 1.15m
      const result115 = isActionReplaced(ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, activeActions);
      expect(result115).toBe(true);
      
      // Direct replacement: 2m replaces 0.5m (new array-based replacement)
      const result05 = isActionReplaced(ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, activeActions);
      expect(result05).toBe(true);
    });

    it('should handle direct jump from 0.5m to 2m', () => {
      // Test the specific scenario: 0.5m built, then jump directly to 2m
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test User' },
        { id: '2', action: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL, timestamp: 2000, value: '', userId: 'test', userName: 'Test User' }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Get seawall actions for Round 2
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2);
      
      // Find the 0.5m action - should be REPLACED (2m replaces both 0.5m and 1.15m)
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      expect(action05?.status).toBe(ActionStatus.REPLACED);
      
      // Find the 1.15m action - should be REPLACED (2m replaces both 0.5m and 1.15m)
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      expect(action115?.status).toBe(ActionStatus.REPLACED);
      
      // Find the 2m action - should be COMPLETED
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      expect(action2m?.status).toBe(ActionStatus.COMPLETED);
      
      // Only 2m should be active
      expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL)).toBe(true);
      expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL)).toBe(false);
      expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL)).toBe(false);
    });
  });

  describe('getActionState', () => {
    const mockAction = {
      id: ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK,
      displayName: 'Build Boardwalk',
      cost: 1,
      unlocksInRound: 2,
      sector: '1A',
      measureType: 'mangroves' as const,
      prerequisites: [[ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]]
    };

    it('should return COMPLETED when action is already active', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK]);
      const result = getActionState(mockAction, activeActions, null, 2);
      expect(result.status).toBe(ActionStatus.COMPLETED);
    });

    it('should return LOCKED_CONFLICT when conflicting CPM path is active', () => {
      const baseSeawallAction = {
        id: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
        displayName: 'Build Seawall 0.5m',
        cost: 1,
        unlocksInRound: 1,
        sector: '1A',
        measureType: 'seawall' as const
      };
      const activeActions = new Set<ActivityTypeEnum>();
      const result = getActionState(baseSeawallAction, activeActions, 'mangroves', 1);
      expect(result.status).toBe(ActionStatus.LOCKED_CONFLICT);
    });

    it('should return LOCKED_PREREQUISITE when prerequisites are not met', () => {
      const activeActions = new Set<ActivityTypeEnum>(); // No mangroves built
      const result = getActionState(mockAction, activeActions, null, 2);
      expect(result.status).toBe(ActionStatus.LOCKED_PREREQUISITE);
    });

    it('should return LOCKED_PREREQUISITE when round is too low', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const result = getActionState(mockAction, activeActions, 'mangroves', 1); // Round 1, but action unlocks in Round 2
      expect(result.status).toBe(ActionStatus.LOCKED_PREREQUISITE);
    });

    it('should return SELECTABLE when all conditions are met', () => {
      const activeActions = new Set<ActivityTypeEnum>();
      const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES];
      const result = getActionState(config, activeActions, null, 1);
      expect(result.status).toBe(ActionStatus.SELECTABLE);
    });

    it('should return REPLACED when action was replaced by an active action', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL]);
      const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL];
      const result = getActionState(config, activeActions, 'seawall', 2);
      expect(result.status).toBe(ActionStatus.REPLACED);
    });

    describe('with dynamic costs', () => {
      it('should return SELECTABLE with default cost when no upgrade prerequisites exist', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL];
        const result = getActionState(config, activeActions, 'seawall', 1);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(2); // Default cost for 1.15m seawall
      });

      it('should return SELECTABLE with upgrade cost when upgrade prerequisites exist', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
        const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL];
        const result = getActionState(config, activeActions, 'seawall', 1);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(1); // Upgrade cost from 0.5m to 1.15m
      });

      it('should return SELECTABLE with default cost for 2m seawall when no 0.5m exists', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL];
        const result = getActionState(config, activeActions, 'seawall', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(3); // Default cost for 2m seawall
      });

      it('should return SELECTABLE with upgrade cost for 2m seawall when 0.5m exists', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
        const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL];
        const result = getActionState(config, activeActions, 'seawall', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(2); // Upgrade cost from 0.5m to 2.00m
      });

      it('should return SELECTABLE with upgrade cost for 2m seawall when 1.15m exists', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL]);
        const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL];
        const result = getActionState(config, activeActions, 'seawall', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(1); // Upgrade cost from 1.15m to 2.00m
      });

      it('should return SELECTABLE with upgrade cost for 2m seawall when 1.15m exists in Zone 2', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL]);
        const config = progressionConfig[ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL];
        const result = getActionState(config, activeActions, 'seawall', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(1); // Upgrade cost from 1.15m to 2.00m
      });

      it('should return SELECTABLE with upgrade cost for 2m seawall when 1.15m exists in Zone 3', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL]);
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL];
        const result = getActionState(config, activeActions, 'seawall', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(1); // Upgrade cost from 1.15m to 2.00m
      });

      it('should return SELECTABLE with upgrade cost for revetment when both artificial reef and revetment 1.15 exist', () => {
        const activeActions = new Set([
          ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF,
          ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT
        ]);
        const config = progressionConfig[ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT];
        const result = getActionState(config, activeActions, 'artificial-reef', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(1); // Upgrade cost when revetment 1.15 is active
      });

      it('should return LOCKED_PREREQUISITE with default cost for revetment when no artificial reef exists', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const config = progressionConfig[ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT];
        const result = getActionState(config, activeActions, 'artificial-reef', 2);
        
        expect(result.status).toBe(ActionStatus.LOCKED_PREREQUISITE);
        expect(result.config.cost).toBe(2); // Default cost for 2m revetment
      });

      it('should return SELECTABLE with default cost for revetment when only artificial reef exists (without revetment 1.15)', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF]);
        const config = progressionConfig[ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT];
        const result = getActionState(config, activeActions, 'artificial-reef', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(2); // Default cost when only artificial reef exists
      });

      it('should return SELECTABLE with static cost for actions without dynamic pricing', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
        const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES];
        const result = getActionState(config, activeActions, null, 1);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(1); // Static cost unchanged
      });

      it('should handle cross-sector dynamic costs correctly', () => {
        // 0.5m seawall exists in different sector - should not affect cost
        const activeActions = new Set([ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL]);
        const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL];
        const result = getActionState(config, activeActions, 'seawall', 1);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(2); // Default cost (different sector)
      });

      it('should return COMPLETED with dynamic cost for completed actions', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL]);
        const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL];
        const result = getActionState(config, activeActions, 'seawall', 1);
        
        expect(result.status).toBe(ActionStatus.COMPLETED);
        expect(result.config.cost).toBe(2); // Should still return the cost
      });

      it('should return REPLACED with dynamic cost for replaced actions', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL]);
        const config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL];
        const result = getActionState(config, activeActions, 'seawall', 1);
        
        expect(result.status).toBe(ActionStatus.REPLACED);
        expect(result.config.cost).toBe(1); // Should still return the cost
      });

      // Hybrid Measure dynamic cost tests
      it('should return SELECTABLE with default cost for 1.15m hybrid measure when no 0.5m exists', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE];
        const result = getActionState(config, activeActions, 'hybrid-measure', 1);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(2); // Default cost for 1.15m hybrid measure
      });

      it('should return SELECTABLE with upgrade cost for 1.15m hybrid measure when 0.5m exists', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE]);
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE];
        const result = getActionState(config, activeActions, 'hybrid-measure', 1);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(1); // Upgrade cost from 0.5m to 1.15m
      });

      it('should return SELECTABLE with default cost for 2m hybrid measure when no prerequisites exist', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE];
        const result = getActionState(config, activeActions, 'hybrid-measure', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(3); // Default cost for 2m hybrid measure
      });

      it('should return SELECTABLE with upgrade cost for 2m hybrid measure when 0.5m exists', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE]);
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE];
        const result = getActionState(config, activeActions, 'hybrid-measure', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(2); // Upgrade cost from 0.5m to 2.00m
      });

      it('should return SELECTABLE with upgrade cost for 2m hybrid measure when 1.15m exists', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE]);
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE];
        const result = getActionState(config, activeActions, 'hybrid-measure', 2);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(1); // Upgrade cost from 1.15m to 2.00m
      });

      it('should return COMPLETED with dynamic cost for completed hybrid measure actions', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE]);
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE];
        const result = getActionState(config, activeActions, 'hybrid-measure', 1);
        
        expect(result.status).toBe(ActionStatus.COMPLETED);
        expect(result.config.cost).toBe(2); // Should still return the cost
      });

      it('should return REPLACED with dynamic cost for replaced hybrid measure actions', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE]);
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE];
        const result = getActionState(config, activeActions, 'hybrid-measure', 1);
        
        expect(result.status).toBe(ActionStatus.REPLACED);
        expect(result.config.cost).toBe(1); // Should still return the cost
      });

      it('should handle cross-sector hybrid measure dynamic costs correctly', () => {
        // 0.5m hybrid measure exists in different sector - should not affect cost
        const activeActions = new Set([ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE]);
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE];
        const result = getActionState(config, activeActions, 'hybrid-measure', 1);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(2); // Default cost (different sector)
      });

      it('should return SELECTABLE with static cost for hybrid measure 0.5m (no dynamic pricing)', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const config = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE];
        const result = getActionState(config, activeActions, 'hybrid-measure', 1);
        
        expect(result.status).toBe(ActionStatus.SELECTABLE);
        expect(result.config.cost).toBe(1); // Static cost unchanged
      });
    });
  });

  describe('getActiveCPMPath', () => {
    const sectorActions = getSectorActions('1A');

    it('should return null when no base actions are active', () => {
      const activeActions = new Set<ActivityTypeEnum>();
      const result = getActiveCPMPath(sectorActions, activeActions);
      expect(result).toBeNull();
    });

    it('should return the measure type of the active base action', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const result = getActiveCPMPath(sectorActions, activeActions);
      expect(result).toBe('mangroves');
    });

    it('should return seawall when seawall base action is active', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
      const result = getActiveCPMPath(sectorActions, activeActions);
      expect(result).toBe('seawall');
    });
  });

  describe('calculateActiveActions', () => {
    it('should handle empty activity log', () => {
      const result = calculateActiveActions([]);
      expect(result.size).toBe(0);
    });

    it('should add actions from activity log', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
          value: 'R1_1A_BUILD_PLANT_MANGROVES',
          timestamp: 1000,
          round: 1
        }
      ];
      const result = calculateActiveActions(activityLog);
      expect(result.has(ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES)).toBe(true);
    });

    it('should handle sector-specific demolish actions', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
          value: 'R1_1A_BUILD_PLANT_MANGROVES',
          timestamp: 1000,
          round: 1
        },
        {
          id: '2',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.DEMOLISH,
          value: '1A', // Sector stored in value
          timestamp: 2000,
          round: 2
        }
      ];
      const result = calculateActiveActions(activityLog);
      expect(result.has(ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES)).toBe(false);
    });

    it('should demolish entire sector CPM regardless of which part was targeted', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
          value: 'R1_1A_BUILD_PLANT_MANGROVES',
          timestamp: 1000,
          round: 1
        },
        {
          id: '2',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK,
          value: 'R1_1A_UPGRADE_MANGROVES_BOARDWALK',
          timestamp: 1500,
          round: 2
        },
        {
          id: '3',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.DEMOLISH,
          value: '1A', // Sector stored in value
          timestamp: 2000,
          round: 2
        }
      ];
      const result = calculateActiveActions(activityLog);
      // Both mangrove and boardwalk should be gone (entire 1A CPM demolished)
      expect(result.has(ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES)).toBe(false);
      expect(result.has(ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK)).toBe(false);
    });

    it('should only demolish the specified sector, not other sectors', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
          value: 'R1_1A_BUILD_PLANT_MANGROVES',
          timestamp: 1000,
          round: 1
        },
        {
          id: '2',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES,
          value: 'R1_1B_BUILD_PLANT_MANGROVES',
          timestamp: 1100,
          round: 1
        },
        {
          id: '3',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.DEMOLISH,
          value: '1A', // Only demolish sector 1A
          timestamp: 2000,
          round: 2
        }
      ];
      const result = calculateActiveActions(activityLog);
      // 1A should be demolished, 1B should remain
      expect(result.has(ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES)).toBe(false);
      expect(result.has(ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES)).toBe(true);
    });

    it('should handle replacement actions', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
          value: 'R1_1A_BUILD_0_5_SEAWALL',
          timestamp: 1000,
          round: 1
        },
        {
          id: '2',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL,
          value: 'R1_1A_BUILD_1_15_SEA_WALL',
          timestamp: 2000,
          round: 2
        }
      ];
      const result = calculateActiveActions(activityLog);
      expect(result.has(ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL)).toBe(false); // Should be replaced
      expect(result.has(ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL)).toBe(true);
    });
  });

  describe('getActionsForMeasureType', () => {
    const sectorActions = getSectorActions('1A');
    const mangroveActions = sectorActions.filter(action => action.measureType === 'mangroves');
    const seawallActions = sectorActions.filter(action => action.measureType === 'seawall');

    it('should show only base action when no CPM path is active', () => {
      const activeActions = new Set<ActivityTypeEnum>();
      const result = getActionsForMeasureType('mangroves', sectorActions, activeActions, null, 1);
      expect(result.length).toBe(1);
      expect(result[0].config.unlocksInRound).toBe(1); // Should be the base action
    });

    it('should show all actions when this is the active CPM path', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const result = getActionsForMeasureType('mangroves', sectorActions, activeActions, 'mangroves', 2);
      expect(result.length).toBe(mangroveActions.length);
    });

    it('should show all base actions as LOCKED_CONFLICT when different CPM path is active', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const result = getActionsForMeasureType('seawall', sectorActions, activeActions, 'mangroves', 1);
      expect(result.length).toBe(2); // Only 0.5m and 1.15m unlock in R1 (2m unlocks in R2)
      expect(result.every(action => action.status === ActionStatus.LOCKED_CONFLICT)).toBe(true);
    });

    it('should show all unlocked actions for active CPM path', () => {
      // Test Round 1: Should show all R1 seawall actions
      const activeActionsR1 = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActionsR1);
      
      const seawallActionsR1 = getActionsForMeasureType('seawall', sectorActions, activeActionsR1, activeCPMPath, 1);
      
      // Round 1: Should show R1 seawall heights (only 0.5m and 1.15m unlock in R1)
      expect(seawallActionsR1).toHaveLength(2);
      const r1ActionNames = seawallActionsR1.map(a => a.config.displayName);
      expect(r1ActionNames).toContain('0.5m');
      expect(r1ActionNames).toContain('1.15m');
      
      // Test Round 2: Should show all unlocked actions (R1 + R2)
      const seawallActionsR2 = getActionsForMeasureType('seawall', sectorActions, activeActionsR1, activeCPMPath, 2);
      
      // Round 2: Should show all seawall actions including 2m (now available) 
      expect(seawallActionsR2.length).toBe(3); // 0.5m, 1.15m, 2m (Build Path unlocks in R3)
      const actionNames = seawallActionsR2.map(a => a.config.displayName);
      expect(actionNames).toContain('0.5m');
      expect(actionNames).toContain('1.15m');
      expect(actionNames).toContain('2m');
    });

    it('should show all unlocked actions for active CPM path', () => {
      // Test the new simplified logic
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test User', round: 1 }
      ];
      
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Round 1: Should show R1 seawall actions (0.5m, 1.15m)
      const seawallActionsR1 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1, activityLog, '1A');
      expect(seawallActionsR1.length).toBe(2); // R1 seawall heights (2m unlocks in R2)
      expect(seawallActionsR1[0].config.displayName).toBe('0.5m');
      
      // Round 2: Should show all unlocked actions (R1 + R2)
      const seawallActionsR2 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2, activityLog, '1A');
      expect(seawallActionsR2.length).toBe(3); // 0.5m, 1.15m, 2m (Build Path unlocks in R3)
      
      const actionNames = seawallActionsR2.map(a => a.config.displayName);
      expect(actionNames).toContain('0.5m');
      expect(actionNames).toContain('1.15m');
      expect(actionNames).toContain('2m');
      
      // Build Path should be available in R3
      const seawallActionsR3 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3, activityLog, '1A');
      const actionNamesR3 = seawallActionsR3.map(a => a.config.displayName);
      expect(actionNamesR3).toContain('Build Path');
    });

    it('should handle CPM started in later round (demolish then rebuild scenario)', () => {
      // Test scenario: R1 Mangroves, R2 Demolish + Seawall 0.5m, R3 should show all unlocked actions
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, timestamp: 1000, value: '', userId: 'test', userName: 'Test User', round: 1 },
        { id: '2', action: ActivityTypeEnum.DEMOLISH, timestamp: 2000, value: '1A', userId: 'test', userName: 'Test User', round: 2 },
        { id: '3', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 2100, value: '', userId: 'test', userName: 'Test User', round: 2 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Round 2: Should show all R1 and R2 unlocked actions
      const seawallActionsR2 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2, activityLog, '1A');
      expect(seawallActionsR2.length).toBeGreaterThan(1); // Multiple seawall options
      expect(seawallActionsR2[0].config.displayName).toBe('0.5m');
      
      // Round 3: Should show all unlocked actions (R1, R2, R3)
      const seawallActionsR3 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3, activityLog, '1A');
      expect(seawallActionsR3.length).toBeGreaterThan(1);
      
      // Should include all seawall heights and Build Path
      const actionNames = seawallActionsR3.map(a => a.config.displayName);
      expect(actionNames).toContain('0.5m');
      expect(actionNames).toContain('1.15m');
      expect(actionNames).toContain('2m');
      expect(actionNames).toContain('Build Path');
    });
  });

  describe('getSectorActions', () => {
    it('should return actions for the specified sector', () => {
      const result = getSectorActions('1A');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(action => action.sector === '1A')).toBe(true);
    });

    it('should return different actions for different sectors', () => {
      const sector1A = getSectorActions('1A');
      const sector1B = getSectorActions('1B');
      expect(sector1A.length).toBeGreaterThan(0);
      expect(sector1B.length).toBeGreaterThan(0);
      expect(sector1A[0].sector).toBe('1A');
      expect(sector1B[0].sector).toBe('1B');
    });
  });

  describe('hasAnyConstructionInSector', () => {
    it('should return false when no constructions exist in sector', () => {
      const activityLog: ActivityLogType[] = [];
      const result = hasAnyConstructionInSector('1A', activityLog);
      expect(result).toBe(false);
    });

    it('should return true when construction exists in sector', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
          value: 'R1_1A_BUILD_PLANT_MANGROVES',
          timestamp: 1000,
          round: 1
        }
      ];
      const result = hasAnyConstructionInSector('1A', activityLog);
      expect(result).toBe(true);
    });

    it('should return false when construction exists in different sector', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES,
          value: 'R1_1B_BUILD_PLANT_MANGROVES',
          timestamp: 1000,
          round: 1
        }
      ];
      const result = hasAnyConstructionInSector('1A', activityLog);
      expect(result).toBe(false);
    });

    it('should return false when construction was demolished', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
          value: 'R1_1A_BUILD_PLANT_MANGROVES',
          timestamp: 1000,
          round: 1
        },
        {
          id: '2',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.DEMOLISH,
          value: '1A',
          timestamp: 2000,
          round: 2
        }
      ];
      const result = hasAnyConstructionInSector('1A', activityLog);
      expect(result).toBe(false);
    });

    it('should return true when construction was rebuilt after demolish', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
          value: 'R1_1A_BUILD_PLANT_MANGROVES',
          timestamp: 1000,
          round: 1
        },
        {
          id: '2',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.DEMOLISH,
          value: '1A',
          timestamp: 2000,
          round: 2
        },
        {
          id: '3',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
          value: 'R1_1A_BUILD_0_5_SEAWALL',
          timestamp: 3000,
          round: 2
        }
      ];
      const result = hasAnyConstructionInSector('1A', activityLog);
      expect(result).toBe(true);
    });

    it('should handle replaced actions correctly', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
          value: 'R1_1A_BUILD_0_5_SEAWALL',
          timestamp: 1000,
          round: 1
        },
        {
          id: '2',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL,
          value: 'R1_1A_BUILD_1_15_SEA_WALL',
          timestamp: 2000,
          round: 2
        }
      ];
      const result = hasAnyConstructionInSector('1A', activityLog);
      expect(result).toBe(true); // Should still return true because 1.15m seawall is active
    });
  });

  describe('Construction-Based Dynamic Costs', () => {
    describe('Seawall upgrade costs in Zone 1A', () => {
      const seawall1_15Config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL];
      const seawall2Config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL];

      it('should charge default cost for 1.15m seawall when no 0.5m seawall exists', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const actionWithCost = getActionWithDynamicCost(seawall1_15Config, activeActions);
        
        expect(actionWithCost.cost).toBe(2); // Default cost
      });

      it('should charge upgrade cost for 1.15m seawall when 0.5m seawall exists', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
        const actionWithCost = getActionWithDynamicCost(seawall1_15Config, activeActions);
        
        expect(actionWithCost.cost).toBe(1); // Upgrade cost from 0.5m to 1.15m
      });

      it('should charge default cost for 2m seawall when no 0.5m seawall exists', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const actionWithCost = getActionWithDynamicCost(seawall2Config, activeActions);
        
        expect(actionWithCost.cost).toBe(3); // Default cost
      });

      it('should charge upgrade cost for 2m seawall when 0.5m seawall exists', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
        const actionWithCost = getActionWithDynamicCost(seawall2Config, activeActions);
        
        expect(actionWithCost.cost).toBe(2); // Upgrade cost from 0.5m to 2.00m
      });

      it('should still charge upgrade cost for 2m seawall when 1.15m seawall exists', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL]);
        const actionWithCost = getActionWithDynamicCost(seawall2Config, activeActions);
        
        expect(actionWithCost.cost).toBe(1); // Upgrade cost from 1.15m to 2.00m
      });
    });

    describe('Seawall upgrade costs in Zone 2A', () => {
      const seawall1_15Config = progressionConfig[ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL];
      const seawall2Config = progressionConfig[ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL];

      it('should charge upgrade cost for 1.15m seawall when 0.5m seawall exists in Zone 2A', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL]);
        const actionWithCost = getActionWithDynamicCost(seawall1_15Config, activeActions);
        
        expect(actionWithCost.cost).toBe(1); // Upgrade cost from 0.5m to 1.15m
      });

      it('should charge upgrade cost for 2m seawall when 0.5m seawall exists in Zone 2A', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL]);
        const actionWithCost = getActionWithDynamicCost(seawall2Config, activeActions);
        
        expect(actionWithCost.cost).toBe(2); // Upgrade cost from 0.5m to 2.00m
      });
    });

    describe('Artificial reef upgrade costs in Zone 3A', () => {
      const revetment2Config = progressionConfig[ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT];

      it('should charge default cost for Rocky Revet 2m when no artificial reef exists', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const actionWithCost = getActionWithDynamicCost(revetment2Config, activeActions);
        
        expect(actionWithCost.cost).toBe(2); // Default cost
      });

      it('should charge upgrade cost for Rocky Revet 2m when revetment 1.15 exists', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT]);
        const actionWithCost = getActionWithDynamicCost(revetment2Config, activeActions);
        
        expect(actionWithCost.cost).toBe(1); // Upgrade cost when revetment 1.15 is active
      });

      it('should charge default cost when other structures exist but not artificial reef', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL]);
        const actionWithCost = getActionWithDynamicCost(revetment2Config, activeActions);
        
        expect(actionWithCost.cost).toBe(2); // Default cost when artificial reef is not active
      });

      it('should charge default cost for Rocky Revet 2m when only artificial reef exists (without revetment 1.15)', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF]);
        const actionWithCost = getActionWithDynamicCost(revetment2Config, activeActions);
        
        expect(actionWithCost.cost).toBe(2); // Default cost when only artificial reef exists
      });
    });

    describe('Static cost actions', () => {
      const plantMangroveConfig = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES];
      const buildBoardwalkConfig = progressionConfig[ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK];

      it('should always charge static cost for plant mangroves', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
        const actionWithCost = getActionWithDynamicCost(plantMangroveConfig, activeActions);
        
        expect(actionWithCost.cost).toBe(1); // Static cost
      });

      it('should always charge static cost for build boardwalk', () => {
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
        const actionWithCost = getActionWithDynamicCost(buildBoardwalkConfig, activeActions);
        
        expect(actionWithCost.cost).toBe(1); // Static cost
      });

      it('should charge static cost even when no prerequisites are met', () => {
        const activeActions = new Set<ActivityTypeEnum>();
        const actionWithCost = getActionWithDynamicCost(buildBoardwalkConfig, activeActions);
        
        expect(actionWithCost.cost).toBe(1); // Static cost unchanged
      });
    });

    describe('Complex construction scenarios', () => {
      it('should handle multiple active actions affecting different upgrades', () => {
        const seawall1_15Config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL];
        const revetment2Config = progressionConfig[ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT];
        
        // Both 0.5m seawall and revetment 1.15 are active
        const activeActions = new Set([
          ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
          ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT
        ]);
        
        const seawallCost = getActionWithDynamicCost(seawall1_15Config, activeActions);
        const revetmentCost = getActionWithDynamicCost(revetment2Config, activeActions);
        
        expect(seawallCost.cost).toBe(1); // Upgrade cost for seawall
        expect(revetmentCost.cost).toBe(1); // Upgrade cost for revetment
      });

      it('should not apply upgrade costs when only partially matching requirements', () => {
        const seawall2Config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL];
        
        // Only mangroves exist, not seawall
        const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
        const actionWithCost = getActionWithDynamicCost(seawall2Config, activeActions);
        
        expect(actionWithCost.cost).toBe(3); // Default cost, no upgrade
      });

      it('should handle cross-sector requirements correctly', () => {
        const seawall1_15Config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL];
        
        // 0.5m seawall exists in different sector
        const activeActions = new Set([ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL]);
        const actionWithCost = getActionWithDynamicCost(seawall1_15Config, activeActions);
        
        expect(actionWithCost.cost).toBe(2); // Default cost, no upgrade (different sector)
      });
    });

    describe('Real-world progression scenarios', () => {
      it('should simulate typical seawall upgrade path', () => {
        const seawall0_5Config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL];
        const seawall1_15Config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL];
        const seawall2Config = progressionConfig[ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL];
        
        // Step 1: Build 0.5m seawall
        let activeActions = new Set<ActivityTypeEnum>();
        let cost0_5 = getActionWithDynamicCost(seawall0_5Config, activeActions);
        expect(cost0_5.cost).toBe(1);
        
        // Step 2: Upgrade to 1.15m seawall
        activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
        let cost1_15 = getActionWithDynamicCost(seawall1_15Config, activeActions);
        expect(cost1_15.cost).toBe(1); // Upgrade cost
        
        // Step 3: Upgrade to 2m seawall (from 0.5m base)
        let cost2 = getActionWithDynamicCost(seawall2Config, activeActions);
        expect(cost2.cost).toBe(2); // Upgrade cost from 0.5m to 2.00m
        
        // Step 4: After upgrading to 1.15m, check 2m cost again
        activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL]);
        cost2 = getActionWithDynamicCost(seawall2Config, activeActions);
        expect(cost2.cost).toBe(1); // Upgrade cost from 1.15m to 2.00m
      });

      it('should simulate artificial reef to revetment upgrade path', () => {
        const artificialReefConfig = progressionConfig[ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF];
        const revetment1_15Config = progressionConfig[ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT];
        const revetment2Config = progressionConfig[ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT];
        
        // Step 1: Build artificial reef
        let activeActions = new Set<ActivityTypeEnum>();
        let costReef = getActionWithDynamicCost(artificialReefConfig, activeActions);
        expect(costReef.cost).toBe(1);
        
        // Step 2: Build 1.15m revetment (static cost)
        activeActions = new Set([ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF]);
        let costRevetment1_15 = getActionWithDynamicCost(revetment1_15Config, activeActions);
        expect(costRevetment1_15.cost).toBe(1); // Static cost
        
        // Step 3: Upgrade to 2m revetment (need revetment 1.15 for upgrade cost)
        activeActions = new Set([
          ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF,
          ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT
        ]);
        let costRevetment2 = getActionWithDynamicCost(revetment2Config, activeActions);
        expect(costRevetment2.cost).toBe(1); // Upgrade cost when revetment 1.15 is active
      });
    });
  });
});