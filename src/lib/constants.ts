import { ActivityDemolishTypeSector1AEnum, ActivityDemolishTypeSector1BEnum, ActivityDemolishTypeSector2AEnum, ActivityDemolishTypeSector2BEnum, ActivityDemolishTypeSector3AEnum, ActivityDemolishTypeSector3BEnum, ActivityTypeEnum, CutScenesEnum, GameLobbyStatus, LobbyStateEnum, SplineEventName, SubSectorEnum, UserSectorEnum } from "./enums";
import { LobbyStateType, ScenarioConfigurationType, SectorEnum, SectorsButtonConfigType, SplineTriggerConfigItem, SplineTriggersConfigType, SubSectorType, RoundType } from "./types";
import { getRandomEffectValue } from "./utils";

export const ROOM_NAME = "rooms-master";
export const GAME_ROUND_TIMER = 30;
export const GAME_STARST_IN_COUNTDOWN = 15;
export const DELAY_IN_SECONDS_BEFORE_GAME_STARST_IN_COUNTDOWN = 3;
export const OVERALL_SCORE_POINTS = 2500;
export const TOTAL_COINS_PER_ROUND = 10;
export const MODAL_CLOSE_COUNTDOWN_VALUE = 5;
export const CUT_SCENE_TIMER_MILLISECONDS = 5000; // 5 seconds

// export const ROOM_NAME = "rooms-v4";
// export const GAME_ROUND_TIMER = 1;
// export const GAME_STARST_IN_COUNTDOWN = 1;
// export const DELAY_IN_SECONDS_BEFORE_GAME_STARST_IN_COUNTDOWN = 1;
// export const OVERALL_SCORE_POINTS = 2500;
// export const TOTAL_COINS_PER_ROUND = 10;
// export const MODAL_CLOSE_COUNTDOWN_VALUE = 1;
// export const CUT_SCENE_TIMER_MILLISECONDS = 500;

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
  [ActivityTypeEnum.DEMOLISH]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "",
    activityType: ActivityTypeEnum.DEMOLISH,
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
  [ActivityTypeEnum.CHANGE_SCENE]: {
    state: [],
    events: [
      SplineEventName.MOUSEUP,
    ],
    activityType: ActivityTypeEnum.CHANGE_SCENE,
  },
  

  // R1 1A / BUILD PLANT MANGROVES
  [ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD PLANT MANGROVES",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES
  },
  [ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD PLANT MANGROVES",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK
  },
  // R1 1A / BUILD / 0.5 LAND RECLAMATION
  [ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 0.5M LAND RECLAMATION",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION
  },
  // R1 1A / BUILD / 1.15 LAND RECLAMATION
  [ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 1.15M LAND RECLAMATION",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION
  },
  // R1 1A / BUILD / 2 Land Reclamation
  [ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 2M Land Reclamation",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION
  },
  // R1 1A / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 0.5M SEAWALL",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL
  },
  // R1 1A / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 1.15M SEA WALL",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL
  },
  // R1 1A / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD / 2M SEA WALL",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL
  },

  // R1 1A / UPGRADE LAND RECLAMATION TO SEAWALL
  [ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / UPGRADE LR TO SEAWALL / 1.15M",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL
  },
  [ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / UPGRADE LR TO SEAWALL / 2M",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL
  },
  [ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / UPGRADE LR TO SEAWALL / 3M",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL
  },

  [ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1A / BUILD PATH",
    subSector: SubSectorEnum.ONE_A,
    activityType: ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH
  },


  // 1B
  // R1 1B / BUILD PLANT MANGROVES
  [ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD PLANT MANGROVES",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES
  },
  [ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD BOARDWALK",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK
  },

  // R1 1B / BUILD / 0.5 LAND RECLAMATION
  [ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 0.5M LAND RECLAMATION",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION
  },
  // R1 1B / BUILD / 1.15 LAND RECLAMATION
  [ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 1.15M LAND RECLAMATION",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION
  },
  // R1 1B / BUILD / 2 LAND RECLAMATION
  [ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 2M LAND RECLAMATION",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION
  },
  // R1 1B / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 0.5M SEAWALL",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL
  },
  // R1 1B / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 1.15M SEA WALL",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL
  },
  // R1 1B / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD / 2M SEA WALL",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL
  },
  
  // R1 1B / UPGRADE LAND RECLAMATION TO SEAWALL
  [ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / UPGRADE LR TO SEAWALL / 1.15M",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15
  },
  [ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / UPGRADE LR TO SEAWALL / 2M",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2
  },
  [ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 1B / BUILD PATH",
    subSector: SubSectorEnum.ONE_B,
    activityType: ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH
  },

  // 2A
  // R1 2A / BUILD PLANT MANGROVES
  [ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD PLANT MANGROVES",
    subSector: SubSectorEnum.TWO_A,
    activityType: ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES
  },
  [ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / UPGRADE MANGROVES BOARDWALK",
    subSector: SubSectorEnum.TWO_A,
    activityType: ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK
  },
  // R1 2A / BUILD / 0.5 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 0.5M COASTAL PROTECTION BARRIER",
    subSector: SubSectorEnum.TWO_A,
    activityType: ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER
  },
  // // R1 2A / BUILD / 1.15 STORM SURGE BARRIER
  // [ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER]: {
  //   state: [],
  //   events: [SplineEventName.MOUSEUP],
  //   buttonValue: "R1 2A / BUILD / 1.15M STORM SURGE BARRIER",
  // subSector: SubSectorEnum.TWO_A,
  //   activityType: ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER
  // },
  // R1 2A / BUILD / 2 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 2M COASTAL PROTECTION BARRIER",
    subSector: SubSectorEnum.TWO_A,
    activityType: ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER
  },
  // R1 2A / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 0.5M SEAWALL",
    subSector: SubSectorEnum.TWO_A,
    activityType: ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL
  },
  // R1 2A / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 1.15M SEA WALL",
    subSector: SubSectorEnum.TWO_A,
    activityType: ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL
  },
  // R1 2A / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / BUILD / 2M SEA WALL",
    subSector: SubSectorEnum.TWO_A,
    activityType: ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL
  },
  [ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2A / UPGRADE SEAWALL (WALK) PATH",
    subSector: SubSectorEnum.TWO_A,
    activityType: ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH
  },


  // 2B
  // R1 2B / BUILD PLANT MANGROVES
  [ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD PLANT MANGROVES",
    subSector: SubSectorEnum.TWO_B,
    activityType: ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES
  },
  [ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / UPGRADE MANGROVES BOARDWALK",
    subSector: SubSectorEnum.TWO_B,
    activityType: ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK
  },
  // R1 2B / BUILD / 0.5 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 0.5M STORM SURGE BARRIER",
    subSector: SubSectorEnum.TWO_B,
    activityType: ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER
  },
  // // R1 2B / BUILD / 1.15 STORM SURGE BARRIER
  // [ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER]: {
  //   state: [],
  //   events: [SplineEventName.MOUSEUP],
  //   buttonValue: "R1 2B / BUILD / 1.15M STORM SURGE BARRIER",
  //   subSector: "2B",
  //   activityType: ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER
  // },
  // R1 2B / BUILD / 2 STORM SURGE BARRIER
  [ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 2M STORM SURGE BARRIER",
    subSector: SubSectorEnum.TWO_B,
    activityType: ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER
  },
  // R1 2B / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 0.5M SEAWALL",
    subSector: SubSectorEnum.TWO_B,
    activityType: ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL
  },
  // R1 2B / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 1.15M SEA WALL",
    subSector: SubSectorEnum.TWO_B,
    activityType: ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL
  },
  // R1 2B / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / BUILD / 2M SEA WALL",
    subSector: SubSectorEnum.TWO_B,
    activityType: ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL
  },
  [ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 2B / UPGRADE SEAWALL (WALK) PATH",
    subSector: SubSectorEnum.TWO_B,
    activityType: ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH
  },

  // 3A
  // R1 3A / BUILD ARTIFICIAL REEF
  [ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3A / BUILD ARTIFICIAL REEF",
    subSector: SubSectorEnum.THREE_A,
    activityType: ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF
  },
  // R1 3A / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3A / BUILD / 0.5M SEAWALL",
    subSector: SubSectorEnum.THREE_A,
    activityType: ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL
  },
  // R1 3A / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3A / BUILD / 1.15M SEA WALL",
    subSector: SubSectorEnum.THREE_A,
    activityType: ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL
  },
  // R1 3A / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3A / BUILD / 2M SEA WALL",
    subSector: SubSectorEnum.THREE_A,
    activityType: ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL
  },
  [ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3A / BUILD / 0.5M Hybrid Measure",
    subSector: SubSectorEnum.THREE_A,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3A / BUILD / 1.15M Hybrid Measure",
    subSector: SubSectorEnum.THREE_A,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3A / BUILD / 2M Hybrid Measure",
    subSector: SubSectorEnum.THREE_A,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT]: {
    state: [],
    buttonValue: "R1 3A / UPGRADE / 1.15 ARTIFICIAL REEF SLOPING REVETMENT",
    subSector: SubSectorEnum.THREE_A,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT
  },
  [ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT]: {
    state: [],
    buttonValue: "R1 3A / UPGRADE / 2 ARTIFICIAL REEF SLOPING REVETMENT",
    subSector: SubSectorEnum.THREE_A,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT
  },
  [ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH]: {
    state: [],
    buttonValue: "R1 3A / UPGRADE SEAWALL (WALK) PATH",
    subSector: SubSectorEnum.THREE_A,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH
  },
  [ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH]: {
    state: [],
    buttonValue: "R1 3A / UPGRADE HYBRID MEASURE (WALK) PATH",
    subSector: SubSectorEnum.THREE_A,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH
  },


  // 3B
  // R1 3B / BUILD ARTIFICIAL REEF
  [ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3B / BUILD ARTIFICIAL REEF",
    subSector: SubSectorEnum.THREE_B,
    activityType: ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF
  },
  // R1 3B / BUILD / 0.5 SEAWALL
  [ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3B / BUILD / 0.5M SEAWALL",
    subSector: SubSectorEnum.THREE_B,
    activityType: ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL
  },
  // R1 3B / BUILD / 1.15 SEA WALL
  [ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3B / BUILD / 1.15M SEA WALL",
    subSector: SubSectorEnum.THREE_B,
    activityType: ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL
  },
  // R1 3B / BUILD / 2 SEA WALL
  [ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL]: {
    state: [],
    events: [SplineEventName.MOUSEUP],
    buttonValue: "R1 3B / BUILD / 2M SEA WALL",
    subSector: SubSectorEnum.THREE_B,
    activityType: ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL
  },
  [ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3B / BUILD / 0.5M Hybrid Measure",
    subSector: SubSectorEnum.THREE_B,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3B / BUILD / 1.15M Hybrid Measure",
    subSector: SubSectorEnum.THREE_B,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE]: {
    state: [],
    buttonValue: "R1 3B / BUILD / 2M Hybrid Measure",
    subSector: SubSectorEnum.THREE_B,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE
  },
  [ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT]: {
    state: [],
    buttonValue: "R1 3B / UPGRADE / 1.15 ARTIFICIAL REEF SLOPING REVETMENT",
    subSector: SubSectorEnum.THREE_B,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT
  },
  [ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT]: {
    state: [],
    buttonValue: "R1 3B / UPGRADE / 2 ARTIFICIAL REEF SLOPING REVETMENT",
    subSector: SubSectorEnum.THREE_B,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT
  },
  [ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH]: {
    state: [],
    buttonValue: "R1 3B / UPGRADE SEAWALL (WALK) PATH",
    subSector: SubSectorEnum.THREE_B,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH
  },
  [ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH]: {
    state: [],
    buttonValue: "R1 3B / UPGRADE HYBRID MEASURE (WALK) PATH",
    subSector: SubSectorEnum.THREE_B,
    events: [SplineEventName.MOUSEUP],
    activityType: ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH
  },
  
};
export const SectorsButtonConfig: SectorsButtonConfigType = {
  [UserSectorEnum.USER_SECTOR_ONE]: {
    [SectorEnum.SECTOR_A]: {
      mangroves: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      reclamation: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION],
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION],
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      boardwalk: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      path: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH]
      ].filter(Boolean) as SplineTriggerConfigItem[],
    },
    [SectorEnum.SECTOR_B]: {
      mangroves: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      reclamation: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION],
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION],
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      boardwalk: [

      ].filter(Boolean) as SplineTriggerConfigItem[],
      path: [

      ].filter(Boolean) as SplineTriggerConfigItem[],
    }
  },
  [UserSectorEnum.USER_SECTOR_TWO]: {
    [SectorEnum.SECTOR_A]: {
      mangroves: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      stormsurgebarrier: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER],
        // SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER],
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL],
      ].filter(Boolean) as SplineTriggerConfigItem[],
    },
    [SectorEnum.SECTOR_B]: {
      mangroves: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      stormsurgebarrier: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER],
        // SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER],
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL],
      ].filter(Boolean) as SplineTriggerConfigItem[],
    }
  },
  [UserSectorEnum.USER_SECTOR_THREE]: {
    [SectorEnum.SECTOR_A]: {
      artificialReef: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL],// ...seawall buttons here if any
      ].filter(Boolean) as SplineTriggerConfigItem[],
      hybrid: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE],
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE],
        SplineTriggersConfig[ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE],
      ].filter(Boolean) as SplineTriggerConfigItem[],
    },
    [SectorEnum.SECTOR_B]: {
      artificialReef: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      seawall: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL],
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL],
      ].filter(Boolean) as SplineTriggerConfigItem[],
      hybrid: [
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE],
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE],
        SplineTriggersConfig[ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE],
      ].filter(Boolean) as SplineTriggerConfigItem[],
    }
  }
};

export const lobbyStateDefaultValue = {
  [LobbyStateEnum.ROUND_TIMER]: GAME_ROUND_TIMER,
  [LobbyStateEnum.WATER_LEVEL_KEY]: 0,
  [LobbyStateEnum.GAME_STARTS_IN_COUNDOWN_KEY]: GAME_STARST_IN_COUNTDOWN,
  [LobbyStateEnum.GAME_LOBBY_STATUS]: GameLobbyStatus.INITIALIZING,
  [LobbyStateEnum.IS_DONE_SHOWING_INSTRUCTIONS]: false,
  [LobbyStateEnum.RANDOMIZE_EFFECT]: {
    1: getRandomEffectValue(1),
    2: getRandomEffectValue(2),
    3: getRandomEffectValue(3),
  },
  [LobbyStateEnum.COUNTDOWN_START_TIME]: Date.now(),
  [LobbyStateEnum.COUNTDOWN_PREPARATION_START_TIME]: Date.now(),
  [LobbyStateEnum.ROUND_TIMER_PERCENTAGE]: 1,
  [LobbyStateEnum.ROUND]: 1 as RoundType,
  [LobbyStateEnum.COINS_TOTAL_PER_ROUND]: TOTAL_COINS_PER_ROUND,
  [LobbyStateEnum.COINS_SPENT_BY_ROUND]: {},
  [LobbyStateEnum.PHASE_START_TIME]: 0,
  [LobbyStateEnum.PHASE_DURATION]: 0,
  [LobbyStateEnum.READY_PLAYERS]: {}
} as LobbyStateType

export const SPLINE_URL = "https://prod.spline.design/fIhV8lAzMkLzlKnk/scene.splinecode?v=1.7";
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
  ONE_POINT_ONE_FIVE = 1.15,
}

export enum MeanSeaLevelRiseEnum {
  ZERO_POINT_THREE = 0.3,
  ZERO_POINT_SEVEN = 0.7,
  ONE_POINT_ONE_FIVE = 1.15,
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

export const meanSeaLevels = [MeanSeaLevelRiseEnum.ZERO_POINT_THREE, MeanSeaLevelRiseEnum.ZERO_POINT_SEVEN, MeanSeaLevelRiseEnum.ONE_POINT_ONE_FIVE]

export const flashReportData = {
  [FlashReportDataEnum.R1_1A_0]: {
    report: "Changi flooded! Flights cancelled causing huge disruption to Singapore as an aviation hub",
    score: 30,
    randomizeEffect: 1,
    meanSeaLevel: 0.3
  } as GameResultFlashType,
  [FlashReportDataEnum.R1_1A_1]: {
    report: "Changi flooded! Flights cancelled causing huge disruption to Singapore as an aviation hub ",
    score: 20,
    randomizeEffect: 0.5,
    meanSeaLevel: 0.3
  } as GameResultFlashType,
  [FlashReportDataEnum.R1_1A_2]: {
    report: "Changi flooded! Flights cancelled causing huge disruption to Singapore as an aviation hub ",
    score: 60,
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

export const subSectors = [
  { sector: 1, subSector: "1A", activities: [
    "None",
    ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES,
    ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK,

    ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL,

    ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL,
    ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL,
    ActivityTypeEnum.R1_1A_UPGRADE_3_LAND_RECLAMATION_SEAWALL,
    ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH,
  ]},
  { sector: 1, subSector: "1B", activities: [
    "None",
    ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES,
    ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK,

    ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION,
    ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL,

    ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15,
    ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2,
    ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH,
  ]},
  { sector: 2, subSector: "2A", activities: [
    "None",
    ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES,
    ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK,


    ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER,
    // ActivityTypeEnum.R1_2A_BUILD_1_15_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL,

    ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH,
  ]},
  { sector: 2, subSector: "2B", activities: [
    "None",
    ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES,
    ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK,

    ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER,
    // ActivityTypeEnum.R1_2B_BUILD_1_15_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER,
    ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL,

    ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH,
  ]},
  { sector: 3, subSector: "3A", activities: [
    "None",
    ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF,

    ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT,
    ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT,

    ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL,

    ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH,

    ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE,
    ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE,
    ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE,

    ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH
  ]},
  { sector: 3, subSector: "3B", activities: [
    "None",
    ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF,

    ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT,
    ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT,

    ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL,
    ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL,
    ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL,

    ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE,
    ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE,
    ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE,

    ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH
  ]},
];

export const roundOneScenarioConfiguration: ScenarioConfigurationType = {
  // Sector 1A
  // None
  "1_1A_None-0.3-1": { score: 30, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  "1_1A_None-0.3-0.5": { score: 20, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  "1_1A_None-0.3-2": { score: 60, cutscene: CutScenesEnum.R1_1A_0, coin: 0 },
  // Mangrove
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_1A_1 },
  // Land Reclamation 0.5
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.3-2`]: { score: 10, coin: 3, cutscene: CutScenesEnum.R1_1A_2 },
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
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_1A_3 },
  // Seawall 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_3 },
  // Seawall 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1A_3 },

  // --- SECTOR 1B (Player 1) ---
  "1_1B_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_1B_0 },
  "1_1B_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_1B_0 },
  "1_1B_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_1B_0 },
  // Mangrove
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_1B_1 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_1B_1 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_1B_1 },
  // Land Reclamation 0.5
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.3-2`]: { score: 10, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  // Land Reclamation 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.3-2`]: { score: 0, coin: 4, cutscene: CutScenesEnum.R1_1B_2 },
  // Land Reclamation 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-1`]: { score: 0, coin: 5,  cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-0.5`]: { score: 0, coin: 5,  cutscene: CutScenesEnum.R1_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.3-2`]: { score: 0, coin: 5,  cutscene: CutScenesEnum.R1_1B_2 },
  // Seawall 0.5
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_1B_4 },
  // Seawall 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1B_4 },
  // Seawall 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_1B_3 },

  // --- SECTOR 2A (Player 2) ---
  "2_2A_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_2A_0 },
  "2_2A_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_2A_0 },
  "2_2A_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_2A_0 },
  
  // Mangrove
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_2A_3 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_2A_3 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_2A_3 },

  // Storm Surge Barrier 0.5
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: { score: 20, coin: 3, cutscene: CutScenesEnum.R1_2A_1 },
  // Storm Surge Barrier 2
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2A_1 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.3-2`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2A_1 },
  // Seawall 0.5
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_2A_2 },
  // Seawall 1.15
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2A_2 },
  // Seawall 2
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2A_2 },

  // --- SECTOR 2B (Player 2) ---
  "2_2B_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_2B_0 },
  "2_2B_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_2B_0 },
  "2_2B_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_2B_0 },
  
  // Mangrove
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.3-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R1_2B_4 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.3-0.5`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_2B_4 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.3-2`]: { score: 60, coin: 1, cutscene: CutScenesEnum.R1_2B_4 },

  // Storm Surge Barrier 0.5
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.3-2`]: { score: 20, coin: 3, cutscene: CutScenesEnum.R1_2B_2 },
  // Storm Surge Barrier 2
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.3-1`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.3-0.5`]: { score: 0, coin: 5, cutscene: CutScenesEnum.R1_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.3-2`]: { score: 20, coin: 5, cutscene: CutScenesEnum.R1_2B_1 },
  // Seawall 0.5
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_2B_3 },
  // Seawall 1.15
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_2B_3 },
  // Seawall 2
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_2B_2 },

  // --- SECTOR 3A (Player 3) ---
  "3_3A_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_3A_0 },
  "3_3A_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_3A_0 },
  "3_3A_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_3A_0 },
  // Artificial Reef
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-1`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_3A_1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_3A_1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.3-2`]: { score: 50, coin: 1, cutscene: CutScenesEnum.R1_3A_1 },

  // Hybrid Measure 0.5
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_2 },
  // Hybrid Measure 1.15
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_2 },
  // Hybrid Measure 2
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_2 },

  // Seawall 0.5
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_3A_3 },
  // Seawall 1.15
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3A_3 },
  // Seawall 2
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_3 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3A_3 },

  // --- SECTOR 3B (Player 3) ---
  "3_3B_None-0.3-1": { score: 30, coin: 0, cutscene: CutScenesEnum.R1_3B_0 },
  "3_3B_None-0.3-0.5": { score: 20, coin: 0, cutscene: CutScenesEnum.R1_3B_0 },
  "3_3B_None-0.3-2": { score: 60, coin: 0, cutscene: CutScenesEnum.R1_3B_0 },
  // Artificial Reef
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-1`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R1_3B_1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-0.5`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_3B_1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.3-2`]: { score: 50, coin: 1, cutscene: CutScenesEnum.R1_3B_1 },
  // Hybrid Measure 0.5
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_3B_2 },
  // Hybrid Measure 1.15
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_2 },
  // Hybrid Measure 2
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_2 },

  // Seawall 0.5
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-0.5`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.3-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R1_3B_4 },
  // Seawall 1.15
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.3-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_3B_3 },
  // Seawall 2
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-0.5`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_3 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.3-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R1_3B_3 },
};

export const roundTwoScenarioConfiguration: ScenarioConfigurationType = {
  "1_1A_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_1A_0, coin: 0 },
  "1_1A_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_1A_0, coin: 0 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_1A_0, coin: 1 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_1A_0, coin: 1 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 2 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 25, cutscene: CutScenesEnum.R2_1A_0, coin: 2 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 3 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 3 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_1A_2, coin: 1 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-0.7-2`]: { score: 140, cutscene: CutScenesEnum.R2_1A_2, coin: 1 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_1A_0, coin: 3 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_1A_0, coin: 3 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 4 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-0.7-2`]: { score: 25, cutscene: CutScenesEnum.R2_1A_0, coin: 4 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 5 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 5 },

  // Seawall 0.5 No uprades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_1A_4 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_1A_4 },

  // Seawall 0.5 -> 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 25, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },

  // Seawall 0.5 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R1_1A_1 },

  // Seawall 0.5 > Build bike path and new park along the seawall
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 100, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },

  // Seawall 1.15 No uprades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },
  // [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-0.7-0.5`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 25, coin: 0, cutscene: CutScenesEnum.R2_1A_0 },

  // Seawall 1.15 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },

  // Seawall 2 No uprades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },

  // Seawall 2 No uprades land reclamations
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_1A_0},
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_1A_0 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-0.7-2`]: { score: 25, coin: 0, cutscene: CutScenesEnum.R2_1A_0 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },

  // Land and build seawall
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: 140, coin: 0, cutscene: CutScenesEnum.R2_1A_2 },

  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-0.7-2`]: { score: 140, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },  


  // SECTOR 1B
  "1_1B_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_1B_0, coin: 0 },
  "1_1B_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_1B_0, coin: 0 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_1B_1, coin: 1 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_1B_1, coin: 1 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_1, coin: 2 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 25, cutscene: CutScenesEnum.R2_1B_1, coin: 2 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_2, coin: 3 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_1B_2, coin: 3 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_1B_3, coin: 1 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-0.7-2`]: { score: 140, cutscene: CutScenesEnum.R2_1B_3, coin: 1 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_1B_5, coin: 3 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_1B_5, coin: 3 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 4 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-0.7-2`]: { score: 25, cutscene: CutScenesEnum.R2_1B_6, coin: 4 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 5 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 5 },

  // Seawall 0.5 No uprades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_1B_1 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_1B_1 },

  // Seawall 0.5 -> 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R2_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R2_1B_2 },

  // Seawall 0.5 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R2_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 5, coin: 2, cutscene: CutScenesEnum.R2_1B_2 },

  // Seawall 2 -> Build bike path and new park along the seawall
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 30, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 100, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },

  // Seawall 1.15 No uprades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 25, coin: 0, cutscene: CutScenesEnum.R2_1B_4 },

  // Seawall 1.15 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 5, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },
  
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },

  // Seawall 2 No uprades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_2 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },

  // Seawall 2 No uprades land reclamations
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_1B_5 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_1B_5 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-0.7-2`]: { score: 25, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  // Land and build seawall
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-0.7-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: 140, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },

  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_1B_8 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-0.7-2`]: { score: 140, coin: 0, cutscene: CutScenesEnum.R2_1B_8 },


  // SECTOR 2A
  "2_2A_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_2A_0, coin: 0 },
  "2_2A_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_2A_0, coin: 0 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_2A_1, coin: 0 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_2A_1, coin: 0 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_2A_2, coin: 3 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_2A_2, coin: 3 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_2A_3, coin: 5 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_2A_3, coin: 5 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_2A_4, coin: 1 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_2A_4, coin: 1 },
  
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_4, coin: 2 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_2A_4, coin: 2 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 3 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 3 },
  
  // Seawall 0.5 No uprades
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_2A_2 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_3 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_3 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2A_5 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 100, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },


  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },


  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },


  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_2A_8 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-0.7-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  // Sector 2B
  "2_2B_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_2B_0, coin: 0 },
  "2_2B_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_2B_0, coin: 0 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_2B_1, coin: 0 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_2B_1, coin: 0 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_2B_0, coin: 3 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_2B_0, coin: 3 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_2, coin: 5 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_2B_2, coin: 5 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_2B_3, coin: 1 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_2B_3, coin: 1 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_3, coin: 2 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_2B_3, coin: 2 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_3, coin: 3 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_2B_3, coin: 3 },


  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_2B_4 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_2B_4 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_2 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 20, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 100, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },


  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 35, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },


  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },



  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-None-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-None-0.7-2`]: { score: 140, coin: 0, cutscene: CutScenesEnum.R2_2B_1 },

  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-0.7-1`]: { score: 70, coin: 0, cutscene: CutScenesEnum.R2_2B_7 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-0.7-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2B_7 },


  // Sector 3A
  "3_3A_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  "3_3A_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3A_3, coin: 2 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_3, coin: 3 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_3, coin: 3 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 3 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 3 },
  
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-None-0.7-1`]: { score: 50, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-None-0.7-2`]: { score: 130, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_5, coin: 1 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-None-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },

  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3A_6, coin: 1 },

  // Hybrid Measure (1.15m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-None-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  // Hybrid Measure (2m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  // Seawall (0.5m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },

  // Seawall (1.15m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },

  // Seawall (2m) upgrades
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },


  // Sector 3B
  "3_3B_None-None-0.7-1": { score: 70, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  "3_3B_None-None-0.7-2": { score: 150, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_3B_1, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_1, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3B_0, coin: 2 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_0, coin: 2 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },

  // Artificial Reef Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-None-0.7-1`]: { score: 70, cutscene: CutScenesEnum.R2_3B_1, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-None-0.7-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_1, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },

  // Hybrid Measure (0.5m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-None-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3B_4, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_4, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 80, cutscene: CutScenesEnum.R2_3B_6, coin: 1 },

  // Hybrid Measure (1.15m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-None-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_4, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 15, cutscene: CutScenesEnum.R2_3B_6, coin: 1 },

  // Hybrid Measure (2m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },

  // Seawall (0.5m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-None-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-None-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 20, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 100, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },

  // Seawall (1.15m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-None-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 35, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },

  // Seawall (2m) Upgrades
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-None-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_9, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-None-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_9, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-0.7-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
};

export const roundThreeScenarioConfiguration: ScenarioConfigurationType = {
  // SECTOR 1A
  "1_1A_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_1A_0, coin: 0 },
  "1_1A_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_1A_0, coin: 0 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_1A_0, coin: 1 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R1_1A_0, coin: 1 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 2 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R1_1A_0, coin: 2 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 3 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_1A_1, coin: 3 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_1A_2, coin: 1 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_1A_2, coin: 1 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_1A_0, coin: 3 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_1A_0, coin: 3 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 4 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_1A_0, coin: 4 },

  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 5 },
  [`1_1A_None-${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_1A_3, coin: 5 },

  // Seawall 0.5 No upgrades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_1A_4 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1A_4 },

  // Seawall 0.5 -> 1.15
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },

  // Seawall 0.5 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_1 },

  // Seawall 0.5 -> Build promenade
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 75, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 160, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },

  // Seawall 1.15 No upgrades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_1A_0 },

  // Seawall 1.15 -> 2
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1A_1 },

  // Seawall 1.15 -> Build promenade
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 95, coin: 1, cutscene: CutScenesEnum.R2_1A_5 },

  // Seawall 2 No upgrades
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_1 },

  // Seawall 2 -> Build promenade
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },

  // Land Reclamation (0.5m) -> None
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_1A_0 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1A_0 },

  // Land Reclamation (1.15m) -> None
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_1A_0 },

  // Land Reclamation (2m) -> None
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1A_3 },

  // Land Reclamation (0.5m) -> Build Sea Wall (1.15m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 35, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (0.5m) -> Build Sea Wall (2m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (1.15m) -> Build Sea Wall (1.15m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (1.15m) -> Build Sea Wall (2m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (2m) -> Build Sea Wall (1.15m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1A_7 },

  // Land Reclamation (2m) -> Build Sea Wall (2m)
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1A_7 },

  // Mangroves -> None
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_1A_2 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_1A_2 },

  // Mangroves -> Build mangrove board walk
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },
  [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },

  // // Mangroves -> Remove
  // [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-Remove-1.15-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },
  // [`1_1A_${ActivityTypeEnum.R1_1A_BUILD_PLANT_MANGROVES}-Remove-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R1_1A_3 },


  // SECTOR 1B
  "1_1B_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_1B_0, coin: 0 },
  "1_1B_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_1B_0, coin: 0 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_1B_1, coin: 1 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_1B_1, coin: 1 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 10, cutscene: CutScenesEnum.R2_1B_1, coin: 2 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_1B_1, coin: 2 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 10, cutscene: CutScenesEnum.R2_1B_2, coin: 3 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 10, cutscene: CutScenesEnum.R2_1B_2, coin: 3 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_1B_3, coin: 1 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_1B_3, coin: 1 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_1B_5, coin: 3 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_1B_5, coin: 3 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 4 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_1B_6, coin: 4 },

  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 5 },
  [`1_1B_None-${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_1B_6, coin: 5 },

  // Seawall 0.5 No upgrades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_1B_1 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1B_1 },

  // Seawall 0.5 -> 1.15
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_2 },

  // Seawall 0.5 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 10, coin: 2, cutscene: CutScenesEnum.R2_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 10, coin: 2, cutscene: CutScenesEnum.R2_1B_2 },

  // Seawall 0.5 -> Build bike path
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 75, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 160, coin: 1, cutscene: CutScenesEnum.R2_1B_4 },

  // Seawall 1.15 No upgrades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_2 },

  // Seawall 1.15 -> 2
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_2 },

  // Seawall 1.15 -> Build bike path
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },

  // Seawall 2 No upgrades
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_2 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_2 },

  // Seawall 2 -> Build bike path
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_1B_7 },

  // Land Reclamation (0.5m) -> None
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_1B_5 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_1B_5 },

  // Land Reclamation (1.15m) -> None
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (2m) -> None
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (0.5m) -> Build Sea Wall (1.15m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-2`]: { score: 35, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (0.5m) -> Build Sea Wall (2m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_0_5_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (1.15m) -> Build Sea Wall (1.15m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (1.15m) -> Build Sea Wall (2m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_1_15_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (2m) -> Build Sea Wall (1.15m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_1B_6 },

  // Land Reclamation (2m) -> Build Sea Wall (2m)
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-1`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_2_LAND_RECLAMATION}-${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-1.15-2`]: { score: 0, coin: 3, cutscene: CutScenesEnum.R2_1B_6 },

  // Mangroves -> None
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },

  // Mangroves -> Build mangrove board walk
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-1.15-1`]: { score: 115, coin: 1, cutscene: CutScenesEnum.R2_1B_8 },
  [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-1.15-2`]: { score: 200, coin: 1, cutscene: CutScenesEnum.R2_1B_8 },

  // Mangroves -> Remove
  //   [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-Remove-1.15-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },
  //   [`1_1B_${ActivityTypeEnum.R1_1B_BUILD_PLANT_MANGROVES}-Remove-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_1B_3 },



  // SECTOR 2A
  "2_2A_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_2A_0, coin: 0 },
  "2_2A_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_2A_0, coin: 0 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_2A_1, coin: 0 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_2A_1, coin: 0 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_2A_2, coin: 3 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_2A_2, coin: 3 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_3, coin: 5 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_2A_3, coin: 5 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_2A_4, coin: 1 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_2A_4, coin: 1 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 2 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_2A_4, coin: 2 },

  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 3 },
  [`2_2A_None-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_2A_5, coin: 3 },

  // Coastal Barrier (0.5m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_2A_2 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2A_2},

  // Coastal Barrier (0.5m) -> Demolish
  // [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_STORM_SURGE_BARRIER}-Demolish-1.15-1`]: { score: 30, coin: 6, cutscene: CutScenesEnum.R2_2A_3 },

  // Coastal Barrier (2m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_3 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_3 },

  // Coastal Barrier (2m) -> Demolish
  // [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_STORM_SURGE_BARRIER}-Demolish-1.15-1`]: { score: 50, coin: 2, cutscene: CutScenesEnum.R2_2A_3 },

  // Seawall (0.5m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  // Seawall (0.5m) -> Raise to 1.15m
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },

  // Seawall (0.5m) -> Raise to 2m
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2A_5 },

  // Seawall (0.5m) -> Build promenade
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },

  // Seawall (1.15m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  // Seawall (1.15m) -> Raise to 2m
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_5 },

  // Seawall (1.15m) -> Build promenade
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_2A_6 },

  // Seawall (2m) -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2A_5 },

  // Seawall (2m) -> Build promenade
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2A_7 },

  // Mangroves -> None
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_2A_8 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },

  // Mangroves -> Build mangrove board walk
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-1.15-1`]: { score: 115, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-1.15-2`]: { score: 200, coin: 1, cutscene: CutScenesEnum.R2_2A_4 },

  // Mangroves -> Remove
  // [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-Remove-1.15-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_2A_3 },
  // [`2_2A_${ActivityTypeEnum.R1_2A_BUILD_PLANT_MANGROVES}-Remove-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_2A_3 },


  // SECTOR 2B
  "2_2B_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_2B_0, coin: 0 },
  "2_2B_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_2B_0, coin: 0 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_2B_1, coin: 0 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_2B_1, coin: 0 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_2B_0, coin: 3 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_2B_0, coin: 3 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_2, coin: 5 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_2B_2, coin: 5 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_2B_3, coin: 1 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_2B_3, coin: 1 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_3, coin: 2 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_2B_3, coin: 2 },

  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_2B_3, coin: 3 },
  [`2_2B_None-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_2B_3, coin: 3 },

  // Coastal Barrier (0.5m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_2B_4 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2B_4 },

  // Coastal Barrier (0.5m) -> Demolish
  // [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_STORM_SURGE_BARRIER}-Demolish-1.15-1`]: { score: 30, coin: 6, cutscene: CutScenesEnum.R2_2B_3 },

  // Coastal Barrier (2m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_2 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_2 },

  // Coastal Barrier (2m) -> Demolish
  // [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_STORM_SURGE_BARRIER}-Demolish-1.15-2`]: { score: 50, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (0.5m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (0.5m) -> Raise to 1.15m
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (0.5m) -> Raise to 2m
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 2, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (0.5m) -> Build promenade
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },

  // Seawall (1.15m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (1.15m) -> Raise to 2m
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, coin: 1, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (1.15m) -> Build promenade
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, coin: 1, cutscene: CutScenesEnum.R2_2B_5 },

  // Seawall (2m) -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },

  // Seawall (2m) -> Build promenade
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 10, coin: 1, cutscene: CutScenesEnum.R2_2B_6 },

  // Mangroves -> None
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-None-1.15-1`]: { score: 115, coin: 0, cutscene: CutScenesEnum.R2_2B_1 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-None-1.15-2`]: { score: 200, coin: 0, cutscene: CutScenesEnum.R2_2B_1 },

  // Mangroves -> Build mangrove board walk
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-1.15-1`]: { score: 115, coin: 1, cutscene: CutScenesEnum.R2_2B_7 },
  [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-1.15-2`]: { score: 200, coin: 1, cutscene: CutScenesEnum.R2_2B_7 },

  // Mangroves -> Remove
  // [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-Remove-1.15-1`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  // [`2_2B_${ActivityTypeEnum.R1_2B_BUILD_PLANT_MANGROVES}-Remove-1.15-2`]: { score: 10, coin: 0, cutscene: CutScenesEnum.R2_2B_3 },
  
  
  // SECTOR 3A
  "3_3A_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  "3_3A_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_3A_1, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3A_3, coin: 2 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_3, coin: 3 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_3, coin: 3 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },

  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 3 },
  [`3_3A_None-${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 3 },

  // Artificial Reef -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-None-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_3A_1, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-None-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_3A_1, coin: 0 },

  // Artificial Reef -> Build Rocky Revetment Behind Reef (1.15m)
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_5, coin: 1 },

  // Artificial Reef -> Build Rocky Revetment Behind Reef (2m)
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_5, coin: 2 },

  // Hybrid Measure (0.5m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-None-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-None-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },

  // Hybrid Measure (0.5m) -> Raise Revetment to 1.15m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  // Hybrid Measure (0.5m) -> Raise Revetment to 2m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 2 },

  // Hybrid Measure (0.5m) -> Add a bike path
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3A_6, coin: 1 },

  // Hybrid Measure (1.15m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-None-1.15-1`]: { score: 20, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-None-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },

  // Hybrid Measure (1.15m) -> Raise Revetment to 2m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  // Hybrid Measure (1.15m) -> Add a bike path
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  // Hybrid Measure (2m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },

  // Hybrid Measure (2m) -> Add a bike path
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_4, coin: 1 },

  // Seawall (0.5m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3A_0, coin: 0 },

  // Seawall (0.5m) -> Raise to 1.15m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_2, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3A_0, coin: 1 },

  // Seawall (0.5m) -> Raise to 2m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 2 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 2 },

  // Seawall (0.5m) -> Build a promenade
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },

  // Seawall (1.15m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },

  // Seawall (1.15m) -> Raise to 2m
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },

  // Seawall (1.15m) -> Build a promenade
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },

  // Seawall (2m) -> None
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },

  // Seawall (2m) -> Build a promenade
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },
  [`3_3A_${ActivityTypeEnum.R1_3A_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3A_7, coin: 1 },


  // SECTOR 3B
  "3_3B_None-None-1.15-1": { score: 115, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  "3_3B_None-None-1.15-2": { score: 200, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_3B_1, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_3B_1, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3B_0, coin: 2 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3B_2, coin: 1 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 2 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_0, coin: 2 },

  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },
  [`3_3B_None-${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_2, coin: 3 },

  // Artificial Reef -> Demolish
  // [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-Demolish-1.15-1`]: { score: 10, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  // Artificial Reef -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-None-1.15-1`]: { score: 115, cutscene: CutScenesEnum.R2_3B_1, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-None-1.15-2`]: { score: 200, cutscene: CutScenesEnum.R2_3B_1, coin: 0 },

  // Artificial Reef -> Build Rocky Revetment Behind Reef (1.15m)
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },

  // Artificial Reef -> Build Rocky Revetment Behind Reef (2m)
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_ARTIFICIAL_REEF}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },

  // Hybrid Measure (0.5m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-None-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-None-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3B_4, coin: 0 },

  // Hybrid Measure (0.5m) -> Raise Revetment to 1.15m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_4, coin: 1 },

  // Hybrid Measure (0.5m) -> Raise Revetment to 2m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },

  // Hybrid Measure (0.5m) -> Add a bike path
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 45, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 130, cutscene: CutScenesEnum.R2_3B_6, coin: 1 },

  // Hybrid Measure (1.15m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-None-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_4, coin: 0 },

  // Hybrid Measure (1.15m) -> Raise Revetment to 2m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },

  // Hybrid Measure (1.15m) -> Add a bike path
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 65, cutscene: CutScenesEnum.R2_3B_6, coin: 1 },

  // Hybrid Measure (2m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },

  // Hybrid Measure (2m) -> Add a bike path
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_HYBRID_MEASURE}-${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_5, coin: 1 },

  // Seawall (0.5m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-None-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-None-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },

  // Seawall (0.5m) -> Raise to 1.15m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3B_0, coin: 1 },

  // Seawall (0.5m) -> Raise to 2m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 2 },

  // Seawall (0.5m) -> Build a promenade
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 65, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_0_5_SEAWALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 150, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },

  // Seawall (1.15m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-None-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3B_0, coin: 0 },

  // Seawall (1.15m) -> Raise to 2m
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_3, coin: 1 },

  // Seawall (1.15m) -> Build a promenade
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_1_15_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 85, cutscene: CutScenesEnum.R2_3B_7, coin: 1 },

  // Seawall (2m) -> None
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-None-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_9, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-None-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_9, coin: 0 },

  // Seawall (2m) -> Build a promenade
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-1`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
  [`3_3B_${ActivityTypeEnum.R1_3B_BUILD_2_SEA_WALL}-${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-1.15-2`]: { score: 0, cutscene: CutScenesEnum.R2_3B_8, coin: 1 },
}

export const optionalScenarioConfiguration: ScenarioConfigurationType = {
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-1`]: { score: 50, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-2`]: { score: 50, coin: 1, cutscene: CutScenesEnum.R2_1A_6 },

  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-None-0.7-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_1_15_LAND_RECLAMATION_SEAWALL}-None-0.7-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-None-0.7-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_2_LAND_RECLAMATION_SEAWALL}-None-0.7-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1A_7 },

  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },

  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },
  [`1_1A_${ActivityTypeEnum.R1_1A_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1A_8 },

  
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1B_7 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_SEAWALL_WALK_PATH}-None-0.7-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1B_7 },

  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-None-1.15-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_1_15}-None-1.15-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-None-1.15-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_LR_TO_SEAWALL_2}-None-1.15-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1B_6 },

  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1B_8 },
  [`1_1B_${ActivityTypeEnum.R1_1B_UPGRADE_MANGROVES_BOARDWALK}-None-0.7-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_1B_8 },

  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_2A_6 },
  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_2A_6 },

  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },
  [`2_2A_${ActivityTypeEnum.R1_2A_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_2A_4 },


  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_2B_5 },
  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_2B_5 },

  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-1`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_2B_7 },
  [`2_2B_${ActivityTypeEnum.R1_2B_UPGRADE_MANGROVES_BOARDWALK}-None-1.15-2`]: { score: 50, coin: 0, cutscene: CutScenesEnum.R2_2B_7 },

  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-1`]: { score: 50, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-2`]: { score: 50, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },

  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-1`]: { score: 50, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-2`]: { score: 50, cutscene: CutScenesEnum.R2_3A_5, coin: 0 },

  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 50, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 50, cutscene: CutScenesEnum.R2_3A_7, coin: 0 },

  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-1.15-1`]: { score: 50, cutscene: CutScenesEnum.R2_3A_4, coin: 0 },
  [`3_3A_${ActivityTypeEnum.R1_3A_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-1.15-2`]: { score: 50, cutscene: CutScenesEnum.R2_3A_6, coin: 0 },  

  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-1`]: { score: 50, cutscene: CutScenesEnum.R2_3B_8, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_SEAWALL_WALK_PATH}-None-1.15-2`]: { score: 50, cutscene: CutScenesEnum.R2_3B_8, coin: 0 },

  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-1`]: { score: 50, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_1_15_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-2`]: { score: 50, cutscene: CutScenesEnum.R2_3B_4, coin: 0 },

  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-1`]: { score: 50, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_2_ARTIFICIAL_REEF_SLOPING_REVETMENT}-None-1.15-2`]: { score: 50, cutscene: CutScenesEnum.R2_3B_3, coin: 0 },
  
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-1.15-1`]: { score: 50, cutscene: CutScenesEnum.R2_3B_5, coin: 0 },
  [`3_3B_${ActivityTypeEnum.R1_3B_UPGRADE_HYBRID_MEASURE_WALK_PATH}-None-1.15-2`]: { score: 50, cutscene: CutScenesEnum.R2_3B_6, coin: 0 },
}



export const sceneSectorConfigurations: ScenarioConfigurationType = {
  ...roundOneScenarioConfiguration,
  ...roundTwoScenarioConfiguration,
  ...roundThreeScenarioConfiguration,
  ...optionalScenarioConfiguration,
}


export const demolishConfigData: {
  [key in SubSectorEnum]: string[];
} = {
  [SubSectorEnum.ONE_A]: Object.values(ActivityDemolishTypeSector1AEnum),
  [SubSectorEnum.ONE_B]: Object.values(ActivityDemolishTypeSector1BEnum),
  [SubSectorEnum.TWO_A]: Object.values(ActivityDemolishTypeSector2AEnum),
  [SubSectorEnum.TWO_B]: Object.values(ActivityDemolishTypeSector2BEnum),
  [SubSectorEnum.THREE_A]: Object.values(ActivityDemolishTypeSector3AEnum),
  [SubSectorEnum.THREE_B]: Object.values(ActivityDemolishTypeSector3BEnum),
}