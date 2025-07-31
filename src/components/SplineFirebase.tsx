import React, { useEffect, useRef, useState } from "react";
import { Application, SplineEventName } from "@splinetool/runtime";
import { GameRoomService } from "@/lib/gameRoom";
import ProgressBar from "@/games/pub-coastal-game/compontents/ProcessBar";
import { ActivityLogType, LobbyStateType } from "@/lib/types";
import { GAME_ROUND_TIMER, GAME_STARST_IN_COUNTDOWN, lobbyStateDefaultValue, SPLINE_URL, splineCutScenesUrls, SplineTriggersConfig } from "@/lib/constants";
import { ActivityTypeEnum, CutScenesEnum, GameEnum, GameLobbyStatus, LobbyStateEnum } from "@/lib/enums";
import { useInitialize } from "./hooks/initialize";
import { useMainProgress } from "./hooks/useMainProgress";
import { useSplineTriggers } from "./hooks/useSplineTriggers";
import { useLobbyPreparation } from "./hooks/useLobbyPreparation";
import { calculateOverallScore, getMeanSeaLevelForRound, getRandomEffectValue, isGameOnGoing } from "@/lib/utils";
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
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [coinsLeft, setCoinsLeft] = useState(20); // 1. Add new state

  useEffect(() => {
    if (lobbyState.gameLobbyStatus === GameLobbyStatus.RESTARTING) {
      gameRoomServiceRef.current?.updateLobbyState(lobbyStateDefaultValue).then(() => {
        window.location.reload();
      });
    }
  }, [lobbyState.gameLobbyStatus]);

  useEffect(() => {
    const score = calculateOverallScore(activities ?? [], lobbyState.randomizeEffect);
    setTotalScore(score);

    const activitiesWithValueCount = (activities ?? []).filter(a => a.value && a.value.trim() !== "").length;
  const totalCoins = 20;
  setCoinsLeft(Math.max(totalCoins - activitiesWithValueCount, 0));
  }, [activities]);

  useEffect(() => {
    if (!showRoundEndModal) return;
    if (countdown === 0) {

      setShowRoundEndModal(false);

      if (gameRoomServiceRef.current) {
        gameRoomServiceRef.current.updateLobbyState({
          ...lobbyState, ...{
            [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.STARTED,
          [LobbyStateEnum.COUNTDOWN_START_TIME]: Date.now(),
          [LobbyStateEnum.ROUND]: (lobbyState.round ?? 1) + 1
        }});
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
    if (cutSceneStatus === CutScenesStatusEnum.ENDED && lobbyState.round <= 2) {
      setShowRoundEndModal(true);
      setCountdown(5); // reset countdown
    }

    if (cutSceneStatus === CutScenesStatusEnum.ENDED && lobbyState.round > 2) {
      setShowGameOverModal(true);
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

  const resetGame = async () => {
    await gameRoomServiceRef.current?.deleteActivities(GameEnum.DEFAULT_ROOM_NAME);
    await gameRoomServiceRef.current?.updateLobbyState(lobbyStateDefaultValue);
    window.location.reload(); 
  }

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

      {showGameOverModal && 
        <AnimatedModal isOpen={true}>
          <AnimatedTitle>
            {
              <>
                <h1>˗ˏˋ Game Over ˎˊ˗</h1>
                <button
                  className="
                    mt-[5vh]
                    flex items-center justify-center
                    w-[406px] h-[83px]
                    pt-[37px] pr-[45px] pb-[37px] pl-[45px]
                    gap-[10px]
                    opacity-100
                    rounded-[500px]
                    bg-[#DD0046] text-white font-bold text-[48px]
                    focus:outline-none
                    transition
                    hover:bg-[#FF2A6D] active:bg-[#FF4E86]
                    cursor-pointer
                  "
                  onClick={() => {
                    resetGame();
                  }}
                >
                  Restart
                </button>
              </>
            }
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