import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { CutScenesEnum, GameLobbyStatus, LobbyStateEnum } from "@/lib/enums";
import { splineCutScenesUrls } from "@/lib/constants";
import { GameRoomService } from "@/lib/gameRoom";
import { getCutScenes } from "@/lib/utils";
import { ActivityLogType, LobbyStateType } from "@/lib/types";

export enum CutScenesStatusEnum {
  STARTED = "STARTED",
  ENDED = "ENDED",
  NOT_YET_STARTED = "NOT_YET_STARTED"
}

export function useCutSceneSequence(
  progress: number,
  gameRoomServiceRef: React.RefObject<GameRoomService | null>,
  lobbyState: LobbyStateType,
  activities: ActivityLogType[]
) {
  const [currentCutSceneIndex, setCurrentCutSceneIndex] = useState<number | null>(null);
  const [currentCutScene, setCurrentCutScene] = useState<CutScenesEnum | null>(null);
  const [cutSceneStatus, setCutScenesStatus] = useState<CutScenesStatusEnum>(CutScenesStatusEnum.NOT_YET_STARTED);
  const splineAppRef = useRef<Application | null>(null);

  // List of cutscenes to show
  const [cutScenes, setCutScenes] = useState<CutScenesEnum[]>([]);

  // Start sequence when progress is done
  useEffect(() => {
    if (progress <= 0.02) {
      const dynamicCutScenes = getCutScenes(0.3, lobbyState.randomizeEffect, activities);
      setCutScenes(dynamicCutScenes);

      gameRoomServiceRef.current
        ?.updateLobbyStateKeyValue(
          LobbyStateEnum.GAME_LOBBY_STATUS, GameLobbyStatus.ROUND_ONE_GAME_ENDED);
      setCurrentCutSceneIndex(0);
    }
  }, [progress]);

  // Load the current cutscene
  useEffect(() => {
    if (
      currentCutSceneIndex !== null &&
      currentCutSceneIndex >= 0 &&
      currentCutSceneIndex < cutScenes.length
    ) {
      setCutScenesStatus(CutScenesStatusEnum.STARTED);
      setCurrentCutScene(cutScenes[currentCutSceneIndex]);

      // Clean up previous Spline app
      if (splineAppRef.current) {
        splineAppRef.current.dispose?.();
        splineAppRef.current = null;
      }

      // Load new Spline scene
      // Set up timer for next scene
      const timer = setTimeout(() => {
        setCurrentCutSceneIndex((idx) => {
          if (idx === cutScenes.length - 1) {
            setCutScenesStatus(CutScenesStatusEnum.ENDED);
          }
          return idx !== null && idx + 1 < cutScenes.length ? idx + 1 : null
        });
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Sequence finished, clean up
      setCurrentCutScene(null);
      if (splineAppRef.current) {
        splineAppRef.current.dispose?.();
        splineAppRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCutSceneIndex, setCutScenesStatus]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (splineAppRef.current) {
        splineAppRef.current.dispose?.();
        splineAppRef.current = null;
      }
    };
  }, []);

  return {
    currentCutScene,
    isSequenceActive: currentCutSceneIndex !== null,
    currentCutSceneIndex,
    cutSceneStatus
  };
}