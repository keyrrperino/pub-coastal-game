// src/hooks/initialize.ts
import { useRef, useState, useEffect } from "react";
import { Application } from "@splinetool/runtime";
import { GameRoomService } from "@/lib/gameRoom";
import { ActivityLogType, LobbyStateType } from "@/lib/types";
import { GAME_ROUND_TIMER, lobbyStateDefaultValue } from "@/lib/constants";
import { CutScenesEnum, GameEnum } from "@/lib/enums";
import { isCountdownExpired } from "@/lib/utils";

export function useInitialize() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const splineAppRef = useRef<Application | null>(null);

  const canvasCutScenesRefs = Object.fromEntries(
    Object.values(CutScenesEnum).map(key => [key, useRef<HTMLCanvasElement | null>(null)])
  ) as { [key in CutScenesEnum]: React.RefObject<HTMLCanvasElement | null> };
  // For spline app refs
const splineAppCutScenesRefs = Object.fromEntries(
  Object.values(CutScenesEnum).map(key => [key, useRef<Application | null>(null)])
) as { [key in CutScenesEnum]: React.RefObject<Application | null> };

  const gameRoomServiceRef = useRef<GameRoomService | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [activities, setActivities] = useState<ActivityLogType[] | null>(null);
  const [newActivities, setNewActivities] = useState<ActivityLogType[]>([]);
  const [waterLevel, setWaterLevel] = useState<number>(0);
  const [lobbyState, setLobbyState] = useState<LobbyStateType>(lobbyStateDefaultValue);
  const [triggersLoading, setTriggersLoading] = useState(true);
  const [triggerProgress, setTriggerProgress] = useState(0);
  const [cutScenesStatus, setCutScenesStatus] = useState<{
    sectorOne1A: boolean;
    sectorOne1B: boolean;
    sectorTwo1A: boolean;
    sectorTwo1B: boolean; 
    sectorThree1A: boolean;
    sectorThree1B: boolean; 
  }>({
    sectorOne1A: false,
    sectorOne1B: false,
    sectorTwo1A: false,
    sectorTwo1B: false, 
    sectorThree1A: false,
    sectorThree1B: false, 
  });
  const isGameRoundDone = isCountdownExpired(lobbyState.countdownStartTime, GAME_ROUND_TIMER);

  // Initialization effect (from your old content)
  useEffect(() => {
    const setupRoom = async () => {
      gameRoomServiceRef.current = new GameRoomService(GameEnum.DEFAULT_USERNAME);
      const joined = await gameRoomServiceRef.current.joinRoom(GameEnum.DEFAULT_ROOM_NAME);

      if (!joined) {
        await gameRoomServiceRef.current.createRoom(true);
      }

      gameRoomServiceRef.current.onLobbyStateChange((lobbyState: LobbyStateType) => {
        setLobbyState(lobbyState);
      });

      gameRoomServiceRef.current.onActivityChange((updatedActivities) => {
        setActivities((oldState) => {
          if (oldState !== null) {
            const oldIds = new Set(oldState?.map(a => a.action));
            const newActivities = updatedActivities.filter((a) => !oldIds.has(a.action));
            setNewActivities(newActivities);
          }
          return updatedActivities;
        });

        if (updatedActivities.length === 0) {
          setTriggerProgress(100);
          setTriggersLoading(false);
        }
      });

      gameRoomServiceRef.current.onWaterLevelChange((level) => {
        setWaterLevel(level);
      });

      gameRoomServiceRef.current.getActivities(GameEnum.DEFAULT_ROOM_NAME).then((updatedActivities) => {
        if (updatedActivities.length === 0) {
          setTriggerProgress(100);
          setTriggersLoading(false);
          setActivities([]);
        }
      });
    };

    setupRoom();

    return () => {
      gameRoomServiceRef.current?.disconnect();
    };
  }, []);

  return {
    canvasRef,
    canvasCutScenesRefs,
    splineAppRef,
    splineAppCutScenesRefs,
    gameRoomServiceRef,
    isLoaded, setIsLoaded,
    activities, setActivities,
    newActivities, setNewActivities,
    waterLevel, setWaterLevel,
    lobbyState, setLobbyState,
    triggersLoading, setTriggersLoading,
    triggerProgress, setTriggerProgress,
    cutScenesStatus, setCutScenesStatus
  };
}