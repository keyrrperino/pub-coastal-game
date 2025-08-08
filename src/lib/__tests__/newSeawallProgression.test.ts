import { ActivityTypeEnum } from '../enums';
import { ActionStatus, ActivityLogType } from '../types';
import {
  calculateActiveActions,
  getActionsForMeasureType,
  getSectorActions,
  getActiveCPMPath,
  hasAnySelectableActionsInMeasureType
} from '../progressionUtils';

describe('New Seawall Progression Behavior', () => {
  const sectorActions = getSectorActions('1A');

  describe('Round 1: All Heights Available', () => {
    it('should show all seawall heights as selectable in R1', () => {
      const activityLog: ActivityLogType[] = [];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1, activityLog, '1A');
      
      // Should show all 3 seawall heights
      expect(seawallActions.length).toBe(3);
      
      const heights = seawallActions.map(a => a.config.displayName);
      expect(heights).toContain('0.5m');
      expect(heights).toContain('1.15m');
      expect(heights).toContain('2m');
      
      // All should be selectable
      expect(seawallActions.every(a => a.status === ActionStatus.SELECTABLE)).toBe(true);
    });
  });

  describe('One Action Per Round Constraint', () => {
    it('should block other seawall heights in same round after selecting 0.5m', () => {
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // In R1, after selecting 0.5m
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1, activityLog, '1A');
      
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      
      expect(action05?.status).toBe(ActionStatus.COMPLETED);
      expect(action115?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Blocked by one-action-per-round
      expect(action2m?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Blocked by one-action-per-round
    });

    it('should block other seawall heights in same round after selecting 1.15m', () => {
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1, activityLog, '1A');
      
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      
      expect(action05?.status).toBe(ActionStatus.REPLACED); // Replaced by 1.15m
      expect(action115?.status).toBe(ActionStatus.COMPLETED);
      expect(action2m?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Blocked by one-action-per-round
    });

    it('should block other seawall heights in same round after selecting 2m', () => {
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1, activityLog, '1A');
      
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      
      expect(action05?.status).toBe(ActionStatus.REPLACED); // Replaced by 2m
      expect(action115?.status).toBe(ActionStatus.REPLACED); // Replaced by 2m
      expect(action2m?.status).toBe(ActionStatus.COMPLETED);
    });
  });

  describe('Cross-Round Upgrade Scenarios', () => {
    it('should allow R1:0.5m → R2:1.15m upgrade progression', () => {
      // R1: Select 0.5m
      const activityLogR1: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 }
      ];
      
      const activeActionsR1 = calculateActiveActions(activityLogR1);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActionsR1);
      
      // R2: Should show 1.15m, 2m, Build Path as selectable
      const seawallActionsR2 = getActionsForMeasureType('seawall', sectorActions, activeActionsR1, activeCPMPath, 2, activityLogR1, '1A');
      
      const action05 = seawallActionsR2.find(a => a.config.displayName === '0.5m');
      const action115 = seawallActionsR2.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActionsR2.find(a => a.config.displayName === '2m');
      const buildPath = seawallActionsR2.find(a => a.config.displayName === 'Build Path');
      
      expect(action05?.status).toBe(ActionStatus.COMPLETED);
      expect(action115?.status).toBe(ActionStatus.SELECTABLE); // Can upgrade
      expect(action2m?.status).toBe(ActionStatus.SELECTABLE); // Can upgrade
      expect(buildPath?.status).toBe(ActionStatus.SELECTABLE); // Can build path
    });

    it('should allow R1:0.5m → R2:1.15m → R3:2m progression', () => {
      // R1: Select 0.5m, R2: Upgrade to 1.15m
      const activityLogR2: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 },
        { id: '2', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 2000, value: '', userId: 'test', userName: 'Test', round: 2 }
      ];
      
      const activeActionsR2 = calculateActiveActions(activityLogR2);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActionsR2);
      
      // R3: Should show 2m and Build Path as selectable
      const seawallActionsR3 = getActionsForMeasureType('seawall', sectorActions, activeActionsR2, activeCPMPath, 3, activityLogR2, '1A');
      
      const action05 = seawallActionsR3.find(a => a.config.displayName === '0.5m');
      const action115 = seawallActionsR3.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActionsR3.find(a => a.config.displayName === '2m');
      const buildPath = seawallActionsR3.find(a => a.config.displayName === 'Build Path');
      
      expect(action05?.status).toBe(ActionStatus.REPLACED); // Replaced by 1.15m
      expect(action115?.status).toBe(ActionStatus.COMPLETED);
      expect(action2m?.status).toBe(ActionStatus.SELECTABLE); // Can still upgrade to 2m
      expect(buildPath?.status).toBe(ActionStatus.SELECTABLE); // Can build path
    });

    it('should allow R1:1.15m → R2:Build Path progression', () => {
      // R1: Select 1.15m directly
      const activityLogR1: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 }
      ];
      
      const activeActionsR1 = calculateActiveActions(activityLogR1);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActionsR1);
      
      // R2: Should show 2m and Build Path as selectable
      const seawallActionsR2 = getActionsForMeasureType('seawall', sectorActions, activeActionsR1, activeCPMPath, 2, activityLogR1, '1A');
      
      const action2m = seawallActionsR2.find(a => a.config.displayName === '2m');
      const buildPath = seawallActionsR2.find(a => a.config.displayName === 'Build Path');
      
      expect(action2m?.status).toBe(ActionStatus.SELECTABLE);
      expect(buildPath?.status).toBe(ActionStatus.SELECTABLE);
    });

    it('should show only Build Path when 2m selected in R1', () => {
      // R1: Select 2m directly (highest)
      const activityLogR1: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 }
      ];
      
      const activeActionsR1 = calculateActiveActions(activityLogR1);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActionsR1);
      
      // R2: Should only show Build Path as selectable (no higher seawall)
      const seawallActionsR2 = getActionsForMeasureType('seawall', sectorActions, activeActionsR1, activeCPMPath, 2, activityLogR1, '1A');
      
      const selectableActions = seawallActionsR2.filter(a => a.status === ActionStatus.SELECTABLE);
      expect(selectableActions.length).toBe(1);
      expect(selectableActions[0].config.displayName).toBe('Build Path');
    });
  });

  describe('Build Path Blocking Behavior', () => {
    it('should block seawall upgrades after Build Path is selected', () => {
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 },
        { id: '2', action: ActivityTypeEnum.R1_1A_BUILD_PATH, timestamp: 2000, value: '', userId: 'test', userName: 'Test', round: 2 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // R3: Seawall upgrades should be blocked by Build Path
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3, activityLog, '1A');
      
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      const buildPath = seawallActions.find(a => a.config.displayName === 'Build Path');
      
      expect(action115?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Blocked by Build Path
      expect(action2m?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Blocked by Build Path
      expect(buildPath?.status).toBe(ActionStatus.COMPLETED);
    });

    it('should block upgrades even from higher starting points', () => {
      // Start with 1.15m, then Build Path
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 },
        { id: '2', action: ActivityTypeEnum.R1_1A_BUILD_PATH, timestamp: 2000, value: '', userId: 'test', userName: 'Test', round: 2 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3, activityLog, '1A');
      
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      expect(action2m?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Even 2m upgrade blocked
    });
  });

  describe('No More Available Upgrades Logic', () => {
    it('should have no selectable actions after Build Path blocks upgrades', () => {
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 },
        { id: '2', action: ActivityTypeEnum.R1_1A_BUILD_PATH, timestamp: 2000, value: '', userId: 'test', userName: 'Test', round: 2 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // R3: Should have no selectable actions (triggers "No More Available Upgrades")
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3, activityLog, '1A');
      const selectableActions = seawallActions.filter(a => a.status === ActionStatus.SELECTABLE);
      
      expect(selectableActions.length).toBe(0);
      
      // Verify using the hasAnySelectableActionsInMeasureType function
      const hasSelectableActions = hasAnySelectableActionsInMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3);
      expect(hasSelectableActions).toBe(false); // Should trigger "No More Available Upgrades"
    });

    it('should have no selectable actions when 2m + Build Path completed', () => {
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 },
        { id: '2', action: ActivityTypeEnum.R1_1A_BUILD_PATH, timestamp: 2000, value: '', userId: 'test', userName: 'Test', round: 2 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // R3: Truly no more upgrades possible
      const hasSelectableActions = hasAnySelectableActionsInMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3);
      expect(hasSelectableActions).toBe(false);
    });

    it('should still have selectable actions when upgrades are possible', () => {
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // R2: Should still have upgrades available
      const hasSelectableActions = hasAnySelectableActionsInMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2);
      expect(hasSelectableActions).toBe(true); // 1.15m, 2m, Build Path available
    });
  });

  describe('Edge Cases', () => {
    it('should handle demolish and rebuild correctly', () => {
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 },
        { id: '2', action: ActivityTypeEnum.DEMOLISH, timestamp: 2000, value: '1A', userId: 'test', userName: 'Test', round: 2 },
        { id: '3', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 2100, value: '', userId: 'test', userName: 'Test', round: 2 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // After demolish and rebuild, should work normally
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3, activityLog, '1A');
      
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      const buildPath = seawallActions.find(a => a.config.displayName === 'Build Path');
      
      expect(action115?.status).toBe(ActionStatus.COMPLETED);
      expect(action2m?.status).toBe(ActionStatus.SELECTABLE);
      expect(buildPath?.status).toBe(ActionStatus.SELECTABLE);
    });

    it('should NOT block actions in different sectors (1A vs 1B)', () => {
      // Action taken in sector 1A should not block actions in sector 1B
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions1B = getSectorActions('1B');
      const activeCPMPath1B = getActiveCPMPath(sectorActions1B, activeActions);
      
      // R1: Actions in sector 1B should still be selectable
      const seawallActions1B = getActionsForMeasureType('seawall', sectorActions1B, activeActions, activeCPMPath1B, 1, activityLog, '1B');
      
      // All seawall actions in 1B should be selectable (not blocked by 1A action)
      expect(seawallActions1B.length).toBe(3);
      expect(seawallActions1B.every(a => a.status === ActionStatus.SELECTABLE)).toBe(true);
    });

    it('should allow simultaneous actions in different sectors in same round', () => {
      // Both 1A and 1B can have actions in the same round
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test', round: 1 },
        { id: '2', action: ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL, timestamp: 1100, value: '', userId: 'test', userName: 'Test', round: 1 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      
      // Check 1A: Should have 0.5m completed, others blocked by one-action-per-round IN 1A
      const sectorActions1A = getSectorActions('1A');
      const activeCPMPath1A = getActiveCPMPath(sectorActions1A, activeActions);
      const seawallActions1A = getActionsForMeasureType('seawall', sectorActions1A, activeActions, activeCPMPath1A, 1, activityLog, '1A');
      
      const action05_1A = seawallActions1A.find(a => a.config.displayName === '0.5m');
      const action115_1A = seawallActions1A.find(a => a.config.displayName === '1.15m');
      
      expect(action05_1A?.status).toBe(ActionStatus.COMPLETED);
      expect(action115_1A?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Blocked by one-action-per-round in 1A
      
      // Check 1B: Should have 1.15m completed, others blocked by one-action-per-round IN 1B
      const sectorActions1B = getSectorActions('1B');
      const activeCPMPath1B = getActiveCPMPath(sectorActions1B, activeActions);
      const seawallActions1B = getActionsForMeasureType('seawall', sectorActions1B, activeActions, activeCPMPath1B, 1, activityLog, '1B');
      
      const action05_1B = seawallActions1B.find(a => a.config.displayName === '0.5m');
      const action115_1B = seawallActions1B.find(a => a.config.displayName === '1.15m');
      
      expect(action05_1B?.status).toBe(ActionStatus.REPLACED); // Replaced by 1.15m
      expect(action115_1B?.status).toBe(ActionStatus.COMPLETED);
    });
  });
});