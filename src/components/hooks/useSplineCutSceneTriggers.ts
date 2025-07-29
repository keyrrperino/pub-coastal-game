import { useEffect, useState } from "react";
import { Application, SPEObject, SplineEventName } from "@splinetool/runtime";
import { ActivityLogType, LobbyStateType } from "@/lib/types";
import { SplineTriggersConfig } from "@/lib/constants";
import { ActivityTypeEnum, CutScenesEnum, GameLobbyStatus, UserSectorEnum } from "@/lib/enums";
import { isGameOnGoing } from "@/lib/utils";

type UseSplineTriggersProps = {
  progress: number;
  splineAppCutScenesRefs: { [key in CutScenesEnum]: React.RefObject<Application | null> },
  activities: ActivityLogType[] | null;
  lobbyState: LobbyStateType;
  setLoadCutScenes: React.Dispatch<React.SetStateAction<CutScenesEnum[]>>;
  loadCutScenes:CutScenesEnum[];
};

export function useCutSceneSplineTriggers({
  progress,
  loadCutScenes,
  setLoadCutScenes,
}: UseSplineTriggersProps) {
  const [currentCutSceneIndex, setCurrentCutSceneIndex] = useState<number | null>(null);

  // Start the cutscene sequence when progress <= 0
  useEffect(() => {
    if (progress <= 0.02) {
      const cutScenes = [
        CutScenesEnum.R1_1A_0,
        CutScenesEnum.R1_1B_0,
        CutScenesEnum.R1_2A_0,
        CutScenesEnum.R1_2B_0,
        CutScenesEnum.R1_3A_0,
        CutScenesEnum.R1_3B_0
      ];
      setLoadCutScenes(cutScenes);
      setCurrentCutSceneIndex(0);
    }
  }, [progress]);

  // Advance the cutscene every 3 seconds
  useEffect(() => {
    if (
      loadCutScenes.length > 0 &&
      currentCutSceneIndex !== null &&
      currentCutSceneIndex < loadCutScenes.length
    ) {
      const timer = setTimeout(() => {
        setCurrentCutSceneIndex(currentCutSceneIndex + 1);
      }, 5000);

      return () => clearTimeout(timer);
    } else if (
      loadCutScenes.length > 0 &&
      currentCutSceneIndex === loadCutScenes.length
    ) {
      // All cutscenes shown, reset state or trigger next logic
      setCurrentCutSceneIndex(null);
      setLoadCutScenes([]);
      
    }
  }, [currentCutSceneIndex, loadCutScenes]);

  // The currently displayed cutscene (or null if none)
  const currentCutScene =
    currentCutSceneIndex !== null && currentCutSceneIndex < loadCutScenes.length
      ? loadCutScenes[currentCutSceneIndex]
      : null;

  return { currentCutScene, loadCutScenes, isSequenceActive: currentCutSceneIndex !== null };
}