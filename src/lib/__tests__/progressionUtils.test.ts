import { ActivityTypeEnum } from '../enums';
import { ActionStatus, ActivityLogType } from '../types';
import {
  prerequisitesAreMet,
  getActionState,
  getActiveCPMPath,
  calculateActiveActions,
  getActionsForMeasureType,
  getSectorActions
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
      const activeActions = new Set([ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]);
      const result = getActionState(mockAction, activeActions, 'mangroves', 2);
      expect(result.status).toBe(ActionStatus.SELECTABLE);
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