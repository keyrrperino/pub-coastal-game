import { ActivityTypeEnum } from './enums';
import { ActivityLogType, ActionStatus, ActionConfig } from './types';
import { progressionConfig } from './progression.config';

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
 * Helper function to determine the status of any given action
 */
export function getActionState(
  actionConfig: ActionConfig,
  activeActions: Set<ActivityTypeEnum>,
  activeCPMPath: string | null,
  currentRound: number
): { config: ActionConfig; status: ActionStatus } {
  let status: ActionStatus;

  // Check 1: Is the action already completed?
  if (activeActions.has(actionConfig.id)) {
    status = ActionStatus.COMPLETED;
  }
  // Check 2: Was this action replaced by an active action?
  else if (isActionReplaced(actionConfig.id, activeActions)) {
    status = ActionStatus.REPLACED;
  }
  // Check 3: Is there a conflicting CPM path active?
  // This applies only to base-level actions (Round 1 unlocks).
  else if (
    activeCPMPath && 
    actionConfig.unlocksInRound === 1 && 
    actionConfig.measureType !== activeCPMPath
  ) {
    status = ActionStatus.LOCKED_CONFLICT;
  }
  // Check 4: Are prerequisites met?
  else if (
    actionConfig.prerequisites && 
    !prerequisitesAreMet(actionConfig.prerequisites, activeActions)
  ) {
    status = ActionStatus.LOCKED_PREREQUISITE;
  }
  // Check 5: Is the round high enough?
  else if (actionConfig.unlocksInRound > currentRound) {
    status = ActionStatus.LOCKED_PREREQUISITE;
  }
  // If all checks pass, it's selectable.
  else {
    status = ActionStatus.SELECTABLE;
  }

  return { config: actionConfig, status };
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
  
  // If an active path exists and it's NOT this one, only include the base (buttonGroup 1) action
  if (activeCPMPath && activeCPMPath !== measureType) {
    const baseAction = measureActions.find(action => action.buttonGroup === 1);
    return baseAction ? [getActionState(baseAction, activeActions, activeCPMPath, currentRound)] : [];
  }
  
  // If this IS the active path, show the appropriate buttonGroup for the current round
  if (activeCPMPath === measureType) {
    // If activityLog or sector not provided, fall back to old unlocksInRound logic
    if (!activityLog.length || !sector) {
      const currentRoundActions = measureActions.filter(action => action.unlocksInRound <= currentRound);
      return currentRoundActions.map(action => 
        getActionState(action, activeActions, activeCPMPath, currentRound)
      );
    }
    
    const cpmStartRound = getCPMStartRound(measureType, sector, activityLog);
    if (cpmStartRound === null) return []; // CPM not started yet
    
    // Calculate which buttonGroup to show: currentRound - cpmStartRound + 1
    const targetButtonGroup = currentRound - cpmStartRound + 1;
    
    const currentGroupActions = measureActions.filter(action => action.buttonGroup === targetButtonGroup);
    return currentGroupActions.map(action => 
      getActionState(action, activeActions, activeCPMPath, currentRound)
    );
  }
  
  // If NO path is active, show all base actions (buttonGroup 1)
  if (!activeCPMPath) {
    const baseAction = measureActions.find(action => action.buttonGroup === 1);
    return baseAction ? [getActionState(baseAction, activeActions, activeCPMPath, currentRound)] : [];
  }
  
  return [];
}

/**
 * Helper function to determine when a CPM path was first started
 */
export function getCPMStartRound(
  measureType: string,
  sector: string,
  activityLog: ActivityLogType[]
): number | null {
  // Find the first action in this sector that belongs to this measure type
  const sortedLog = [...activityLog].sort((a, b) => a.timestamp - b.timestamp);
  
  for (const log of sortedLog) {
    if (log.action === ActivityTypeEnum.DEMOLISH) continue; // Skip demolish actions
    
    const actionConfig = progressionConfig[log.action];
    if (actionConfig && actionConfig.sector === sector && actionConfig.measureType === measureType) {
      return log.round || 1; // Return the round when this CPM was first started
    }
  }
  
  return null; // CPM path not started yet
}

/**
 * Get all actions for a specific sector
 */
export function getSectorActions(sector: string): ActionConfig[] {
  return Object.values(progressionConfig).filter(action => action.sector === sector);
}

/**
 * Check if there are any constructions in a sector across the entire game session
 * This is used for demolish button availability - demolish should be available if there's
 * ANY construction in the sector, regardless of round
 */
export function hasAnyConstructionInSector(
  sector: string,
  activityLog: ActivityLogType[]
): boolean {
  const activeActions = calculateActiveActions(activityLog);
  
  // Check if any active action belongs to this sector
  for (const activeAction of activeActions) {
    const actionConfig = progressionConfig[activeAction];
    if (actionConfig && actionConfig.sector === sector) {
      return true;
    }
  }
  
  return false;
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