import { useEffect } from "react";
import { ActivityTypeEnum, GameLobbyStatus, LobbyStateEnum } from "@/lib/enums";
import { LobbyStateType } from "@/lib/types";
import { GameRoomService } from "@/lib/gameRoom";
import { GAME_STARST_IN_COUNTDOWN } from "@/lib/constants";

type UseLobbyPreparationProps = {
  lobbyState: LobbyStateType;
  gameRoomServiceRef: React.RefObject<GameRoomService | null>;
};

export function useLobbyPreparation({ lobbyState, gameRoomServiceRef }: UseLobbyPreparationProps) {
  useEffect(() => {
    if (lobbyState.gameLobbyStatus === GameLobbyStatus.PREPARING) {
      const timer = setTimeout(() => {
        // Update the lobby status to STARTED in Firebase
        gameRoomServiceRef.current
          ?.updateLobbyStateKeyValue(
            LobbyStateEnum.GAME_LOBBY_STATUS, 
            GameLobbyStatus.STARTED);
        
        gameRoomServiceRef.current
          ?.addElement(ActivityTypeEnum.DISPLAY_INSTRUCTION, "", 1);
        
        gameRoomServiceRef.current
          ?.updateLobbyStateKeyValue(
            LobbyStateEnum.COUNTDOWN_START_TIME, 
            Date.now());
      }, GAME_STARST_IN_COUNTDOWN * 1000);

      return () => clearTimeout(timer);
    }
  }, [lobbyState.gameLobbyStatus, gameRoomServiceRef, lobbyState]);
}