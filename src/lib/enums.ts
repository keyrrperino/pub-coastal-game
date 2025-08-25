export enum SplineEventName {
  MOUSEDOWN = 'mouseDown',
  MOUSEUP = 'mouseUp',
  MOUSEHOVER = 'mouseHover',
  KEYDOWN = 'keyDown',
  KEYUP = 'keyUp',
  START = 'start',
  LOOKAT = 'lookAt',
  FOLLOW = 'follow',
  SCROLL = 'scroll',
  COLLISION = 'collision',
  RENDERED = 'rendered',
  STATE_CHANGE = 'State Change'
}


export enum CutScenesEnum {
  NEWS_INTRO_1 = "news intro 1",
  NEWS_INTRO_2 = "news intro 2",
  NEWS_INTRO_3 = "news intro 3",

  R1_1A_0 = "R1-1A-0",
  R1_1A_1 = "R1-1A-1",
  R1_1A_2 = "R1-1A-2",
  R1_1A_3 = "R1-1A-3",
  R1_1A_4 = "R1-1A-4",
  R1_1A_5 = "R1-1A-5",

  R1_1B_0 = "R1-1B-0",
  R1_1B_1 = "R1-1B-1",
  R1_1B_2 = "R1-1B-2",
  R1_1B_3 = "R1-1B-3",
  R1_1B_4 = "R1-1B-4",
  R1_1B_5 = "R1-1B-5",

  R1_2A_0 = "R1-2A-0",
  R1_2A_1 = "R1-2A-1",
  R1_2A_2 = "R1-2A-2",
  R1_2A_3 = "R1-2A-3",
  R1_2A_4 = "R1-2A-4",
  R1_2A_5 = "R1-2A-5",

  R1_2B_0 = "R1-2B-0",
  R1_2B_1 = "R1-2B-1",
  R1_2B_2 = "R1-2B-2",
  R1_2B_3 = "R1-2B-3",
  R1_2B_4 = "R1-2B-4",
  R1_2B_5 = "R1-2B-5",


  R1_3A_0 = "R1-3A-0",
  R1_3A_1 = "R1-3A-1",
  R1_3A_2 = "R1-3A-2",
  R1_3A_3 = "R1-3A-3",
  R1_3A_4 = "R1-3A-4",

  R1_3B_0 = "R1-3B-0",
  R1_3B_1 = "R1-3B-1",
  R1_3B_2 = "R1-3B-2",
  R1_3B_3 = "R1-3B-3",
  R1_3B_4 = "R1-3B-4",

  R2_1A_0 = "R2-1A-0",
  R2_1A_1 = "R2-1A-1",
  R2_1A_2 = "R2-1A-2",
  R2_1A_3 = "R2-1A-3",
  R2_1A_4 = "R2-1A-4",
  R2_1A_5 = "R2-1A-5",
  R2_1A_6 = "R2-1A-6",
  R2_1A_7 = "R2-1A-7",
  R2_1A_8 = "R2-1A-8",
  R2_1A_9 = "R2-1A-9",
  R2_1A_10 = "R2-1A-10",
  R2_1A_11 = "R2-1A-11",
  R2_1A_12 = "R2-1A-12",
  R2_1A_13 = "R2-1A-13",
  R2_1A_14 = "R2-1A-14",
  R2_1A_15 = "R2-1A-15",
  R2_1A_16 = "R2-1A-16",
  R2_1A_17 = "R2-1A-17",

  R2_1B_0 = "R2-1B-0",
  R2_1B_1 = "R2-1B-1",
  R2_1B_2 = "R2-1B-2",
  R2_1B_3 = "R2-1B-3",
  R2_1B_4 = "R2-1B-4",
  R2_1B_5 = "R2-1B-5",
  R2_1B_6 = "R2-1B-6",
  R2_1B_7 = "R2-1B-7",
  R2_1B_8 = "R2-1B-8",
  R2_1B_9 = "R2-1B-9",
  R2_1B_10 = "R2-1B-10",
  R2_1B_11 = "R2-1B-11",
  R2_1B_12 = "R2-1B-12",
  R2_1B_13 = "R2-1B-13",
  R2_1B_14 = "R2-1B-14",

  R2_2A_0 = "R2-2A-0",
  R2_2A_1 = "R2-2A-1",
  R2_2A_2 = "R2-2A-2",
  R2_2A_3 = "R2-2A-3",
  R2_2A_4 = "R2-2A-4",
  R2_2A_5 = "R2-2A-5",
  R2_2A_6 = "R2-2A-6",
  R2_2A_7 = "R2-2A-7",
  R2_2A_8 = "R2-2A-8",
  R2_2A_9 = "R2-2A-9",
  R2_2A_10 = "R2-2A-10",

  R2_2B_0 = "R2-2B-0",
  R2_2B_1 = "R2-2B-1",
  R2_2B_2 = "R2-2B-2",
  R2_2B_3 = "R2-2B-3",
  R2_2B_4 = "R2-2B-4",
  R2_2B_5 = "R2-2B-5",
  R2_2B_6 = "R2-2B-6",
  R2_2B_7 = "R2-2B-7",
  R2_2B_8 = "R2-2B-8",
  R2_2B_9 = "R2-2B-9",

  R2_3A_0 = "R2-3A-0",
  R2_3A_1 = "R2-3A-1",
  R2_3A_2 = "R2-3A-2",
  R2_3A_3 = "R2-3A-3",
  R2_3A_4 = "R2-3A-4",
  R2_3A_5 = "R2-3A-5",
  R2_3A_6 = "R2-3A-6",
  R2_3A_7 = "R2-3A-7",
  R2_3A_8 = "R2-3A-8",
  R2_3A_9 = "R2-3A-9",
  R2_3A_10 = "R2-3A-10",
  R2_3A_11 = "R2-3A-11",
  R2_3A_12 = "R2-3A-12",
  R2_3A_13 = "R2-3A-13",
  R2_3A_14 = "R2-3A-14",
  R2_3A_15 = "R2-3A-15",

  R2_3B_0 = "R2-3B-0",
  R2_3B_1 = "R2-3B-1",
  R2_3B_2 = "R2-3B-2",
  R2_3B_3 = "R2-3B-3",
  R2_3B_4 = "R2-3B-4",
  R2_3B_5 = "R2-3B-5",
  R2_3B_6 = "R2-3B-6",
  R2_3B_7 = "R2-3B-7",
  R2_3B_8 = "R2-3B-8",
  R2_3B_9 = "R2-3B-9",
  R2_3B_10 = "R2-3B-10",
  R2_3B_11 = "R2-3B-11",
  R2_3B_12 = "R2-3B-12",
};

export enum SubSectorEnum {
  "ONE_A" = "1A",
  "ONE_B" = "1B",
  "TWO_A" = "2A",
  "TWO_B" = "2B",
  "THREE_A" = "3A",
  "THREE_B" = "3B",
} 

export enum ActivityTypeEnum {
  START_GAME = "play btn",

  DISPLAY_INSTRUCTION = "countdown",

  CHANGE_SCENE = "change scene",

  // R1 1A / BUILD PLANT MANGROVES
  R1_1A_BUILD_PLANT_MANGROVES = "r1 1a mg",
  R1_1A_UPGRADE_MANGROVES_BOARDWALK = "r1 1a mg ug bw",

  // R1 1A / BUILD / 0.5 LAND RECLAMATION
  R1_1A_BUILD_0_5_LAND_RECLAMATION = "r1 1a lr 0.5",

  // R1 1A / BUILD / 1.15 LAND RECLAMATION
  R1_1A_BUILD_1_15_LAND_RECLAMATION = "r1 1a lr 1.15",

  // R1 1A / BUILD / 2 Land Reclamation
  R1_1A_BUILD_2_LAND_RECLAMATION = "r1 1a lr 2",


  // R1 1A / BUILD / 0.5 SEAWALL
  R1_1A_BUILD_0_5_SEAWALL = "r1 1a sw 0.5",

  // R1 1A / BUILD / 1.15 SEA WALL
  R1_1A_BUILD_1_15_SEA_WALL = "r1 1a sw 1.15",

  // R1 1A / BUILD / 2 SEA WALL
  R1_1A_BUILD_2_SEA_WALL = "r1 1a sw 2",

  // R1 1A / UPGRADE / 1.15 Land Reclamation SEAWALL  
  R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL = "r1 1a lr ug sw 1.15",

  // R1 1A / BUILD / 2 Land Reclamation
  R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL = "r1 1a lr ug sw 2",

  // R1 1A / UPGRADE / 3 Land Reclamation SEAWALL
  R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL = "r1 1a lr ug sw 3",

  // R1 1A / UPGRADE Seawall (WALK) PATH
  R1_1A_UPGRADE_SEAWALL_WALK_PATH = "r1 1a sw ug wp",


  

  // R1 1B / BUILD PLANT MANGROVES
  R1_1B_BUILD_PLANT_MANGROVES = "r1 1b mg",

  // R1 1B / UPGRADE mangroves Boardwalk
  R1_1B_UPGRADE_MANGROVES_BOARDWALK = "r1 1b mg ug bw",

  // R1 1B / BUILD / 0.5 LAND RECLAMATION
  R1_1B_BUILD_0_5_LAND_RECLAMATION = "r1 1b lr 0.5",

  // R1 1B / BUILD / 1.15 LAND RECLAMATION
  R1_1B_BUILD_1_15_LAND_RECLAMATION = "r1 1b lr 1.15",

  // R1 1B / BUILD / 2 LAND RECLAMATION
  R1_1B_BUILD_2_LAND_RECLAMATION = "r1 1b lr 2",

  // R1 1B / UPGRADE LR TO SEAWALL
  R1_1B_UPGRADE_LR_TO_SEAWALL_1_15 = "r1 1b lr ug sw 1.15",

  R1_1B_UPGRADE_LR_TO_SEAWALL_2 = "r1 1b lr ug sw 2",

  // R1 1B / UPGRADE / 3 Land Reclamation SEAWALL
  R1_1B_UPGRADE_3_LAND_RECLAMATION_SEAWALL = "r1 1b lr ug sw 3",

  // R1 1B / BUILD / 0.5 SEAWALL
  R1_1B_BUILD_0_5_SEAWALL = "r1 1b sw 0.5",

  // R1 1B / BUILD / 1.15 SEA WALL
  R1_1B_BUILD_1_15_SEA_WALL = "r1 1b sw 1.15",

  // R1 1B / BUILD / 2 SEA WALL
  R1_1B_BUILD_2_SEA_WALL = "r1 1b sw 2",

  // R1 1B UPGRADE SEAWALL WALK PATH
  R1_1B_UPGRADE_SEAWALL_WALK_PATH = "r1 1b sw ug wp",



  // R1 2A / BUILD PLANT MANGROVES
  R1_2A_BUILD_PLANT_MANGROVES = "r1 2a mg",

  // R1 2A / Upgrade mangroves Boardwalk
  R1_2A_UPGRADE_MANGROVES_BOARDWALK = "r1 2a mg ug bw",

  // R1 2A / BUILD / 0.5 STORM SURGE BARRIER
  R1_2A_BUILD_0_5_STORM_SURGE_BARRIER = "r1 2a lr 0.5",

  // // R1 2A / BUILD / 1.15 STORM SURGE BARRIER
  // R1_2A_BUILD_1_15_STORM_SURGE_BARRIER = "r1 2a lr 1.15",

  // R1 2A / BUILD / 2 STORM SURGE BARRIER
  R1_2A_BUILD_2_STORM_SURGE_BARRIER = "r1 2a lr 2",

  // R1 2A / BUILD / 0.5 SEAWALL
  R1_2A_BUILD_0_5_SEAWALL = "r1 2a sw 0.5",

  // R1 2A / BUILD / 1.15 SEA WALL
  R1_2A_BUILD_1_15_SEA_WALL = "r1 2a sw 1.15",

  // R1 2A / BUILD / 2 SEA WALL
  R1_2A_BUILD_2_SEA_WALL = "r1 2a sw 2",

  // R1 2A / UPGRADE Seawall (WALK) PATH
  R1_2A_UPGRADE_SEAWALL_WALK_PATH = "r1 2a sw ug wp",




  // R1 2B / BUILD PLANT MANGROVES
  R1_2B_BUILD_PLANT_MANGROVES = "r1 2b mg",

  R1_2B_UPGRADE_MANGROVES_BOARDWALK = "r1 2b mg ug bw",

  // R1 2B / BUILD / 0.5 STORM SURGE BARRIER
  R1_2B_BUILD_0_5_STORM_SURGE_BARRIER = "r1 2b lr 0.5",

  // // R1 2B / BUILD / 1.15 STORM SURGE BARRIER
  // R1_2B_BUILD_1_15_STORM_SURGE_BARRIER = "r1 2b lr 1.15",

  // R1 2B / BUILD / 2 STORM SURGE BARRIER
  R1_2B_BUILD_2_STORM_SURGE_BARRIER = "r1 2b lr 2",

  // R1 2B / BUILD / 0.5 SEAWALL
  R1_2B_BUILD_0_5_SEAWALL = "r1 2b sw 0.5",

  // R1 2B / BUILD / 1.15 SEA WALL
  R1_2B_BUILD_1_15_SEA_WALL = "r1 2b sw 1.15",

  // R1 2B / BUILD / 2 SEA WALL
  R1_2B_BUILD_2_SEA_WALL = "r1 2b sw 2",

  // R1 2B / UPGRADE Seawall (WALK) PATH
  R1_2B_UPGRADE_SEAWALL_WALK_PATH = "r1 2b sw ug wp",



  // R1 3A / BUILD ARTIFICIAL REEF
  R1_3A_BUILD_ARTIFICIAL_REEF = "r1 3a mg",

  R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT = "r1 3a ar ug sr 1.15",
  R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT = "r1 3a ar ug sr 2",

  // R1 3A / BUILD / 0.5 SEAWALL
  R1_3A_BUILD_0_5_SEAWALL = "r1 3a sw 0.5",

  // R1 3A / BUILD / 1.15 SEA WALL
  R1_3A_BUILD_1_15_SEA_WALL = "r1 3a sw 1.15",

  // R1 3A / BUILD / 2 SEA WALL
  R1_3A_BUILD_2_SEA_WALL = "r1 3a sw 2",

  R1_3A_UPGRADE_SEAWALL_WALK_PATH = "r1 3a sw ug wp",

  R1_3A_BUILD_0_5_HYBRID_MEASURE = "r1 3a hb 0.5",

  R1_3A_BUILD_1_15_HYBRID_MEASURE = "r1 3a hb 1.15",

  R1_3A_BUILD_2_HYBRID_MEASURE = "r1 3a hb 2",

  R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH = "r1 3a hb ug wp",



  // R1 3B / BUILD ARTIFICIAL REEF
  R1_3B_BUILD_ARTIFICIAL_REEF = "r1 3b mg",

  // r1 3b ar ug sr 1.15
  R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT = "r1 3b ar ug sr 1.15",
  R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT = "r1 3b ar ug sr 2",

  // R1 3B / BUILD / 0.5 SEAWALL
  R1_3B_BUILD_0_5_SEAWALL = "r1 3b sw 0.5",

  // R1 3B / BUILD / 1.15 SEA WALL
  R1_3B_BUILD_1_15_SEA_WALL = "r1 3b sw 1.15",

  // R1 3B / BUILD / 2 SEA WALL
  R1_3B_BUILD_2_SEA_WALL = "r1 3b sw 2",

  R1_3B_UPGRADE_SEAWALL_WALK_PATH = "r1 3b sw ug wp",


  R1_3B_BUILD_0_5_HYBRID_MEASURE = "r1 3b hb 0.5",

  R1_3B_BUILD_1_15_HYBRID_MEASURE = "r1 3b hb 1.15",

  R1_3B_BUILD_2_HYBRID_MEASURE = "r1 3b hb 2",

  R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH = "r1 3b hb ug wp",
  
  DEMOLISH = "demolish",
}

export enum ActivityDemolishTypeSector1AEnum {
  LAND_RECLAMATION_1A = "1A land reclamation",
  SEAWALL_1A = "seawall 1A",
  MG_1A = "MG 1a",
  SW_UG_WP_1A = "sw ug wp 1A",
  LR_SW_1A = "lr sw 1a",
  BW_UG_1A = "1a bw ug",
}

export enum ActivityDemolishTypeSector1BEnum {
  MG_1B = "MG 1b",
  BW_UG_1B = "1b bw ug",
  LAND_RECLAMATION_1B = "1B land reclamation",
  SEAWALL_1B = "seawall 1B",
  SW_UG_WP_1B = "sw ug wp 1B",
  LR_SW_1B = "lr sw 1b",
}

export enum ActivityDemolishTypeSector2AEnum {
  SEAWALL_2A = "seawall 2A",
  MG_2A = "MG 2a",
  CPB_2A = "cpb 2A",
  SW_UG_WP_2A = "sw ug wp 2A",
  BW_UG_2A = "2a bw ug",
}

export enum ActivityDemolishTypeSector2BEnum {
  SEAWALL_2B = "seawall 2B",
  MG_2B = "MG 2b",
  CPB_2B = "cpb 2B",
  SW_UG_WP_2B = "sw ug wp 2B",
  BW_UG_2B = "2b bw ug",
}

export enum ActivityDemolishTypeSector3AEnum {
  HB_3A = "HB 3A",
  SEAWALL_3A = "seawall 3A",
  AR_3A = "AR-3A",
  SW_UG_WP_3A = "sw ug wp 3A",
  AR_UG_SR_3A = "ar ug sr 3a",
  HB_UG_WP_3A = "hb ug wp 3a",
  
}

export enum ActivityDemolishTypeSector3BEnum {
  HB_3B = "HB 3B",
  SEAWALL_3B = "seawall 3B",
  AR_3B = "AR-3B",
  SW_UG_WP_3B = "sw ug wp 3B",
  AR_UG_SR_3B = "ar ug sr 3b",
  HB_UG_WP_3B = "hb ug wp 3b",
}

export enum GameEnum {
  DEFAULT_ROOM_NAME = "default",
  DEFAULT_USERNAME = "master",
};

export enum UserSectorEnum {
  USER_SECTOR_ONE = "user_sector_1",
  USER_SECTOR_TWO = "user_sector_2",
  USER_SECTOR_THREE = "user_sector_3",
}

export enum LobbyStateEnum {
  GAME_STARTS_IN_COUNDOWN_KEY = "gameStartsInCountdown",
  WATER_LEVEL_KEY = "waterLevel",
  ROUND_TIMER = "roundTimer",
  GAME_LOBBY_STATUS = "gameLobbyStatus",
  IS_DONE_SHOWING_INSTRUCTIONS = "isDoneShowingInstructions",
  ROUND_TIMER_PERCENTAGE = "roundTimerPercentage",
  COUNTDOWN_START_TIME = "countdownStartTime",
  RANDOMIZE_EFFECT = "randomizeEffect",
  ROUND = "round",
  COUNTDOWN_PREPARATION_START_TIME = "countdownPreparationStartTime",
  COINS_TOTAL_PER_ROUND = "coinsTotalPerRound",
  COINS_SPENT_BY_ROUND = "coinsSpentByRound",
  PHASE_START_TIME = "phaseStartTime",
  PHASE_DURATION = "phaseDuration",
  // Player readiness tracking
  READY_PLAYERS = "readyPlayers",
  // Team name storage
  TEAM_NAME = "teamName",
  // Leaderboard display state
  SHOW_LEADERBOARD = "showLeaderboard"
}

export enum GameLobbyStatus {
  
  STARTED = "STARTED",
  ENDED = "ENDED",
  ROUND_ONE_GAME_ENDED = "ROUND_ONE_GAME_ENDED",
  // ROUND_TWO_GAME_ENDED = "ROUND_TWO_GAME_ENDED",
  // ROUND_THREE_THREE_GAME_ENDED = "ROUND_THREE_THREE_GAME_ENDED",
  
  // New game flow phases
  INITIALIZING = "INITIALIZING",
  PREPARING = "PREPARING",
  INTRODUCTION = "INTRODUCTION", // 30s
  ROUND_STORYLINE = "ROUND_STORYLINE",
  ROUND_GAMEPLAY = "ROUND_GAMEPLAY",
  ROUND_CUTSCENES = "ROUND_CUTSCENES",
  ROUND_SCORE_BREAKDOWN = "ROUND_SCORE_BREAKDOWN",
  ROUND_ANIMATION = "ROUND_ANIMATION",
  ENDING = "ENDING",
  TEAM_NAME_INPUT = "TEAM_NAME_INPUT",
  LEADERBOARD_DISPLAY = "LEADERBOARD_DISPLAY",
  RESTARTING = "RESTARTING",
}