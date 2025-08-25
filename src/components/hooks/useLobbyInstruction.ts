import { useEffect, useState } from "react";
import { GameLobbyStatus, LobbyStateEnum } from "@/lib/enums";
import { LobbyStateType } from "@/lib/types"; // Assuming this type exists
import { GameRoomService } from "@/lib/gameRoom";
import { PHASE_DURATIONS } from "./phaseUtils";
import { useTimer } from "./useTimer";
import { useServerTime } from "@/components/ServerTimeContext";

export function useLobbyInstruction(
  lobbyState: LobbyStateType, triggersLoading: boolean,
  gameRoomServiceRef: React.RefObject<GameRoomService | null>
) {
  const { getAdjustedCurrentTime } = useServerTime();
  const [currentTutorial, setCurrentTutorial] = useState(0);

  const onTimeUp = () => {
    setTimeout(() => {
      if (gameRoomServiceRef.current) {
        gameRoomServiceRef.current.updateLobbyState({
          ...lobbyState, ...{
          [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ROUND_STORYLINE,
          [LobbyStateEnum.PHASE_START_TIME]: getAdjustedCurrentTime(),
          [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_STORYLINE,
        }});
      }
    }, 1000);
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
    console.log("timeRemaining: ", timeRemaining);
    if (timeRemaining > 60) {
      setCurrentTutorial(0); // Tutorial 1
    } else if (timeRemaining > 45) {
      setCurrentTutorial(1); // Tutorial 2
    } else if (timeRemaining > 30) {
      setCurrentTutorial(2); // Tutorial 3
    } else if (timeRemaining > 15) {
      setCurrentTutorial(3); // Tutorial 4
    } else {
      setCurrentTutorial(4); // Tutorial 5
    }
  }, [timeRemaining]);

  return {currentTutorial, timeRemaining};
}