// src/hooks/initialize.ts
import { useRef, useState, useEffect } from "react";
import { Application } from "@splinetool/runtime";
import { GameRoomService } from "@/lib/gameRoom";
import { ActivityLogType, LobbyStateType } from "@/lib/types";
import { lobbyStateDefaultValue } from "@/lib/constants";
import { CutScenesEnum, GameEnum, GameLobbyStatus } from "@/lib/enums";
import { useServerTime } from "@/components/ServerTimeContext";

export function useInitialize(roomName: string) {
  console.log("roomNameawefawef", roomName)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const splineAppRef = useRef<Application | null>(null);
  const gameRoomServiceRef = useRef<GameRoomService | null>(null);
  const { updateFromGameRoomService } = useServerTime();

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

  // Initialization effect (from your old content)
  useEffect(() => {
    const setupRoom = async () => {
      gameRoomServiceRef.current = new GameRoomService(GameEnum.DEFAULT_USERNAME);
      const joined = await gameRoomServiceRef.current.joinRoom(roomName);

      if (!joined) {
        await gameRoomServiceRef.current.createRoom(roomName);
      }

      gameRoomServiceRef.current.onLobbyStateChange((lobbyState: LobbyStateType) => {
        setLobbyState(lobbyState);
      });

      gameRoomServiceRef.current.onActivityChange((updatedActivities) => {
        setActivities((oldState) => {
          if (oldState !== null) {
            const oldIds = new Set(oldState?.map(a => a.id));
            const newActivities = updatedActivities.filter((a) => !oldIds.has(a.id));
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

      gameRoomServiceRef.current.getActivities().then((updatedActivities) => {
        if (updatedActivities.length === 0) {
          setTriggerProgress(100);
          setTriggersLoading(false);
          setActivities([]);
        }
      });

      // Update server time context with game room service reference
      console.log('🕒 [INITIALIZE] Setting GameRoomService reference in ServerTimeContext');
      updateFromGameRoomService(gameRoomServiceRef.current);
    };

    setupRoom();

    return () => {
      gameRoomServiceRef.current?.disconnect();
    };
  }, [roomName]);

  return {
    canvasRef,
    splineAppRef,
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