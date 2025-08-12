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
import { useSectorScores } from "./hooks/useSectorScores";
import Tutorial1Page from "@/pages/tutorial/1";
import Tutorial2Page from "@/pages/tutorial/2";
import Tutorial3Page from "@/pages/tutorial/3";
import TutorialScreen3 from "./TutorialScreen3";
import TutorialScreen2 from "./TutorialScreen2";
import TutorialScreen1 from "./TutorialScreen1";
import { useLobbyInstruction } from "./hooks/useLobbyInstruction";
import Round1Screen from "./Round1Screen";
import { useLobbyStoryline } from "./hooks/useLobbyStoryline";
import Round2Screen from "./Round2Screen";
import Round3Screen from "./Round3Screen";
import { useTimer } from "./hooks/useTimer";
import { PHASE_DURATIONS } from "./hooks/phaseUtils";

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
  const [coinsLeft, setCoinsLeft] = useState(TOTAL_COINS_PER_ROUND); // 1. Add new state

  useEffect(() => {
    if (lobbyState.gameLobbyStatus === GameLobbyStatus.RESTARTING) {
      gameRoomServiceRef.current?.updateLobbyState(lobbyStateDefaultValue).then(() => {
        window.location.reload();
      });
    }
  }, [lobbyState.gameLobbyStatus]);

  useSectorScores({
    activities: activities ?? [],
    lobbyState,
    setTotalScore,
    setCoinsLeft,
  });

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
    lobbyState.phaseDuration,
    lobbyState.gameLobbyStatus,
    triggersLoading,
    lobbyState.phaseStartTime,
    1 // <-- 3 seconds delay before countdown starts
  );

  const {currentTutorial, timeRemaining} = useLobbyInstruction(lobbyState, triggersLoading, gameRoomServiceRef);
  const {timeRemaining: timeRemainingStoryLine} = useLobbyStoryline(lobbyState, triggersLoading, gameRoomServiceRef);

  const { cutSceneStatus, currentCutScene } = 
    useCutSceneSequence(progress, gameRoomServiceRef, lobbyState, activities ?? []);

  useEffect(() => {
    if (cutSceneStatus === CutScenesStatusEnum.ENDED && lobbyState.round <= 3) {
      if (gameRoomServiceRef.current) {
        gameRoomServiceRef.current.updateLobbyState({
          ...lobbyState, ...{
          [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ROUND_SCORE_BREAKDOWN,
          [LobbyStateEnum.PHASE_START_TIME]: Date.now(),
          [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_SCORE_BREAKDOWN,
        }});
      }
    }
  }, [cutSceneStatus]);

  const isScoreBreakdownTimesUp = () => {
    // if (gameRoomServiceRef.current) {
    //   gameRoomServiceRef.current.updateLobbyState({
    //     ...lobbyState, ...{
    //     [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.round,
    //     [LobbyStateEnum.PHASE_START_TIME]: Date.now(),
    //     [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_SCORE_BREAKDOWN,
    //   }});
    // }
  };

  useTimer({
    duration: lobbyState.phaseDuration,
    onTimeUp: isScoreBreakdownTimesUp,
    startImmediately: !triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_SCORE_BREAKDOWN,
    syncWithTimestamp: lobbyState.phaseStartTime,
  });

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
            {totalScore} PTS
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

  const renderInstroductions = (
    (!triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.INTRODUCTION) && 
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10"
      style={{ borderRadius: 0 }}
    >
      {currentTutorial === 0 && <TutorialScreen1 />}
      {currentTutorial === 1 && <TutorialScreen2 />}
      {currentTutorial === 2 && <TutorialScreen3 timeRemaining={timeRemaining}  />}
    </div>
  )

  const renderStoryLine = (
    (!triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_STORYLINE) && 
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10"
      style={{ borderRadius: 0 }}
    >
      {lobbyState.round === 1 && <Round1Screen timeRemaining={timeRemainingStoryLine} />}
      {lobbyState.round === 2 && <Round2Screen timeRemaining={timeRemainingStoryLine} />}
      {lobbyState.round === 3 && <Round3Screen timeRemaining={timeRemainingStoryLine} />}
    </div>
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
      {renderInstroductions}
      {renderStoryLine}

      {/* Score Breakdown Modal */}
      {showScoreBreakdownModal && (
        <ScoreBreakdownModal
          isOpen={true}
          breakdown={getRoundBreakdownByPlayer(activities ?? [], lobbyState.randomizeEffect?.[lobbyState.round ?? 1] ?? 0, lobbyState.round ?? 1)}
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