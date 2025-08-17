import React, { useEffect, useRef, useState } from "react";
import { Application, SplineEventName } from "@splinetool/runtime";
import { GameRoomService, getGlobalLeaderboard, ProcessedLeaderboardData } from "@/lib/gameRoom";
import ProgressBar from "@/games/pub-coastal-game/compontents/ProcessBar";
import { ActivityLogType, LobbyStateType, RoundType } from "@/lib/types";
import { GAME_ROUND_TIMER, GAME_STARST_IN_COUNTDOWN, lobbyStateDefaultValue, MODAL_CLOSE_COUNTDOWN_VALUE, OVERALL_SCORE_POINTS, SPLINE_URL, SplineTriggersConfig, TOTAL_COINS_PER_ROUND } from "@/lib/constants";
import { GameEnum, GameLobbyStatus, LobbyStateEnum, UserSectorEnum } from "@/lib/enums";
import { useInitialize } from "./hooks/initialize";
 
import { useSplineTriggers } from "./hooks/useSplineTriggers";
import { useLobbyPreparation } from "./hooks/useLobbyPreparation";
import { calculateOverallScore, calculateOverallScoreFromScenarioConfigControlled, calculateTotalCoinsPerRound, getMeanSeaLevelForRound, getRandomEffectValue, getRoundBreakdownByPlayer, getSectorRoundScore, isGameOnGoing } from "@/lib/utils";
import { useSplineLoader } from "./hooks/useSplineLoader";
import { CutScenesStatusEnum, useCutSceneSequence } from "./hooks/useSplineCutSceneTriggers";
import { useHideAllTriggers } from "./hooks/useHideAllSplineTriggers";
import AnimatedModal from "@/games/pub-coastal-game/compontents/AnimatedModal";
import AnimatedTitle from "@/games/pub-coastal-game/compontents/AnimatedTitle";
import { usePreparingProgress } from "./hooks/usePreparingProgress";
import ScoreBreakdownModal from "@/games/pub-coastal-game/compontents/ScoreBreakdownModal";
import { SectorPerformance, useSectorScores } from "./hooks/useSectorScores";
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
import EndingScreen from "./EndingScreen";
import TeamNameInputScreen from "./TeamNameInputScreen";
import EndingLeaderboardOverlay from "./EndingLeaderboardOverlay";
import LeaderboardOverlay from "./LeaderboardOverlay";
import TutorialScreen4 from "./TutorialScreen4";
import { PlayerRound1Screen, PlayerRound2Screen, PlayerRound3Screen } from "./player-screens";

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
  const [totalScore, setTotalScore] = useState<number>(2500);
  useHideAllTriggers(isLoaded, splineAppRef, lobbyState);
  useLobbyPreparation({ lobbyState, gameRoomServiceRef });

  useSplineLoader(
    canvasRef,
    splineAppRef,
    setIsLoaded
  );

  
  const [coinsLeft, setCoinsLeft] = useState(TOTAL_COINS_PER_ROUND); // 1. Add new state
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  useEffect(() => {
    (async () => { 
      if (lobbyState.gameLobbyStatus === GameLobbyStatus.RESTARTING) {
        await resetGame();
      }
    })();
  }, [lobbyState.gameLobbyStatus]);

  // Listen to showLeaderboard state changes
  useEffect(() => {
    const showLeaderboard = lobbyState[LobbyStateEnum.SHOW_LEADERBOARD];
    if (typeof showLeaderboard === 'boolean') {
      setIsLeaderboardOpen(showLeaderboard);
    }
  }, [lobbyState]);

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

  const onRoundGameplayTimeUp = () => {
    if (gameRoomServiceRef.current && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_GAMEPLAY) {
      gameRoomServiceRef.current.updateLobbyState({
        ...lobbyState, ...{
        [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ROUND_CUTSCENES,
        [LobbyStateEnum.PHASE_START_TIME]: Date.now(),
        [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_CUTSCENES,
      }});
    }
  };

  const {currentTutorial, timeRemaining} = useLobbyInstruction(lobbyState, triggersLoading, gameRoomServiceRef);
  const {timeRemaining: timeRemainingStoryLine} = useLobbyStoryline(lobbyState, triggersLoading, gameRoomServiceRef);

  const isScoreBreakdownTimesUp = () => {
    if (gameRoomServiceRef.current) {
      if (lobbyState.round === 3) {
        gameRoomServiceRef.current.updateLobbyState({
          ...lobbyState, ...{
          [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ENDING,
          [LobbyStateEnum.PHASE_START_TIME]: Date.now(),
          [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ENDING,
        }});
      } else {
        gameRoomServiceRef.current.updateLobbyState({
          ...lobbyState, ...{
          [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ROUND_STORYLINE,
          [LobbyStateEnum.PHASE_START_TIME]: Date.now(),
          [LobbyStateEnum.ROUND]: (lobbyState.round + 1) as RoundType,
          [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_STORYLINE,
        }});
      }
    }
  };

  const {timeRemaining: timeRemainingScoreBreakdown } = useTimer({
    duration: lobbyState.phaseDuration,
    onTimeUp: isScoreBreakdownTimesUp,
    startImmediately: !triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_SCORE_BREAKDOWN,
    syncWithTimestamp: lobbyState.phaseStartTime,
  });

  useEffect(() => {
    if (timeRemainingScoreBreakdown <= 0 && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_SCORE_BREAKDOWN) {
      isScoreBreakdownTimesUp();
    }
  }, [timeRemainingScoreBreakdown]);


  
  const isScoreEndingModalTimesUp = () => {
    if (gameRoomServiceRef.current) {
      if (lobbyState.gameLobbyStatus === GameLobbyStatus.ENDING) {
        gameRoomServiceRef.current.updateLobbyState({
          ...lobbyState, ...{
          [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.TEAM_NAME_INPUT,
          [LobbyStateEnum.PHASE_START_TIME]: 0,
          [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.TEAM_NAME_INPUT,
        }});
      }
    }
  };

  useTimer({
    duration: lobbyState.phaseDuration,
    onTimeUp: isScoreEndingModalTimesUp,
    startImmediately: !triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ENDING,
    syncWithTimestamp: lobbyState.phaseStartTime,
  });

  useEffect(() => {
    if (timeRemainingScoreBreakdown <= 0 && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_SCORE_BREAKDOWN) {
      isScoreBreakdownTimesUp();
    }
  }, [timeRemainingScoreBreakdown]);

  const [leaderboardData, setLeaderboardData] = useState<ProcessedLeaderboardData>({
    topWinner: null,
    top5: [],
    currentTeamEntry: null
  });

  useEffect(() => {
    if (lobbyState.gameLobbyStatus === GameLobbyStatus.LEADERBOARD_DISPLAY) {
      const currentTeamNameScore = lobbyState?.[LobbyStateEnum.TEAM_NAME] || undefined;
      getGlobalLeaderboard(currentTeamNameScore).then(data => {
        setLeaderboardData(data);
      });
    }
  }, [lobbyState.gameLobbyStatus]);


  const [totalPerformance, setTotalPerformance] = useState<SectorPerformance>('okay');
  
  const [sectorPerformance, setSectorPerformance] = useState<SectorPerformance>('okay');

  console.log(activities, "eyes here");

  const overAllScores = useSectorScores({
    activities: activities ?? [],
    lobbyState,
    setTotalScore,
    setCoinsLeft,
    setSector1Performance: setSectorPerformance,
    setSector2Performance: setSectorPerformance,
    setSector3Performance: setSectorPerformance,
    setTotalPerformance,
    triggersLoading,
    newActivities
  });

  const { cutSceneStatus, currentCutScene } = 
    useCutSceneSequence(lobbyState, overAllScores);

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

  // Main Progress logic

  const renderInputTeamName = (!triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.TEAM_NAME_INPUT) && (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10"
      style={{ borderRadius: 0 }}
    >
      <TeamNameInputScreen performance={totalPerformance} teamName={lobbyState?.[LobbyStateEnum.TEAM_NAME]} finalScore={totalScore} />
    </div>
  );

  const renderEndingScreen = (!triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ENDING) && (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10"
      style={{ borderRadius: 0 }}
    >
      <EndingScreen performance={totalPerformance} finalScore={totalScore} />
    </div>
  )

  const renderCutScenes = (
    <>
      {currentCutScene && (
        <div
          className="fixed inset-0 w-screen h-screen m-0 p-0 bg-black z-10"
          style={{ opacity: 1 }}
        >
          <video
            src={`/games/pub-coastal-spline/flash-reports/videos/${currentCutScene.replaceAll("-", " ").toLocaleLowerCase()}.webm?v=1.1`}
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
              src={`/games/pub-coastal-spline/flash-reports/images/${currentCutScene.replaceAll("-", " ").toLocaleLowerCase()}.png?v=1.1`}
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

  const renderEndingLeaderBoard = (!triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.LEADERBOARD_DISPLAY) && (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-80 z-10"
      style={{ borderRadius: 0 }}
    >
      <EndingLeaderboardOverlay
        isOpen={true}
        topWinner={leaderboardData.topWinner || undefined}
        leaderboardData={leaderboardData.top5}
        bottomHighlight={leaderboardData.currentTeamEntry || { 
          name: lobbyState?.[LobbyStateEnum.TEAM_NAME], 
          points: totalScore, 
          position: 10 
        }}
      />
    </div>
  )

  const renderProgressBar = (
    (!triggersLoading && isGameOnGoing(lobbyState.gameLobbyStatus) && cutSceneStatus !== CutScenesStatusEnum.STARTED) && 
      <ProgressBar
          containerClassName="fixed z-10 top-[9vh] left-[30vw]"
          key={`${lobbyState.round ?? 1}-${lobbyState.gameLobbyStatus}`}
          duration={lobbyState.phaseDuration}
          onTimeUp={onRoundGameplayTimeUp}
          isRunning={!triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_GAMEPLAY}
          syncWithTimestamp={lobbyState.phaseStartTime}
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
      {currentTutorial === 2 && <TutorialScreen3  />}
      {currentTutorial === 3 && <TutorialScreen4 timeRemaining={timeRemaining}  />}
    </div>
  )

  const showCountdown = timeRemaining <= 3;

  const renderStoryLine = (
    (!triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_STORYLINE) && 
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10"
      style={{ borderRadius: 0 }}
    >
      {lobbyState.round === 1 && <PlayerRound1Screen timeRemaining={showCountdown ? timeRemainingStoryLine : undefined} />}
      {lobbyState.round === 2 && <PlayerRound2Screen timeRemaining={showCountdown ? timeRemainingStoryLine : undefined} />}
      {lobbyState.round === 3 && <PlayerRound3Screen timeRemaining={showCountdown ? timeRemainingStoryLine : undefined} />}
    </div>
  )

  const resetGame = async () => {
    await gameRoomServiceRef.current?.deleteActivities(GameEnum.DEFAULT_ROOM_NAME);
    await gameRoomServiceRef.current?.updateLobbyState(lobbyStateDefaultValue);
    window.location.reload(); 
  }

  const handleCloseLeaderboard = async () => {
    // Reset Firebase state when closing leaderboard
    await gameRoomServiceRef.current?.updateLobbyStateKeyValue(LobbyStateEnum.SHOW_LEADERBOARD, false);
    setIsLeaderboardOpen(false);
  };

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
      {renderEndingScreen}
      {renderInputTeamName}
      {renderEndingLeaderBoard}

      {/* Score Breakdown Modal */}
      {lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_SCORE_BREAKDOWN && (
        <ScoreBreakdownModal
          isOpen={true}
          key={lobbyState.round + "-breakdownmodal"}
          breakdown={overAllScores}
          totalScore={totalScore}
          roundNumber={(lobbyState.round ?? 1) as 1|2|3}
        />
      )}

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

      {/* Leaderboard Overlay */}
      <LeaderboardOverlay
        isOpen={isLeaderboardOpen}
        onClose={handleCloseLeaderboard}
      />
    </div>
  );
};

export default SplineFirebase; 