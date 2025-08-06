import { ActivityTypeEnum, CutScenesEnum, GameLobbyStatus, LobbyStateEnum, SplineEventName, UserSectorEnum } from "./enums";
import { LobbyStateType, ScenarioConfigurationType, SectorEnum, SectorsButtonConfigType, SplineTriggersConfigType } from "./types";
import { getRandomEffectValue } from "./utils";

export const ROOM_NAME = "rooms-v2";
export const GAME_ROUND_TIMER = 30;
export const GAME_STARST_IN_COUNTDOWN = 15;
export const DELAY_IN_SECONDS_BEFORE_GAME_STARST_IN_COUNTDOWN = 3;

export const userIdToSector: Record<string, number> = {
  user_sector_1: 1,
  user_sector_2: 2,
  user_sector_3: 3,
};

export const SplineTriggersConfig: SplineTriggersConfigType = {
  [ActivityTypeEnum.START_GAME]: {
    state: ['State', 'hidden'],
    events: [
      SplineEventName.MOUSEUP,
    ],
    buttonValue: "",
    activityType: ActivityTypeEnum.START_GAME,
    subTriggers: [ActivityTypeEnum.DISPLAY_INSTRUCTION]
  },
  [ActivityTypeEnum.DISPLAY_INSTRUCTION]: {
    state: ['State'],
    events: [
      SplineEventName.STATE_CHANGE,
    ],
    activityType: ActivityTypeEnum.START_GAME,
    // DONT MIND THIS ONE
    delay: 3000,
    lobbyState: LobbyStateEnum.IS_DONE_SHOWING_INSTRUCTIONS,
    lobbyStateValue: true,
  },
  // R1 1B / BUILD PLANT MANGROVES
  [ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD PLANT MANGROVES",
    activityType: ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES
  },
  // R1 1B / BUILD / 0.5 LAND RECLAMATION
  [ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 0.5M LAND RECLAMATION",
    activityType: ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION
  },
  // R1 1B / BUILD / 1.15 LAND RECLAMATION
  [ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 1.15M LAND RECLAMATION",
    activityType: ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION
  },
  // R1 1B / BUILD / 2 LAND RECLAMATION
  [ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 2M LAND RECLAMATION",
    activityType: ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION
  },
  // R1 1B / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 0.5M SEAWALL",
    activityType: ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL
  },
  // R1 1B / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 1.15M SEA WALL",
    activityType: ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL
  },
  // R1 1B / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 2M SEA WALL",
    activityType: ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL
  },
  // R1 1A / BUILD PLANT MANGROVES
  [ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD PLANT MANGROVES",
    activityType: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES
  },
  // R1 1A / BUILD / 0.5 LAND RECLAMATION
  [ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 0.5M LAND RECLAMATION",
    activityType: ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION
  },
  // R1 1A / BUILD / 1.15 LAND RECLAMATION
  [ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 1.15M LAND RECLAMATION",
    activityType: ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION
  },
  // R1 1A / BUILD / 2 Land Reclamation
  [ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 2M Land Reclamation",
    activityType: ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION
  },
  // R1 1A / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 0.5M SEAWALL",
    activityType: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL
  },
  // R1 1A / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 1.15M SEA WALL",
    activityType: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL
  },
  // R1 1A / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 2M SEA WALL",
    activityType: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL
  },
  // R1 2B / BUILD PLANT MANGROVES
  [ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD PLANT MANGROVES",
    activityType: ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES
  },
  // R1 2B / BUILD / 0.5 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 0.5M STORM SURGE BARRIER",
    activityType: ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER
  },
  // R1 2B / BUILD / 1.15 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 1.15M STORM SURGE BARRIER",
    activityType: ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER
  },
  // R1 2B / BUILD / 2 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 2M STORM SURGE BARRIER",
    activityType: ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER
  },
  // R1 2B / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 0.5M SEAWALL",
    activityType: ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL
  },
  // R1 2B / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 1.15M SEA WALL",
    activityType: ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL
  },
  // R1 2B / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 2M SEA WALL",
    activityType: ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL
  },
  // R1 2A / BUILD PLANT MANGROVES
  [ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD PLANT MANGROVES",
    activityType: ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES
  },
  // R1 2A / BUILD / 0.5 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 0.5M STORM SURGE BARRIER",
    activityType: ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER
  },
  // R1 2A / BUILD / 1.15 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 1.15M STORM SURGE BARRIER",
    activityType: ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER
  },
  // R1 2A / BUILD / 2 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 2M STORM SURGE BARRIER",
    activityType: ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER
  },
  // R1 2A / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 0.5M SEAWALL",
    activityType: ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL
  },
  // R1 2A / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 1.15M SEA WALL",
    activityType: ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL
  },
  // R1 2A / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 2M SEA WALL",
    activityType: ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL
  },
  // R1 3A / BUILD ARTIFICIAL REEF
  [ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3A / BUILD ARTIFICIAL REEF",
    activityType: ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF
  },
  // R1 3A / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3A / BUILD / 0.5M SEAWALL",
    activityType: ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL
  },
  // R1 3A / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3A / BUILD / 1.15M SEA WALL",
    activityType: ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL
  },
  // R1 3A / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3A / BUILD / 2M SEA WALL",
    activityType: ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL
  },
  [ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3A / BUILD / 0.5M Hybrid Measure",
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3A / BUILD / 1.15M Hybrid Measure",
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3A / BUILD / 2M Hybrid Measure",
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE
  },
  // R1 3B / BUILD ARTIFICIAL REEF
  [ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3B / BUILD ARTIFICIAL REEF",
    activityType: ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF
  },
  // R1 3B / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3B / BUILD / 0.5M SEAWALL",
    activityType: ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL
  },
  // R1 3B / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3B / BUILD / 1.15M SEA WALL",
    activityType: ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL
  },
  // R1 3B / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3B / BUILD / 2M SEA WALL",
    activityType: ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL
  },
  [ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3B / BUILD / 0.5M Hybrid Measure",
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3B / BUILD / 1.15M Hybrid Measure",
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3B / BUILD / 2M Hybrid Measure",
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE
  },
};

export const SectorsButtonConfig: SectorsButtonConfigType = {
  [UserSectorEnum.USER_SECTOR_ONE]: {
    [SectorEnum.SECTOR_A]: {
      mangroves: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES],
      ],
      reclamation: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION],
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION],
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION],
      ],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL],
      ],
    },
    [SectorEnum.SECTOR_B]: {
      mangroves: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES],
      ],
      reclamation: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION],
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION],
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION],
      ],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL],
      ],
    }
  },
  [UserSectorEnum.USER_SECTOR_TWO]: {
    [SectorEnum.SECTOR_A]: {
      mangroves: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES],
      ],
      stormsurgebarrier: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER],
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER],
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER],
      ],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL],
      ],
    },
    [SectorEnum.SECTOR_B]: {
      mangroves: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES],
      ],
      stormsurgebarrier: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER],
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER],
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER],
      ],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL],
      ],
    }
  },
  [UserSectorEnum.USER_SECTOR_THREE]: {
    [SectorEnum.SECTOR_A]: {
      artificialReef: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF],
      ],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL],// ...seawall buttons here if any
      ],
      hybrid: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE],
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE],
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE],
      ]
    },
    [SectorEnum.SECTOR_B]: {
      artificialReef: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF],
      ],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL],
      ],
      hybrid: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE],
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE],
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE],
      ]
    }
  }
};

export const lobbyStateDefaultValue = {
  roundTimer: GAME_ROUND_TIMER,
  waterLevel: 0,
  gameStartsInCountdown: GAME_STARST_IN_COUNTDOWN,
  gameLobbyStatus: GameLobbyStatus.INITIALIZING,
  isDoneShowingInstructions: false,
  randomizeEffect: getRandomEffectValue(),
  countdownStartTime: Date.now(),
  countdownPreparationStartTime: Date.now(),
  roundTimerPercentage: 1,
  round: 1
} as LobbyStateType

export const SPLINE_URL = "https://prod.spline.design/fIhV8lAzMkLzlKnk/scene.splinecode?v=1.2";
// export const SECTOR_ONE_CUT_SCENE = "https://prod.spline.design/xavPWWNp0hXnmIpL/scene.splinecode";

export const SPLINE_URL_CUT_SCENE_R1_1A_0 = "https://prod.spline.design/vdAXmxfy4PzSNkGr/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_1A_1 = "https://prod.spline.design/QOFv3QcfdZwkg6iM/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_1A_2 = "https://prod.spline.design/fOZXGf71pu-La96l/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_1A_3 = "https://prod.spline.design/uTr6wQjg3Ik-u0Xj/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_1B_0 = "https://prod.spline.design/i1psjka8wbkMGoVa/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_1B_1 = "https://prod.spline.design/sN5Mw6D3ApPIJMMj/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_1B_2 = "https://prod.spline.design/ZFsoKsL4UNgPCEft/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_1B_3 = "https://prod.spline.design/qmviwt1mmkl7oKJW/scene.splinecode";

export const SPLINE_URL_CUT_SCENE_R1_2A_0 = "https://prod.spline.design/miQpDiA5-2ReXoHn/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_2A_1 = "https://prod.spline.design/DFKcv2qgaiDwoTaZ/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_2A_2 = "https://prod.spline.design/MD7mbQW2OUMmCKfl/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_2B_0 = "https://prod.spline.design/sG-TVaU5p4Qh9Cr7/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_2B_1 = "https://prod.spline.design/cIJ1VUQnzv1SV7ab/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_2B_2 = "https://prod.spline.design/N0flQ-HCKwsWsPXn/scene.splinecode";

export const SPLINE_URL_CUT_SCENE_R1_3A_0 = "https://prod.spline.design/P1JAqsEer3nisijt/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_3A_1 = "https://prod.spline.design/f-KbFhxehX9Gk6uB/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_3A_2 = "https://prod.spline.design/7Gs4cFZ4ZK4tMLHe/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_3B_0 = "https://prod.spline.design/R4qXQ7AXoEv29yag/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_3B_1 = "https://prod.spline.design/GbN0AfPIuGbvqlQo/scene.splinecode";
export const SPLINE_URL_CUT_SCENE_R1_3B_2 = "https://prod.spline.design/uzyU-PW08SccKLTz/scene.splinecode";

export const splineCutScenesUrls: { [key in CutScenesEnum]: string } = {
  [CutScenesEnum.R1_1A_0]: SPLINE_URL_CUT_SCENE_R1_1A_0,
  [CutScenesEnum.R1_1A_1]: SPLINE_URL_CUT_SCENE_R1_1A_1,
  [CutScenesEnum.R1_1A_2]: SPLINE_URL_CUT_SCENE_R1_1A_2,
  [CutScenesEnum.R1_1A_3]: SPLINE_URL_CUT_SCENE_R1_1A_3,
  [CutScenesEnum.R1_1B_0]: SPLINE_URL_CUT_SCENE_R1_1B_0,
  [CutScenesEnum.R1_1B_1]: SPLINE_URL_CUT_SCENE_R1_1B_1,
  [CutScenesEnum.R1_1B_2]: SPLINE_URL_CUT_SCENE_R1_1B_2,
  [CutScenesEnum.R1_1B_3]: SPLINE_URL_CUT_SCENE_R1_1B_3,
  [CutScenesEnum.R1_2A_0]: SPLINE_URL_CUT_SCENE_R1_2A_0,
  [CutScenesEnum.R1_2A_1]: SPLINE_URL_CUT_SCENE_R1_2A_1,
  [CutScenesEnum.R1_2A_2]: SPLINE_URL_CUT_SCENE_R1_2A_2,
  [CutScenesEnum.R1_2B_0]: SPLINE_URL_CUT_SCENE_R1_2B_0,
  [CutScenesEnum.R1_2B_1]: SPLINE_URL_CUT_SCENE_R1_2B_1,
  [CutScenesEnum.R1_2B_2]: SPLINE_URL_CUT_SCENE_R1_2B_2,
  [CutScenesEnum.R1_3A_0]: SPLINE_URL_CUT_SCENE_R1_3A_0,
  [CutScenesEnum.R1_3A_1]: SPLINE_URL_CUT_SCENE_R1_3A_1,
  [CutScenesEnum.R1_3A_2]: SPLINE_URL_CUT_SCENE_R1_3A_2,
  [CutScenesEnum.R1_3B_0]: SPLINE_URL_CUT_SCENE_R1_3B_0,
  [CutScenesEnum.R1_3B_1]: SPLINE_URL_CUT_SCENE_R1_3B_1,
  [CutScenesEnum.R1_3B_2]: SPLINE_URL_CUT_SCENE_R1_3B_2,
}

// export const SECTOR_ONE_CUT_SCENE = "https://prod.spline.design/Df0lzW5I4mQVEEL8/scene.splinecode";
// export const SECTOR_TWO_CUT_SCENE = "https://prod.spline.design/jyRKRnzG5WXmKNnN/scene.splinecode";
// export const SECTOR_THREE_CUT_SCENE = "https://prod.spline.design/pcdKvsuBWMwg4q85/scene.splinecode";



export enum FlashReportDataEnum {
  R1_1A_0 = "R1 1a 0",
  R1_1A_1 = "R1 1a 1",
  R1_1A_2 = "R1 1a 2",
  R1_1A_3 = "R1 1a 3",
  R1_1B_0 = "R1 1b 0",
  R1_1B_1 = "R1 1b 1",
  R1_1B_2 = "R1 1b 2",
  R1_1B_3 = "R1 1b 3",
  R1_2A_0 = "R1 2a 0",
  R1_2A_1 = "R1 2a 1",
  R1_2A_2 = "R1 2a 2",
  R1_2A_3 = "R1 2a 3",
  R1_2B_0 = "R1 2b 0",
  R1_2B_1 = "R1 2b 1",
  R1_2B_2 = "R1 2b 2",
  R1_2B_3 = "R1 2b 3",
  R1_3A_0 = "R1 3a 0",
  R1_3A_1 = "R1 3a 1",
  R1_3A_2 = "R1 3a 2",
  R1_3A_3 = "R1 3a 3",
  R1_3B_0 = "R1 3b 0",
  R1_3B_1 = "R1 3b 1",
  R1_3B_2 = "R1 3b 2",
  R1_3B_3 = "R1 3b 3",
}

export enum FlashReportDataKeyEnum {
  ZERO_POINT_THREE = 0.3,
  ZERO_POINT_SEVEN = 0.7,
  ONE = 1,
}

export enum RandomizeEffectsEnum {
  ZERO_POINT_FIVE = 0.5,
  ONE = 1,
  TWO = 2
}

export type GameResultFlashType = {
  report: string;
  score: number;
  randomizeEffect: number;
  meanSeaLevel: number;
};


// format {meanSeaLevel_randomizeEffect_activities}
export type FlashReportDataMappingType = {
  [key in FlashReportDataKeyEnum]?: {
    [key in RandomizeEffectsEnum]?: {
      [key in ActivityTypeEnum]?: {
        [key in UserSectorEnum]?: FlashReportDataEnum[] | null
      } | null
    } | null
  } | null
};

export const flashReportData = {
  [FlashReportDataEnum.R1_1A_0]: {
    report: "Changi flooded! Flights cancelled causing huge disruption to Singapore as an aviation hub",
    score: -30,
    randomizeEffect: 1,
    meanSeaLevel: 0.3
  } as GameResultFlashType,
  [FlashReportDataEnum.R1_1A_1]: {
    report: "Changi flooded! Flights cancelled causing huge disruption to Singapore as an aviation hub ",
    score: -20,
    randomizeEffect: 0.5,
    meanSeaLevel: 0.3
  } as GameResultFlashType,
  [FlashReportDataEnum.R1_1A_2]: {
    report: "Changi flooded! Flights cancelled causing huge disruption to Singapore as an aviation hub ",
    score: -60,
    randomizeEffect: 2,
    meanSeaLevel: 0.3
  } as GameResultFlashType,
};




export const CUTSCENE_SECTOR_ONE_0_1A = [
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ONE
  }`,
  `${FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ZERO_POINT_FIVE
  }`,
  `${FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.TWO
  }`
];

export const CUTSCENE_SECTOR_ONE_1_1A = [
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ONE}_${
    ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES
  }`,
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ZERO_POINT_FIVE}_${
    ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES
  }`,
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.TWO}_${
    ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES
  }`,
];

export const CUTSCENE_SECTOR_ONE_1_2A = [
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ONE}_${
    ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION
  }`,
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ONE}_${
    ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION
  }`,
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ONE}_${
    ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION
  }`,

  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ZERO_POINT_FIVE}_${
    ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION
  }`,
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ZERO_POINT_FIVE}_${
    ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION
  }`,
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.ZERO_POINT_FIVE}_${
    ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION
  }`,


  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.TWO}_${
    ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION
  }`,
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.TWO}_${
    ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION
  }`,
  `${
    FlashReportDataKeyEnum.ZERO_POINT_THREE}_${
    RandomizeEffectsEnum.TWO}_${
    ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION
  }`,
];

export const flashReportDataMapping = {
  // ROUND 1
  [FlashReportDataKeyEnum.ZERO_POINT_THREE]: {
    [RandomizeEffectsEnum.ONE]: {
      [UserSectorEnum.USER_SECTOR_ONE]: [FlashReportDataEnum.R1_1A_0, FlashReportDataEnum.R1_1B_0],
      [UserSectorEnum.USER_SECTOR_TWO]: [FlashReportDataEnum.R1_2A_0, FlashReportDataEnum.R1_2B_0],
      [UserSectorEnum.USER_SECTOR_THREE]: [FlashReportDataEnum.R1_3A_0, FlashReportDataEnum.R1_3B_0],
    },
    [RandomizeEffectsEnum.ZERO_POINT_FIVE]: {
      [UserSectorEnum.USER_SECTOR_ONE]: [FlashReportDataEnum.R1_1A_1, FlashReportDataEnum.R1_1A_1],
      [UserSectorEnum.USER_SECTOR_TWO]: [FlashReportDataEnum.R1_2A_1, FlashReportDataEnum.R1_2A_1],
      [UserSectorEnum.USER_SECTOR_THREE]: [FlashReportDataEnum.R1_3A_1, FlashReportDataEnum.R1_3A_1],
    },
    [RandomizeEffectsEnum.TWO]: {
      [UserSectorEnum.USER_SECTOR_ONE]: FlashReportDataEnum.R1_1A_2,
      [UserSectorEnum.USER_SECTOR_TWO]: FlashReportDataEnum.R1_2A_2,
      [UserSectorEnum.USER_SECTOR_THREE]: FlashReportDataEnum.R1_3A_2,
    }
  },
  // ROUND 2
  [FlashReportDataKeyEnum.ZERO_POINT_SEVEN]: null,
  [FlashReportDataKeyEnum.ONE]: null
};

export const subSectors = [
  { sector: 1, subSector: "1A", activities: [
    "None",
    ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
    ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL,
  ]},
  { sector: 1, subSector: "1B", activities: [
    "None",
    ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES,
    ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL,
  ]},
  { sector: 2, subSector: "2A", activities: [
    "None",
    ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES,
    ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL,
  ]},
  { sector: 2, subSector: "2B", activities: [
    "None",
    ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES,
    ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL,
  ]},
  { sector: 3, subSector: "3A", activities: [
    "None",
    ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF,
    ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL,
    ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE,
    ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE,
    ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE,
  ]},
  { sector: 3, subSector: "3B", activities: [
    "None",
    ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF,
    ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL,

    ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE,
    ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE,
    ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE,
  ]},
];




export const roundOneScenarioConfiguration: ScenarioConfigurationType = {
  // None
  "1_1A_None-0.3-1": { score: -30, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  "1_1A_None-0.3-0.5": { score: -20, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  "1_1A_None-0.3-2": { score: -60, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  // Mangrove
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: -30, coin: 1, cutscene: CutScenesEnum.R1_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: -20, coin: 1, cutscene: CutScenesEnum.R1_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: -60, coin: 1, cutscene: CutScenesEnum.R1_1A_1 },
  // Land Reclamation 0.5
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-2`]: { score: -10, coin: 3, cutscene: CutScenesEnum.R1_1A_2 },
  // Land Reclamation 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.3-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1A_2 },
  // Land Reclamation 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.3-2`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_1A_2 },
  // Seawall 0.5
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  // Seawall 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  // Seawall 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },

  // --- SECTOR 1B (Player 1) ---
  "1_1B_None-0.3-1": { score: -30, coin: 0, cutscene: CutScenesEnum.R1_1B_0 },
  "1_1B_None-0.3-0.5": { score: -20, coin: 0, cutscene: CutScenesEnum.R1_1B_0 },
  "1_1B_None-0.3-2": { score: -60, coin: 0, cutscene: CutScenesEnum.R1_1B_0 },
  // Mangrove
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: -30, coin: 1, cutscene: CutScenesEnum.R1_1B_0 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: -20, coin: 1, cutscene: CutScenesEnum.R1_1B_0 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: -60, coin: 1, cutscene: CutScenesEnum.R1_1B_0 },
  // Land Reclamation 0.5
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-2`]: { score: -10, coin: 3, cutscene: CutScenesEnum.R1_1B_2 },
  // Land Reclamation 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-1`]: { score: -0, coin: 4, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-0.5`]: { score: -0, coin: 4, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-2`]: { score: -0, coin: 4, cutscene: CutScenesEnum.R1_1B_2 },
  // Land Reclamation 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 5,  cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 5,  cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-2`]: { score: 0, coin: 5,  cutscene: CutScenesEnum.R1_1B_2 },
  // Seawall 0.5
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },
  // Seawall 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_3 },
  // Seawall 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },

  // --- SECTOR 2A (Player 2) ---
  "2_2A_None-0.3-1": { score: -30, coin: 0, cutscene: CutScenesEnum.R1_2A_0 },
  "2_2A_None-0.3-0.5": { score: -20, coin: 0, cutscene: CutScenesEnum.R1_2A_0 },
  "2_2A_None-0.3-2": { score: -60, coin: 0, cutscene: CutScenesEnum.R1_2A_0 },
  // Storm Surge Barrier 0.5
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: { score: -20, coin: 3, cutscene: CutScenesEnum.R1_2A_1 },
  // Storm Surge Barrier 2
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.3-2`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2A_1 },
  // Seawall 0.5
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_2A_2 },
  // Seawall 1.15
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2A_2 },
  // Seawall 2
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_2 },

  // --- SECTOR 2B (Player 2) ---
  "2_2B_None-0.3-1": { score: -30, coin: 0, cutscene: CutScenesEnum.R1_2B_0 },
  "2_2B_None-0.3-0.5": { score: -20, coin: 0, cutscene: CutScenesEnum.R1_2B_0 },
  "2_2B_None-0.3-2": { score: -60, coin: 0, cutscene: CutScenesEnum.R1_2B_0 },
  // Storm Surge Barrier 0.5
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: { score: -20, coin: 3, cutscene: CutScenesEnum.R1_2B_1 },
  // Storm Surge Barrier 2
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.3-2`]: { score: -20, coin: 5, cutscene: CutScenesEnum.R1_2B_1 },
  // Seawall 0.5
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_2B_2 },
  // Seawall 1.15
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2B_2 },
  // Seawall 2
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_2 },

  // --- SECTOR 3A (Player 3) ---
  "3_3A_None-0.3-1": { score: -30, coin: 0, cutscene: CutScenesEnum.R1_3A_0 },
  "3_3A_None-0.3-0.5": { score: -20, coin: 0, cutscene: CutScenesEnum.R1_3A_0 },
  "3_3A_None-0.3-2": { score: -60, coin: 0, cutscene: CutScenesEnum.R1_3A_0 },
  // Artificial Reef
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-1`]: { score: -20, coin: 1, cutscene: CutScenesEnum.R1_3A_1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_3A_1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-2`]: { score: -50, coin: 1, cutscene: CutScenesEnum.R1_3A_1 },

  // Hybrid Measure 0.5
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
  // Hybrid Measure 1.15
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 2 },
  // Hybrid Measure 2
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 3 },

    // Seawall 0.5
    [`3_3B_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3B_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3B_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
    // Seawall 1.15
    [`3_3B_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3B_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3B_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_2 },
    // Seawall 2
    [`3_3B_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3B_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_2 },
    [`3_3B_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_2 },

  // --- SECTOR 3B (Player 3) ---
  "3_3B_None-0.3-1": { score: -30, coin: 0, cutscene: CutScenesEnum.R1_3B_0 },
  "3_3B_None-0.3-0.5": { score: -20, coin: 0, cutscene: CutScenesEnum.R1_3B_0 },
  "3_3B_None-0.3-2": { score: -60, coin: 0, cutscene: CutScenesEnum.R1_3B_0 },
  // Artificial Reef
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-1`]: { score: -20, coin: 1, cutscene: CutScenesEnum.R1_3B_1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_3B_1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-2`]: { score: -50, coin: 1, cutscene: CutScenesEnum.R1_3B_1 },
  // Hybrid Measure 0.5
  [`3_3A_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3A_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3A_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.3-2`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  // Hybrid Measure 1.15
  [`3_3A_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 2 },
  // Hybrid Measure 2
  [`3_3A_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 3 },
  [`3_3A_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 3 },
  [`3_3A_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 3 },

  // Seawall 0.5
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  // Seawall 1.15
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_2 },
  // Seawall 2
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_2 },
};

export const roundTwoAndThreeScenarioConfiguration: ScenarioConfigurationType = {
  "1_1A_None-0.7-1": { score: -70, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  "1_1A_None-0.7-2": { score: -150, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },

  // Seawall 0.5 No uprades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: -20, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: -100, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },

  // Seawall 0.5 -> 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: -25, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },

  // Seawall 0.5 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },

  // Seawall 2 > Build bike path and new park along the seawall
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R2_1B_BUILD_PROMENADE_ALONG_THE_SEAWALL}-0.7-1`]: { score: -30, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R2_1B_BUILD_PROMENADE_ALONG_THE_SEAWALL}-0.7-2`]: { score: -100, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },

  // Seawall 1.15 No uprades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  // [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-0.7-0.5`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: -25, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },

  // Seawall 1.15 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R2_1B_BUILD_PROMENADE_ALONG_THE_SEAWALL}-0.7-1`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R2_1B_BUILD_PROMENADE_ALONG_THE_SEAWALL}-0.7-2`]: { score: -35, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },

  // Seawall 2 No uprades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R2_1B_BUILD_PROMENADE_ALONG_THE_SEAWALL}-0.7-1`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R2_1B_BUILD_PROMENADE_ALONG_THE_SEAWALL}-0.7-2`]: { score: -10, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },

  // Seawall 2 No uprades land reclamations
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-0.7-1`]: { score: -20, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-0.7-2`]: { score: -100, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-0.7-2`]: { score: -25, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },

  // Land and build seawall
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: -70, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: -140, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R2_1A_BUILD_MANGROVE_BOARD_WALK}-0.7-1`]: { score: -70, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R2_1A_BUILD_MANGROVE_BOARD_WALK}-0.7-2`]: { score: -140, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },  


  // SECTOR 1B
  "1_1B_None-0.7-1": { score: -70, cutscene: CutScenesEnum.R1_1B_0, coin: 0 },
  "1_1B_None-0.7-2": { score: -150, cutscene: CutScenesEnum.R1_1B_0, coin: 0 },

  // Seawall 0.5 No uprades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: -20, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: -100, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },

  // Seawall 0.5 -> 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: -5, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: -30, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },

  // Seawall 0.5 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-1`]: { score: -5, coin: 2, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-2`]: { score: -5, coin: 2, cutscene: CutScenesEnum.R1_1B_3 },

  // Seawall 2 -> Build bike path and new park along the seawall
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R2_1B_BUILD_BIKE_PATH_ALONG_THE_SEAWALL}-0.7-1`]: { score: -30, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R2_1B_BUILD_BIKE_PATH_ALONG_THE_SEAWALL}-0.7-2`]: { score: -100, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },

  // Seawall 1.15 No uprades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: -10, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: -25, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },

  // Seawall 1.15 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-1`]: { score: -5, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-2`]: { score: -5, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },
  
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R2_1B_BUILD_BIKE_PATH_ALONG_THE_SEAWALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R2_1B_BUILD_BIKE_PATH_ALONG_THE_SEAWALL}-0.7-2`]: { score: -35, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },

  // Seawall 2 No uprades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: -10, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: -10, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R2_1B_BUILD_BIKE_PATH_ALONG_THE_SEAWALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R2_1B_BUILD_BIKE_PATH_ALONG_THE_SEAWALL}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1B_3 },

  // Seawall 2 No uprades land reclamations
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-0.7-1`]: { score: -20, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-0.7-2`]: { score: -100, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-0.7-2`]: { score: -25, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },

  // Land and build seawall
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_1_15_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R2_1A_BUILD_2_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: -70, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: -140, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R2_1A_BUILD_MANGROVE_BOARD_WALK}-0.7-1`]: { score: -70, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R2_1A_BUILD_MANGROVE_BOARD_WALK}-0.7-2`]: { score: -140, coin: 0, cutscene: CutScenesEnum.R1_1B_3 },


  "2_2A_None-0.7-1": { score: -70, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  "2_2A_None-0.7-2": { score: -150, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },

  [`1_1A_None-${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.7-1`]: { score: -70, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: -150, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },

  [`1_1A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-1`]: { score: -20, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-2`]: { score: -100, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },

  [`1_1A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.7-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.7-2`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_1A_3 },

  [`1_1A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.7-1`]: { score: -20, coin: 5, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.7-2`]: { score: -100, coin: 5, cutscene: CutScenesEnum.R1_1A_3 },

  [`1_1A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: -35, coin: 5, cutscene: CutScenesEnum.R1_1A_3 },

};

export const sceneSectorConfigurations: ScenarioConfigurationType = {
  ...roundOneScenarioConfiguration,
  ...roundTwoAndThreeScenarioConfiguration
}
