import { ActivityTypeEnum } from '../enums';
import { ActivityLogType } from '../types';
import { calculateActiveActions, isSectorDemolishable, hasAnyConstructionInSector } from '../progressionUtils';

describe('Land Reclamation Demolish Prevention', () => {
  test('isSectorDemolishable returns false for sectors with Land Reclamation CPM', () => {
    // Create activity log with Land Reclamation in sector 1A
    const activityLog: ActivityLogType[] = [
      {
        id: 'test-1',
        userId: 'P1',
        userName: 'Player 1',
        action: ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION,
        value: 'test',
        subSector: '1A',
        timestamp: Date.now(),
        round: 1
      }
    ];

    const activeActions = calculateActiveActions(activityLog);
    
    // Sector 1A should not be demolishable because it has Land Reclamation
    expect(isSectorDemolishable('1A', activeActions)).toBe(false);
    
    // Other sectors should be demolishable
    expect(isSectorDemolishable('2A', activeActions)).toBe(true);
    expect(isSectorDemolishable('3A', activeActions)).toBe(true);
  });

  test('isSectorDemolishable returns true for sectors with other CPMs', () => {
    // Create activity log with Mangroves in sector 1A
    const activityLog: ActivityLogType[] = [
      {
        id: 'test-1',
        userId: 'P1',
        userName: 'Player 1',
        action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
        value: 'test',
        subSector: '1A',
        timestamp: Date.now(),
        round: 1
      }
    ];

    const activeActions = calculateActiveActions(activityLog);
    
    // Sector 1A should be demolishable because it has Mangroves (not Land Reclamation)
    expect(isSectorDemolishable('1A', activeActions)).toBe(true);
  });

  test('hasAnyConstructionInSector returns false for Land Reclamation sectors', () => {
    // Create activity log with Land Reclamation in sector 1A
    const activityLog: ActivityLogType[] = [
      {
        id: 'test-1',
        userId: 'P1',
        userName: 'Player 1',
        action: ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION,
        value: 'test',
        subSector: '1A',
        timestamp: Date.now(),
        round: 1
      }
    ];

    // Should return false because Land Reclamation cannot be demolished
    expect(hasAnyConstructionInSector('1A', activityLog)).toBe(false);
  });

  test('hasAnyConstructionInSector returns true for other CPMs', () => {
    // Create activity log with Mangroves in sector 1A
    const activityLog: ActivityLogType[] = [
      {
        id: 'test-1',
        userId: 'P1',
        userName: 'Player 1',
        action: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
        value: 'test',
        subSector: '1A',
        timestamp: Date.now(),
        round: 1
      }
    ];

    // Should return true because Mangroves can be demolished
    expect(hasAnyConstructionInSector('1A', activityLog)).toBe(true);
  });

  test('Land Reclamation + Seawall upgrades cannot be demolished', () => {
    // Create activity log with Land Reclamation + Seawall upgrade in sector 1A
    const activityLog: ActivityLogType[] = [
      {
        id: 'test-1',
        userId: 'P1',
        userName: 'Player 1',
        action: ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION,
        value: 'test',
        subSector: '1A',
        timestamp: Date.now(),
        round: 1
      },
      {
        id: 'test-2',
        userId: 'P1',
        userName: 'Player 1',
        action: ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL,
        value: 'test',
        subSector: '1A',
        timestamp: Date.now() + 1000,
        round: 2
      }
    ];

    const activeActions = calculateActiveActions(activityLog);
    
    // Sector 1A should not be demolishable because it has Land Reclamation CPM
    expect(isSectorDemolishable('1A', activeActions)).toBe(false);
    expect(hasAnyConstructionInSector('1A', activityLog)).toBe(false);
  });

  test('Demolish action should be ignored for Land Reclamation sectors', () => {
    // Create activity log: Build Land Reclamation, then attempt to demolish
    const activityLog: ActivityLogType[] = [
      {
        id: 'test-1',
        userId: 'P1',
        userName: 'Player 1',
        action: ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION,
        value: 'test',
        subSector: '1A',
        timestamp: Date.now(),
        round: 1
      },
      {
        id: 'test-2',
        userId: 'P1',
        userName: 'Player 1',
        action: ActivityTypeEnum.DEMOLISH,
        value: '1A', // Trying to demolish sector 1A
        subSector: '1A',
        timestamp: Date.now() + 1000,
        round: 2
      }
    ];

    const activeActions = calculateActiveActions(activityLog);
    
    // Land Reclamation should still be active because demolish should be ignored
    expect(activeActions.has(ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION)).toBe(true);
  });
});