import React, { useEffect, useRef, useState } from "react";
import { Application, SplineEventName } from "@splinetool/runtime";
import { GameRoomService, ActivityLog, SplineTriggersConfig, ActivityTypeEnum, GameEnum } from "@/lib/gameRoom";

const SPLINE_URL = "https://prod.spline.design/acS6CX6CWRshrgWS/scene.splinecode";

interface SplineFirebaseProps {
}

const SplineFirebase: React.FC<SplineFirebaseProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const gameRoomServiceRef = useRef<GameRoomService | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activities, setActivities] = useState<ActivityLog[] | null>(null);
  const [newActivities, setNewActivities] = useState<ActivityLog[]>([]);
  const [waterLevel, setWaterLevel] = useState<number>(0);

  // New state for loading triggers
  const [triggersLoading, setTriggersLoading] = useState(true);
  const [triggerProgress, setTriggerProgress] = useState(0);

  // Initialize GameRoomService and join room
  useEffect(() => {
    gameRoomServiceRef.current = new GameRoomService(GameEnum.DEFAULT_USERNAME);
    gameRoomServiceRef.current.joinRoom(GameEnum.DEFAULT_ROOM_NAME);
    // Listen to activity
    gameRoomServiceRef.current.onActivityChange((updatedActivities) => {
      setActivities((oldState) => {
        if (oldState !== null) {
          const oldIds = new Set(oldState?.map(a => a.id));
          const newActivities = updatedActivities.filter(a => !oldIds.has(a.id));

          setNewActivities(newActivities);
        }
        return updatedActivities;
      });

      if (updatedActivities.length === 0) {
        setTriggerProgress(100);
        setTriggersLoading(false);
      }
    });
    // Listen to water level
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
    
    return () => {
      gameRoomServiceRef.current?.disconnect();
    };
  }, []);

  // Load Spline scene
  useEffect(() => {
    if (canvasRef.current && !splineAppRef.current) {
      const app = new Application(canvasRef.current);
      app.load(SPLINE_URL).then(() => {
        splineAppRef.current = app;
        setIsLoaded(true);
      });
    }
    return () => {
      splineAppRef.current?.dispose?.();
      splineAppRef.current = null;
    };
  }, []);

  // // Run triggers after Spline is loaded and activities are available
  useEffect(() => {
    const runTriggers = async () => {
      if (!isLoaded || !splineAppRef.current || activities?.length === 0) return;

      // Calculate total steps (max of state/events for each activity)
      let totalSteps = 0;
      activities?.forEach(act => {
        const config = SplineTriggersConfig[act.action];
        if (config) {
          totalSteps += Math.max(config.state.length, config.events.length);
        }
      });

      let executed = 0;

      for (const act of activities ?? []) {
        const config = SplineTriggersConfig[act.action as ActivityTypeEnum];
        if (!config) continue;
        const obj = splineAppRef.current.findObjectByName?.(act.action.replace(/_/g, " ")); // Adjust name if needed

        for (let i = 0; i < Math.max(config.state.length, config.events.length); i++) {
          if (!obj) continue;
          if (config.state[i]) obj.state = config.state[i];
          if (config.events[i]) obj.emitEvent?.(config.events[i] as SplineEventName);
          executed++;
          setTriggerProgress(Math.round((executed / totalSteps) * 100));
          // Wait a bit between triggers for realism/animation
          await new Promise(res => setTimeout(res, 400));
        }
      }
    };

    if (triggerProgress <= 0) {
      runTriggers();
    }
  }, [isLoaded, activities]);

  useEffect(() => {
    if (triggerProgress >= 100) {
      setTriggersLoading(false);
    }

  }, [triggerProgress]);

  // Example: React to waterLevel changes (customize as needed)
  useEffect(() => {
    if (!isLoaded || !splineAppRef.current) return;
    // Example: update Spline object state based on waterLevel
    // const obj = splineAppRef.current.findObjectByName('WaterLevelObj');
    // if (obj) obj.state = waterLevel > 0 ? 'high' : 'low';
  }, [isLoaded, waterLevel]);

  // Example: React to activity changes (customize as needed)
  useEffect(() => {
    if (!isLoaded || !splineAppRef.current) return;

    const runTriggers = async () => {
      if (!isLoaded || !splineAppRef.current) return;
      // Example: trigger Spline actions based on activity
      for (const act of newActivities) {
        const config = SplineTriggersConfig[act.action as ActivityTypeEnum];
        if (!config) continue;
        const obj = splineAppRef.current.findObjectByName?.(act.action.replace(/_/g, " ")); // Adjust name if needed

        for (let i = 0; i < Math.max(config.state.length, config.events.length); i++) {
          if (!obj) continue;
          if (config.state[i]) obj.state = config.state[i];
          if (config.events[i]) obj.emitEvent?.(config.events[i] as SplineEventName);
        }
      };
    };

    runTriggers();
  }, [isLoaded, newActivities]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen m-0 p-0 bg-black z-0"
      style={{ borderRadius: 0, gap: 0 }}
    >
      {/* Only show Spline when triggers are done loading */}
        <canvas
          ref={canvasRef}
          className={"w-full h-full m-0 p-0" + (triggersLoading && "d-none")}
          style={{ display: "block", borderRadius: 0, border: "none" }}
        />
      {/* Loading overlay with percentage */}
      {(triggersLoading) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10" style={{ borderRadius: 0 }}>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <span className="text-xl font-semibold text-blue-700 mb-2">
            {isLoaded ? `Loading Map... ${triggerProgress}%` : "Loading Map..."}
          </span>
        </div>
      )}
    </div>
  );
};

export default SplineFirebase; 