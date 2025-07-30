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
    setIsGameLoaded,
    setIsGameStarted,
    isGameLoaded
  } = useGameContext();

  useEffect(() => {
    if (canvasRef.current && !splineAppRef.current) {
      const app = new Application(canvasRef.current);
      app.load(SPLINE_URL).then(() => {
        splineAppRef.current = app;
        setIsGameLoaded(true);
        setIsGameStarted(false);
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
    if (!isGameLoaded || !splineAppRef.current) return;
    
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
  }, [isSeaWallBuilding, isGameLoaded, seawallValue, setIsSeaWallBuilding]);

  // Revetment build trigger
  useEffect(() => {
    if (!isGameLoaded || !splineAppRef.current) return;
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
    if (buildBtn) {
      buildBtn.state = 'clicked';
    }
    setIsRevetmentBuilding(false);
  }, [isRevetmentBuilding, isGameLoaded, revetmentValue, setIsRevetmentBuilding]);

  useEffect(() => {
    if (!isGameLoaded || !splineAppRef.current) return;
    if (!singleBuild) return;

    const obj = splineAppRef.current.findObjectByName?.(singleBuild);

    if (obj) {
      obj.state = 'hovered';
      obj.state = 'clicked';
      obj.emitEvent('mouseHover');
      obj.emitEvent('mouseUp');
    }    
  }, [singleBuild]);

  return (
    <div className="flex flex-col items-start gap-4 p-4 bg-gray-100 rounded-xl mb-3">
      <div className="relative w-full">
        <canvas ref={canvasRef} className="rounded-lg border w-full" />
        {!isGameLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10 rounded-lg">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <span className="text-xl font-semibold text-blue-700">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const SplineViewer: React.FC = () => {
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
    setIsGameLoaded,
    setIsGameStarted,
    isGameLoaded
  } = useGameContext();

  useEffect(() => {
    if (canvasRef.current && !splineAppRef.current) {
      const app = new Application(canvasRef.current);
      app.load(SPLINE_URL).then(() => {
        splineAppRef.current = app;
        setIsGameLoaded(true);
        setIsGameStarted(false);
      });
    }
    return () => {
      splineAppRef.current?.dispose?.();
      splineAppRef.current = null;
    };
  }, []);

  // Seawall build trigger
  useEffect(() => {
    if (!isGameLoaded || !splineAppRef.current) return;
    
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
  }, [isSeaWallBuilding, isGameLoaded, seawallValue, setIsSeaWallBuilding]);

  // Revetment build trigger
  useEffect(() => {
    if (!isGameLoaded || !splineAppRef.current) return;
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
    if (buildBtn) {
      buildBtn.state = 'clicked';
    }
    setIsRevetmentBuilding(false);
  }, [isRevetmentBuilding, isGameLoaded, revetmentValue, setIsRevetmentBuilding]);

  useEffect(() => {
    if (!isGameLoaded || !splineAppRef.current) return;
    if (!singleBuild) return;

    const obj = splineAppRef.current.findObjectByName?.(singleBuild);

    if (obj) {
      obj.state = 'hovered';
      obj.state = 'clicked';
      obj.emitEvent('mouseHover');
      obj.emitEvent('mouseUp');
    }    
  }, [singleBuild]);

  return (
    <div className="flex flex-col items-start gap-4 p-4 bg-gray-100 rounded-xl mb-3">
      <div className="relative w-full">
        <canvas ref={canvasRef} className="rounded-lg border w-full" />
        {!isGameLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10 rounded-lg">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <span className="text-xl font-semibold text-blue-700">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplineCanvasWithAction; 