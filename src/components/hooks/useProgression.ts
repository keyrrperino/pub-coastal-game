import { useMemo } from 'react';
import { ActivityTypeEnum } from '@/lib/enums';
import { ActivityLogType } from '@/lib/types';
import { progressionConfig, ActionConfig } from '@/lib/progression.config';

export interface UseProgressionResult {
  activeActions: Set<ActivityTypeEnum>;
  availableActions: ActionConfig[];
  getActionsForSector: (sector: string) => {
    activeActions: ActionConfig[];
    availableActions: ActionConfig[];
  };
}

export function useProgression(
  activityLog: ActivityLogType[], 
  currentRound: number
): UseProgressionResult {
  
  // 1. Memoize the active actions to prevent re-renders
  const activeActions = useMemo(() => {
    const currentlyActive = new Set<ActivityTypeEnum>();

    // Process activity log chronologically to handle build -> demolish -> build sequences
    const sortedLog = [...activityLog].sort((a, b) => a.timestamp - b.timestamp);
    
    for (const log of sortedLog) {
      if (log.action === ActivityTypeEnum.DEMOLISH) {
        // For demolish actions, the 'value' contains the ID of the demolished item
        const demolishedActionId = log.value as ActivityTypeEnum;
        currentlyActive.delete(demolishedActionId);
      } else {
        // Add the built action
        currentlyActive.add(log.action);
        
        // Handle replacements - if this action replaces another, remove the replaced one
        const config = progressionConfig[log.action];
        if (config?.replaces) {
          currentlyActive.delete(config.replaces);
        }
      }
    }
    
    return currentlyActive;
  }, [activityLog]);

  // 2. Determine available actions
  const availableActions = useMemo(() => {
    return Object.values(progressionConfig).filter(action => {
      // Check 1: Is the action already active?
      if (activeActions.has(action.id)) return false;

      // Check 2: Is the current round high enough?
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