import React from 'react';
import SplineFirebase from '@/components/SplineFirebase';

export default function PubCoastalGameSplineApp({ roomName }: {roomName: string}) {
  
  return (
    <div className='flex flex-col justify-center'>
      <SplineFirebase roomName={roomName} />
    </div>
  );
} 