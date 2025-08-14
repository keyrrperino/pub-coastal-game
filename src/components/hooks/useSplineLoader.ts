import { useEffect } from "react";
import { Application } from "@splinetool/runtime";
import { SPLINE_URL } from "@/lib/constants";
import { CutScenesEnum } from "@/lib/enums";

export function useSplineLoader(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  splineAppRef: React.RefObject<Application | null>,
  setIsLoaded: (loaded: boolean) => void
) {
  useEffect(() => {
    if (canvasRef.current && !splineAppRef.current) {
      const app = new Application(canvasRef.current);
      app.load(SPLINE_URL).then(() => {
        console.log('loaded');
        splineAppRef.current = app;
        setIsLoaded(true);
      });
    }

    return () => {
      splineAppRef.current?.dispose?.();
      splineAppRef.current = null;
    };
    // Only run on mount/unmount or if refs/URL change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canvasRef,
    splineAppRef,
    setIsLoaded,
  ]);
}