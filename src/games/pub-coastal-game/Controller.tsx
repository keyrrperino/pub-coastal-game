import React, { useRef, useState, useEffect } from 'react';
import { GameRoomService } from '@/lib/gameRoom';
import { GAME_STARST_IN_COUNTDOWN, lobbyStateDefaultValue, SectorsButtonConfig, SplineTriggersConfig } from '@/lib/constants';
import { ActivityLogType, LobbyStateType, NormalizedActivities, SectorEnum, SplineTriggerConfigItem, SubSectorType } from '@/lib/types';
import { ActivityTypeEnum, GameEnum, GameLobbyStatus, LobbyStateEnum, UserSectorEnum } from '@/lib/enums';
import clsx from 'clsx';
import { hasActivityForSubSector, getNormalizeActivities, isGameOnGoing } from '@/lib/utils';
import Modal from './compontents/Modal';
import LoadingModal from './compontents/LoadingModal';
import AnimatedTitle from './compontents/AnimatedTitle';
import AnimatedModal from './compontents/AnimatedModal';
import LeaderboardModal from './compontents/LeaderboardModal';
import ProgressBar from './compontents/ProcessBar';
import { useMainProgress } from '@/components/hooks/useMainProgress';

type PubCoastalGameSplineControllerAppType = {
  sector: string;
}

export default function PubCoastalGameSplineControllerApp({ sector }: PubCoastalGameSplineControllerAppType) {
  const gameRoomService = useRef<GameRoomService | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [lobbyState, setLobbyState] = useState<LobbyStateType>(lobbyStateDefaultValue);
  const [activities, setActivities] = useState<ActivityLogType[] | null>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isAnimatedModalOpen, setIsAnimatedModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(true);
  const [normalizeActivities, setNormalizeActivities] = useState<NormalizedActivities>({
    actions: {},
    userIds: {},
    rounds: {},
    values: {},
  });

  // Transform sector slug to SectorsButtonConfig key
  const getSectorKey = (slug: string) => `user_${slug.replace(/-/g, '_')}`;
  const [,sectorNumber] = sector.split('-');

  // Get the config for this sector
  const sectorKey = typeof sector === 'string' ? getSectorKey(sector) as keyof typeof SectorsButtonConfig : '';
  const buttonConfigs = SectorsButtonConfig[sectorKey as UserSectorEnum];

  useEffect(() => {
    const setupRoom = async () => {
      gameRoomService.current = new GameRoomService(GameEnum.DEFAULT_USERNAME);
      const joined = await gameRoomService.current.joinRoom(GameEnum.DEFAULT_ROOM_NAME);

      if (!joined) {
        await gameRoomService.current.createRoom(true);
      }

      gameRoomService.current.onLobbyStateChange((lobbyState: LobbyStateType) => {
        setLobbyState(lobbyState);
      });

      gameRoomService.current.onActivityChange((updatedActivities) => {
        setActivities(() => {
          return updatedActivities;
        });
      });
    };

    setupRoom();

    return () => {
      gameRoomService.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsLoadingModalOpen(lobbyState.gameLobbyStatus === GameLobbyStatus.PREPARING);
    setIsAnimatedModalOpen(lobbyState.gameLobbyStatus === GameLobbyStatus.ROUND_ONE_GAME_ENDED);
  }, [lobbyState.gameLobbyStatus]);

  useEffect(() => {
    setNormalizeActivities(getNormalizeActivities(activities ?? []));
  }, [activities]);

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
    
    

    if (btn.activityType === ActivityTypeEnum.START_GAME) {
      // this will show a new scene with 5 second countdown
      await gameRoomService.current.addElement(btn.activityType, btn.buttonValue ?? '', lobbyState.round ?? 1, 0, false);
      await gameRoomService.current.updateLobbyStateKeyValue(LobbyStateEnum.GAME_LOBBY_STATUS, GameLobbyStatus.PREPARING);
      gameRoomService.current
        ?.updateLobbyStateKeyValue(
          LobbyStateEnum.COUNTDOWN_PREPARATION_START_TIME, 
          Date.now());
    } else {
      // For other actions, we need to get the cost from the scenario config
      // Since we don't have direct access to cost here, we'll use 0 as a fallback
      // In a real implementation, you'd want to pass the cost or look it up
      await gameRoomService.current.addElement(btn.activityType, btn.buttonValue ?? '', lobbyState.round ?? 1, 0, true, btn.subSector);
    }
  }

  const onResetClick = async () => {
    if (gameRoomService.current) {
      await gameRoomService.current.deleteActivities(GameEnum.DEFAULT_ROOM_NAME);
    }
  }

  const isGameStarted = [GameLobbyStatus.STARTED, GameLobbyStatus.ROUND_ONE_GAME_ENDED].includes(lobbyState.gameLobbyStatus);
  const isStartButtonDisabled = [GameLobbyStatus.STARTED, GameLobbyStatus.PREPARING].includes(lobbyState.gameLobbyStatus);

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

const renderButtons = (buttonConfigSector: SplineTriggerConfigItem[], subSector: string, bgColor: string) => {
    const disabled = hasActivityForSubSector(activities ?? [], sectorKey, subSector, lobbyState.round ?? 1);
    return (
      buttonConfigSector.map((btn, idx) => {
        const newButtonValue = btn.buttonValue?.split("/").slice(1).join("");
        const isButtonTriggered = btn.activityType ? normalizeActivities.actions[btn.activityType] : undefined;

        return <button
          key={"mcp-" + idx}
          // disabled={isButtonTriggered?.length > 0 || disabled}
          style={{
            backgroundColor: bgColor,

          }}
          className={
            clsx(
              "rounded-[10vh] pl-[2vw] pr-[2vw] bg-white p-[1vw] max-w-[18vw] h-[7vh] leading-[100%]",
              "hover:bg-blue-100 active:bg-blue-400 transition hover:text-[#2f2f2f]",
              "active:text-white disabled:cursor-not-allowed",
              // isButtonTriggered?.length > 0  ? "disabled:bg-blue-200 disabled:text-[#6EB6FF]" : "disabled:bg-gray-200 disabled:text-gray-400" 
            )
          }
          onClick={() => {
            if (btn.activityType) {
              onButtonClick(btn as SplineTriggerConfigItem)
            }
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
      const subSectorTitle = `Sector ` + sectorValue;

      const subSector = (sectorNumber + `${sectorValue}`) as SubSectorType;

      return (<div key={subSector} className={clsx(
        `flex flex-col rounded-[1vw] p-[2vw] gap-[4vh]`,
      )}
      style={{
        backgroundColor: `${sectorTheme[sectorKey as UserSectorEnum].boxColor}`
      }}
      >
        <h1 className="
          text-[3.5vw] leading-[0.8] text-center
        ">{subSectorTitle}</h1>
        <div className="grid grid-cols-3 flex-wrap gap-5 justify-end">
          <div className="grid grid-cols-1 flex-wrap gap-5">
            {renderButtons(buttonConfigs[sectorValue].mangroves ?? [], subSector, "rgba(165,245,221,1)")}
            {renderButtons(buttonConfigs[sectorValue].artificialReef ?? [], subSector, "rgba(165,245,221,1)")}
          </div>
          <div className="grid grid-cols-1 flex-wrap gap-5">
            {renderButtons(buttonConfigs[sectorValue].seawall ?? [], subSector, "rgba(227, 249, 255, 1)")}
          </div>
          <div className="grid grid-cols-1 flex-wrap gap-5">
          {renderButtons(buttonConfigs[sectorValue].stormsurgebarrier ?? [], subSector, "rgba(227, 249, 255, 1)")}
          {renderButtons(buttonConfigs[sectorValue].reclamation ?? [], subSector, "rgba(255, 234, 207, 1)")}
          {renderButtons(buttonConfigs[sectorValue].hybrid ?? [], subSector, "rgba(255, 234, 207, 1)")}
          </div>

          <button
            key={'dem-' + sector}
            style={{
              backgroundColor: 'red',
            }}
            className={
              clsx(
                "rounded-[10vh] pl-[2vw] pr-[2vw] bg-white p-[1vw] max-w-[18vw] h-[7vh] leading-[100%]",
                "hover:bg-blue-100 active:bg-blue-400 transition hover:text-[#2f2f2f]",
              )
            }
            onClick={async () => {
              await gameRoomService.current?.addElement(
                ActivityTypeEnum.DEMOLISH,
                '', lobbyState.round ?? 1, 1, false, subSector);
            }}
          >
            DEMOLISH
          </button>
        </div>
      </div>);
    });
  };

  const renderScene = isGameStarted ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        disabled={isStartButtonDisabled}
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
          disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed
        "
        onClick={() => {
          if (SplineTriggersConfig[ActivityTypeEnum.START_GAME]) {
            onButtonClick(SplineTriggersConfig[ActivityTypeEnum.START_GAME])
          }
        }}
      >
        Start Game
      </button>
    </>
  )

  const resetGame = async () => {
    await gameRoomService.current?.deleteActivities(GameEnum.DEFAULT_ROOM_NAME);
    await gameRoomService.current?.updateLobbyState({
      ...lobbyStateDefaultValue,
      gameLobbyStatus: GameLobbyStatus.RESTARTING
    });
    window.location.reload(); 
  }

  const mainStyle = isGameStarted ? {
    backgroundColor: "#202020"
  } : {
    backgroundImage: "url('/games/pub-coastal-spline/images/controller-bg2.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  const {progress, isStarting} = useMainProgress(
    30, // countdown seconds
    lobbyState.gameLobbyStatus,
    false,
    lobbyState.countdownStartTime,
    3 // <-- 3 seconds delay before countdown starts
  );

  const renderProgressBar = (
    (isGameOnGoing(lobbyState.gameLobbyStatus) && 
      <ProgressBar
        progress={progress}
        key="lead"
        round={lobbyState.round}
        containerClassName="fixed z-10 top-[9vh] left-[30vw] w-[45vw] h-[4vw]"
      />
  ));

  return (
    <main
        className="min-h-screen bg-gradient-to-b"
        style={mainStyle}
      >
        {renderProgressBar}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            <div className='flex flex-col gap-10'>
              <div className='flex flex-col items-center justify-center h-screen gap-5 mt-[-10vh]'>
                {renderScene}
              </div>
            </div>
          </div>
        </div>
        <LoadingModal isOpen={isLoadingModalOpen} />
        {/* <LeaderboardModal isOpen={true} /> */}
        <AnimatedModal
          isOpen={isAnimatedModalOpen}
        >
          <AnimatedTitle>
            {
              (lobbyState.round ?? 1) > 2 ? (
                <>
                  <h1 className="text-[3vh]">˗ˏˋ Game Over ˎˊ˗</h1>
                  <button
                    className="
                      mt-[5vh]
                      flex items-center justify-center
                      w-[406px] h-[83px]
                      pt-[37px] pr-[45px] pb-[37px] pl-[45px]
                      gap-[10px]
                      opacity-100
                      rounded-[500px]
                      bg-[#DD0046] text-white font-bold text-[48px]
                      focus:outline-none
                      transition
                      hover:bg-[#FF2A6D] active:bg-[#FF4E86]
                      cursor-pointer
                    "
                    onClick={() => {
                      resetGame();
                    }}
                  >
                    Restart
                  </button>
                </>
              ) : (
                <>
                  <h1>˗ˏˋ Round {lobbyState.round ?? 1} Finished ˎˊ˗</h1>
                  <h1>Prepare for Round {(lobbyState.round ?? 1) + 1}</h1>
                </>
              )
            }
          </AnimatedTitle>
        </AnimatedModal>
      </main>
  );
}
