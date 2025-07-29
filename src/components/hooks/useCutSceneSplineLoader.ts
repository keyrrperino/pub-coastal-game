import { useEffect, useState } from "react";
import { Application } from "@splinetool/runtime";
import { SPLINE_URL, splineCutScenesUrls } from "@/lib/constants";
import { CutScenesEnum } from "@/lib/enums";

export function useCutSceneSplineLoader(
  canvasCutScenesRefs: { [key in CutScenesEnum]?: React.RefObject<HTMLCanvasElement | null> },
  splineAppCutScenesRefs: { [key in CutScenesEnum]?: React.RefObject<Application | null> },
) {
  const [loadCutScenes, setLoadCutScenes] = useState<CutScenesEnum[]>([]);
  useEffect(() => {
    Object.keys(canvasCutScenesRefs ?? {}).forEach((keyOf: string) => {
      const key = keyOf as CutScenesEnum;
      const canvasRef = canvasCutScenesRefs[key];
      const splineRef = splineAppCutScenesRefs[key];
    
      if (canvasRef?.current && !splineRef?.current) {
        const cutSceneOneApp = new Application(canvasRef.current);
        cutSceneOneApp.load(splineCutScenesUrls[key]).then(() => {
          if (splineRef) splineRef.current = cutSceneOneApp;
        }).catch((error) => {
          console.log(error);
        });
      }
    });

    return () => {
      Object.keys(canvasCutScenesRefs ?? {}).forEach((keyOf: string) => {
        const key = keyOf as CutScenesEnum;
        const splineRef = splineAppCutScenesRefs[key];
        splineRef?.current?.dispose?.();
        if (splineRef) splineRef.current = null;
      });
    };
    // Only run on mount/unmount or if refs/URL change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ...Object.values(splineAppCutScenesRefs),
    loadCutScenes
  ]);

  return {
    loadCutScenes,
    setLoadCutScenes
  }
}