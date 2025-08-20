import { useEffect, useState } from "react";
import { usePreparingProgress } from "./usePreparingProgress";
import { ActivityTypeEnum, GameLobbyStatus, LobbyStateEnum, SubSectorEnum } from "@/lib/enums";
import { LobbyStateType, RoundType } from "@/lib/types"; // Assuming this type exists
import { GameRoomService } from "@/lib/gameRoom";
import { PHASE_DURATIONS } from "./phaseUtils";
import { useTimer } from "./useTimer";
import { useServerTime } from "@/components/ServerTimeContext";

export function useLobbyRoundAnimation(
  lobbyState: LobbyStateType,
  triggersLoading: boolean,
  gameRoomServiceRef: React.RefObject<GameRoomService | null>
) {
  const { getAdjustedCurrentTime } = useServerTime();

  const isRoundAnimationTimesUp = () => {
    if (gameRoomServiceRef.current) {
      gameRoomServiceRef.current.updateLobbyState({
        ...lobbyState, ...{
        [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ROUND_STORYLINE,
        [LobbyStateEnum.PHASE_START_TIME]: getAdjustedCurrentTime(),
        // Keep current round; it was incremented in ROUND_SCORE_BREAKDOWN
        [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_STORYLINE,
      }});
    }
  };


  const {timeRemaining } = useTimer({
    duration: lobbyState.phaseDuration,
    onTimeUp: isRoundAnimationTimesUp,
    startImmediately: !triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_ANIMATION,
    syncWithTimestamp: lobbyState.phaseStartTime,
  });

  useEffect(() => {
    if (timeRemaining <= 0 && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_ANIMATION) {
      isRoundAnimationTimesUp();
    }
  }, [lobbyState.gameLobbyStatus, timeRemaining]);

  return {timeRemaining};
}