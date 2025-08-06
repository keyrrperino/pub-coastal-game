import {
  ActivityTypeEnum,
  CutScenesEnum,
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

export type SplineTriggersConfigType = Partial<{
  [key in ActivityTypeEnum]: SplineTriggerConfigItem;
}>;

export enum SectorEnum {
  SECTOR_A = "Sector A",
  SECTOR_B = "Sector B"
};

export type ButtonGroupKey = 'mangroves' | 'reclamation' | 'stormsurgebarrier' | 'seawall' | 'hybrid' | 'artificialReef';

export type SectorsButtonConfigType = {
  [userSector in UserSectorEnum]: {
    [sector in SectorEnum]: {
      [group in ButtonGroupKey]?: SplineTriggerConfigItem[];
    }
  }
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
  value: string;
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
  [LobbyStateEnum.RANDOMIZE_EFFECT]: number;
  [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus;
  [LobbyStateEnum.ROUND_TIMER_PERCENTAGE]: number;
  [LobbyStateEnum.COUNTDOWN_START_TIME]: number;
  [LobbyStateEnum.ROUND]: number;
  [LobbyStateEnum.COUNTDOWN_PREPARATION_START_TIME]: number
}


export type NormalizedActivities = {
  actions: { [action: string]: ActivityLogType[] };
  userIds: { [userId: string]: ActivityLogType[] };
  rounds: { [round: string]: ActivityLogType[] };
  values: { [value: string]: ActivityLogType[] };
};

export type ScenarioConfigurationType = { [key: string]: { score: number; coin?: number; cutscene?: CutScenesEnum | null } };


export type PlayerBreakdown = {
  actionsScore: number;
  coinsSpent: number;
  scenarios: { key: string; config: any }[];
};

export type RoundBreakdown = {
  totalPoints: number;
  playerBreakdown: Record<string, PlayerBreakdown>; // e.g., "P1", "P2", "P3"
  roundPoints: number;
};