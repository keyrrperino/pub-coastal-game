import { useEffect, useState } from "react";
import { usePreparingProgress } from "./usePreparingProgress";
import { GameLobbyStatus, LobbyStateEnum } from "@/lib/enums";
import { LobbyStateType } from "@/lib/types"; // Assuming this type exists
import { GameRoomService } from "@/lib/gameRoom";
import { PHASE_DURATIONS } from "./phaseUtils";

export function useLobbyInstruction(
  lobbyState: LobbyStateType, triggersLoading: boolean,
  gameRoomServiceRef: React.RefObject<GameRoomService | null>
) {
  const [currentTutorial, setCurrentTutorial] = useState(0);

  const {
    countdownProgressTimer: introductionProgressCoundownTimer
  } = usePreparingProgress(
    lobbyState.phaseDuration, // countdown seconds
    lobbyState.gameLobbyStatus,
    GameLobbyStatus.INTRODUCTION,
    triggersLoading,
    lobbyState.phaseStartTime,
    0 // <-- 2 seconds delay before countdown starts
  );

  useEffect(() => {
    if (introductionProgressCoundownTimer > 20) {
      setCurrentTutorial(0); // Tutorial 1
    } else if (introductionProgressCoundownTimer > 10) {
      setCurrentTutorial(1); // Tutorial 2
    } else {
      setCurrentTutorial(2); // Tutorial 3
    }

    if (introductionProgressCoundownTimer === 0) {
      const timer = setTimeout(() => {
        if (gameRoomServiceRef.current) {
          gameRoomServiceRef.current.updateLobbyState({
            ...lobbyState, ...{
            [LobbyStateEnum.PHASE_DURATION]: PHASE_DURATIONS.ROUND_STORYLINE,
            [LobbyStateEnum.PHASE_START_TIME]: Date.now(),
            [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.ROUND_STORYLINE,
          }});
        }
      }, 1000); // 2-second delay

      return () => clearTimeout(timer);
    }
  }, [introductionProgressCoundownTimer, lobbyState]);

  return {currentTutorial, timeRemaining: introductionProgressCoundownTimer};
}