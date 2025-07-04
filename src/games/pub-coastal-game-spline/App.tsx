import React from 'react';
import Spline from '@splinetool/react-spline';
import SplineActionButtons from './SplineActionButtons';
import { GameProvider } from './GlobalGameContext';
import SplineCanvasWithAction from './SplineCanvasWithAction';

export default function PubCoastalGameSplineApp() {
  return (
    <GameProvider>
      <div className='flex flex-col justify-center'>
          <SplineCanvasWithAction />
          <SplineActionButtons />
      </div>
    </GameProvider>
  );
} 