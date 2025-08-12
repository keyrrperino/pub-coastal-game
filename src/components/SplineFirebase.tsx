import React, { useEffect, useRef, useState } from "react";
import { Application, SplineEventName } from "@splinetool/runtime";
import { GameRoomService } from "@/lib/gameRoom";
import ProgressBar from "@/games/pub-coastal-game/compontents/ProcessBar";
import { ActivityLogType, LobbyStateType, RoundType } from "@/lib/types";
import { GAME_ROUND_TIMER, GAME_STARST_IN_COUNTDOWN, lobbyStateDefaultValue, MODAL_CLOSE_COUNTDOWN_VALUE, OVERALL_SCORE_POINTS, SPLINE_URL, splineCutScenesUrls, SplineTriggersConfig, TOTAL_COINS_PER_ROUND } from "@/lib/constants";
import { GameEnum, GameLobbyStatus, LobbyStateEnum, UserSectorEnum } from "@/lib/enums";
import { useInitialize } from "./hooks/initialize";
import { useMainProgress } from "./hooks/useMainProgress";
import { useSplineTriggers } from "./hooks/useSplineTriggers";
import { useLobbyPreparation } from "./hooks/useLobbyPreparation";
import { calculateOverallScore, calculateOverallScoreFromScenarioConfigControlled, calculateTotalCoinsPerRound, getMeanSeaLevelForRound, getRandomEffectValue, getRoundBreakdownByPlayer, getSectorRoundScore, isGameOnGoing } from "@/lib/utils";
import { useSplineLoader } from "./hooks/useSplineLoader";
import { CutScenesStatusEnum, useCutSceneSequence } from "./hooks/useSplineCutSceneTriggers";
import { useCutSceneSplineLoader } from "./hooks/useCutSceneSplineLoader";
import { useHideAllTriggers } from "./hooks/useHideAllSplineTriggers";
import AnimatedModal from "@/games/pub-coastal-game/compontents/AnimatedModal";
import AnimatedTitle from "@/games/pub-coastal-game/compontents/AnimatedTitle";
import { usePreparingProgress } from "./hooks/usePreparingProgress";
import ScoreBreakdownModal from "@/games/pub-coastal-game/compontents/ScoreBreakdownModal";

interface SplineFirebaseProps {
}

const SplineFirebase: React.FC<SplineFirebaseProps> = () => {
  const {
    canvasRef,
    splineAppRef,
    gameRoomServiceRef,
    isLoaded, setIsLoaded,
    activities,
    newActivities,
    lobbyState,
    triggersLoading, setTriggersLoading,
    triggerProgress, setTriggerProgress,
  } = useInitialize();
  const [totalScore, setTotalScore] = useState<number>(10000);
  useHideAllTriggers(isLoaded, splineAppRef, lobbyState);
  useLobbyPreparation({ lobbyState, gameRoomServiceRef });

  useSplineLoader(
    canvasRef,
    splineAppRef,
    setIsLoaded
  );

  const [showRoundEndModal, setShowRoundEndModal] = useState(false);
  const [showScoreBreakdownModal, setShowScoreBreakdownModal] = useState(false); // NEW
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [countdown, setCountdown]= useState(5);
  const [coinsLeft, setCoinsLeft] = useState(10); // 1. Add new state

  useEffect(() => {
    if (lobbyState.gameLobbyStatus === GameLobbyStatus.RESTARTING) {
      gameRoomServiceRef.current?.updateLobbyState(lobbyStateDefaultValue).then(() => {
        window.location.reload();
      });
    }
  }, [lobbyState.gameLobbyStatus]);

  useEffect(() => {
    // const round = !showGameOverModal ? (lobbyState.round ?? 1) : 4;
    // const { totalScore } = calculateOverallScoreFromScenarioConfigControlled(activities ?? [], lobbyState.randomizeEffect, round);

    // const score = OVERALL_SCORE_POINTS + totalScore;
    // setTotalScore(score);

    // const coinsData = calculateTotalCoinsPerRound(activities ?? [], lobbyState.randomizeEffect);

    // setCoinsLeft(TOTAL_COINS_PER_ROUND - coinsData[lobbyState.round ?? 1].totalCoin);

    // const data = getRoundBreakdownByPlayer(activities ?? [], lobbyState.randomizeEffect, 1);


    const sector1 = getSectorRoundScore(activities ?? [], lobbyState.randomizeEffect, (lobbyState.round ?? 1) as RoundType, UserSectorEnum.USER_SECTOR_ONE);
    const sector2 = getSectorRoundScore(activities ?? [], lobbyState.randomizeEffect, (lobbyState.round ?? 1) as RoundType, UserSectorEnum.USER_SECTOR_TWO);
    const sector3 = getSectorRoundScore(activities ?? [], lobbyState.randomizeEffect, (lobbyState.round ?? 1) as RoundType, UserSectorEnum.USER_SECTOR_THREE);

    console.log(sector1, sector2, sector3);


  }, [activities, lobbyState.gameLobbyStatus, lobbyState.round]);

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
    GAME_ROUND_TIMER, // countdown seconds
    lobbyState.gameLobbyStatus,
    triggersLoading,
    lobbyState.countdownStartTime,
    3 // <-- 3 seconds delay before countdown starts
  );

  const {progress: progressStartsInCountdown, countdownProgressTimer} = usePreparingProgress(
    GAME_STARST_IN_COUNTDOWN, // countdown seconds
    lobbyState.gameLobbyStatus,
    triggersLoading,
    lobbyState.countdownPreparationStartTime,
    2 // <-- 2 seconds delay before countdown starts
  );

  const { cutSceneStatus, currentCutScene } = 
    useCutSceneSequence(progress, gameRoomServiceRef, lobbyState, activities ?? []);

  useEffect(() => {
    if (cutSceneStatus === CutScenesStatusEnum.ENDED && lobbyState.round <= 3) {
      setShowScoreBreakdownModal(true); // Show breakdown first
      setCountdown(MODAL_CLOSE_COUNTDOWN_VALUE); // reset countdown for breakdown
    }
  }, [cutSceneStatus]);

  // Handle the modal transitions
  useEffect(() => {
    if (!showScoreBreakdownModal) return;
    if (countdown === 0) {
      setShowScoreBreakdownModal(false);
      // Only show "prepare for round" modal if not round 3
      if ((lobbyState.round ?? 1) < 3) {
        setShowRoundEndModal(true);
        setCountdown(MODAL_CLOSE_COUNTDOWN_VALUE); // reset countdown for next modal
      } else {
        setShowGameOverModal(true);
      }
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [showScoreBreakdownModal, countdown]);

  useEffect(() => {
    if (!showRoundEndModal) return;
    if (countdown === 0) {
      setShowRoundEndModal(false);
      // Proceed to next round
      if (gameRoomServiceRef.current) {
        gameRoomServiceRef.current.updateLobbyState({
          ...lobbyState, ...{
            [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.STARTED,
            [LobbyStateEnum.COUNTDOWN_START_TIME]: Date.now(),
            [LobbyStateEnum.ROUND]: (lobbyState.round ?? 1) + 1
          }
        });
      }
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [showRoundEndModal, countdown, gameRoomServiceRef]);

  // Main Progress logic

  const renderCutScenes = (
    <>
      {currentCutScene && (
        <div
          className="fixed inset-0 w-screen h-screen m-0 p-0 bg-black z-10"
          style={{ opacity: 1 }}
        >
          <video
            src={`/games/pub-coastal-spline/flash-reports/videos/${currentCutScene}.webm`}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="fixed w-full h-full m-0 p-0 z-10"
          />
          {/* Frame Overlay */}
          <div className="fixed inset-0 z-20 flex items-center justify-center h-[100vh]">
            <img
              src={`/games/pub-coastal-spline/flash-reports/images/${currentCutScene.replaceAll("-", " ").toLocaleLowerCase()}.png?v=1`}
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

  const renderStartsInCountdownProgressBar = (
    (!triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.PREPARING) && 
      <ProgressBar
        progress={progressStartsInCountdown}
        key="startsInCountdown"
        round={lobbyState.round}
        containerClassName="fixed z-10 bottom-[15vh] left-[30vw]"
        countdownProgressTimer={countdownProgressTimer}
        hasTextCountdown={false}
        style={{
          bottom: `${15}vh`,
          transition: 'bottom 0.6s cubic-bezier(0.4,0,0.2,1)',
          // ...other styles
        }}
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
      {renderStartsInCountdownProgressBar}

      {/* Score Breakdown Modal */}
      {showScoreBreakdownModal && (
        <ScoreBreakdownModal
          isOpen={true}
          breakdown={getRoundBreakdownByPlayer(activities ?? [], lobbyState.randomizeEffect, lobbyState.round ?? 1)}
          roundNumber={(lobbyState.round ?? 1) as 1|2|3}
        />
      )}

      {/* Prepare for Round Modal */}
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