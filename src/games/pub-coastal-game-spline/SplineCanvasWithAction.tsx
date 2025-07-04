import React, { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { SplineTriggersEnum, useGameContext } from "./GlobalGameContext";
import StartButton from "./components/StartButton";
import ResetButton from "./components/ResetButton";

const SPLINE_URL = "https://prod.spline.design/GmD6np0ridu2Q2me/scene.splinecode";

const SplineCanvasWithAction: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const {
    seawallValue,
    isSeaWallBuilding,
    setIsSeaWallBuilding,
    revetmentValue,
    isRevetmentBuilding,
    setIsRevetmentBuilding,
    singleBuild,
    triggerSingleBuild
  } = useGameContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (canvasRef.current && !splineAppRef.current) {
      const app = new Application(canvasRef.current);
      app.load(SPLINE_URL).then(() => {
        splineAppRef.current = app;
        setLoaded(true);
      });
    }
    // Cleanup on unmount
    return () => {
      splineAppRef.current?.dispose?.();
      splineAppRef.current = null;
    };
  }, []);

  // Seawall build trigger
  useEffect(() => {
    if (!loaded || !splineAppRef.current) return;
    
    if (!seawallValue) return;
    // Trigger the selected sw clicker
    let objName, stateName;
    if (seawallValue === 5) objName = 'sw clicker 5';stateName = 'clicked';
    if (seawallValue === 10) objName = 'sw clicker 10';stateName = 'clicked';
    if (seawallValue === 15) objName = 'sw clicker 15';stateName = 'clicked';
    if (objName) {
      const obj = splineAppRef.current.findObjectByName?.(objName);
      if (obj) {
        obj.state = 'clicked';
      }
    }
    // Trigger the SW Build Btn
    if (!isSeaWallBuilding) return;
    const buildBtn = splineAppRef.current.findObjectByName?.('SW Build Btn');
    if (buildBtn) {
      buildBtn.state = 'clicked';
    }
    setIsSeaWallBuilding(false);
  }, [isSeaWallBuilding, loaded, seawallValue, setIsSeaWallBuilding]);

  // Revetment build trigger
  useEffect(() => {
    if (!loaded || !splineAppRef.current) return;
    if (!revetmentValue) return;
    // Trigger the selected revetment clicker
    let objName, stateName;
    if (revetmentValue === 10) objName = 'rv clicker 10';stateName = 'clicked';
    if (revetmentValue === 20) objName = 'rv clicker 20';stateName = 'clicked';
    if (objName) {
      const obj = splineAppRef.current.findObjectByName?.(objName);
      if (obj) {
        obj.state = stateName;
      }
    }

    if (!isRevetmentBuilding) return;
    // Trigger the Revetment Build Btn
    const buildBtn = splineAppRef.current.findObjectByName?.('RV Build Btn');
    console.log(buildBtn);
    if (buildBtn) {
      buildBtn.state = 'clicked';
    }
    setIsRevetmentBuilding(false);
  }, [isRevetmentBuilding, loaded, revetmentValue, setIsRevetmentBuilding]);

  useEffect(() => {
    if (!loaded || !splineAppRef.current) return;
    if (!singleBuild) return;

    const obj = splineAppRef.current.findObjectByName?.(singleBuild);

    console.log(obj);
    if (obj) {
      obj.state = 'hovered';
      obj.state = 'clicked';
      obj.emitEvent('mouseHover');
      obj.emitEvent('mouseUp');
    }    
  }, [singleBuild]);

  return (
    <div className="flex flex-col items-start gap-4 p-4 bg-gray-100 rounded-xl">
      <div className="flex gap-2">
        <ResetButton onClick={() => triggerSingleBuild(SplineTriggersEnum.RESTART_BTN)} />
        <StartButton onClick={() => triggerSingleBuild(SplineTriggersEnum.RAISE_WATER_BTN)} />
      </div>
      <canvas ref={canvasRef} className="rounded-lg border" />
    </div>
  );
};

export default SplineCanvasWithAction; 