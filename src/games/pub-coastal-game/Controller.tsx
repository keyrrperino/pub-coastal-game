import React, { useRef, useState, useEffect } from 'react';
import { ActivityTypeEnum, GameEnum, GameRoomService, SectorsButtonConfig, SectorsButtonConfigType, SplineTriggerConfigItem } from '@/lib/gameRoom';

type PubCoastalGameSplineControllerAppType = {
  sector: string;
}

export default function PubCoastalGameSplineControllerApp({ sector }: PubCoastalGameSplineControllerAppType) {
  const gameRoomService = useRef<GameRoomService | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

    // Transform sector slug to SectorsButtonConfig key
    const getSectorKey = (slug: string) => `user_${slug.replace(/-/g, '_')}`;

  // Get the config for this sector
  const sectorKey = typeof sector === 'string' ? getSectorKey(sector) as keyof typeof SectorsButtonConfig : '';
  const buttonConfigs = (sectorKey && SectorsButtonConfig[sectorKey]) ? SectorsButtonConfig[sectorKey] : [];

  useEffect(() => {
    const setupRoom = async () => {
      gameRoomService.current = new GameRoomService(sector as string);
      // Try to join the default room first
      const joined = await gameRoomService.current.joinRoom('default');

      if (joined) {
        setRoomId('default');
      } else {
        // If not exists, create it
        await gameRoomService.current.createRoom(true);
        setRoomId('default');
      }
    };
    setupRoom();
  }, []);

  const onButtonClick = (btn: SplineTriggerConfigItem) => {
    if (!gameRoomService.current) return;

    gameRoomService.current.addElement(btn.activityType);
  }

  const onResetClick = async () => {
    if (gameRoomService.current) {
      await gameRoomService.current.deleteActivities(GameEnum.DEFAULT_ROOM_NAME);
    } 
  }
  

  return (
    <div className='flex flex-col justify-center gap-10'>
      <h1 className="text-[250%]">{sector.replace('-', ' ').toLocaleUpperCase()}</h1>
      <div className='flex flex-row justify-center gap-4 flex-wrap'>
        {buttonConfigs.map((btn, idx) => (
          <button
            key={idx}
            className="flex-1 p-[8%] bg-blue-500 text-white text-[100%] cursor-pointer rounded shadow transition-colors duration-200 hover:bg-blue-700 active:bg-blue-900"
            onClick={() => {
              if (btn.activityType === ActivityTypeEnum.RESET_SCENE) {
                onResetClick();
              }

              onButtonClick(btn as SplineTriggerConfigItem)
            }}
          >
            {btn.buttonValue}
          </button>
        ))}
      </div>
    </div>
  );
} 
