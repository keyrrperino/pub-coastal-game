import { CutScenesEnum } from '@/lib/enums';

export default function TestCutScenes() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {Object.values(CutScenesEnum).map((cutSceneKey) => (
        <div key={cutSceneKey} className="relative">
          <video
            src={`/games/pub-coastal-spline/flash-reports/videos/${cutSceneKey.replaceAll("-", " ").toLocaleLowerCase()}.webm?v=1.1`}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={`/games/pub-coastal-spline/flash-reports/images/${cutSceneKey.replaceAll("-", " ").toLocaleLowerCase()}.png?v=1.1`}
              className="pointer-events-none"
              alt={`Overlay for ${cutSceneKey}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
} 
