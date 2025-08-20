import { ActivityTypeEnum } from '../enums';
import { ActionStatus, ActivityLogType } from '../types';
import {
  calculateActiveActions,
  calculateProgressionState,
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
      
      // Check seawall base actions (0.5m and 1.15m available in R1, 2m unlocks in R2)
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1);
      expect(seawallActions.length).toBe(2);
      expect(seawallActions.every(action => action.status === ActionStatus.SELECTABLE)).toBe(true);
      
      // Check land reclamation base actions (should show all R1 options: 0.5m, 1.15m, 2m)
      const landRecActions = getActionsForMeasureType('land-reclamation', sectorActions, activeActions, activeCPMPath, 1);
      expect(landRecActions.length).toBe(3);
      expect(landRecActions.every(action => action.status === ActionStatus.SELECTABLE)).toBe(true);
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
      
      // Seawall should be locked due to conflict (R1 heights)
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 1);
      expect(seawallActions.length).toBe(2); // Only 0.5m and 1.15m available in R1
      expect(seawallActions.every(action => action.status === ActionStatus.LOCKED_CONFLICT)).toBe(true);
      
      // Land reclamation should be locked due to conflict (all heights)
      const landRecActions = getActionsForMeasureType('land-reclamation', sectorActions, activeActions, activeCPMPath, 1);
      expect(landRecActions.length).toBe(3); // All LR heights unlock in R1
      expect(landRecActions.every(action => action.status === ActionStatus.LOCKED_CONFLICT)).toBe(true);
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
      const boardwalk = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK);
      
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
          action: ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK,
          value: 'R1_1A_UPGRADE_MANGROVES_BOARDWALK',
          timestamp: 2000,
          round: 2
        }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const mangroveActions = getActionsForMeasureType('mangroves', sectorActions, activeActions, activeCPMPath, 2);
      expect(mangroveActions.length).toBe(2);
      
      const plantMangrove = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES);
      const boardwalk = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK);
      
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
          value: '1A', // Sector stored in value
          timestamp: 2000,
          round: 2
        }
      ];
      
      const activeActions = calculateActiveActions(activityLog);
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      expect(activeCPMPath).toBeNull();
      
      // All base actions should be selectable again
      const mangroveActions = getActionsForMeasureType('mangroves', sectorActions, activeActions, activeCPMPath, 2);
      expect(mangroveActions.length).toBe(2); // Plant + Boardwalk (R2 unlocked)
      expect(mangroveActions.some(action => action.status === ActionStatus.SELECTABLE)).toBe(true);
      
      const seawallActions = getActionsForMeasureType('seawall', sectorActions, activeActions, activeCPMPath, 2);
      expect(seawallActions.length).toBe(3); // All heights (0.5m, 1.15m, 2m) - Build Path unlocks in R3
      expect(seawallActions.some(action => action.status === ActionStatus.SELECTABLE)).toBe(true);
      
      const landRecActions = getActionsForMeasureType('land-reclamation', sectorActions, activeActions, activeCPMPath, 2);
      expect(landRecActions.length).toBe(6); // All LR heights (3) + R2 upgrades (3)
      expect(landRecActions.some(action => action.status === ActionStatus.SELECTABLE)).toBe(true);
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
          value: '1A', // Sector stored in value
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
      const path = seawallActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH);
      
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
      const boardwalk = mangroveActions.find(a => a.config.id === ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK);
      
      // Boardwalk should either not be shown or be LOCKED_PREREQUISITE due to round requirement
      if (boardwalk) {
        expect(boardwalk.status).toBe(ActionStatus.LOCKED_PREREQUISITE);
      } else {
        // It's also acceptable if it's not shown at all in Round 1
        expect(mangroveActions.length).toBe(1);
      }
    });
  });

  describe('Mangrove Skip Round Scenario', () => {
    it('should show BUILD_BOARDWALK in R3 after planting mangroves in R1 and skipping R2', () => {
      // Scenario: R1 Plant Mangrove, R2 Skip, R3 should show BUILD_BOARDWALK
      const activityLog: ActivityLogType[] = [
        { 
          id: '1', 
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, 
          timestamp: 1000, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 1 
        }
      ];

      // Test R3 (after skipping R2)
      const progressionState = calculateProgressionState(activityLog, 3, '1A');
      
      // Should have mangrove actions available (Plant + BUILD_BOARDWALK)
      expect(progressionState.mangroves).toHaveLength(2);
      const boardwalk = progressionState.mangroves.find(a => a.config.displayName === 'Build Board Walk');
      expect(boardwalk?.status).toBe(ActionStatus.SELECTABLE);
      
      // Should not show "Fully Upgraded" since BUILD_BOARDWALK is available
      expect(progressionState.activeCPM).toBe('mangroves');
    });

    it('should show fully upgraded when mangrove path is completed (Plant + Boardwalk)', () => {
      // Scenario: R1 Plant Mangrove, R2 Build Boardwalk, R3 should show "Fully Upgraded"
      const activityLog: ActivityLogType[] = [
        { 
          id: '1', 
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, 
          timestamp: 1000, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 1 
        },
        { 
          id: '2', 
          action: ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK, 
          timestamp: 2000, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 2 
        }
      ];

      // Test R3 (after completing both mangrove actions)
      const progressionState = calculateProgressionState(activityLog, 3, '1A');
      
      // Should have mangrove actions but none should be selectable
      expect(progressionState.mangroves.length).toBeGreaterThan(0);
      const hasSelectableActions = progressionState.mangroves.some(action => action.status === ActionStatus.SELECTABLE);
      expect(hasSelectableActions).toBe(false);
      
      // Should show as active CPM (for "Fully Upgraded" display)
      expect(progressionState.activeCPM).toBe('mangroves');
      
      // Simulate the new comprehensive UI logic
      const { hasAnySelectableActionsInMeasureType, getCPMCompletionRound, getSectorActions, calculateActiveActions, getActiveCPMPath } = require('../progressionUtils');
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const hasAnySelectableInMeasureType = hasAnySelectableActionsInMeasureType(
        'mangroves', 
        sectorActions, 
        activeActions, 
        activeCPMPath, 
        3
      );
      const completionRound = getCPMCompletionRound('mangroves', '1A', activityLog);
      const isFullyUpgraded = !hasAnySelectableInMeasureType && 
                             progressionState.activeCPM === 'mangroves' &&
                             completionRound !== null && 
                             3 > completionRound;
      
      // Should be fully upgraded because completed in R2 and we're now in R3
      expect(completionRound).toBe(2);
      expect(isFullyUpgraded).toBe(true);
    });

    it('should NOT show fully upgraded immediately after planting mangroves in R1', () => {
      // Scenario: R1 Plant Mangrove - should NOT show "Fully Upgraded" because BUILD_BOARDWALK is still available
      const activityLog: ActivityLogType[] = [
        { 
          id: '1', 
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, 
          timestamp: 1000, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 1 
        }
      ];

      // Test R1 (same round as planting)
      const progressionState = calculateProgressionState(activityLog, 1, '1A');
      
      // Should have mangrove actions (PLANT_MANGROVE as completed)
      expect(progressionState.mangroves.length).toBeGreaterThan(0);
      
      // Should be active CPM
      expect(progressionState.activeCPM).toBe('mangroves');
      
      // Simulate the new comprehensive UI logic using hasAnySelectableActionsInMeasureType
      const { hasAnySelectableActionsInMeasureType, getSectorActions, calculateActiveActions, getActiveCPMPath } = require('../progressionUtils');
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const hasAnySelectableInMeasureType = hasAnySelectableActionsInMeasureType(
        'mangroves', 
        sectorActions, 
        activeActions, 
        activeCPMPath, 
        1
      );
      const isFullyUpgraded = !hasAnySelectableInMeasureType && progressionState.activeCPM === 'mangroves';
      
      // Should NOT be fully upgraded because BUILD_BOARDWALK will be available in R2
      expect(isFullyUpgraded).toBe(false);
    });

    it('should show fully upgraded when mangrove path is completed using comprehensive check', () => {
      // Scenario: R1 Plant Mangrove, R2 Build Boardwalk, R3 should show "Fully Upgraded"
      const activityLog: ActivityLogType[] = [
        { 
          id: '1', 
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, 
          timestamp: 1000, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 1 
        },
        { 
          id: '2', 
          action: ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK, 
          timestamp: 2000, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 2 
        }
      ];

      // Test R3 (after completing both mangrove actions)
      const progressionState = calculateProgressionState(activityLog, 3, '1A');
      
      // Simulate the new UI logic with completion round check
      const { hasAnySelectableActionsInMeasureType, getCPMCompletionRound, getSectorActions, calculateActiveActions, getActiveCPMPath } = require('../progressionUtils');
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const hasAnySelectableInMeasureType = hasAnySelectableActionsInMeasureType(
        'mangroves', 
        sectorActions, 
        activeActions, 
        activeCPMPath, 
        3
      );
      const completionRound = getCPMCompletionRound('mangroves', '1A', activityLog);
      const isFullyUpgraded = !hasAnySelectableInMeasureType && 
                             progressionState.activeCPM === 'mangroves' &&
                             completionRound !== null && 
                             3 > completionRound;
      
      // Should be fully upgraded because completed in R2 and we're now in R3
      expect(completionRound).toBe(2);
      expect(isFullyUpgraded).toBe(true);
    });

    it('should NOT show fully upgraded in the same round as completion', () => {
      // Scenario: R1 Plant Mangrove, R2 Build Boardwalk - should NOT show "Fully Upgraded" in R2
      const activityLog: ActivityLogType[] = [
        { 
          id: '1', 
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, 
          timestamp: 1000, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 1 
        },
        { 
          id: '2', 
          action: ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK, 
          timestamp: 2000, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 2 
        }
      ];

      // Test R2 (same round as completion)
      const progressionState = calculateProgressionState(activityLog, 2, '1A');
      
      // Simulate the new UI logic with completion round check
      const { hasAnySelectableActionsInMeasureType, getCPMCompletionRound, getSectorActions, calculateActiveActions, getActiveCPMPath } = require('../progressionUtils');
      const activeActions = calculateActiveActions(activityLog);
      const sectorActions = getSectorActions('1A');
      const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
      
      const hasAnySelectableInMeasureType = hasAnySelectableActionsInMeasureType(
        'mangroves', 
        sectorActions, 
        activeActions, 
        activeCPMPath, 
        2
      );
      const completionRound = getCPMCompletionRound('mangroves', '1A', activityLog);
      const isFullyUpgraded = !hasAnySelectableInMeasureType && 
                             progressionState.activeCPM === 'mangroves' &&
                             completionRound !== null && 
                             2 > completionRound;
      
      // Should NOT be fully upgraded because we're in the same round as completion (R2)
      expect(completionRound).toBe(2);
      expect(isFullyUpgraded).toBe(false);
    });
  });

  describe('Demolish and Rebuild Consistency', () => {
    it('should show consistent behavior after demolish+rebuild in same round', () => {
      // Scenario: R1 different CPMs in 1A and 1B, R2 demolish both and rebuild seawalls
      const activityLog: ActivityLogType[] = [
        // R1: Plant Mangrove in 1A, Seawall 0.5 in 1B
        { 
          id: '1', 
          action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES, 
          timestamp: 1000, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 1 
        },
        { 
          id: '2', 
          action: ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL, 
          timestamp: 1001, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 1 
        },
        // R2: Demolish both
        { 
          id: '3', 
          action: ActivityTypeEnum.DEMOLISH, 
          timestamp: 2000, 
          value: '1A', 
          userId: 'test', 
          userName: 'Test User', 
          round: 2 
        },
        { 
          id: '4', 
          action: ActivityTypeEnum.DEMOLISH, 
          timestamp: 2001, 
          value: '1B', 
          userId: 'test', 
          userName: 'Test User', 
          round: 2 
        },
        // R2: Rebuild seawalls in both
        { 
          id: '5', 
          action: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL, 
          timestamp: 2002, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 2 
        },
        { 
          id: '6', 
          action: ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL, 
          timestamp: 2003, 
          value: '', 
          userId: 'test', 
          userName: 'Test User', 
          round: 2 
        }
      ];

      // Test both sectors in R2 - they should behave identically
      const progressionState1A = calculateProgressionState(activityLog, 2, '1A');
      const progressionState1B = calculateProgressionState(activityLog, 2, '1B');
      
      // Both should have seawall as active CPM
      expect(progressionState1A.activeCPM).toBe('seawall');
      expect(progressionState1B.activeCPM).toBe('seawall');
      
      // Both should show all seawall actions (all heights + Build Path)
      expect(progressionState1A.seawall.length).toBeGreaterThan(1);
      expect(progressionState1B.seawall.length).toBeGreaterThan(1);
      
      // Both should show the 0.5m seawall as completed
      const seawall1A = progressionState1A.seawall.find(a => a.config.displayName === '0.5m');
      const seawall1B = progressionState1B.seawall.find(a => a.config.displayName === '0.5m');
      expect(seawall1A?.status).toBe(ActionStatus.COMPLETED);
      expect(seawall1B?.status).toBe(ActionStatus.COMPLETED);
      
      // Both sectors should behave consistently (both have seawall as active CPM)
      expect(progressionState1A.activeCPM).toBe('seawall');
      expect(progressionState1B.activeCPM).toBe('seawall');
    });
  });
});