import { useEffect } from "react";
import { Application, SplineEventName } from "@splinetool/runtime";
import { ActivityLogType, LobbyStateType } from "@/lib/types";
import { SplineTriggersConfig } from "@/lib/constants";
import { ActivityTypeEnum, CutScenesEnum, GameLobbyStatus } from "@/lib/enums";
import { isGameOnGoing } from "@/lib/utils";

type UseSplineTriggersProps = {
  isLoaded: boolean;
  splineAppRef: React.RefObject<Application | null>;
  activities: ActivityLogType[] | null;
  newActivities: ActivityLogType[];
  triggerProgress: number;
  lobbyState: LobbyStateType;
  setTriggerProgress: React.Dispatch<React.SetStateAction<number>>;
};

export function useSplineTriggers({
  isLoaded,
  splineAppRef,
  activities,
  newActivities,
  triggerProgress,
  lobbyState,
  setTriggerProgress,
}: UseSplineTriggersProps) {
  // Run triggers after Spline is loaded and activities are available (with progress)
  useEffect(() => {
    const runTriggers = async () => {
      if (!isLoaded || !splineAppRef.current || !activities || activities.length === 0) return;

      // Calculate total steps (max of state/events for each activity)
      let totalSteps = 0;
      activities.forEach(act => {
        const config = SplineTriggersConfig[act.action];
        if (config) {
          totalSteps += Math.max(config.state.length, config.events.length);
        }
      });

      let executed = 0;

      console.log(totalSteps);

      for (const act of activities) {
        const config = SplineTriggersConfig[act.action as ActivityTypeEnum];
        if (!config) continue;
        const obj = splineAppRef.current.findObjectByName?.(act.action.replace(/_/g, " ")); // Adjust name if needed

        for (let i = 0; i < Math.max(config.state.length, config.events.length); i++) {
          try {
            if (!obj) continue;
            if (config.state[i]) obj.state = config.state[i];
            if (config.events[i]) obj.emitEvent?.(config.events[i] as SplineEventName);
            obj.visible = false;
          } catch(ex) {
            console.log("SOMETHING WENT WRONG WITH TRIGGER: ", act, config.state[i], config.state[i]);
          }
          executed++;
          setTriggerProgress(Math.round((executed / totalSteps) * 100));
          // Wait a bit between triggers for realism/animation
          await new Promise(res => setTimeout(res, 300));
        }
      }
    };

    if (triggerProgress <= 0) {
      runTriggers();
    }
    // eslint-disable-next-line
  }, [isLoaded, activities]);

  // React to new activity changes (instant, no progress)
  useEffect(() => {
    if (!isLoaded || !splineAppRef.current) return;

    const runTriggers = async () => {
      for (const act of newActivities) {
        const config = SplineTriggersConfig[act.action as ActivityTypeEnum];
        if (!config) continue;
        const obj = splineAppRef.current?.findObjectByName?.(act.action); // Adjust name if needed

        for (let i = 0; i < Math.max(config.state.length, config.events.length); i++) {
          if (!obj) continue;
          if (config.state[i]) obj.state = config.state[i];
          if (config.events[i]) obj.emitEvent?.(config.events[i] as SplineEventName);
          obj.visible = false;
        }
      }
    };

    runTriggers();
    // eslint-disable-next-line
  }, [isLoaded, newActivities, splineAppRef]);

  useEffect(() => {
    if (isGameOnGoing(lobbyState.gameLobbyStatus)) {
      const scene1 = splineAppRef.current?.findObjectByName('Title + Instructions + Play + Screen');
      const scene2 = splineAppRef.current?.findObjectByName('Overworld');
  
    
      if (scene1) {
        scene1.visible = false;
      }
    
      if (scene2) {
        scene2.visible = true;
      }
    }
  }, [lobbyState.gameLobbyStatus]);
}