import React, { useEffect, useRef, useState } from "react";
import { Application, SplineEventName } from "@splinetool/runtime";
import { GameRoomService } from "@/lib/gameRoom";
import ProgressBar from "@/games/pub-coastal-game/compontents/ProcessBar";
import { ActivityLogType, LobbyStateType } from "@/lib/types";
import { lobbyStateDefaultValue, SPLINE_URL, splineCutScenesUrls, SplineTriggersConfig } from "@/lib/constants";
import { ActivityTypeEnum, CutScenesEnum, GameEnum, GameLobbyStatus } from "@/lib/enums";
import { useInitialize } from "./hooks/initialize";
import { useMainProgress } from "./hooks/useMainProgress";
import { useSplineTriggers } from "./hooks/useSplineTriggers";
import { useLobbyPreparation } from "./hooks/useLobbyPreparation";
import { isGameOnGoing } from "@/lib/utils";
import { useSplineLoader } from "./hooks/useSplineLoader";
import { useCutSceneSequence } from "./hooks/useSplineCutSceneTriggers";
import { useCutSceneSplineLoader } from "./hooks/useCutSceneSplineLoader";
import { useHideAllTriggers } from "./hooks/useHideAllSplineTriggers";

interface SplineFirebaseProps {
}

const SplineFirebase: React.FC<SplineFirebaseProps> = () => {
  const {
    canvasRef,
    splineAppRef,
    canvasCutScenesRefs,
    splineAppCutScenesRefs,
    gameRoomServiceRef,
    isLoaded, setIsLoaded,
    activities, setActivities,
    newActivities, setNewActivities,
    waterLevel, setWaterLevel,
    lobbyState, setLobbyState,
    triggersLoading, setTriggersLoading,
    triggerProgress, setTriggerProgress,
    cutScenesStatus, setCutScenesStatus
  } = useInitialize();
  useHideAllTriggers(isLoaded, splineAppRef, lobbyState);
  useLobbyPreparation({ lobbyState, gameRoomServiceRef });
  useSplineLoader(
    canvasRef,
    splineAppRef,
    setIsLoaded
  );

  const {
    setLoadCutScenes,
    loadCutScenes
  } = useCutSceneSplineLoader(
    canvasCutScenesRefs,
    splineAppCutScenesRefs
  );

  useEffect(() => {
    if (triggerProgress >= 100) {
      setTriggersLoading(false);
    }

  }, [triggerProgress]);

  useSplineTriggers({
    isLoaded,
    splineAppRef,
    activities,
    newActivities,
    triggerProgress,
    setTriggerProgress,
    lobbyState
  });


  const {progress, isStarting} = useMainProgress(
    30, // countdown seconds
    lobbyState.gameLobbyStatus,
    triggersLoading,
    lobbyState.countdownStartTime,
    3 // <-- 3 seconds delay before countdown starts
  );

  const { currentCutScene, canvasCutSceneRef, isSequenceActive } = 
    useCutSceneSequence(progress, gameRoomServiceRef, lobbyState);
  // Main Progress logic

  const renderCutScenes = (
    <>
      {currentCutScene && (
        <div
          className="fixed inset-0 w-screen h-screen m-0 p-0 bg-black z-10"
          style={{ opacity: 1 }}
        >
          <canvas
            ref={canvasCutSceneRef}
            className="fixed w-full h-full m-0 p-0 z-10"
            style={{ borderRadius: 0, border: "none", display: "block" }}
          />
        </div>
      )}
      {/* ...rest of your UI... */}
    </>
  );

  return (
    <div
      className="fixed inset-0 w-screen h-screen m-0 p-0 bg-black z-0"
      style={{ borderRadius: 0, gap: 0 }}
    >
      {/* Only show Spline when triggers are done loading */}
      
      {renderCutScenes}

      <canvas
        ref={canvasRef}
        className={"w-full z-9 h-full m-0 p-0 " + (triggersLoading && "d-none")}
        style={{ display: "block", borderRadius: 0, border: "none" }}
      />
  
      {!isStarting && !triggersLoading && isGameOnGoing(lobbyState.gameLobbyStatus) && (lobbyState.gameLobbyStatus === GameLobbyStatus.STARTED) &&
        <ProgressBar
          progress={progress}
          key="lead"
          containerClassName="fixed z-10 top-[10vh] left-[30vw]"
        />}

      
      {/* Loading overlay with percentage */}
      {(triggersLoading) && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10"
          style={{ borderRadius: 0 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <span className="text-xl font-semibold text-blue-700 mb-2">
            {isLoaded ? `Loading Map... ${triggerProgress}% ${triggersLoading}` : "Loading Map..."}
          </span>
        </div>
      )}
    </div>
  );
};

export default SplineFirebase; 