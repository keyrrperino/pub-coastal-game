import { useEffect, useState } from "react";
import { usePreparingProgress } from "./usePreparingProgress";
import { ActivityTypeEnum, GameLobbyStatus, LobbyStateEnum, SubSectorEnum } from "@/lib/enums";
import { LobbyStateType } from "@/lib/types"; // Assuming this type exists
import { GameRoomService } from "@/lib/gameRoom";
import { PHASE_DURATIONS } from "./phaseUtils";
import { useTimer } from "./useTimer";
import { useServerTime } from "@/components/ServerTimeContext";

export function useLobbyStoryline(
  lobbyState: LobbyStateType, triggersLoading: boolean,
  gameRoomServiceRef: React.RefObject<GameRoomService | null>
) {
  const { getAdjustedCurrentTime } = useServerTime();

  const onTimeUp = () => {
    if (gameRoomServiceRef.current) {
      setTimeout(() => {
        if (gameRoomServiceRef.current) {
          if (lobbyState.round <= 1) {
            gameRoomServiceRef.current.addElement(ActivityTypeEnum.CHANGE_SCENE, "", 1, 0, false, SubSectorEnum.ONE_A);
          }

          gameRoomServiceRef.current.updateLobbyState({
            ...lobbyState, ...{
            [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ROUND_GAMEPLAY,
            [LobbyStateEnum.PHASE_START_TIME]: getAdjustedCurrentTime(),
            [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_GAMEPLAY,
          }});
        }
      }, 1000); // 1000 milliseconds = 1 second
    }
  }

  const {
    timeRemaining,
  } = useTimer({
    duration: lobbyState.phaseDuration,
    onTimeUp,
    startImmediately: !triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_STORYLINE,
    syncWithTimestamp: lobbyState.phaseStartTime,
  });


  useEffect(() => {
    if (timeRemaining <= 0 && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_STORYLINE) {
      onTimeUp();
    }
  }, [lobbyState.gameLobbyStatus, timeRemaining]);

  return {timeRemaining};
}