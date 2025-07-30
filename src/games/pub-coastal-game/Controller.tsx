import React, { useRef, useState, useEffect } from 'react';
import { GameRoomService } from '@/lib/gameRoom';
import { GAME_STARST_IN_COUNTDOWN, lobbyStateDefaultValue, SectorsButtonConfig, SplineTriggersConfig } from '@/lib/constants';
import { LobbyStateType, SectorEnum, SplineTriggerConfigItem } from '@/lib/types';
import { ActivityTypeEnum, GameEnum, GameLobbyStatus, LobbyStateEnum, UserSectorEnum } from '@/lib/enums';
import clsx from 'clsx';

type PubCoastalGameSplineControllerAppType = {
  sector: string;
}

export default function PubCoastalGameSplineControllerApp({ sector }: PubCoastalGameSplineControllerAppType) {
  const gameRoomService = useRef<GameRoomService | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [lobbyState, setLobbyState] = useState<LobbyStateType>(lobbyStateDefaultValue);

    // Transform sector slug to SectorsButtonConfig key
    const getSectorKey = (slug: string) => `user_${slug.replace(/-/g, '_')}`;
    const [,sectorNumber] = sector.split('-');

  // Get the config for this sector
  const sectorKey = typeof sector === 'string' ? getSectorKey(sector) as keyof typeof SectorsButtonConfig : '';
  const buttonConfigs = SectorsButtonConfig[sectorKey as UserSectorEnum];

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

      gameRoomService.current.onLobbyStateChange((lobbyState: LobbyStateType) => {
        setLobbyState(lobbyState);
      });
    };
    setupRoom();
  }, []);



  const onButtonClick = async (btn: SplineTriggerConfigItem) => {
    if (!gameRoomService.current) return;
    
    await gameRoomService.current.addElement(btn.activityType, btn.buttonValue ?? '');

    if (btn.activityType === ActivityTypeEnum.START_GAME) {
      // this will show a new scene with 5 second countdown
      await gameRoomService.current.updateLobbyStateKeyValue(LobbyStateEnum.GAME_LOBBY_STATUS, GameLobbyStatus.PREPAIRING);
    }
  }

  const onResetClick = async () => {
    if (gameRoomService.current) {
      await gameRoomService.current.deleteActivities(GameEnum.DEFAULT_ROOM_NAME);
    } 
  }

  const isGameStarted = [GameLobbyStatus.STARTED, GameLobbyStatus.PREPAIRING].includes(lobbyState.gameLobbyStatus);

  const sectorTheme = {
    [UserSectorEnum.USER_SECTOR_ONE]: {
      boxColor: "#A0DA42"
    },
    [UserSectorEnum.USER_SECTOR_TWO]: {
      boxColor: "#3BB770"
    },
    [UserSectorEnum.USER_SECTOR_THREE]: {
      boxColor: "#10B9FF"
    }
  }

  const renderButtons = (buttonConfigSector: SplineTriggerConfigItem[]) => {
    return (
      buttonConfigSector.map((btn, idx) => {
        const newButtonValue = btn.buttonValue?.split("/").slice(1).join("");

        return <button
          key={idx}
          className="rounded-[10vh] pl-[2vw] pr-[2vw] bg-white p-[1vw] max-w-[18vw] h-[7vh]"
          onClick={() => {
            onButtonClick(btn as SplineTriggerConfigItem)
          }}
        >
          {newButtonValue}
        </button>
      })
    )
  }
  
  const renderUserSectors = () => {
    return Object.keys(buttonConfigs).map((sector: string) => {
      const sectorValue = sector as SectorEnum;
      const subSectorTitle = sectorValue.replace(" ", ` ${sectorNumber}`);

      return (<div className={clsx(
        `flex flex-col rounded-[1vw] p-[2vw] gap-[4vh]`
      )}
      style={{
        backgroundColor: `${sectorTheme[sectorKey as UserSectorEnum].boxColor}`
      }}
      >
        <h1 className="
          text-[3.5vw] leading-[0.8] text-center
        ">{subSectorTitle}</h1>
        <div className="grid grid-cols-2 flex-wrap gap-5">
          {renderButtons(buttonConfigs[sectorValue])}
        </div>
      </div>);
    });
  };

  const renderScene = isGameStarted ? (
    <div className="flex flex-row gap-5">
      {renderUserSectors()}
    </div>
  )
  :
  (
    <>
      <h1 className="flex items-center justify-center font-bold text-[10vw] text-white leading-[0.8] tracking-normal text-center mb-[5vh] mt-[-10vh]">
        COASTAL PROTECTORS
      </h1>
      <h1 className="mt-[5vh] flex items-center justify-center font-bold text-[30.35px] tracking-normal text-white">˗ˏˋ {sector.replace('sector', 'Player').replace('-', ' ').replace('one', '1').replace('two', '2').replace('three', '3')} ˎˊ˗</h1>
      <button
        className="
          flex items-center justify-center
          w-[406px] h-[83px]
          pt-[37px] pr-[45px] pb-[37px] pl-[45px]
          gap-[10px]
          opacity-100
          rounded-[500px]
          bg-[#006CFF] text-white font-bold text-[48px]
          focus:outline-none
          transition
          hover:bg-[#2A81FA] active:bg-[#6EB6FF]
          cursor-pointer
        "
        onClick={() => {
          onButtonClick(SplineTriggersConfig[ActivityTypeEnum.START_GAME])
        }}
      >
        START GAME
      </button>
    </>
  )

  const mainStyle = isGameStarted ? {
    backgroundColor: "#202020"
  } : {
    backgroundImage: "url('/games/pub-coastal-spline/images/controller-bg2.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <main
        className="min-h-screen bg-gradient-to-b"
        style={mainStyle}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            <div className='flex flex-col gap-10'>
              <div className='flex flex-col items-center justify-center h-screen gap-5'>
                {renderScene}
              </div>
            </div>
          </div>
        </div>
      </main>
  );
} 
