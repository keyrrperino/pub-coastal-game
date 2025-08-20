import { useEffect, useState } from "react";
import { usePreparingProgress } from "./usePreparingProgress";
import { ActivityTypeEnum, GameLobbyStatus, LobbyStateEnum, SubSectorEnum } from "@/lib/enums";
import { LobbyStateType, RoundType } from "@/lib/types"; // Assuming this type exists
import { GameRoomService } from "@/lib/gameRoom";
import { PHASE_DURATIONS } from "./phaseUtils";
import { useTimer } from "./useTimer";
import { useServerTime } from "@/components/ServerTimeContext";

export function useLobbyRoundBreakdown(
  lobbyState: LobbyStateType,
  triggersLoading: boolean,
  gameRoomServiceRef: React.RefObject<GameRoomService | null>
) {
  const { getAdjustedCurrentTime } = useServerTime();

  const isScoreBreakdownTimesUp = () => {
    if (!gameRoomServiceRef.current) return;
    // If last round finished, go to ENDING instead of showing next round animation
    if (lobbyState.round === 3) {
      gameRoomServiceRef.current.updateLobbyState({
        ...lobbyState, ...{
          [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ENDING,
          [LobbyStateEnum.PHASE_START_TIME]: getAdjustedCurrentTime(),
          [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ENDING,
        }
      });
      return;
    }
    // Otherwise, increment to next round and show the round start animation
    gameRoomServiceRef.current.updateLobbyState({
      ...lobbyState, ...{
        [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ROUND_ANIMATION,
        [LobbyStateEnum.PHASE_START_TIME]: getAdjustedCurrentTime(),
        [LobbyStateEnum.ROUND]: (lobbyState.round + 1) as RoundType,
        [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_ANIMATION,
      }
    });
  };


  const {timeRemaining } = useTimer({
    duration: lobbyState.phaseDuration,
    onTimeUp: isScoreBreakdownTimesUp,
    startImmediately: !triggersLoading && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_SCORE_BREAKDOWN,
    syncWithTimestamp: lobbyState.phaseStartTime,
  });

  useEffect(() => {
    if (timeRemaining <= 0 && lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_SCORE_BREAKDOWN) {
      isScoreBreakdownTimesUp();
    }
  }, [lobbyState.gameLobbyStatus, timeRemaining]);

  return {timeRemaining};
}