import { useMemo } from 'react';
import { ActivityTypeEnum } from '@/lib/enums';
import { ActivityLogType } from '@/lib/types';
import { progressionConfig, ActionConfig } from '@/lib/progression.config';

// Helper function to determine if an action should be available in a specific round
function isActionAvailableForRound(
  action: ActionConfig, 
  currentRound: number, 
  activeActions: Set<ActivityTypeEnum>
): boolean {
  // Round 1: Show only basic foundation actions
  if (currentRound === 1) {
    return action.unlocksInRound === 1;
  }
  
  // Round 2: Show upgrades and extensions of Round 1 actions
  if (currentRound === 2) {
    if (action.unlocksInRound === 2) {
      return true; // Prerequisites will be checked separately
    }
    // Don't show Round 1 actions in Round 2 unless they have no prerequisites
    // (meaning they're still foundational choices)
    if (action.unlocksInRound === 1) {
      return !action.prerequisites || action.prerequisites.length === 0;
    }
    return false;
  }
  
  // Round 3: Show final upgrades and path/boardwalk additions
  if (currentRound === 3) {
    if (action.unlocksInRound === 3) {
      return true; // Prerequisites will be checked separately
    }
    // In Round 3, don't show earlier round actions unless they're special cases
    // (like foundational actions that can still be built)
    if (action.unlocksInRound <= 2) {
      // Only show if it's a foundational action with no prerequisites
      return !action.prerequisites || action.prerequisites.length === 0;
    }
    return false;
  }
  
  // For any round beyond 3, use the standard unlock logic
  return action.unlocksInRound <= currentRound;
}

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

  // 2. Determine available actions based on round-specific logic
  const availableActions = useMemo(() => {
    const filtered = Object.values(progressionConfig).filter(action => {
      // Check 1: Is the action already active?
      if (activeActions.has(action.id)) return false;

      // Check 2: Round-specific availability logic
      if (!isActionAvailableForRound(action, currentRound, activeActions)) return false;

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
    
    console.log(`Round ${currentRound} available actions:`, filtered.map(a => `${a.sector}: ${a.displayName} (${a.measureType})`));
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