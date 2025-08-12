import { useEffect, useState } from "react";
import { usePreparingProgress } from "./usePreparingProgress";
import { GameLobbyStatus, LobbyStateEnum } from "@/lib/enums";
import { LobbyStateType } from "@/lib/types"; // Assuming this type exists
import { GameRoomService } from "@/lib/gameRoom";
import { PHASE_DURATIONS } from "./phaseUtils";
import { useTimer } from "./useTimer";

export function useLobbyInstruction(
  lobbyState: LobbyStateType, triggersLoading: boolean,
  gameRoomServiceRef: React.RefObject<GameRoomService | null>
) {
  const [currentTutorial, setCurrentTutorial] = useState(0);

  const onTimeUp = () => {
    if (gameRoomServiceRef.current) {
      gameRoomServiceRef.current.updateLobbyState({
        ...lobbyState, ...{
        [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ROUND_STORYLINE,
        [LobbyStateEnum.PHASE_START_TIME]: Date.now(),
        [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_STORYLINE,
      }});
    }
  }

  const {
    timeRemaining,
  } = useTimer({
    duration: lobbyState.phaseDuration,
    onTimeUp,
    startImmediately: !triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.INTRODUCTION,
    syncWithTimestamp: lobbyState.phaseStartTime,
  });

  useEffect(() => {
    if (timeRemaining > 20) {
      setCurrentTutorial(0); // Tutorial 1
    } else if (timeRemaining > 10) {
      setCurrentTutorial(1); // Tutorial 2
    } else {
      setCurrentTutorial(2); // Tutorial 3
    }
  }, [timeRemaining]);

  return {currentTutorial, timeRemaining};
}