import React, { useRef, useState, useEffect } from 'react';
import { GameRoomService, ActivityLog, UserPresence } from '@/lib/gameRoom';
import SplineFirebase from '@/components/SplineFirebase';

export default function PubCoastalGameSplineApp() {
  const gameRoomService = useRef<GameRoomService | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const setupRoom = async () => {
      gameRoomService.current = new GameRoomService('master');
      // Try to join the default room first
      const joined = await gameRoomService.current.joinRoom('default');
      if (joined) {
        setRoomId('default');
        setStatus('Joined existing default room');
      } else {
        // If not exists, create it
        await gameRoomService.current.createRoom(true);
        setRoomId('default');
        setStatus('Created and joined default room');
      }
    };
    setupRoom();
  }, []);

  return (
    <div className='flex flex-col justify-center'>
      <SplineFirebase roomId={roomId || 'default'} userName="master" />
      <div className="d-none mt-4 text-sm text-gray-500">Room: {roomId} ({status})</div>
    </div>
  );
} 
