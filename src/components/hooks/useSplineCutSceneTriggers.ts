import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { CutScenesEnum, GameLobbyStatus, LobbyStateEnum } from "@/lib/enums";
 
import { GameRoomService } from "@/lib/gameRoom";
import { getCutScenes } from "@/lib/utils";
import { ActivityLogType, LobbyStateType } from "@/lib/types";
import { PHASE_DURATIONS } from "./phaseUtils";
import { useTimer } from "./useTimer";

export enum CutScenesStatusEnum {
  STARTED = "STARTED",
  ENDED = "ENDED",
  NOT_YET_STARTED = "NOT_YET_STARTED"
}

export function useCutSceneSequence(
  lobbyState: LobbyStateType,
  activities: ActivityLogType[]
) {
  const [currentCutSceneIndex, setCurrentCutSceneIndex] = useState<number | null>(null);
  const [currentCutScene, setCurrentCutScene] = useState<CutScenesEnum | null>(null);
  const [cutSceneStatus, setCutScenesStatus] = useState<CutScenesStatusEnum>(CutScenesStatusEnum.NOT_YET_STARTED);
  const splineAppRef = useRef<Application | null>(null);

  // List of cutscenes to show
  const [cutScenes, setCutScenes] = useState<CutScenesEnum[]>([]);

  // Initialize cutscenes when entering ROUND_CUTSCENES
  useEffect(() => {
    if (lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_CUTSCENES) {
      const dynamicCutScenes = getCutScenes(0.3, lobbyState.randomizeEffect[lobbyState?.round ?? 1], activities);
      setCutScenes(dynamicCutScenes);
      setCurrentCutSceneIndex(0);
    }
  }, [lobbyState.gameLobbyStatus]);

  // Ensure cutscenes initialize when entering ROUND_CUTSCENES from elsewhere (e.g., admin)
  useEffect(() => {
    if (lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_CUTSCENES && cutScenes.length === 0) {
      const dynamicCutScenes = getCutScenes(0.3, lobbyState.randomizeEffect[lobbyState?.round ?? 1], activities);
      setCutScenes(dynamicCutScenes);
      setCurrentCutSceneIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobbyState.gameLobbyStatus]);

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

      return () => {};
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

  // Drive cutscene index from a 30s timer split into N segments
  // If there are fewer than 6 cutscenes, divide 30s by the actual count
  useTimer({
    duration: lobbyState.phaseDuration,
    startImmediately: lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_CUTSCENES,
    syncWithTimestamp: lobbyState.phaseStartTime,
    onTick: (remainingSeconds: number) => {
      if (lobbyState.gameLobbyStatus !== GameLobbyStatus.ROUND_CUTSCENES) return;
      const totalDuration = Math.max(1, lobbyState.phaseDuration || 30);
      const elapsed = totalDuration - remainingSeconds;
      if (cutScenes.length === 0) return;
      const segmentCount = Math.min(6, cutScenes.length);
      const segmentLength = totalDuration / segmentCount;
      const nextIndex = Math.min(segmentCount - 1, Math.floor(elapsed / segmentLength));

      const boundedIndex = Math.min(nextIndex, cutScenes.length - 1);
      if (currentCutSceneIndex !== boundedIndex) {
        setCurrentCutSceneIndex(boundedIndex);
      }
    },
    onTimeUp: () => {
      // End of cutscene phase
      setCutScenesStatus(CutScenesStatusEnum.ENDED);
      setCurrentCutSceneIndex(null);
    },
  });

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