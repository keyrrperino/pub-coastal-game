import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { CutScenesEnum, GameLobbyStatus, LobbyStateEnum } from "@/lib/enums";
 
import { GameRoomService } from "@/lib/gameRoom";
import { ActivityLogType, LobbyStateType, OverallScoresTypes, RoundType } from "@/lib/types";
import { PHASE_DURATIONS } from "./phaseUtils";
import { useTimer } from "./useTimer";
import { meanSeaLevels, sceneSectorConfigurations } from "@/lib/constants";

const getCutScenes = (round: RoundType, overAllScores: { [key in RoundType]?: OverallScoresTypes }): CutScenesEnum[] => {
  console.log(overAllScores);
  const keys = [
    overAllScores[round]?.user_sector_1?.sectorA.keys[0],
    overAllScores[round]?.user_sector_1?.sectorB.keys[0],
    overAllScores[round]?.user_sector_2?.sectorA.keys[0],
    overAllScores[round]?.user_sector_2?.sectorB.keys[0],
    overAllScores[round]?.user_sector_3?.sectorA.keys[0],
    overAllScores[round]?.user_sector_3?.sectorB.keys[0],
  ].filter((key): key is string => typeof key === 'string'); // Filter out non-string values

  const newsIntro = {
    1: CutScenesEnum.NEWS_INTRO_1,
    2: CutScenesEnum.NEWS_INTRO_2,
    3: CutScenesEnum.NEWS_INTRO_3,
  }

  return [...[newsIntro[round]], ...keys.map((value) => {
    return sceneSectorConfigurations[value].cutscene as CutScenesEnum;
  })];
};

export enum CutScenesStatusEnum {
  STARTED = "STARTED",
  ENDED = "ENDED",
  NOT_YET_STARTED = "NOT_YET_STARTED"
}

export function useCutSceneSequence(
  lobbyState: LobbyStateType,
  overAllScores: {[key in RoundType]?: OverallScoresTypes}
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
      const dynamicCutScenes = getCutScenes(lobbyState.round ?? 1, overAllScores);
      console.log(dynamicCutScenes);
      setCutScenes(dynamicCutScenes);
      setCurrentCutSceneIndex(0);
    }
  }, [lobbyState.gameLobbyStatus, getCutScenes]);

  // Ensure cutscenes initialize when entering ROUND_CUTSCENES from elsewhere (e.g., admin)
  useEffect(() => {
    if (lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_CUTSCENES && cutScenes.length === 0) {
      const dynamicCutScenes = getCutScenes(lobbyState.round ?? 1, overAllScores);
      console.log(dynamicCutScenes);
      setCutScenes(dynamicCutScenes);
      setCurrentCutSceneIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobbyState.gameLobbyStatus, getCutScenes]);

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

  // Drive cutscene index from a 33s timer:
  // - First 3s reserved for intro news
  // - Remaining 30s split evenly across up to 6 cutscenes
  useTimer({
    duration: lobbyState.phaseDuration,
    startImmediately: lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_CUTSCENES,
    syncWithTimestamp: lobbyState.phaseStartTime,
    onTick: (remainingSeconds: number) => {
      if (lobbyState.gameLobbyStatus !== GameLobbyStatus.ROUND_CUTSCENES) return;
      const totalDuration = Math.max(1, lobbyState.phaseDuration || 33);
      const elapsed = totalDuration - remainingSeconds;
      if (cutScenes.length === 0) return;

      const hasIntro = cutScenes[0] === CutScenesEnum.NEWS_INTRO;
      const introDuration = hasIntro ? 3 : 0;

      if (elapsed < introDuration) {
        if (currentCutSceneIndex !== 0) setCurrentCutSceneIndex(0);
        return;
      }

      const remainingCount = Math.min(6, Math.max(0, cutScenes.length - (hasIntro ? 1 : 0)));
      const remainingDuration = Math.max(0, totalDuration - introDuration);

      if (remainingCount <= 0 || remainingDuration <= 0) {
        const boundedIndex = Math.min(cutScenes.length - 1, hasIntro ? 0 : 0);
        if (currentCutSceneIndex !== boundedIndex) setCurrentCutSceneIndex(boundedIndex);
        return;
      }

      const elapsedAfterIntro = elapsed - introDuration;
      const segmentLength = remainingDuration / remainingCount; // 30s / N
      const nextIndexAfterIntro = Math.min(remainingCount - 1, Math.floor(elapsedAfterIntro / segmentLength));
      const boundedIndex = Math.min(cutScenes.length - 1, (hasIntro ? 1 : 0) + nextIndexAfterIntro);

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

  //   // Drive cutscene index from a 30s timer split into N segments
  // // If there are fewer than 6 cutscenes, divide 30s by the actual count
  // useTimer({
  //   duration: lobbyState.phaseDuration,
  //   startImmediately: lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_CUTSCENES,
  //   syncWithTimestamp: lobbyState.phaseStartTime,
  //   onTick: (remainingSeconds: number) => {
  //     if (lobbyState.gameLobbyStatus !== GameLobbyStatus.ROUND_CUTSCENES) return;
  //     const totalDuration = Math.max(1, lobbyState.phaseDuration || 30);
  //     const elapsed = totalDuration - remainingSeconds;
  //     if (cutScenes.length === 0) return;
  //     const segmentCount = Math.min(6, cutScenes.length);
  //     const segmentLength = totalDuration / segmentCount;
  //     const nextIndex = Math.min(segmentCount - 1, Math.floor(elapsed / segmentLength));

  //     const boundedIndex = Math.min(nextIndex, cutScenes.length - 1);
  //     if (currentCutSceneIndex !== boundedIndex) {
  //       setCurrentCutSceneIndex(boundedIndex);
  //     }
  //   },
  //   onTimeUp: () => {
  //     // End of cutscene phase
  //     setCutScenesStatus(CutScenesStatusEnum.ENDED);
  //     setCurrentCutSceneIndex(null);
  //   },
  // });

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