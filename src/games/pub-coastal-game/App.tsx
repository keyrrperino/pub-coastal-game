import React, { useRef, useState, useEffect } from 'react';
import { GameRoomService, ActivityLog, UserPresence, GameEnum } from '@/lib/gameRoom';
import SplineFirebase from '@/components/SplineFirebase';

export default function PubCoastalGameSplineApp() {
  return (
    <div className='flex flex-col justify-center'>
      <SplineFirebase />
    </div>
  );
} 
