import { ActivityTypeEnum } from '../enums';
import { ActionStatus, ActivityLogType } from '../types';
import {
  calculateActiveActions,
  getActiveCPMPath,
  getActionsForMeasureType,
  getSectorActions
} from '../progressionUtils';

describe('Progression Scenarios - Implementation Guide Test Cases', () => {
  const sectorActions = getSectorActions('1A');

  describe('Scenario 1: Mangrove -> Boardwalk Path', () => {
    it('Round 1: All base CPMs should be selectable', () => {
      const activityLog: ActivityLogType[] = [];
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      expect(activeCPMPath).toBeNull();
      
      // Check mangroves base action
      const mangroveActions = getActionsForMeasureType('mangroves', sectorActions, activeActions, activeCPMPath, 1);
      expect(mangroveActions.length).toBe(1);
      expect(mangroveActions[0].status).toBe(ActionStatus.SELECTABLE);
      
      // Check seawall base action
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1);
      expect(seawallActions.length).toBe(1);
      expect(seawallActions[0].status).toBe(ActionStatus.SELECTABLE);
      
      // Check land reclamation base action
      const landRecActions = getActionsForMeasureType('land-reclamation', sectorActions, activeActions, activeCPMPath, 1);
      expect(landRecActions.length).toBe(1);
      expect(landRecActions[0].status).toBe(ActionStatus.SELECTABLE);
    });

    it('Round 1: After Plant Mangrove - other base CPMs should be LOCKED_CONFLICT', () => {
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
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      expect(activeCPMPath).toBe('mangroves');
      
      // Mangrove should show all actions in the path (since it's the active path)
      const mangroveActions = getActionsForMeasureType('mangroves', sectorActions, activeActions, activeCPMPath, 1);
      expect(mangroveActions.length).toBeGreaterThan(0);
      
      // Find the Plant Mangrove action and verify it's completed
      const plantMangrove = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES);
      expect(plantMangrove?.status).toBe(ActionStatus.COMPLETED);
      
      // Seawall should be locked due to conflict
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1);
      expect(seawallActions.length).toBe(1);
      expect(seawallActions[0].status).toBe(ActionStatus.LOCKED_CONFLICT);
      
      // Land reclamation should be locked due to conflict
      const landRecActions = getActionsForMeasureType('land-reclamation', sectorActions, activeActions, activeCPMPath, 1);
      expect(landRecActions.length).toBe(1);
      expect(landRecActions[0].status).toBe(ActionStatus.LOCKED_CONFLICT);
    });

    it('Round 2: After Plant Mangrove - Boardwalk should be SELECTABLE', () => {
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
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // In Round 2, mangrove path should show both Plant Mangrove (completed) and Boardwalk (selectable)
      const mangroveActions = getActionsForMeasureType('mangroves', sectorActions, activeActions, activeCPMPath, 2);
      expect(mangroveActions.length).toBe(2);
      
      const plantMangrove = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES);
      const boardwalk = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_BOARDWALK);
      
      expect(plantMangrove?.status).toBe(ActionStatus.COMPLETED);
      expect(boardwalk?.status).toBe(ActionStatus.SELECTABLE);
    });

    it('Round 2: After Plant Mangrove + Build Boardwalk - both should be COMPLETED', () => {
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
          timestamp: 2000,
          round: 2
        }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const mangroveActions = getActionsForMeasureType('mangroves', sectorActions, activeActions, activeCPMPath, 2);
      expect(mangroveActions.length).toBe(2);
      
      const plantMangrove = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES);
      const boardwalk = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_BOARDWALK);
      
      expect(plantMangrove?.status).toBe(ActionStatus.COMPLETED);
      expect(boardwalk?.status).toBe(ActionStatus.COMPLETED);
    });
  });

  describe('Scenario 2: Mangrove -> Demolish -> Seawall Path', () => {
    it('Round 2: After Demolish Mangrove - all base CPMs should be SELECTABLE again', () => {
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
          value: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
          timestamp: 2000,
          round: 2
        }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      expect(activeCPMPath).toBeNull();
      
      // All base actions should be selectable again
      const mangroveActions = getActionsForMeasureType('mangroves', sectorActions, activeActions, activeCPMPath, 2);
      expect(mangroveActions.length).toBe(1);
      expect(mangroveActions[0].status).toBe(ActionStatus.SELECTABLE);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2);
      expect(seawallActions.length).toBe(1);
      expect(seawallActions[0].status).toBe(ActionStatus.SELECTABLE);
      
      const landRecActions = getActionsForMeasureType('land-reclamation', sectorActions, activeActions, activeCPMPath, 2);
      expect(landRecActions.length).toBe(1);
      expect(landRecActions[0].status).toBe(ActionStatus.SELECTABLE);
    });

    it('Round 2: After Demolish -> Build Seawall - mangrove should be LOCKED_CONFLICT', () => {
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
          value: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
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
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      expect(activeCPMPath).toBe('seawall');
      
      // Mangrove should be locked due to conflict
      const mangroveActions = getActionsForMeasureType('mangroves', sectorActions, activeActions, activeCPMPath, 2);
      expect(mangroveActions.length).toBe(1);
      expect(mangroveActions[0].status).toBe(ActionStatus.LOCKED_CONFLICT);
      
      // Seawall should show as completed
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2);
      expect(seawallActions.length).toBeGreaterThan(1); // Should show multiple seawall options
      const baseSeawall = seawallActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL);
      expect(baseSeawall?.status).toBe(ActionStatus.COMPLETED);
    });

    it('Round 3: After Seawall 0.5m - higher seawall options should be SELECTABLE', () => {
      const activityLog: ActivityLogType[] = [
        {
          id: '1',
          userId: 'player1',
          userName: 'Player 1',
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
          value: 'R1_1A_BUILD_0_5_SEAWALL',
          timestamp: 1000,
          round: 2
        }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 3);
      
      // Should have multiple seawall options available
      expect(seawallActions.length).toBeGreaterThan(1);
      
      const baseSeawall = seawallActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL);
      const seawall115 = seawallActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL);
      const seawall2 = seawallActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL);
      const path = seawallActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_PATH);
      
      expect(baseSeawall?.status).toBe(ActionStatus.COMPLETED);
      expect(seawall115?.status).toBe(ActionStatus.SELECTABLE);
      expect(seawall2?.status).toBe(ActionStatus.SELECTABLE);
      expect(path?.status).toBe(ActionStatus.SELECTABLE);
    });
  });

  describe('Seawall Replacement Logic', () => {
    it('should handle seawall upgrades with replacement logic', () => {
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
      
      const activeActions = calculateActiveActions(activityLog);
      
      // 0.5m seawall should be replaced by 1.15m seawall
      expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL)).toBe(false);
      expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL)).toBe(true);
    });
  });

  describe('Round-based Unlocking', () => {
    it('should not show Round 2 actions in Round 1', () => {
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
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      // In Round 1, boardwalk should not be available even though prerequisite is met
      const mangroveActions = getActionsForMeasureType('mangroves', sectorActions, activeActions, activeCPMPath, 1);
      const boardwalk = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_BOARDWALK);
      
      // Boardwalk should either not be shown or be LOCKED_PREREQUISITE due to round requirement
      if (boardwalk) {
        expect(boardwalk.status).toBe(ActionStatus.LOCKED_PREREQUISITE);
      } else {
        // It's also acceptable if it's not shown at all in Round 1
        expect(mangroveActions.length).toBe(1);
      }
    });
  });
});