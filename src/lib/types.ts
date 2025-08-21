import {
  ActivityTypeEnum,
  CutScenesEnum,
  GameLobbyStatus,
  LobbyStateEnum,
  SubSectorEnum,
  UserSectorEnum
} from "./enums";

export type SubSectorType = SubSectorEnum.ONE_A | SubSectorEnum.ONE_B | SubSectorEnum.TWO_A | SubSectorEnum.TWO_B | SubSectorEnum.THREE_A | SubSectorEnum.THREE_B;
export type RoundType = 1 | 2 | 3;

export type SplineTriggerConfigItem = {
  state: string[];
  events: string[];
  buttonValue?: string;
  activityType: ActivityTypeEnum | null;
  subSector?: SubSectorType;
  delay?: number;

  lobbyState?: LobbyStateEnum;
  lobbyStateValue?: string | number | boolean;
  subTriggers?: ActivityTypeEnum[]
};

export type SplineTriggersConfigType = Partial<{
  [key in ActivityTypeEnum]: SplineTriggerConfigItem;
}>;

export enum SectorEnum {
  SECTOR_A = "A",
  SECTOR_B = "B"
};

export type SubSectorScore = {
  scores: (string | number)[];
  coins: number[];
  keys: string[];
};

export type SectorScore = {
  sectorA: SubSectorScore;
  sectorB: SubSectorScore;
  totalScoreToDeduct: number;
  totalCoinsToDeduct: number;
  partialTotalScoreToDeduct: number;
  totalScoreToDeductInRound?: number;
};

export type OverallScoresTypes = {
  [key in UserSectorEnum]?: SectorScore;
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
  subSector?: string;
  timestamp: number;
  round?: number;
  isCpm?: boolean;
  isDemolished?: boolean;
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
  [LobbyStateEnum.RANDOMIZE_EFFECT]: {[key in RoundType]: number};
  [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus;
  [LobbyStateEnum.ROUND_TIMER_PERCENTAGE]: number;
  [LobbyStateEnum.COUNTDOWN_START_TIME]: number;
  [LobbyStateEnum.ROUND]: RoundType;
  [LobbyStateEnum.COUNTDOWN_PREPARATION_START_TIME]: number;
  [LobbyStateEnum.COINS_TOTAL_PER_ROUND]: number;
  [LobbyStateEnum.COINS_SPENT_BY_ROUND]: Record<number, number>;
  [LobbyStateEnum.PHASE_START_TIME]: number;
  [LobbyStateEnum.PHASE_DURATION]: number;
  // Player readiness tracking
  [LobbyStateEnum.READY_PLAYERS]: Record<string, boolean>;
  // Leaderboard display state
  [LobbyStateEnum.SHOW_LEADERBOARD]?: boolean;
  [LobbyStateEnum.TEAM_NAME]: string;
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

export type MainScreenContent = 'storyline' | 'overworld' | 'cutscenes' | 'ending' | 'leaderboard';

export type GameContentState = {
  mainScreenContent: MainScreenContent;
  controllerContent: GameLobbyStatus;
  currentRound: number;
};

export type RoundBreakdown = {
  totalPoints: number;
  playerBreakdown: Record<string, PlayerBreakdown>; // e.g., "P1", "P2", "P3"
  roundPoints: number;
};

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
export interface DynamicCostRule {
  /** Prerequisites that must be active for this cost to apply */
  requiredActiveActions?: ActivityTypeEnum[];
  /** The cost when this rule matches */
  cost: number;
}

export interface DynamicCostConfig {
  /** Default cost (current system) */
  defaultCost: number;
  /** Rules for dynamic costs */
  dynamicRules?: DynamicCostRule[];
}

export interface ActionConfig {
  /** A unique identifier corresponding to an ActivityTypeEnum. */
  id: ActivityTypeEnum;

  /** The human-readable name for the UI. */
  displayName: string;

  /** The resource cost of action (e.g., number of coins). Can be static or dynamic. */
  cost: number | DynamicCostConfig;

  /** The minimum game round in which this action becomes available. */
  unlocksInRound: number;

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

  /** 
   * Actions that become unavailable when this action is built.
   * Used for cases like Build Path blocking seawall upgrades.
   */
  blocksActions?: ActivityTypeEnum[];

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