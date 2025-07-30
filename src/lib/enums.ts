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
  R1_1A_0 = "R1-1A-0",
  R1_1A_1 = "R1-1A-1",
  R1_1A_2 = "R1-1A-2",
  R1_1A_3 = "R1-1A-3",
  R1_1B_0 = "R1-1B-0",
  R1_1B_1 = "R1-1B-1",
  R1_1B_2 = "R1-1B-2",
  R1_1B_3 = "R1-1B-3",

  R1_2A_0 = "R1-2A-0",
  R1_2A_1 = "R1-2A-1",
  R1_2A_2 = "R1-2A-2",
  R1_2B_0 = "R1-2B-0",
  R1_2B_1 = "R1-2B-1",
  R1_2B_2 = "R1-2B-2",

  R1_3A_0 = "R1-3A-0",
  R1_3A_1 = "R1-3A-1",
  R1_3A_2 = "R1-3A-2",
  R1_3B_0 = "R1-3B-0",
  R1_3B_1 = "R1-3B-1",
  R1_3B_2 = "R1-3B-2",
}


export enum ActivityTypeEnum {
  START_GAME = "play btn",

  DISPLAY_INSTRUCTION = "countdown",

  // R1 1B / BUILD PLANT MANGROVES
  R1_1B_BUILD_PLANT_MANGROVES = "r1 1a mg",

  // R1 1B / BUILD / 0.5 LAND RECLAMATION
  R1_1B_BUILD_0_5_LAND_RECLAMATION = "r1 1a lr 0.5",

  // R1 1B / BUILD / 1.15 LAND RECLAMATION
  R1_1B_BUILD_1_15_LAND_RECLAMATION = "r1 1a lr 1.15",

  // R1 1B / BUILD / 2 LAND RECLAMATION
  R1_1B_BUILD_2_LAND_RECLAMATION = "r1 1a lr 2",

  // R1 1B / BUILD / 0.5 SEAWALL
  R1_1B_BUILD_0_5_SEAWALL = "r1 1a sw 0.5",

  // R1 1B / BUILD / 1.15 SEA WALL
  R1_1B_BUILD_1_15_SEA_WALL = "r1 1a sw 1.15",

  // R1 1B / BUILD / 2 SEA WALL
  R1_1B_BUILD_2_SEA_WALL = "r1 1a sw 2",

  // R1 1A / BUILD PLANT MANGROVES
  R1_1A_BUILD_PLANT_MANGROVES = "r1 1b mg",

  // R1 1A / BUILD / 0.5 LAND RECLAMATION
  R1_1A_BUILD_0_5_LAND_RECLAMATION = "r1 1b lr 0.5",

  // R1 1A / BUILD / 1.15 LAND RECLAMATION
  R1_1A_BUILD_1_15_LAND_RECLAMATION = "r1 1b lr 1.15",

  // R1 1A / BUILD / 2 Land Reclamation
  R1_1A_BUILD_2_LAND_RECLAMATION = "r1 1b lr",

  // R1 1A / BUILD / 0.5 SEAWALL
  R1_1A_BUILD_0_5_SEAWALL = "r1 1b sw 0.5",

  // R1 1A / BUILD / 1.15 SEA WALL
  R1_1A_BUILD_1_15_SEA_WALL = "r1 1b sw 1.15",

  // R1 1A / BUILD / 2 SEA WALL
  R1_1A_BUILD_2_SEA_WALL = "r1 1b sw",

  // R1 2B / BUILD PLANT MANGROVES
  R1_2B_BUILD_PLANT_MANGROVES = "r1 2b mg",

  // R1 2B / BUILD / 0.5 STORM SURGE BARRIER
  R1_2B_BUILD_0_5_STORM_SURGE_BARRIER = "r1 2b lr 0.5",

  // R1 2B / BUILD / 1.15 STORM SURGE BARRIER
  R1_2B_BUILD_1_15_STORM_SURGE_BARRIER = "r1 2b lr 1.15",

  // R1 2B / BUILD / 2 STORM SURGE BARRIER
  R1_2B_BUILD_2_STORM_SURGE_BARRIER = "r1 2b lr",

  // R1 2B / BUILD / 0.5 SEAWALL
  R1_2B_BUILD_0_5_SEAWALL = "r1 2b sw 0.5",

  // R1 2B / BUILD / 1.15 SEA WALL
  R1_2B_BUILD_1_15_SEA_WALL = "r1 2b sw 1.15",

  // R1 2B / BUILD / 2 SEA WALL
  R1_2B_BUILD_2_SEA_WALL = "r1 2b sw",

  // R1 2A / BUILD PLANT MANGROVES
  R1_2A_BUILD_PLANT_MANGROVES = "r1 2a mg",

  // R1 2A / BUILD / 0.5 STORM SURGE BARRIER
  R1_2A_BUILD_0_5_STORM_SURGE_BARRIER = "r1 2a lr 0.5",

  // R1 2A / BUILD / 1.15 STORM SURGE BARRIER
  R1_2A_BUILD_1_15_STORM_SURGE_BARRIER = "r1 2a lr 1.15",

  // R1 2A / BUILD / 2 STORM SURGE BARRIER
  R1_2A_BUILD_2_STORM_SURGE_BARRIER = "r1 2a lr",

  // R1 2A / BUILD / 0.5 SEAWALL
  R1_2A_BUILD_0_5_SEAWALL = "r1 2a sw 0.5",

  // R1 2A / BUILD / 1.15 SEA WALL
  R1_2A_BUILD_1_15_SEA_WALL = "r1 2a sw 1.15",

  // R1 2A / BUILD / 2 SEA WALL
  R1_2A_BUILD_2_SEA_WALL = "r1 2a sw",

  // R1 3A / BUILD ARTIFICIAL REEF
  R1_3A_BUILD_ARTIFICIAL_REEF = "r1 3a mg",

  // R1 3A / BUILD / 0.5 SEAWALL
  R1_3A_BUILD_0_5_SEAWALL = "r1 3a sw 0.5",

  // R1 3A / BUILD / 1.15 SEA WALL
  R1_3A_BUILD_1_15_SEA_WALL = "r1 3a sw 1.15",

  // R1 3A / BUILD / 2 SEA WALL
  R1_3A_BUILD_2_SEA_WALL = "r1 3a sw",

  // R1 3B / BUILD ARTIFICIAL REEF
  R1_3B_BUILD_ARTIFICIAL_REEF = "r1 3b mg",

  // R1 3B / BUILD / 0.5 SEAWALL
  R1_3B_BUILD_0_5_SEAWALL = "r1 3b sw 0.5",

  // R1 3B / BUILD / 1.15 SEA WALL
  R1_3B_BUILD_1_15_SEA_WALL = "r1 3b sw 1.15",

  // R1 3B / BUILD / 2 SEA WALL
  R1_3B_BUILD_2_SEA_WALL = "r1 3b sw"
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
  RANDOMIZE_EFFECT = "randomizeEffect"
}

export enum GameLobbyStatus {
  INITIALIZING = "INITIALIZING",
  PREPAIRING = "PREPAIRING",
  STARTED = "STARTED",
  ENDED = "ENDED",
  ROUND_ONE_GAME_ENDED = "ROUND_ONE_GAME_ENDED",
  ROUND_TWO_GAME_ENDED = "ROUND_TWO_GAME_ENDED",
  ROUND_THREE_THREE_GAME_ENDED = "ROUND_THREE_THREE_GAME_ENDED"
}