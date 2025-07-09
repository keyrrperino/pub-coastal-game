import React, { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { GameRoomService, ActivityLog } from "@/lib/gameRoom";

const SPLINE_URL = "https://prod.spline.design/acS6CX6CWRshrgWS/scene.splinecode";

interface SplineFirebaseProps {
  roomId: string;
  userName: string;
}

const SplineFirebase: React.FC<SplineFirebaseProps> = ({ roomId, userName }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const gameRoomServiceRef = useRef<GameRoomService | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [waterLevel, setWaterLevel] = useState<number>(0);

  // Initialize GameRoomService and join room
  useEffect(() => {
    gameRoomServiceRef.current = new GameRoomService(userName);
    gameRoomServiceRef.current.joinRoom(roomId);
    // Listen to activity
    gameRoomServiceRef.current.onActivityChange((activities) => {
      setActivity(activities);
    });
    // Listen to water level
    gameRoomServiceRef.current.onWaterLevelChange((level) => {
      setWaterLevel(level);
    });
    return () => {
      gameRoomServiceRef.current?.disconnect();
    };
  }, [roomId, userName]);

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
    // Example: trigger Spline actions based on activity
    // activity.forEach(act => { ... });
  }, [isLoaded, activity]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen m-0 p-0 bg-black z-0"
      style={{ borderRadius: 0, gap: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full m-0 p-0"
        style={{ display: "block", borderRadius: 0, border: "none" }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10" style={{ borderRadius: 0 }}>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <span className="text-xl font-semibold text-blue-700">Loading Spline...</span>
        </div>
      )}
    </div>
  );
};

export default SplineFirebase; 