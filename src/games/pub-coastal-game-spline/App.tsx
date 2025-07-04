import React from 'react';
import Spline from '@splinetool/react-spline';
import SplineActionButtons from './SplineActionButtons';
import { GameProvider } from './GlobalGameContext';
import SplineCanvasWithAction from './SplineCanvasWithAction';

export default function PubCoastalGameSplineApp() {
  return (
    <GameProvider>
      <div>
        <div className="mt-8">
          <SplineCanvasWithAction />
        </div>
        <div className="mt-3">
          <SplineActionButtons />
        </div>
      </div>
    </GameProvider>
  );
} 