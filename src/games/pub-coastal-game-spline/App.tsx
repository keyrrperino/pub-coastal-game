import React from 'react';
import { GameProvider } from './GlobalGameContext';
import { SplineViewer } from './SplineCanvasWithAction';
import SplineActionButtons from './SplineActionButtons';

interface AppProps {
  showViewer?: boolean;
  showController?: boolean;
}

export default function PubCoastalGameSplineApp({ showViewer = true, showController = true }: AppProps) {
  return (
    <GameProvider>
      <div className='flex flex-col justify-center'>
        {showViewer && <SplineViewer />}
        {showController && <SplineActionButtons />}
      </div>
    </GameProvider>
  );
} 