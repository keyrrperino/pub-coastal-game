import {
  ActivityTypeEnum,
  GameLobbyStatus,
  LobbyStateEnum,
  UserSectorEnum
} from "./enums";

export type SplineTriggerConfigItem = {
  state: string[];
  events: string[];
  buttonValue?: string;
  activityType: ActivityTypeEnum;
  delay?: number;

  lobbyState?: LobbyStateEnum;
  lobbyStateValue?: string | number | boolean;
  subTriggers?: ActivityTypeEnum[]
};

export type SplineTriggersConfigType = {
  [key in ActivityTypeEnum]: 
    SplineTriggerConfigItem;
};

export type SectorsButtonConfigType = {
  [key in UserSectorEnum]: SplineTriggerConfigItem[];
};

export type GameElementType = {
  type: ActivityTypeEnum;
  x: number;
  y: number;
  scale: number;
  id: string;
}

export type ActivityLogType = {
  id: string;
  userId: string;
  userName: string;
  action: ActivityTypeEnum;
  timestamp: number;
  round?: number;
}

export type UserPresenceType = {
  id: string;
  name: string;
  lastSeen: number;
  isOnline: boolean;
}

export type LobbyStateType = {
  [LobbyStateEnum.
    GAME_STARTS_IN_COUNDOWN_KEY]: number;
  [LobbyStateEnum.WATER_LEVEL_KEY]: number;
  [LobbyStateEnum.ROUND_TIMER]: number;
  [LobbyStateEnum.IS_DONE_SHOWING_INSTRUCTIONS]: boolean;
  [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus;
  [LobbyStateEnum.ROUND_TIMER_PERCENTAGE]: number;
  [LobbyStateEnum.COUNTDOWN_START_TIME]: number;
}
