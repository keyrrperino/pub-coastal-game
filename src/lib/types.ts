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

export type SplineTriggersConfigType = {
  [key in ActivityTypeEnum]: 
    SplineTriggerConfigItem;
};

export enum SectorEnum {
  SECTOR_A = "Sector A",
  SECTOR_B = "Sector B"
};

export type ButtonGroupKey = 'mangroves' | 'reclamation' | 'stormsurgebarrier' | 'seawall' | 'hybrid' | 'artificialReef' | 'boardwalk' | 'path';

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
}


export type NormalizedActivities = {
  actions: { [action: string]: ActivityLogType[] };
  userIds: { [userId: string]: ActivityLogType[] };
  rounds: { [round: string]: ActivityLogType[] };
  values: { [value: string]: ActivityLogType[] };
};

export type ScenarioConfigurationType = { [key: string]: { score: number; coin?: number; cutscene?: CutScenesEnum } };

// =========================================================================
//  DYNAMIC UI PROGRESSION SYSTEM TYPES
// =========================================================================

export enum ActionStatus {
  SELECTABLE = 'SELECTABLE', // The button is active and can be clicked.
  COMPLETED = 'COMPLETED',   // This specific action has been built.
  REPLACED = 'REPLACED',     // This action was built but then replaced by an upgrade.
  LOCKED_CONFLICT = 'LOCKED_CONFLICT', // Cannot be built; a conflicting CPM path is active.
  LOCKED_PREREQUISITE = 'LOCKED_PREREQUISITE', // Cannot be built; requirements are not met (e.g., wrong round or missing base structure).
}

export interface ActionState {
  config: ActionConfig; // ActionConfig from progression.config.ts
  status: ActionStatus;
}

// Forward declaration - ActionConfig will be imported from progression.config.ts
export interface ActionConfig {
  /** A unique identifier corresponding to an ActivityTypeEnum. */
  id: ActivityTypeEnum;

  /** The human-readable name for the UI. */
  displayName: string;

  /** The resource cost of the action (e.g., number of coins). */
  cost: number;

  /** The minimum game round in which this action becomes available. */
  unlocksInRound: number;

  /** The button group this action belongs to (1 = first group, 2 = second group, etc.) */
  buttonGroup: number;

  /**
   * Defines prerequisites using OR/AND logic.
   * Format: `[[A, B], [C]]` means "(A AND B) OR C".
   * An empty array `[]` or omitting the property means no prerequisites.
   */
  prerequisites?: ActivityTypeEnum[][];

  /**
   * The IDs of the actions that this one replaces upon being built.
   * The logic engine will treat the replaced actions as no longer active.
   */
  replaces?: ActivityTypeEnum[];

  /** An array of action IDs that are mutually exclusive with this one. */
  conflicts?: ActivityTypeEnum[];

  sector: string;
  measureType: 'mangroves' | 'land-reclamation' | 'seawall' | 'storm-surge-barrier' | 'artificial-reef' | 'hybrid-measure' | 'revetment';
}

// The final object returned by the useProgression hook
export interface ProgressionState {
  activeCPM: 'mangroves' | 'seawall' | 'land-reclamation' | 'storm-surge-barrier' | 'artificial-reef' | 'hybrid-measure' | 'revetment' | null; // The currently built CPM path
  mangroves: ActionState[];
  seawall: ActionState[];
  landReclamation: ActionState[];
  stormSurgeBarrier: ActionState[];
  artificialReef: ActionState[];
  hybridMeasure: ActionState[];
  revetment: ActionState[];
}