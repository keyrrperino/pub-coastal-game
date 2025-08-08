import { ActivityTypeEnum } from '../enums';
import { ActionStatus, ActivityLogType } from '../types';
import {
  prerequisitesAreMet,
  getActionState,
  getActiveCPMPath,
  calculateActiveActions,
  getActionsForMeasureType,
  getSectorActions,
  isActionReplaced
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
        ActivityTypeEnum.R1_1A_BUILD_BOARDWALK
      ]);
      // [[PLANT_MANGROVES, BUILD_BOARDWALK]] means "PLANT_MANGROVES AND BUILD_BOARDWALK"
      const prerequisites = [
        [ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, ActivityTypeEnum.R1_1A_BUILD_BOARDWALK]
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

  describe('getActiveCPMPath - Replacement Bug Fix', () => {
    it('should detect seawall path when 1.15m replaces 0.5m', () => {
      // Simulate the bug scenario: 0.5m built, then 1.15m replaces it
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test User' },
        { id: '2', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 2000, value: '', userId: 'test', userName: 'Test User' }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Should detect seawall path even though base 0.5m was replaced
      expect(activeCPMPath).toBe('seawall');
      expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL)).toBe(true);
      expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL)).toBe(false); // Replaced
    });

    it('should show correct seawall options after 1.15m upgrade', () => {
      // Simulate the bug scenario
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test User' },
        { id: '2', action: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL, timestamp: 2000, value: '', userId: 'test', userName: 'Test User' }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Get seawall actions for Round 2
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2);
      
      // Should show all seawall actions, not just 0.5m
      expect(seawallActions.length).toBeGreaterThan(1);
      
      // Find the 0.5m action - should be REPLACED (it was replaced by 1.15m!)
      const action05 = seawallActions.find(a => a.config.displayName === '0.5m');
      expect(action05?.status).toBe(ActionStatus.REPLACED);
      
      // Find the 1.15m action - should be COMPLETED
      const action115 = seawallActions.find(a => a.config.displayName === '1.15m');
      expect(action115?.status).toBe(ActionStatus.COMPLETED);
      
      // Find the 2m action - should be SELECTABLE (has 1.15m prerequisite)
      const action2m = seawallActions.find(a => a.config.displayName === '2m');
      expect(action2m?.status).toBe(ActionStatus.SELECTABLE);
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
      id: ActivityTypeEnum.R1_1A_BUILD_BOARDWALK,
      displayName: 'Build Boardwalk',
      cost: 1,
      unlocksInRound: 2,
      sector: '1A',
      measureType: 'mangroves' as const,
      prerequisites: [[ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]]
    };

    it('should return COMPLETED when action is already active', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_BOARDWALK]);
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
          action: ActivityTypeEnum.R1_1A_BUILD_BOARDWALK,
          value: 'R1_1A_BUILD_BOARDWALK',
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
      expect(result.has(ActivityTypeEnum.R1_1A_BUILD_BOARDWALK)).toBe(false);
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

    it('should show only base action as LOCKED_CONFLICT when different CPM path is active', () => {
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const result = getActionsForMeasureType('seawall', sectorActions, activeActions, 'mangroves', 1);
      expect(result.length).toBe(1);
      expect(result[0].status).toBe(ActionStatus.LOCKED_CONFLICT);
    });

    it('should show only current round actions for active CPM path', () => {
      // Test Round 1: Should only show base action
      const activeActionsR1 = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActionsR1);
      
      const seawallActionsR1 = getActionsForMeasureType('seawall', sectorActions, activeActionsR1, activeCPMPath, 1);
      
      // Round 1: Should only show 0.5m seawall (unlocksInRound: 1)
      expect(seawallActionsR1).toHaveLength(1);
      expect(seawallActionsR1[0].config.displayName).toBe('0.5m');
      
      // Test Round 2: Should show Round 1 + Round 2 actions
      const seawallActionsR2 = getActionsForMeasureType('seawall', sectorActions, activeActionsR1, activeCPMPath, 2);
      
      // Round 2: Should show 0.5m, 1.15m, 2m, Build Path (all unlocksInRound <= 2)
      expect(seawallActionsR2.length).toBeGreaterThan(1);
      const actionNames = seawallActionsR2.map(a => a.config.displayName);
      expect(actionNames).toContain('0.5m');
      expect(actionNames).toContain('1.15m');
      expect(actionNames).toContain('2m');
      expect(actionNames).toContain('Build Path');
    });

    it('should show buttonGroup-based actions when activityLog and sector are provided', () => {
      // Test the new buttonGroup functionality
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 1000, value: '', userId: 'test', userName: 'Test User', round: 1 }
      ];
      
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Round 1: Should show buttonGroup 1 (0.5m seawall)
      const seawallActionsR1 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1, activityLog, '1A');
      expect(seawallActionsR1).toHaveLength(1);
      expect(seawallActionsR1[0].config.displayName).toBe('0.5m');
      expect(seawallActionsR1[0].config.buttonGroup).toBe(1);
      
      // Round 2: Should show buttonGroup 2 (1.15m, 2m, Build Path)
      const seawallActionsR2 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2, activityLog, '1A');
      expect(seawallActionsR2.length).toBeGreaterThan(1);
      
      // All actions in Round 2 should be buttonGroup 2
      seawallActionsR2.forEach(action => {
        expect(action.config.buttonGroup).toBe(2);
      });
      
      const actionNames = seawallActionsR2.map(a => a.config.displayName);
      expect(actionNames).toContain('1.15m');
      expect(actionNames).toContain('2m');
      expect(actionNames).toContain('Build Path');
    });

    it('should handle CPM started in later round (demolish then rebuild scenario)', () => {
      // Test scenario: R1 Mangroves, R2 Demolish + Seawall 0.5m, R3 should show next group
      const activityLog: ActivityLogType[] = [
        { id: '1', action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, timestamp: 1000, value: '', userId: 'test', userName: 'Test User', round: 1 },
        { id: '2', action: ActivityTypeEnum.DEMOLISH, timestamp: 2000, value: '1A', userId: 'test', userName: 'Test User', round: 2 },
        { id: '3', action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, timestamp: 2100, value: '', userId: 'test', userName: 'Test User', round: 2 }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // Round 2: Seawall started in R2, should show buttonGroup 1 (0.5m)
      const seawallActionsR2 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2, activityLog, '1A');
      expect(seawallActionsR2).toHaveLength(1);
      expect(seawallActionsR2[0].config.displayName).toBe('0.5m');
      expect(seawallActionsR2[0].config.buttonGroup).toBe(1);
      
      // Round 3: Should show buttonGroup 2 (next group after seawall started in R2)
      const seawallActionsR3 = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3, activityLog, '1A');
      expect(seawallActionsR3.length).toBeGreaterThan(1);
      
      // All actions in Round 3 should be buttonGroup 2
      seawallActionsR3.forEach(action => {
        expect(action.config.buttonGroup).toBe(2);
      });
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
});