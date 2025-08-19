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

  describe('Round 1: Base Heights Available', () => {
    it('should show R1 seawall heights as selectable in R1', () => {
      const activityLog: ActivityLogType[] = [];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1, activityLog, '1A');
      
      // Should show 2 seawall heights (0.5m and 1.15m unlock in R1, 2m unlocks in R2)
      expect(seawallActions.length).toBe(2);
      
      const heights = seawallActions.map(a => a.config.displayName);
      expect(heights).toContain('0.5m');
      expect(heights).toContain('1.15m');
      
      // All should be selectable
      expect(seawallActions.every(action => action.status === ActionStatus.SELECTABLE)).toBe(true);
    });
  });

  describe('One Action Per Round Constraint', () => {
    it('should block other seawall heights in same round after selecting 0.5m', () => {
      const activityLog: ActivityLogType[] = [
        { 
          id: 'test', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 1 
        }
      ];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1, activityLog, '1A');
      
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      
      expect(action05?.status).toBe(ActionStatus.COMPLETED);
      expect(action115?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Blocked by one-action-per-round
      // Note: 2m is not available in R1, so we don't test for it here
    });

    it('should block other seawall heights in same round after selecting 1.15m', () => {
      const activityLog: ActivityLogType[] = [
        { 
          id: 'test', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 1 
        }
      ];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1, activityLog, '1A');
      
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      
      expect(action05?.status).toBe(ActionStatus.REPLACED); // Replaced by 1.15m
      expect(action115?.status).toBe(ActionStatus.COMPLETED);
      // Note: 2m is not available in R1, so we don't test for it here
    });
  });

  describe('Cross-Round Upgrade Scenarios', () => {
    it('should allow R1:0.5m → R2:1.15m,2m upgrade progression', () => {
      const activityLog: ActivityLogType[] = [
        { 
          id: 'test', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 1 
        }
      ];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // In R2, should be able to upgrade to 1.15m or 2m, or build path
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2, activityLog, '1A');
      
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      
      expect(action05?.status).toBe(ActionStatus.COMPLETED);
      expect(action115?.status).toBe(ActionStatus.SELECTABLE); // Can upgrade
      expect(action2m?.status).toBe(ActionStatus.SELECTABLE); // Can upgrade  
    });

    it('should allow R1:1.15m → R2:2m progression', () => {
      const activityLog: ActivityLogType[] = [
        { 
          id: 'test', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 1 
        }
      ];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // In R2, should be able to upgrade to 2m
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2, activityLog, '1A');
      
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      
      expect(action05?.status).toBe(ActionStatus.REPLACED);
      expect(action115?.status).toBe(ActionStatus.COMPLETED);
      expect(action2m?.status).toBe(ActionStatus.SELECTABLE);
    });
  });

  describe('Build Path Blocking Behavior', () => {
    it('should block seawall upgrades after Build Path is selected', () => {
      const activityLog: ActivityLogType[] = [
        { 
          id: 'test1', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 1 
        },
        { 
          id: 'test2', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 3 
        }
      ];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3, activityLog, '1A');
      
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      const buildPath = seawallActions.find(a => a.config.displayName === 'Build Path');
      
      expect(action115?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Blocked by Build Path
      expect(action2m?.status).toBe(ActionStatus.LOCKED_CONFLICT); // Blocked by Build Path
      expect(buildPath?.status).toBe(ActionStatus.COMPLETED);
    });

    it('should block upgrades even from higher starting points', () => {
      const activityLog: ActivityLogType[] = [
        { 
          id: 'test1', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 1 
        },
        { 
          id: 'test2', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 3 
        }
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
        { 
          id: 'test1', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 1 
        },
        { 
          id: 'test2', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 3 
        }
      ];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3, activityLog, '1A');
      const selectableActions = seawallActions.filter(a => a.status === ActionStatus.SELECTABLE);
      
      expect(selectableActions.length).toBe(0);
      
      // Verify using the hasAnySelectableActionsInMeasureType function
      const hasSelectableActions = hasAnySelectableActionsInMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3);
      expect(hasSelectableActions).toBe(false);
    });

    it('should have no selectable actions when 2m + Build Path completed', () => {
      const activityLog: ActivityLogType[] = [
        { 
          id: 'test1', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 2 
        },
        { 
          id: 'test2', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 3 
        }
      ];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // R3: Truly no more upgrades possible
      const hasSelectableActions = hasAnySelectableActionsInMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3);
      expect(hasSelectableActions).toBe(false);
    });

    it('should still have selectable actions when upgrades are possible', () => {
      const activityLog: ActivityLogType[] = [
        { 
          id: 'test1', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 1 
        }
      ];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // R2: Still has upgrade paths available
      const hasSelectableActions = hasAnySelectableActionsInMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2);
      expect(hasSelectableActions).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should NOT block actions in different sectors (1A vs 1B)', () => {
      // Build seawall in 1A
      const activityLog: ActivityLogType[] = [
        { 
          id: 'test1', 
          userId: 'user1', 
          userName: 'Test User', 
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, 
          value: '1A', 
          timestamp: Date.now(), 
          round: 1 
        }
      ];
      const activeActions = calculateActiveActions(activityLog);
      
      // Check 1B actions (different sector) - should NOT be affected by 1A action
      const sectorActions1B = getSectorActions('1B');
      const activeCPMPath1B = getActiveCPMPath(sectorActions1B, activeActions);
      const seawallActions1B = getActionsForMeasureType('seawall', sectorActions1B, activeActions, activeCPMPath1B, 1, activityLog, '1B');
      
      // All seawall actions in 1B should be selectable (not blocked by 1A action)
      expect(seawallActions1B.length).toBe(2);
      expect(seawallActions1B.every(a => a.status === ActionStatus.SELECTABLE)).toBe(true);
    });
  });
});