import { useEffect, useState } from "react";
import { Application } from "@splinetool/runtime";
import { ActivityTypeEnum } from "@/lib/enums";
import { LobbyStateType } from "@/lib/types";

export function useHideAllTriggers(
  isLoaded: boolean,
  splineAppRef: React.RefObject<Application | null>,
  lobbyState: LobbyStateType
) {
  useEffect(() => {
    if (isLoaded) {
      Object.keys(ActivityTypeEnum).forEach((keyOf) => {
        const enumKey = keyOf as keyof typeof ActivityTypeEnum;

        if (ActivityTypeEnum[enumKey] === ActivityTypeEnum.DISPLAY_INSTRUCTION) {
          return;
        }

        const obj = splineAppRef.current?.findObjectByName?.(ActivityTypeEnum[enumKey]);
        if (obj) {
          obj.visible = false;
        }
      });
    }

    // Only run on mount/unmount or if refs/URL change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoaded, lobbyState.gameLobbyStatus
  ]);
}