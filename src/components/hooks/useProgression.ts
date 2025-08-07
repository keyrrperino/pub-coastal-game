import { useMemo } from 'react';
import { ActivityTypeEnum } from '@/lib/enums';
import { ActivityLogType, ActionStatus, ActionState, ProgressionState, ActionConfig } from '@/lib/types';
import { progressionConfig } from '@/lib/progression.config';
import {
  calculateActiveActions,
  getActiveCPMPath,
  getActionsForMeasureType,
  getSectorActions
} from '@/lib/progressionUtils';

/**
 * Main useProgression hook - returns ProgressionState for a specific sector
 */
export function useProgression(
  activityLog: ActivityLogType[], 
  currentRound: number,
  sector: string
): ProgressionState {
  
  // 1. Calculate active actions from activity log
  const activeActions = useMemo(() => {
    return calculateActiveActions(activityLog);
  }, [activityLog]);

  // 2. Get all actions for this sector
  const sectorActions = useMemo(() => {
    return getSectorActions(sector);
  }, [sector]);

  // 3. Determine the active CPM path
  const activeCPMPath = useMemo(() => {
    return getActiveCPMPath(sectorActions, activeActions);
  }, [sectorActions, activeActions]);

  // 4. Build the ProgressionState object
  const progressionState = useMemo((): ProgressionState => {
    const measureTypes = [
      'mangroves',
      'seawall', 
      'land-reclamation',
      'storm-surge-barrier',
      'artificial-reef',
      'hybrid-measure',
      'revetment'
    ];

    const state: ProgressionState = {
      activeCPM: activeCPMPath as any,
      mangroves: [],
      seawall: [],
      landReclamation: [],
      stormSurgeBarrier: [],
      artificialReef: [],
      hybridMeasure: [],
      revetment: []
    };

    // Map measure types to state property names
    const measureTypeToProperty: Record<string, keyof ProgressionState> = {
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
          currentRound
        );
      }
    }

    return state;
  }, [sectorActions, activeActions, activeCPMPath, currentRound]);

  return progressionState;
}

// Legacy compatibility - keep the old interface for existing components
export interface UseProgressionResult {
  activeActions: Set<ActivityTypeEnum>;
  availableActions: ActionConfig[];
  getActionsForSector: (sector: string) => {
    activeActions: ActionConfig[];
    availableActions: ActionConfig[];
    displayableActions: ActionConfig[];
  };
}

/**
 * Legacy useProgression function for backward compatibility
 * @deprecated Use the new useProgression function instead
 */
export function useProgressionLegacy(
  activityLog: ActivityLogType[], 
  currentRound: number
): UseProgressionResult {
  
  // 1. Memoize the active actions to prevent re-renders
  const activeActions = useMemo(() => {
    return calculateActiveActions(activityLog);
  }, [activityLog]);

  // 2. Determine available actions based on round-specific logic
  const availableActions = useMemo(() => {
    const filtered = Object.values(progressionConfig).filter(action => {
      // Check 1: Is the action already active?
      if (activeActions.has(action.id)) return false;

      // Check 2: Round-specific availability logic
      if (action.unlocksInRound > currentRound) return false;

      // Check 3: Are there any conflicts?
      const hasConflict = action.conflicts?.some(conflictId => activeActions.has(conflictId));
      if (hasConflict) return false;

      // Check 4: Are prerequisites met? (Handles OR/AND logic)
      if (action.prerequisites && action.prerequisites.length > 0) {
        const prereqsMet = action.prerequisites.some(orGroup =>
          orGroup.every(andCondition => activeActions.has(andCondition))
        );
        if (!prereqsMet) return false;
      }

      // If all checks pass, the action is available
      return true;
    });
    
    return filtered;
  }, [activeActions, currentRound]);

  // 3. Helper function to get actions for a specific sector
  const getActionsForSector = useMemo(() => {
    return (sector: string) => {
      const sectorActiveActions = Object.values(progressionConfig)
        .filter(action => action.sector === sector && activeActions.has(action.id));
      
      const sectorAvailableActions = availableActions
        .filter(action => action.sector === sector);

      return {
        activeActions: sectorActiveActions,
        availableActions: sectorAvailableActions,
        displayableActions: sectorAvailableActions, // For legacy compatibility
      };
    };
  }, [activeActions, availableActions]);

  // 4. Return the results
  return { 
    activeActions, 
    availableActions, 
    getActionsForSector 
  };
}