import { ActivityTypeEnum } from './enums';
import { ActivityLogType, ActionStatus, ActionConfig } from './types';
import { progressionConfig } from './progression.config';
import { calculateDynamicCost } from './dynamicCosts';

/**
 * Helper function to check if prerequisites are met
 */
export function prerequisitesAreMet(
  prerequisites: ActivityTypeEnum[][],
  activeActions: Set<ActivityTypeEnum>
): boolean {
  // If no prerequisites, return true
  if (!prerequisites || prerequisites.length === 0) {
    return true;
  }
  
  // Prerequisites use OR/AND logic: [[A, B], [C]] means "(A AND B) OR C"
  return prerequisites.some(orGroup =>
    orGroup.every(andCondition => activeActions.has(andCondition))
  );
}

/**
 * Helper function to check if an action was replaced by an active action (including transitive replacements)
 */
export function isActionReplaced(
  actionId: ActivityTypeEnum,
  activeActions: Set<ActivityTypeEnum>
): boolean {
  // Check if any active action has this actionId in its 'replaces' array (direct replacement)
  for (const activeActionId of activeActions) {
    const activeActionConfig = progressionConfig[activeActionId];
    if (activeActionConfig?.replaces?.includes(actionId)) {
      return true;
    }
  }
  
  // Check for transitive replacements: if any active action replaced something that replaced this action
  for (const activeActionId of activeActions) {
    const activeActionConfig = progressionConfig[activeActionId];
    if (activeActionConfig?.replaces) {
      // Check each replaced action to see if it also replaced our target action
      for (const replacedAction of activeActionConfig.replaces) {
        const intermediateReplacedConfig = progressionConfig[replacedAction];
        if (intermediateReplacedConfig?.replaces?.includes(actionId)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

/**
 * Helper function to check if an action is blocked by existing actions
 */
export function isActionBlocked(
  actionId: ActivityTypeEnum,
  activeActions: Set<ActivityTypeEnum>
): boolean {
  // Check if any active action blocks this action
  for (const activeActionId of activeActions) {
    const activeActionConfig = progressionConfig[activeActionId];
    if (activeActionConfig?.blocksActions?.includes(actionId)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Helper function to check one-action-per-round constraint (per sector)
 */
export function isBlockedByOneActionPerRound(
  actionConfig: ActionConfig,
  activeActions: Set<ActivityTypeEnum>,
  currentRound: number,
  activityLog: ActivityLogType[]
): boolean {
  // Check if any construction action was already taken this round IN THE SAME SECTOR
  const actionsThisRoundInSector = activityLog.filter(log => {
    if (log.round !== currentRound || log.action === ActivityTypeEnum.DEMOLISH) {
      return false;
    }
    
    // Get the sector of the logged action
    const loggedActionConfig = progressionConfig[log.action];
    return loggedActionConfig && loggedActionConfig.sector === actionConfig.sector;
  });
  
  // Check if this sector was demolished this round (after any construction actions)
  const demolishActionsThisRoundInSector = activityLog.filter(log => {
    return log.round === currentRound && 
           log.action === ActivityTypeEnum.DEMOLISH && 
           log.value === actionConfig.sector;
  });
  
  // If the sector was demolished this round, find the latest demolish timestamp
  let latestDemolishTime = 0;
  if (demolishActionsThisRoundInSector.length > 0) {
    latestDemolishTime = Math.max(...demolishActionsThisRoundInSector.map(log => log.timestamp));
  }
  
  // Filter construction actions to only those that happened AFTER the latest demolish
  const actionsAfterLatestDemolish = actionsThisRoundInSector.filter(log => {
    return latestDemolishTime === 0 || log.timestamp > latestDemolishTime;
  });
  
  // If an action was taken this round in this sector (after any demolish) and this action isn't already active, block it
  return actionsAfterLatestDemolish.length > 0 && !activeActions.has(actionConfig.id);
}

/**
 * Helper function to get action config with dynamic cost calculated
 */
export function getActionWithDynamicCost(
  actionConfig: ActionConfig,
  activeActions: Set<ActivityTypeEnum>
): ActionConfig {
  const dynamicCost = calculateDynamicCost(
    actionConfig.cost,
    activeActions
  );
  
  return {
    ...actionConfig,
    cost: dynamicCost
  };
}

/**
 * Helper function to determine the status of any given action
 */
export function getActionState(
  actionConfig: ActionConfig,
  activeActions: Set<ActivityTypeEnum>,
  activeCPMPath: string | null,
  currentRound: number,
  activityLog?: ActivityLogType[]
): { config: ActionConfig; status: ActionStatus } {
  // Calculate dynamic cost for this action
  const actionWithDynamicCost = getActionWithDynamicCost(actionConfig, activeActions);
  let status: ActionStatus;

  // Check 1: Is the action already completed?
  if (activeActions.has(actionConfig.id)) {
    status = ActionStatus.COMPLETED;
  }
  // Check 2: Was this action replaced by an active action?
  else if (isActionReplaced(actionConfig.id, activeActions)) {
    status = ActionStatus.REPLACED;
  }
  // Check 3: Is this action blocked by an existing action?
  else if (isActionBlocked(actionConfig.id, activeActions)) {
    status = ActionStatus.LOCKED_CONFLICT;
  }
  // Check 4: One action per round constraint
  else if (activityLog && isBlockedByOneActionPerRound(actionConfig, activeActions, currentRound, activityLog)) {
    status = ActionStatus.LOCKED_CONFLICT;
  }
  // Check 5: Is there a conflicting CPM path active?
  // This applies only to base-level actions (Round 1 unlocks).
  else if (
    activeCPMPath && 
    actionConfig.unlocksInRound === 1 && 
    actionConfig.measureType !== activeCPMPath
  ) {
    status = ActionStatus.LOCKED_CONFLICT;
  }
  // Check 6: Are prerequisites met?
  else if (
    actionConfig.prerequisites && 
    !prerequisitesAreMet(actionConfig.prerequisites, activeActions)
  ) {
    status = ActionStatus.LOCKED_PREREQUISITE;
  }
  // Check 7: Is the round high enough?
  else if (actionConfig.unlocksInRound > currentRound) {
    status = ActionStatus.LOCKED_PREREQUISITE;
  }
  // If all checks pass, it's selectable.
  else {
    status = ActionStatus.SELECTABLE;
  }

  return { config: actionWithDynamicCost, status };
}

/**
 * Helper function to determine the active CPM path for a sector
 */
export function getActiveCPMPath(
  sectorActions: ActionConfig[],
  activeActions: Set<ActivityTypeEnum>
): string | null {
  // Find any active action to determine the measure type path
  // This handles cases where base actions are replaced by upgrades
  const activeAction = sectorActions.find(action => 
    activeActions.has(action.id)
  );
  
  return activeAction ? activeAction.measureType : null;
}

/**
 * Helper function to check if a sector can be demolished
 * Land Reclamation CPM cannot be demolished (special case)
 */
export function isSectorDemolishable(
  sectorId: string,
  activeActions: Set<ActivityTypeEnum>
): boolean {
  const sectorActions = getSectorActions(sectorId);
  const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
  
  // Special case: Land Reclamation CPM cannot be demolished
  if (activeCPMPath === 'land-reclamation') {
    return false;
  }
  
  return true;
}



/**
 * Helper function to process activity log and calculate active actions
 */
export function calculateActiveActions(activityLog: ActivityLogType[]): Set<ActivityTypeEnum> {
  const currentlyActive = new Set<ActivityTypeEnum>();

  // Process activity log chronologically to handle build -> demolish -> build sequences
  const sortedLog = [...activityLog].sort((a, b) => a.timestamp - b.timestamp);
  
  for (const log of sortedLog) {
    if (log.action === ActivityTypeEnum.DEMOLISH) {
      // Demolish removes the entire active CPM for the specified sector
      // The sector is stored in log.value (e.g., '1A', '2B')
      const demolishSector = log.value;
      
      // Special case: Land Reclamation cannot be demolished
      // Check if the sector's active CPM is demolishable before processing
      if (!isSectorDemolishable(demolishSector, currentlyActive)) {
        // Skip this demolish action - Land Reclamation CPM cannot be demolished
        continue;
      }
      
      const actionsToRemove: ActivityTypeEnum[] = [];
      
      // Find all actions for this sector and remove them
      for (const activeAction of currentlyActive) {
        const actionConfig = progressionConfig[activeAction];
        
        // Check if this action belongs to the target sector
        if (actionConfig && actionConfig.sector === demolishSector) {
          actionsToRemove.push(activeAction);
        }
      }
      
      // Remove all actions from the sector's active CPM
      actionsToRemove.forEach(action => currentlyActive.delete(action));
    } else {
      // Add the built action (skip demolish actions without sector)
      currentlyActive.add(log.action);
      
      // Handle replacements - if this action replaces others, remove the replaced ones
      const config = progressionConfig[log.action];
      if (config?.replaces) {
        config.replaces.forEach(replacedAction => currentlyActive.delete(replacedAction));
      }
    }
  }
  
  return currentlyActive;
}

/**
 * Helper function to get actions to display for a specific measure type
 */
export function getActionsForMeasureType(
  measureType: string,
  sectorActions: ActionConfig[],
  activeActions: Set<ActivityTypeEnum>,
  activeCPMPath: string | null,
  currentRound: number,
  activityLog: ActivityLogType[] = [],
  sector: string = ''
): { config: ActionConfig; status: ActionStatus }[] {
  const measureActions = sectorActions.filter(action => action.measureType === measureType);
  
  // If an active path exists and it's NOT this one, only show base actions (R1 unlocks)
  if (activeCPMPath && activeCPMPath !== measureType) {
    const baseActions = measureActions.filter(action => action.unlocksInRound === 1);
    return baseActions.map(action => 
      getActionState(action, activeActions, activeCPMPath, currentRound, activityLog)
    );
  }
  
  // If this IS the active path OR no path is active, show all unlocked actions
  const unlockedActions = measureActions.filter(action => action.unlocksInRound <= currentRound);
  return unlockedActions.map(action => 
    getActionState(action, activeActions, activeCPMPath, currentRound, activityLog)
  );
}



/**
 * Get all actions for a specific sector
 */
export function getSectorActions(sector: string): ActionConfig[] {
  return Object.values(progressionConfig).filter(action => action.sector === sector);
}

/**
 * Check if there are any constructions in a sector across the entire game session
 * This is used for demolish button availability - demolish should be available if there are
 * constructions in the sector AND the sector's CPM is demolishable, regardless of round
 */
export function hasAnyConstructionInSector(
  sector: string,
  activityLog: ActivityLogType[]
): boolean {
  const activeActions = calculateActiveActions(activityLog);
  
  // Check if any active action belongs to this sector
  let hasConstructions = false;
  for (const activeAction of activeActions) {
    const actionConfig = progressionConfig[activeAction];
    if (actionConfig && actionConfig.sector === sector) {
      hasConstructions = true;
      break;
    }
  }
  
  // Return true only if there are constructions AND the sector is demolishable
  return hasConstructions && isSectorDemolishable(sector, activeActions);
}

/**
 * Check if a measure type has any selectable actions (now or in future)
 * This is used to determine if a CPM path is truly "No More Available Upgrades"
 */
export function hasAnySelectableActionsInMeasureType(
  measureType: string,
  sectorActions: ActionConfig[],
  activeActions: Set<ActivityTypeEnum>,
  activeCPMPath: string | null,
  currentRound: number
): boolean {
  const measureActions = sectorActions.filter(action => action.measureType === measureType);
  
  // Check all actions in this measure type
  for (const action of measureActions) {
    const actionState = getActionState(action, activeActions, activeCPMPath, currentRound);

    // Consider an action available if it's selectable now OR will become selectable in future rounds
    if (actionState.status === ActionStatus.SELECTABLE) {
      return true;
    }

    // Also check if it's locked only due to round requirement (will be available in future)
    if (actionState.status === ActionStatus.LOCKED_PREREQUISITE && action.unlocksInRound > currentRound) {
      // Check if prerequisites would be met (ignoring round requirement)
      const wouldPrerequisitesBeMet = !action.prerequisites ||
        prerequisitesAreMet(action.prerequisites, activeActions);

      if (wouldPrerequisitesBeMet) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Find the round when a CPM path was completed (last action taken)
 * Returns null if the path is not completed
 */
export function getCPMCompletionRound(
  measureType: string,
  sector: string,
  activityLog: ActivityLogType[]
): number | null {
  // Get all actions for this measure type in this sector
  const measureActions = Object.values(progressionConfig).filter(
    action => action.measureType === measureType && action.sector === sector
  );
  
  if (measureActions.length === 0) return null;
  
  // Find the latest round where an action from this measure type was taken
  let latestRound: number | null = null;
  
  for (const log of activityLog) {
    if (log.action === ActivityTypeEnum.DEMOLISH) continue; // Skip demolish actions
    
    const actionConfig = progressionConfig[log.action];
    if (actionConfig && actionConfig.sector === sector && actionConfig.measureType === measureType) {
      const actionRound = log.round || 1;
      if (latestRound === null || actionRound > latestRound) {
        latestRound = actionRound;
      }
    }
  }
  
  // Check if the path is actually completed (no more selectable actions)
  if (latestRound !== null) {
    const activeActions = calculateActiveActions(activityLog);
    const sectorActions = getSectorActions(sector);
    const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
    
    const hasSelectableActions = hasAnySelectableActionsInMeasureType(
      measureType,
      sectorActions,
      activeActions,
      activeCPMPath,
      latestRound
    );
    
    // Only return completion round if there are no more selectable actions
    return hasSelectableActions ? null : latestRound;
  }
  
  return null;
}

/**
 * Calculate which buttons should be visible for a round (called once at round start)
 * This determines the static set of buttons that will remain visible throughout the round
 */
export function calculateRoundStartButtonSet(
  activityLog: ActivityLogType[],
  currentRound: number,
  sector: string,
  measureType: string
): { config: ActionConfig; status: ActionStatus }[] {
  // Calculate progression state at round start
  const activeActions = calculateActiveActions(activityLog);
  const sectorActions = getSectorActions(sector);
  const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);
  
  // Get all actions for this measure type
  const allActionsForMeasure = getActionsForMeasureType(
    measureType,
    sectorActions,
    activeActions,
    activeCPMPath,
    currentRound,
    activityLog,
    sector
  );
  
  // Filter actions based on round start rules
  return allActionsForMeasure.filter(actionState => {
    // Rule 1: Hide actions completed in previous rounds
    if (actionState.status === ActionStatus.COMPLETED) {
      const completedLog = activityLog.find(log => 
        log.action === actionState.config.id && log.round !== undefined
      );
      const completedInRound = completedLog?.round || currentRound;
      // Hide if completed in a previous round
      return completedInRound >= currentRound;
    }
    
    // Rule 2: In active CPM paths, hide non-selectable actions
    if (activeCPMPath === measureType) {
      const isNonSelectable = actionState.status === ActionStatus.LOCKED_CONFLICT || 
                            actionState.status === ActionStatus.LOCKED_PREREQUISITE ||
                            actionState.status === ActionStatus.REPLACED;
      return !isNonSelectable; // Hide non-selectable actions in active CPM
    }
    
    // Rule 3: Hide buttons with unmet prerequisites (regardless of unlock round)
    // This prevents showing unclickable buttons across all rounds
    if (actionState.status === ActionStatus.LOCKED_PREREQUISITE) {
      return false; // Hide buttons that can't be clicked due to unmet prerequisites
    }
    
    // Rule 4: In non-active CPM paths, show remaining actions (they'll be properly disabled)
    return true;
  });
}

/**
 * Non-hook version of progression state calculation for testing
 * This replicates the logic from useProgression hook without React dependencies
 */
export function calculateProgressionState(
  activityLog: ActivityLogType[], 
  currentRound: number,
  sector: string
) {
  // 1. Calculate active actions from activity log
  const activeActions = calculateActiveActions(activityLog);

  // 2. Get all actions for this sector
  const sectorActions = getSectorActions(sector);

  // 3. Determine the active CPM path
  const activeCPMPath = getActiveCPMPath(sectorActions, activeActions);

  // 4. Build the ProgressionState object
  const measureTypes = [
    'mangroves',
    'seawall', 
    'land-reclamation',
    'storm-surge-barrier',
    'artificial-reef',
    'hybrid-measure',
    'revetment'
  ];

  const state = {
    activeCPM: activeCPMPath as any,
    mangroves: [] as any[],
    seawall: [] as any[],
    landReclamation: [] as any[],
    stormSurgeBarrier: [] as any[],
    artificialReef: [] as any[],
    hybridMeasure: [] as any[],
    revetment: [] as any[]
  };

  // Map measure types to state property names
  const measureTypeToProperty: Record<string, keyof typeof state> = {
    'mangroves': 'mangroves',
    'seawall': 'seawall',
    'land-reclamation': 'landReclamation',
    'storm-surge-barrier': 'stormSurgeBarrier',
    'artificial-reef': 'artificialReef',
    'hybrid-measure': 'hybridMeasure',
    'revetment': 'revetment'
  };

  // Populate each measure type
  for (const measureType of measureTypes) {
    const propertyName = measureTypeToProperty[measureType];
    if (propertyName && propertyName !== 'activeCPM') {
      state[propertyName] = getActionsForMeasureType(
        measureType,
        sectorActions,
        activeActions,
        activeCPMPath,
        currentRound,
        activityLog,
        sector
      );
    }
  }

  return state;
}