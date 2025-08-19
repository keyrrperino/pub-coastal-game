import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { Application, SplineEventName } from "@splinetool/runtime";
import { GameRoomService, getGlobalLeaderboard, ProcessedLeaderboardData } from "@/lib/gameRoom";
import ProgressBar from "@/games/pub-coastal-game/compontents/ProcessBar";
import { ActivityLogType, LobbyStateType, RoundType } from "@/lib/types";
import { GAME_ROUND_TIMER, GAME_STARST_IN_COUNTDOWN, lobbyStateDefaultValue, MODAL_CLOSE_COUNTDOWN_VALUE, OVERALL_SCORE_POINTS, SPLINE_URL, SplineTriggersConfig, TOTAL_COINS_PER_ROUND } from "@/lib/constants";
import { CutScenesEnum, GameEnum, GameLobbyStatus, LobbyStateEnum, UserSectorEnum } from "@/lib/enums";
import { useInitialize } from "./hooks/initialize";
 
import { useSplineTriggers } from "./hooks/useSplineTriggers";
import { useLobbyPreparation } from "./hooks/useLobbyPreparation";
import { isGameOnGoing } from "@/lib/utils";
import { useSplineLoader } from "./hooks/useSplineLoader";
import { CutScenesStatusEnum, useCutSceneSequence } from "./hooks/useSplineCutSceneTriggers";
import { useHideAllTriggers } from "./hooks/useHideAllSplineTriggers";
import AnimatedModal from "@/games/pub-coastal-game/compontents/AnimatedModal";
import AnimatedTitle from "@/games/pub-coastal-game/compontents/AnimatedTitle";
import RoundStartAnimationModal from "@/games/pub-coastal-game/compontents/RoundStartAnimationModal";
import { usePreparingProgress } from "./hooks/usePreparingProgress";
import ScoreBreakdownModal from "@/games/pub-coastal-game/compontents/ScoreBreakdownModal";
import { SectorPerformance, useSectorScores } from "./hooks/useSectorScores";
import TutorialScreen3 from "@/components/TutorialScreen3";
import TutorialScreen2 from "@/components/TutorialScreen2";
import TutorialScreen1 from "@/components/TutorialScreen1";
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
import TutorialScreen4 from "@/components/TutorialScreen4";
import { PlayerRound1Screen, PlayerRound2Screen, PlayerRound3Screen } from "./player-screens";
import TutorialScreen5 from "@/components/TutorialScreen5";
import { useLobbyRoundBreakdown } from "./hooks/useLobbyRoundBreakdown";
import { useLobbyRoundAnimation } from "./hooks/useLobbyRoundAnimation";

interface SplineFirebaseProps {
  roomName: string;
}

const SplineFirebase: React.FC<SplineFirebaseProps> = ({ roomName }) => {
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
  } = useInitialize(roomName);

  console.log("activiies here: ", activities);

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

  const {currentTutorial} = useLobbyInstruction(lobbyState, triggersLoading, gameRoomServiceRef);
  const {timeRemaining: timeRemainingStoryLine} = useLobbyStoryline(lobbyState, triggersLoading, gameRoomServiceRef);
  const showCountdown = timeRemainingStoryLine <= 3;
  useLobbyRoundBreakdown(lobbyState, triggersLoading, gameRoomServiceRef);
  useLobbyRoundAnimation(lobbyState, triggersLoading, gameRoomServiceRef);


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
    newActivities,
    roomName
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
  const renderAllCutScences = (
    Object.values(CutScenesEnum).map(value => {
      return (
        <div
          className="fixed inset-0 w-screen h-screen m-0 p-0 bg-black z-10"
          style={{ opacity: 1, display: value === currentCutScene ? "block" : "none" }}
        >
          <video
            src={`/games/pub-coastal-spline/flash-reports/videos/${value?.replaceAll("-", " ").toLocaleLowerCase()}.webm?v=1.1`}
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
              src={`/games/pub-coastal-spline/flash-reports/images/${value?.replaceAll("-", " ").toLocaleLowerCase()}.png?v=1.1`}
              className="pointer-events-none"
              // style={{ objectFit: "" }}
              alt="Frame Overlay"
            />
          </div>
        </div>
      )
    })
  )

  const renderScore = (
    (!triggersLoading && isGameOnGoing(lobbyState.gameLobbyStatus) && cutSceneStatus !== CutScenesStatusEnum.STARTED) && <div className="fixed inset-0 w-screen h-screen m-0 p-0 z-10">
      <div className="flex w-full justify-between px-8 py-4  text-white text-[2vw]">
        <div className="flex flex-col">
          <h1>
            {coinsLeft > 0 ? "Overall budget" : "NO MORE COINS"}
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
          containerClassName="fixed z-10 top-[9vh] left-[30vw] px-[1vw] py-[1.3vw] w-[40vw]"
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
      {currentTutorial === 0 && <TutorialScreen1 phaseStartTime={lobbyState.phaseStartTime} />}
      {currentTutorial === 1 && <TutorialScreen2 phaseStartTime={lobbyState.phaseStartTime} />}
      {currentTutorial === 2 && <TutorialScreen3 phaseStartTime={lobbyState.phaseStartTime} />}
      {currentTutorial === 3 && <TutorialScreen4 phaseStartTime={lobbyState.phaseStartTime} />}
      {currentTutorial === 4 && <TutorialScreen5 phaseStartTime={lobbyState.phaseStartTime} />}
    </div>
  )

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

  const renderRoundAnimation = (
    !triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_ANIMATION && (
      <RoundStartAnimationModal
        isOpen={true}
        round={lobbyState.round ?? 1}
      />
    )
  );

  const renderRoundScoreBreakdown = (
    !triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_SCORE_BREAKDOWN && (
      <ScoreBreakdownModal
        isOpen={true}
        key={lobbyState.round + "-breakdownmodal"}
        breakdown={overAllScores}
        totalScore={totalScore}
        roundNumber={(lobbyState.round ?? 1) as 1|2|3}
      />
    )
  );

  const resetGame = async () => {
    await gameRoomServiceRef.current?.deleteActivities();
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
      
      {renderAllCutScences}

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
      {renderRoundAnimation}
      {renderRoundScoreBreakdown}

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