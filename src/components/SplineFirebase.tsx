import React, { useEffect, useRef, useState } from "react";
import { Application, SplineEventName } from "@splinetool/runtime";
import { GameRoomService } from "@/lib/gameRoom";
import ProgressBar from "@/games/pub-coastal-game/compontents/ProcessBar";
import { ActivityLogType, LobbyStateType } from "@/lib/types";
import { lobbyStateDefaultValue, SPLINE_URL, splineCutScenesUrls, SplineTriggersConfig } from "@/lib/constants";
import { ActivityTypeEnum, CutScenesEnum, GameEnum, GameLobbyStatus, LobbyStateEnum } from "@/lib/enums";
import { useInitialize } from "./hooks/initialize";
import { useMainProgress } from "./hooks/useMainProgress";
import { useSplineTriggers } from "./hooks/useSplineTriggers";
import { useLobbyPreparation } from "./hooks/useLobbyPreparation";
import { calculateOverallScore, getMeanSeaLevelForRound, isGameOnGoing } from "@/lib/utils";
import { useSplineLoader } from "./hooks/useSplineLoader";
import { CutScenesStatusEnum, useCutSceneSequence } from "./hooks/useSplineCutSceneTriggers";
import { useCutSceneSplineLoader } from "./hooks/useCutSceneSplineLoader";
import { useHideAllTriggers } from "./hooks/useHideAllSplineTriggers";
import AnimatedModal from "@/games/pub-coastal-game/compontents/AnimatedModal";
import AnimatedTitle from "@/games/pub-coastal-game/compontents/AnimatedTitle";

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
  const [totalScore, setTotalScore] = useState<number>(10000);
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

  const [showRoundEndModal, setShowRoundEndModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [coinsLeft, setCoinsLeft] = useState(20); // 1. Add new state

  useEffect(() => {
    const score = calculateOverallScore(activities ?? [], getMeanSeaLevelForRound(lobbyState.round ?? 1), lobbyState.randomizeEffect);
    setTotalScore(score);

    const activitiesWithValueCount = (activities ?? []).filter(a => a.value && a.value.trim() !== "").length;
  const totalCoins = 20;
  setCoinsLeft(Math.max(totalCoins - activitiesWithValueCount, 0));
  }, [activities]);

  useEffect(() => {
    if (!showRoundEndModal) return;
    if (countdown === 0) {
      // Start round 2 here!
      setShowRoundEndModal(false);
      // Example: update lobby state to round 2
      if (gameRoomServiceRef.current) {
        gameRoomServiceRef.current.updateLobbyStateKeyValue(
          LobbyStateEnum.GAME_LOBBY_STATUS,
          GameLobbyStatus.STARTED // or your actual enum value
        );

        gameRoomServiceRef.current.updateLobbyStateKeyValue(
          LobbyStateEnum.COUNTDOWN_START_TIME,
          Date.now()
        );

        gameRoomServiceRef.current.updateLobbyStateKeyValue(
          LobbyStateEnum.ROUND,
          (lobbyState.round ?? 1) + 1
        );
      }
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [showRoundEndModal, countdown, gameRoomServiceRef]);

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

  const { cutSceneStatus, currentCutScene, canvasCutSceneRef, isSequenceActive } = 
    useCutSceneSequence(progress, gameRoomServiceRef, lobbyState, activities ?? []);


  useEffect(() => {
    if (cutSceneStatus === CutScenesStatusEnum.ENDED) {
      setShowRoundEndModal(true);
      setCountdown(5); // reset countdown
    }
  }, [cutSceneStatus]);
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
          {/* Frame Overlay */}
          <div className="fixed inset-0 z-20 flex items-center justify-center h-[100vh]">
            <img
              src={`/games/pub-coastal-spline/flash-reports/${currentCutScene}.png`}
              className="pointer-events-none"
              // style={{ objectFit: "" }}
              alt="Frame Overlay"
            />
          </div>
        </div>
      )}
      {/* ...rest of your UI... */}
    </>
  );

  const renderScore = (
    (!triggersLoading && isGameOnGoing(lobbyState.gameLobbyStatus) && cutSceneStatus !== CutScenesStatusEnum.STARTED) && <div className="fixed inset-0 w-screen h-screen m-0 p-0 z-10">
      <div className="flex w-full justify-between px-8 py-4  text-white text-[2vw]">
        <div className="flex flex-col">
          <h1>
            Overall budget
          </h1>
          <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: coinsLeft }).map((_, idx) => (
            <img
              key={'coin-' + idx}
              src="/games/pub-coastal-spline/images/coin.svg"
              alt="coin"
              className="w-[3vw] h-[3vw]"
            />
          ))}
          </div>
        </div>
        <div className="flex flex-col">
        <h1 className="text-center text-[3vw]">
            Round {lobbyState.round ?? 1}
          </h1>
        </div>
        <div className="flex flex-col">
          <h1 className="text-right">
            Overall Score:
          </h1>
          <h2 className="text-right">
            {totalScore}/10000 PTS
          </h2>
        </div>
      </div>
    </div>
  )

  const renderProgressBar = (
    (!triggersLoading && isGameOnGoing(lobbyState.gameLobbyStatus) && cutSceneStatus !== CutScenesStatusEnum.STARTED) && 
      <ProgressBar
        progress={progress}
        key="lead"
        round={lobbyState.round}
        containerClassName="fixed z-10 top-[9vh] left-[30vw]"
      />

  )

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

      {renderScore}
      {renderProgressBar}

      {showRoundEndModal && 
        <AnimatedModal isOpen={true}>
          <AnimatedTitle>
          <h1>˗ˏˋ Round {lobbyState.round ?? 1} Finished ˎˊ˗</h1>
          <h1>Prepare for Round {(lobbyState.round ?? 1) + 1}</h1>
          </AnimatedTitle>
        </AnimatedModal>
      }
      
      {/* Loading overlay with percentage */}
      {(triggersLoading) && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10"
          style={{ borderRadius: 0 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <span className="text-xl font-semibold text-blue-700 mb-2">
            {isLoaded ? `Loading Map... ${triggerProgress}%` : "Loading Map..."}
          </span>
        </div>
      )}
    </div>
  );
};

export default SplineFirebase; 