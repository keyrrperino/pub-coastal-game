import { useMemo } from 'react';
import { ActivityLogType, ProgressionState } from '@/lib/types';
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
          currentRound,
          activityLog,
          sector
        );
      }
    }

    return state;
  }, [sectorActions, activeActions, activeCPMPath, currentRound, activityLog, sector]);

  return progressionState;
}