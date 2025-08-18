import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ActivityTypeEnum, CutScenesEnum, GameLobbyStatus, LobbyStateEnum, UserSectorEnum } from "./enums";
import { ActivityLogType, LobbyStateType, NormalizedActivities, OverallScoresTypes, PlayerBreakdown, RoundBreakdown, RoundType, ScenarioConfigurationType, GameContentState, MainScreenContent } from "./types";
import { meanSeaLevels, ROOMS, sceneSectorConfigurations, subSectors, userIdToSector } from "./constants";
import { push, ref, set } from "firebase/database";
import { database } from "./firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomEffectValue(round: RoundType): number {
  const values = round === 1 ? [
    0.5,
    1,
    2
  ] : [1, 2];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

export function hasActivityForSubSector(activities: ActivityLogType[], userId: string, subSector: string, round: number) {
  return activities.some(
    (a) => {
      return a.userId === userId && extractSubSector(a.value) === subSector && a.round === round
    }
  );
}

export function isGameOnGoing(value: GameLobbyStatus) {
  return !![GameLobbyStatus.ROUND_GAMEPLAY].includes(value);
}

export function isCountdownExpired(countdownStartTime: number, countdown: number = 30): boolean {
  if (!countdownStartTime) return false; // or true, depending on your logic
  const now = Date.now();
  return now - countdownStartTime >= countdown * 1000;
}

function extractSubSector(value: string): string | null {
  // Example value: "R1 1A / BUILD PLANT MANGROVES"
  // We want "1A", "1B", "2A", "2B", "3A", "3B"
  const match = value.match(/^R1 (\d[AB])/);
  return match ? match[1] : null;
}

export function getCutScenes(minSeaLevel = 0.3, randomizeEffect: number, activities: ActivityLogType[]) {
  // For each sub-sector, find the latest activity and get the cutscene
  const cutScenes: CutScenesEnum[] = subSectors.map(({ sector, subSector }) => {
    // Find the latest activity for this sector/subSector
    const activity = activities
      .filter((a) => {
        const actSector = userIdToSector[a.userId];
        const actSubSector = extractSubSector(a.value);
        return a.value && a.value.trim() !== "" && actSector === sector && actSubSector === subSector;
      })
      .slice(-1)[0];

    let key: string;
    if (activity) {
      const activityType: string = activity.action || "None";
      if (activityType !== "None") {
        key = `${sector}_${subSector}_${activityType}-${minSeaLevel}-${randomizeEffect}`;
      } else {
        key = `${sector}_${subSector}_None-${minSeaLevel}-${randomizeEffect}`;
      }
    } else {
      key = `${sector}_${subSector}_None-${minSeaLevel}-${randomizeEffect}`;
    }

    const config = sceneSectorConfigurations[key];
    return config ? config.cutscene : null;
  }).filter((value) => !!value);

  return cutScenes; // [1A, 1B, 2A, 2B, 3A, 3B]

  // return an array of cutscenes
}

export function getNormalizeActivities(activities: ActivityLogType[] = []): NormalizedActivities {
  const normalized: NormalizedActivities = {
    actions: {},
    userIds: {},
    rounds: {},
    values: {},
  };

  for (const act of activities) {
    // By action
    if (act.action) {
      if (!normalized.actions[act.action]) normalized.actions[act.action] = [];
      normalized.actions[act.action].push(act);
    }
    // By userId
    if (act.userId) {
      if (!normalized.userIds[act.userId]) normalized.userIds[act.userId] = [];
      normalized.userIds[act.userId].push(act);
    }
    // By round
    if (act.round) {
      if (!normalized.rounds[act.round]) normalized.rounds[act.round] = [];
      normalized.rounds[act.round].push(act);
    }
    // By value
    if (act.value) {
      if (!normalized.values[act.value]) normalized.values[act.value] = [];
      normalized.values[act.value].push(act);
    }
  }

  return normalized;
}

/**
 * Calculates the overall score for the round based on activities and configuration.
 * @param activities Array of ActivityLogType from Firebase.
 * @param minSeaLevel The mean sea level for the round (e.g., 0.3).
 * @param randomizeEffect The randomize effect for the round (e.g., 1, 0.5, 2).
 * @returns The total score for all sub-sectors.
 */
export function calculateOverallScorePerRound(
  activities: ActivityLogType[],
  minSeaLevel: number,
  randomizeEffect: number
): number {
  // For each sub-sector, find the latest activity and get the score
  let totalScore = 0;

  subSectors.forEach(({ sector, subSector }) => {
    // Find the latest activity for this sector/subSector
    const activity = activities
      .filter((a) => {
        const actSector = userIdToSector[a.userId];
        const actSubSector = extractSubSector(a.value);
        return a.value && a.value.trim() !== "" && actSector === sector && actSubSector === subSector;
      })
      .slice(-1)[0];

    let key: string;
    if (activity) {
      const activityType: string = activity.action || "None";
      if (activityType !== "None") {
        key = `${sector}_${subSector}_${activityType}-${minSeaLevel}-${randomizeEffect}`;
      } else {
        key = `${sector}_${subSector}_None-${minSeaLevel}-${randomizeEffect}`;
      }
    } else {
      key = `${sector}_${subSector}_None-${minSeaLevel}-${randomizeEffect}`;
    }

    const config = sceneSectorConfigurations[key];

    if (config) {
      totalScore += config.score;
    }
  });

  // Start from 10,000 and add the (negative) totalScore
  return 2500 + totalScore;
}


/**
 * Calculates the overall score for the round based on activities and configuration.
 * @param activities Array of ActivityLogType from Firebase.
 * @param minSeaLevel The mean sea level for the round (e.g., 0.3).
 * @param randomizeEffect The randomize effect for the round (e.g., 1, 0.5, 2).
 * @returns The total score for all sub-sectors.
 */
export function calculateOverallScore(
  activities: ActivityLogType[],
  randomizeEffect: number,
): number {
  // All minSeaLevel values for all rounds
  const minSeaLevels = [0.3, 0.7, 1];
  let totalScore = 0;

  minSeaLevels.forEach((minSeaLevel) => {
    subSectors.forEach(({ sector, subSector }) => {
      // Find the latest activity for this sector/subSector and minSeaLevel
      const activity = activities
        .filter((a) => {
          const actSector = userIdToSector[a.userId];
          const actSubSector = extractSubSector(a.value);
          return a.value && a.value.trim() !== "" && actSector === sector && actSubSector === subSector;
        })
        .slice(-1)[0];

      let key: string;
      if (activity) {
        const activityType: string = activity.action || "None";
        if (activityType !== "None") {
          key = `${sector}_${subSector.trim()}_${activityType}-${minSeaLevel}-${randomizeEffect}`;
        } else {
          key = `${sector}_${subSector.trim()}_None-${minSeaLevel}-${randomizeEffect}`;
        }
      } else {
        key = `${sector}_${subSector.trim()}_None-${minSeaLevel}-${randomizeEffect}`;
      }

      const config = sceneSectorConfigurations[key];

      if (config) {
        totalScore += config.score;
      }
    });
  });

  // Start from 10,000 and add the (negative) totalScore
  return 2500 + totalScore;
}


/**
 * Calculates the overall score for the round based on activities and configuration.
 * @param activities Array of ActivityLogType from Firebase.
 * @param minSeaLevel The mean sea level for the round (e.g., 0.3).
 * @param randomizeEffect The randomize effect for the round (e.g., 1, 0.5, 2).
 * @returns The total score for all sub-sectors.
 */
export function calculateRoundScore(
  activities: ActivityLogType[],
  randomizeEffect: number,
  round: number
): number {
  // All minSeaLevel values for all rounds
  const minSeaLevel = meanSeaLevels[round - 1]
  let totalScore = 0;

  subSectors.forEach(({ sector, subSector }) => {
    // Find the latest activity for this sector/subSector and minSeaLevel
    const activity = activities
      .filter((a) => {
        const actSector = userIdToSector[a.userId];
        const actSubSector = extractSubSector(a.value);
        return a.value && a.value.trim() !== "" && actSector === sector && actSubSector === subSector;
      })
      .slice(-1)[0];

    let key: string;
    if (activity) {
      const activityType: string = activity.action || "None";
      if (activityType !== "None") {
        key = `${sector}_${subSector.trim()}_${activityType}-${minSeaLevel}-${randomizeEffect}`;
      } else {
        key = `${sector}_${subSector.trim()}_None-${minSeaLevel}-${randomizeEffect}`;
      }
    } else {
      key = `${sector}_${subSector.trim()}_None-${minSeaLevel}-${randomizeEffect}`;
    }

    const config = sceneSectorConfigurations[key];

    if (config) {
      totalScore += config.score;
    }
  });

  // Start from 10,000 and add the (negative) totalScore
  return 2500 + totalScore;
}
// ... existing code ...

export function getMeanSeaLevelForRound(round: number): number {
  if (round === 1) return 0.3;
  if (round === 2) return 0.7;
  if (round === 3) return 1;
  return 0.3; // default/fallback
}


/**
 * Calculates the overall score for all rounds up to maxRound based on the scenario configuration,
 * and returns the matched scenario keys/configs as well as the total score.
 * 
 * @param activities Array of ActivityLogType from Firebase.
 * @param sessionRandomizeEffect The randomizeEffect value for the current game session.
 * @param maxRound The highest round to include in the calculation (0 = round 1 ongoing, 1 = round 1 finished, etc.)
 * @returns { data: { key, config }[], totalScore }
 */
export function calculateOverallScoreFromScenarioConfigControlled(
  activities: ActivityLogType[],
  sessionRandomizeEffect: string | number,
  maxRound: number // 0, 1, 2, 3
): { data: { key: string; config: any, }[]; totalScore: number, dataStr: string[] } {
  let totalScore = 0;

  const meanSeaLevelToRound: Record<string, number> = {
    "0.3": 1,
    "0.7": 2,
    "1.15": 3,
  };

  const matchedScenarios = new Set<string>();
  const matchedData: { key: string; config: any }[] = [];
  const matchedDataString: string[] = [];

  // Filter scenarioConfig entries by randomizeEffect first for optimization
  const filteredEntries = Object.entries(sceneSectorConfigurations).filter(([key]) => {
    const rest = key.split('_')[2];
    const restParts = rest.split('-');
    const randomizeEffect = restParts[restParts.length - 1];
    return randomizeEffect === String(sessionRandomizeEffect);
  });

  filteredEntries.forEach(([key, config]) => {
    const [sector, subSector, rest] = key.split('_');
    const restParts = rest.split('-');

    let actions: string[] = [];
    let meanSeaLevel: string;

    if (restParts.length === 4) {
      actions = [restParts[0], restParts[1]];
      meanSeaLevel = restParts[2];
    } else if (restParts.length === 3) {
      actions = [restParts[0]];
      meanSeaLevel = restParts[1];
    } else {
      return;
    }

    const currentRound = meanSeaLevelToRound[meanSeaLevel];
    const prevRound = currentRound - 1;
    const scenarioId = `${sector}_${subSector}_${currentRound}`;
    if (matchedScenarios.has(scenarioId)) return;

    // Only include scenarios for rounds <= maxRound
    if (currentRound > maxRound) return;

    // If round is ongoing (maxRound === 0), exclude all "None" scenarios for round 1
    if (
      maxRound === 0 &&
      currentRound === 1 &&
      (
        (actions.length === 1 && actions[0] === "None") ||
        (actions.length === 2 && (actions[0] === "None" || actions[1] === "None"))
      )
    ) {
      return;
    }

    const sectorActivities = activities.filter(a =>
      a.value.includes(sector) && a.value.includes(subSector)
    );

    let matched = false;

    if (actions.length === 2) {
      if (currentRound > 1) {
        if (actions[0] === "None" && actions[1] === "None") {
          const prevActivity = sectorActivities.some(a => (a.round ?? 0) === prevRound);
          const currActivity = sectorActivities.some(a => (a.round ?? 0) === currentRound);
          matched = !prevActivity && !currActivity;
        } else if (actions[0] === "None" && actions[1] !== "None") {
          const prevActivity = sectorActivities.some(a => (a.round ?? 0) === prevRound);
          const currActivity = sectorActivities.some(a => a.action === actions[1] && (a.round ?? 0) === currentRound);
          matched = !prevActivity && currActivity;
        } else if (actions[0] !== "None" && actions[1] === "None") {
          const prevActivity = sectorActivities.some(a => a.action === actions[0] && (a.round ?? 0) === prevRound);
          const currActivity = sectorActivities.some(a => (a.round ?? 0) === currentRound);
          matched = prevActivity && !currActivity;
        } else if (actions[0] !== "None" && actions[1] !== "None") {
          const action1Activity = sectorActivities
            .filter(a => a.action === actions[0] && (a.round ?? 0) === prevRound)
            .sort((a, b) => b.timestamp - a.timestamp)[0];
          const action2Activity = sectorActivities
            .filter(a => a.action === actions[1] && (a.round ?? 0) === currentRound && (!action1Activity || a.timestamp > action1Activity.timestamp))
            .sort((a, b) => b.timestamp - a.timestamp)[0];
          matched = !!action1Activity && !!action2Activity;
        }
      }
    } else if (actions.length === 1) {
      if (actions[0] === "None") {
        const currActivity = sectorActivities.some(a => (a.round ?? 0) === currentRound);
        matched = !currActivity;
      } else {
        matched = sectorActivities.some(a => a.action === actions[0] && (a.round ?? 0) === currentRound);
      }
    }

    if (matched) {
      totalScore += config.score;
      matchedScenarios.add(scenarioId);
      matchedData.push({ key, config });
      matchedDataString.push(`${key} == score: ${config.score}, coin: ${config.coin}`);
    }
  });

  return { data: matchedData, dataStr: matchedDataString, totalScore };
}


/**
**
 * Calculates the total coins per round (1, 2, 3) based on the scenario configuration,
 * using robust sector/user matching logic.
 * 
 * @param activities Array of ActivityLogType from Firebase.
 * @param sessionRandomizeEffect The randomizeEffect value for the current game session.
 * @returns { [round: number]: { totalCoin: number, data: { key, config }[] } }
 */
export function calculateTotalCoinsPerRound(
  activities: ActivityLogType[],
  sessionRandomizeEffect: string | number
): Record<number, { totalCoin: number; data: { key: string; config: any }[] }> {
  // Map meanSeaLevel values to round numbers for easy lookup
  const meanSeaLevelToRound: Record<string, number> = {
    "0.3": 1,
    "0.7": 2,
    "1.15": 3,
  };

  // Prepare result object for rounds 1, 2, 3
  const result: Record<number, { totalCoin: number; data: { key: string; config: any }[] }> = {
    1: { totalCoin: 0, data: [] },
    2: { totalCoin: 0, data: [] },
    3: { totalCoin: 0, data: [] },
  };

  // To avoid double-counting, keep track of which scenario for each sector/subsector/round has already been matched
  const matchedScenarios = new Set<string>();

  // Filter scenarioConfig entries by randomizeEffect first for optimization
  const filteredEntries = Object.entries(sceneSectorConfigurations).filter(([key]) => {
    const rest = key.split('_')[2];
    const restParts = rest.split('-');
    const randomizeEffect = restParts[restParts.length - 1];
    return randomizeEffect === String(sessionRandomizeEffect);
  });

  filteredEntries.forEach(([key, config]) => {
    // Parse scenario key: e.g., "2_2B_r1 2b sw 0.5-0.3-2"
    const [sectorNum, sectorCode, rest] = key.split('_');
    const restParts = rest.split('-');

    let actions: string[] = [];
    let meanSeaLevel: string;

    if (restParts.length === 4) {
      actions = [restParts[0], restParts[1]];
      meanSeaLevel = restParts[2];
    } else if (restParts.length === 3) {
      actions = [restParts[0]];
      meanSeaLevel = restParts[1];
    } else {
      return;
    }

    const currentRound = meanSeaLevelToRound[meanSeaLevel];
    const prevRound = currentRound - 1;
    const scenarioId = `${sectorNum}_${sectorCode}_${currentRound}`;
    if (matchedScenarios.has(scenarioId)) return;

    // Only process rounds 1, 2, 3
    if (![1, 2, 3].includes(currentRound)) return;

    // Robust sector/user matching
    const sectorActivities = activities.filter(a =>
      (a.userName === `sector-${sectorNum}` || a.userId === `user_sector_${sectorNum}`) &&
      a.value.includes(sectorCode)
    );

    let matched = false;

    if (actions.length === 2) {
      if (currentRound > 1) {
        if (actions[0] === "None" && actions[1] === "None") {
          const prevActivity = sectorActivities.some(a => (a.round ?? 0) === prevRound);
          const currActivity = sectorActivities.some(a => (a.round ?? 0) === currentRound);
          matched = !prevActivity && !currActivity;
        } else if (actions[0] === "None" && actions[1] !== "None") {
          const prevActivity = sectorActivities.some(a => (a.round ?? 0) === prevRound);
          const currActivity = sectorActivities.some(a => a.action === actions[1] && (a.round ?? 0) === currentRound);
          matched = !prevActivity && currActivity;
        } else if (actions[0] !== "None" && actions[1] === "None") {
          const prevActivity = sectorActivities.some(a => a.action === actions[0] && (a.round ?? 0) === prevRound);
          const currActivity = sectorActivities.some(a => (a.round ?? 0) === currentRound);
          matched = prevActivity && !currActivity;
        } else if (actions[0] !== "None" && actions[1] !== "None") {
          const action1Activity = sectorActivities
            .filter(a => a.action === actions[0] && (a.round ?? 0) === prevRound)
            .sort((a, b) => b.timestamp - a.timestamp)[0];
          const action2Activity = sectorActivities
            .filter(a => a.action === actions[1] && (a.round ?? 0) === currentRound && (!action1Activity || a.timestamp > action1Activity.timestamp))
            .sort((a, b) => b.timestamp - a.timestamp)[0];
          matched = !!action1Activity && !!action2Activity;
        }
      }
    } else if (actions.length === 1) {
      if (actions[0] === "None") {
        const currActivity = sectorActivities.some(a => (a.round ?? 0) === currentRound);
        matched = !currActivity;
      } else {
        matched = sectorActivities.some(a => a.action === actions[0] && (a.round ?? 0) === currentRound);
      }
    }

    if (matched) {
      matchedScenarios.add(scenarioId);
      if (typeof config.coin === "number") {
        result[currentRound].totalCoin += config.coin;
      }
      result[currentRound].data.push({ key, config });
    }
  });

  return result;
}

/**
 * Returns a breakdown of score and coins per player for a given round.
 * @param activities Array of ActivityLogType from Firebase.
 * @param sessionRandomizeEffect The randomizeEffect value for the current game session.
 * @param roundNumber The round to calculate (1, 2, or 3)
 * @param baseScore The starting score for the round (e.g., 10000)
 * @returns RoundBreakdown
 */
export function getRoundBreakdownByPlayer(
  activities: ActivityLogType[],
  sessionRandomizeEffect: string | number,
  roundNumber: number,
  baseScore: number = 10000
): RoundBreakdown {
  // Map meanSeaLevel values to round numbers for easy lookup
  const meanSeaLevelToRound: Record<string, number> = {
    "0.3": 1,
    "0.7": 2,
    "1.15": 3,
  };

  // Map sectorNum to player label
  const playerMap: Record<string, string> = {
    "1": "P1",
    "2": "P2",
    "3": "P3",
  };

  // Prepare breakdown object
  const playerBreakdown: Record<string, PlayerBreakdown> = {
    P1: { actionsScore: 0, coinsSpent: 0, scenarios: [] },
    P2: { actionsScore: 0, coinsSpent: 0, scenarios: [] },
    P3: { actionsScore: 0, coinsSpent: 0, scenarios: [] },
  };

  // To avoid double-counting, keep track of which scenario for each sector/subsector/round has already been matched
  const matchedScenarios = new Set<string>();

  // Filter scenarioConfig entries by randomizeEffect and round
  const filteredEntries = Object.entries(sceneSectorConfigurations).filter(([key]) => {
    const [sectorNum, sectorCode, rest] = key.split('_');
    const restParts = rest.split('-');
    const meanSeaLevel = restParts.length === 4 ? restParts[2] : restParts[1];
    const randomizeEffect = restParts[restParts.length - 1];
    const round = meanSeaLevelToRound[meanSeaLevel];
    return (
      randomizeEffect === String(sessionRandomizeEffect) &&
      round === roundNumber
    );
  });

  filteredEntries.forEach(([key, config]) => {
    const [sectorNum, sectorCode, rest] = key.split('_');
    const restParts = rest.split('-');

    let actions: string[] = [];
    let meanSeaLevel: string;

    if (restParts.length === 4) {
      actions = [restParts[0], restParts[1]];
      meanSeaLevel = restParts[2];
    } else if (restParts.length === 3) {
      actions = [restParts[0]];
      meanSeaLevel = restParts[1];
    } else {
      return;
    }

    const currentRound = meanSeaLevelToRound[meanSeaLevel];
    const prevRound = currentRound - 1;
    const scenarioId = `${sectorNum}_${sectorCode}_${currentRound}`;
    if (matchedScenarios.has(scenarioId)) return;

    // Robust sector/user matching
    const sectorActivities = activities.filter(a =>
      (a.userName === `sector-${sectorNum}` || a.userId === `user_sector_${sectorNum}`) &&
      a.value.includes(sectorCode)
    );

    let matched = false;

    if (actions.length === 2) {
      if (currentRound > 1) {
        if (actions[0] === "None" && actions[1] === "None") {
          const prevActivity = sectorActivities.some(a => (a.round ?? 0) === prevRound);
          const currActivity = sectorActivities.some(a => (a.round ?? 0) === currentRound);
          matched = !prevActivity && !currActivity;
        } else if (actions[0] === "None" && actions[1] !== "None") {
          const prevActivity = sectorActivities.some(a => (a.round ?? 0) === prevRound);
          const currActivity = sectorActivities.some(a => a.action === actions[1] && (a.round ?? 0) === currentRound);
          matched = !prevActivity && currActivity;
        } else if (actions[0] !== "None" && actions[1] === "None") {
          const prevActivity = sectorActivities.some(a => a.action === actions[0] && (a.round ?? 0) === prevRound);
          const currActivity = sectorActivities.some(a => (a.round ?? 0) === currentRound);
          matched = prevActivity && !currActivity;
        } else if (actions[0] !== "None" && actions[1] !== "None") {
          const action1Activity = sectorActivities
            .filter(a => a.action === actions[0] && (a.round ?? 0) === prevRound)
            .sort((a, b) => b.timestamp - a.timestamp)[0];
          const action2Activity = sectorActivities
            .filter(a => a.action === actions[1] && (a.round ?? 0) === currentRound && (!action1Activity || a.timestamp > action1Activity.timestamp))
            .sort((a, b) => b.timestamp - a.timestamp)[0];
          matched = !!action1Activity && !!action2Activity;
        }
      }
    } else if (actions.length === 1) {
      if (actions[0] === "None") {
        const currActivity = sectorActivities.some(a => (a.round ?? 0) === currentRound);
        matched = !currActivity;
      } else {
        matched = sectorActivities.some(a => a.action === actions[0] && (a.round ?? 0) === currentRound);
      }
    }

    if (matched) {
      matchedScenarios.add(scenarioId);
      const player = playerMap[sectorNum];
      if (player) {
        playerBreakdown[player].actionsScore += typeof config.score === "number" ? config.score : 0;
        playerBreakdown[player].coinsSpent += typeof config.coin === "number" ? config.coin : 0;
        playerBreakdown[player].scenarios.push({ key, config });
      }
    }
  });

  // Calculate total round points
  const roundPoints = baseScore + Object.values(playerBreakdown).reduce((sum, p) => sum + p.actionsScore, 0);

  return {
    totalPoints: baseScore,
    playerBreakdown,
    roundPoints,
  };
}

function getArrayFirstData(arrayData: ActivityLogType[]) {
  let firstArrayData = null;
  if (arrayData.length > 0) {
    firstArrayData = arrayData[0];
  }

  return firstArrayData;
}


export function getSectorRoundScore(
  activities: ActivityLogType[],
  sessionRandomizeEffect: string | number,
  roundNumber: RoundType,
  userId: UserSectorEnum,
  currentRoundNumber: RoundType,
  gameStatus: GameLobbyStatus,
  roomName: string
) {
  let ERROR_KEY = "";
  let scores: OverallScoresTypes = {
    [userId]: {
      sectorA: {
        scores: [],
        coins: [],
        keys: [],
      },
      sectorB: {
        scores: [],
        coins: [],
        keys: []
      },
      partialTotalScoreToDeduct: 0,
      totalScoreToDeduct: 0,
      totalCoinsToDeduct: 0,
    }
  };

  try {
    const meanSeaLevels: { 1: number; 2: number; 3: number; } = {
      1: 0.3,
      2: 0.7,
      3: 1.15
    }

    const sectorNumber = userId.split("_").pop();

    const isRoundOne = roundNumber === 1;

    const previousSectorActivitiesA = !isRoundOne ? activities.filter(activity => 
      activity.userId === userId && 
      activity.subSector === `${sectorNumber}A` && 
      activity.round === roundNumber - 1 && 
      activity.isCpm
    ) : [];

    const roundOneSectorActivitiesA = activities.filter(activity => 
      activity.userId === userId && 
      activity.subSector === `${sectorNumber}A` && 
      activity.round === 1 && 
      activity.isCpm
    );

    const roundOneSectorActivitiesB = activities.filter(activity => 
      activity.userId === userId && 
      activity.subSector === `${sectorNumber}B` && 
      activity.round === 1 && 
      activity.isCpm
    );

    const sectorActivitiesA = activities.filter(activity => 
      activity.userId === userId && 
      activity.subSector === `${sectorNumber}A` && 
      activity.round === roundNumber && 
      activity.isCpm
    );

    const previousSectorActivitiesB = !isRoundOne ? activities.filter(activity => 
      activity.userId === userId && 
      activity.subSector === `${sectorNumber}B` && 
      activity.round === roundNumber - 1 && 
      activity.isCpm
    ) : [];

    const sectorActivitiesB = activities.filter(activity => 
      activity.userId === userId && 
      activity.subSector === `${sectorNumber}B` && 
      activity.round === roundNumber && 
      activity.isCpm
    );

    // sector A
    if (isRoundOne && sectorActivitiesA.length <= 0) {
      // round1
      const key = `${sectorNumber}_${sectorNumber}A_None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
      ERROR_KEY = key;
      const { coin, score } = sceneSectorConfigurations[key];

      scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
    }

    if (isRoundOne && sectorActivitiesA.length > 0) {
      sectorActivitiesA.map((activity, index: number) => {
        // round 1 previous activity should be the current one
        const isLatestActivityIsDemolished = activity?.isDemolished;
        const previousActivity = sectorActivitiesA[index + 1];

        // is Demolished activity
        if (isLatestActivityIsDemolished && previousActivity) {
          const key = `${sectorNumber}_${sectorNumber}A_${previousActivity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
          ERROR_KEY = key;
          const data = sceneSectorConfigurations[key];
          const score = ((data.coin ?? 0) + 1) * 10;
          const coin = 1;

          scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin, key, roundNumber, currentRoundNumber, gameStatus);
        }

        // Still deduct all the activity that is not demolished status
        if (!isLatestActivityIsDemolished) {
          const key = `${sectorNumber}_${sectorNumber}A_${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
          ERROR_KEY = key;
          const { score, coin } = sceneSectorConfigurations[key];
          scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
        }
      });
    }

    // end

    // Sector B
    if (isRoundOne && sectorActivitiesB.length <= 0) {
      // round1
      const key = `${sectorNumber}_${sectorNumber}B_None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
      ERROR_KEY = key;
      const { coin, score } = sceneSectorConfigurations[key];

      scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
    }

    if (isRoundOne && sectorActivitiesB.length > 0) {
      sectorActivitiesB.map((activity, index: number) => {
        // round 1 previous activity should be the current one
        const isLatestActivityIsDemolished = activity?.isDemolished;
        const previousActivity = sectorActivitiesB[index + 1];

        // is Demolished activity
        if (isLatestActivityIsDemolished && previousActivity) {
          const key = `${sectorNumber}_${sectorNumber}B_${previousActivity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
          ERROR_KEY = key;
          const data = sceneSectorConfigurations[key];
          const score = ((data.coin ?? 0) + 1) * 10;
          const coin = 1;
          scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
        }

        // Still deduct all the activity that is not demolished status
        if (!isLatestActivityIsDemolished) {
          const key = `${sectorNumber}_${sectorNumber}B_${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
          ERROR_KEY = key;
          const { score, coin } = sceneSectorConfigurations[key];

          scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
        }
      });
    }
    // end


    // sector A ROUND 2 and 3
    // sector A
    // No activity at all
    if (!isRoundOne && sectorActivitiesA.length <= 0 && previousSectorActivitiesA.length === 0) {
      // round1
      const key = `${sectorNumber}_${sectorNumber}A_None-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
      ERROR_KEY = key;
      const { coin, score } = sceneSectorConfigurations[key];

      scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
    }

    // If round 2 or 3 doesn't have activity, and naay activity sa previous round
    if (!isRoundOne && sectorActivitiesA.length <= 0 && previousSectorActivitiesA.length > 0) {
      const previousActivity = previousSectorActivitiesA[previousSectorActivitiesA.length - 1];

      // if ang prevous activity kay demolished
      if (previousActivity?.isDemolished) {
        const key = `${sectorNumber}_${sectorNumber}A_None-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
        ERROR_KEY = key;
        const { coin, score } = sceneSectorConfigurations[key];

        scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
      } else { // if ang previous action has action and no activity in curent round
        const key = `${sectorNumber}_${sectorNumber}A_${previousActivity.action}-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
        ERROR_KEY = key;
        console.log(roundNumber, "newKey: ", key, "sectorActivitiesA: ", sectorActivitiesA, "previousSectorActivitiesA: ", previousSectorActivitiesA);
        try {
          const { coin, score } = sceneSectorConfigurations[key];
          scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
        } catch (ex) {
          ERROR_KEY = key;
          // const { coin, score } = sceneSectorConfigurations["default"];
          // scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
        }
      }
    }


    // if no activity previous round and has activity in current round
    if (!isRoundOne && sectorActivitiesA.length > 0) {
      sectorActivitiesA.map((activity, index: number) => {
        // round 1 previous activity should be the current one
        const isLatestActivityIsDemolished = activity?.isDemolished;
        const lastestPreviousRoundSectorActivity = getArrayFirstData(previousSectorActivitiesA);
        const previousActivity = sectorActivitiesA[index + 1];
        const roundOneActivity = getArrayFirstData(roundOneSectorActivitiesA);


        // if current activity is demolish and with has current previous activity
        if (isLatestActivityIsDemolished && previousActivity) {
          if (lastestPreviousRoundSectorActivity) {
            if (lastestPreviousRoundSectorActivity?.isDemolished) { // if first round latest activity is demolish, set to None
              const key = `${sectorNumber}_${sectorNumber}A_None-${previousActivity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;

              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            } else { // if first round latest activity is legit or actual activity, set the first round activity
              const key = `${sectorNumber}_${sectorNumber}A_${lastestPreviousRoundSectorActivity.action}-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;

              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }
          } else { // if no activity in the first round, set to NONE first value
            const key = `${sectorNumber}_${sectorNumber}A_None-${previousActivity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;

              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }
        }

        // if current acitivty is demolish but no current previous activity
        if (isLatestActivityIsDemolished && !previousActivity) {
          if (lastestPreviousRoundSectorActivity) { // Note: this activity should not demolished because the user performed demoplish so the recent activity must be a CPM
            console.log("previousSectorActivitiesA: ", previousSectorActivitiesA, "lastestPreviousRoundSectorActivity: ", lastestPreviousRoundSectorActivity, "roundNumber: ", roundNumber);
            const key = `${sectorNumber}_${sectorNumber}A_${lastestPreviousRoundSectorActivity.action}-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;

            const data = sceneSectorConfigurations[key];
            const score = ((data.coin ?? 0) + 1) * 10;
            const coin = 1;

            scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          } else { // if no activity in the first round, set to NONE first value
            if (currentRoundNumber === 2) {
              const key = `${sectorNumber}_${sectorNumber}A_None-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;

              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }

            if (currentRoundNumber === 3) {
              if (roundOneActivity) { // same logic, no demolish if first activity of round 3 is demolished
                const key = `${sectorNumber}_${sectorNumber}A_${roundOneActivity.action}-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
                ERROR_KEY = key;
                const data = sceneSectorConfigurations[key];
                const score = ((data.coin ?? 0) + 1) * 10;
                const coin = 1;

                scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
              } else {
                const key = `${sectorNumber}_${sectorNumber}A_None-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
                ERROR_KEY = key;
                const data = sceneSectorConfigurations[key];
                const score = ((data.coin ?? 0) + 1) * 10;
                const coin = 1;

                scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
              }
              
            }
          }
        }

        // if current activity is not demolish and with current round previous activity
        if (!isLatestActivityIsDemolished && previousActivity) {
          // if current round previous activity is demolish
          if (previousActivity?.isDemolished) {
            const key = `${sectorNumber}_${sectorNumber}A_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;
            const { score, coin } = sceneSectorConfigurations[key];

            scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }

          if (!previousActivity?.isDemolished) {
            const key = `${sectorNumber}_${sectorNumber}A_${previousActivity.action}-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;
            const { score, coin } = sceneSectorConfigurations[key];

            scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }
        }

        if (!isLatestActivityIsDemolished && !previousActivity) {
          // if round 2 and no activity in round 1
          if (currentRoundNumber === 2 && !lastestPreviousRoundSectorActivity) {
            const key = `${sectorNumber}_${sectorNumber}A_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;
            const { score, coin } = sceneSectorConfigurations[key];

            scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }

          if (currentRoundNumber === 2 && lastestPreviousRoundSectorActivity) {
            if (lastestPreviousRoundSectorActivity?.isDemolished) {
              const key = `${sectorNumber}_${sectorNumber}A_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            } else {
              const key = `${sectorNumber}_${sectorNumber}A_${lastestPreviousRoundSectorActivity.action}-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              console.log("key: ", key);
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }
          }

          // if round 3 but no activity on round 2 and round 1
          if (currentRoundNumber === 3 && !lastestPreviousRoundSectorActivity && !roundOneActivity) {
            const key = `${sectorNumber}_${sectorNumber}A_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;
            const { score, coin } = sceneSectorConfigurations[key];

            scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }

          if (currentRoundNumber === 3 && lastestPreviousRoundSectorActivity) {
            console.log("Current Activity: ", activity, "activies: ", sectorActivitiesA, "previous activities: ", previousSectorActivitiesA, "latest previous round activity: ", lastestPreviousRoundSectorActivity, activities);
            if (lastestPreviousRoundSectorActivity?.isDemolished) {
              const key = `${sectorNumber}_${sectorNumber}A_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            } else {
              const key = `${sectorNumber}_${sectorNumber}A_${lastestPreviousRoundSectorActivity.action}-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }
          }

          if (currentRoundNumber === 3 && !lastestPreviousRoundSectorActivity && roundOneActivity) {
            if (roundOneActivity?.isDemolished) {
              const key = `${sectorNumber}_${sectorNumber}A_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            } else {
              const key = `${sectorNumber}_${sectorNumber}A_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinA(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }
          }
        }
      });
    }

    // sector B ROUND 2 and 3
    // No activity at all
    if (!isRoundOne && sectorActivitiesB.length <= 0 && previousSectorActivitiesB.length === 0) {
      // round1
      const key = `${sectorNumber}_${sectorNumber}B_None-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
      ERROR_KEY = key;
      const { coin, score } = sceneSectorConfigurations[key];

      scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
    }

    // If round 2 or 3 doesn't have activity, and naay activity sa previous round
    if (!isRoundOne && sectorActivitiesB.length <= 0 && previousSectorActivitiesB.length > 0) {
      const previousActivity = previousSectorActivitiesB[previousSectorActivitiesB.length - 1];

      // if ang prevous activity kay demolished
      if (previousActivity?.isDemolished) {
        const key = `${sectorNumber}_${sectorNumber}B_None-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
        ERROR_KEY = key;
        const { coin, score } = sceneSectorConfigurations[key];

        scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
      } else { // if ang previous action has action and no activity in curent round
        const key = `${sectorNumber}_${sectorNumber}B_${previousActivity.action}-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
        ERROR_KEY = key;
        const { coin, score } = sceneSectorConfigurations[key];
        scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus);
      }
    }


    // if no activity previous round and has activity in current round
    if (!isRoundOne && sectorActivitiesB.length > 0) {
      sectorActivitiesB.map((activity, index: number) => {
        // round 1 previous activity should be the current one
        const isLatestActivityIsDemolished = activity?.isDemolished;
        const lastestPreviousRoundSectorActivity = getArrayFirstData(previousSectorActivitiesB);
        const previousActivity = sectorActivitiesB[index + 1];
        const roundOneActivity = getArrayFirstData(roundOneSectorActivitiesB);


        // if current activity is demolish and with has current previous activity
        if (isLatestActivityIsDemolished && previousActivity) {
          if (lastestPreviousRoundSectorActivity) {
            if (lastestPreviousRoundSectorActivity?.isDemolished) { // if first round latest activity is demolish, set to None
              const key = `${sectorNumber}_${sectorNumber}B_None-${previousActivity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;

              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            } else { // if first round latest activity is legit or actual activity, set the first round activity
              const key = `${sectorNumber}_${sectorNumber}B_${lastestPreviousRoundSectorActivity.action}-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;

              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }
          } else { // if no activity in the first round, set to NONE first value
            const key = `${sectorNumber}_${sectorNumber}B_None-${previousActivity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;

              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }
        }

        // if current acitivty is demolish but no current previous activity
        if (isLatestActivityIsDemolished && !previousActivity) {
          if (lastestPreviousRoundSectorActivity) { // Note: this activity should not demolished because the user performed demoplish so the recent activity must be a CPM
            const key = `${sectorNumber}_${sectorNumber}B_${lastestPreviousRoundSectorActivity.action}-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;

            const data = sceneSectorConfigurations[key];
            const score = ((data.coin ?? 0) + 1) * 10;
            const coin = 1;

            scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          } else { // if no activity in the first round, set to NONE first value
            if (currentRoundNumber === 2) {
              const key = `${sectorNumber}_${sectorNumber}B_None-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;

              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }

            if (currentRoundNumber === 3) {
              if (roundOneActivity) { // same logic, no demolish if first activity of round 3 is demolished
                const key = `${sectorNumber}_${sectorNumber}B_${roundOneActivity.action}-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
                ERROR_KEY = key;
                const data = sceneSectorConfigurations[key];
                const score = ((data.coin ?? 0) + 1) * 10;
                const coin = 1;

                scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
              } else {
                const key = `${sectorNumber}_${sectorNumber}B_None-None-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
                ERROR_KEY = key;
                const data = sceneSectorConfigurations[key];
                const score = ((data.coin ?? 0) + 1) * 10;
                const coin = 1;

                scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
              }
              
            }
          }
        }

        // if current activity is not demolish and with current round previous activity
        if (!isLatestActivityIsDemolished && previousActivity) {
          // if current round previous activity is demolish
          if (previousActivity?.isDemolished) {
            const key = `${sectorNumber}_${sectorNumber}B_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;
            const { score, coin } = sceneSectorConfigurations[key];

            scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }

          if (!previousActivity?.isDemolished) {
            const key = `${sectorNumber}_${sectorNumber}B_${previousActivity.action}-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;
            const { score, coin } = sceneSectorConfigurations[key];

            scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }
        }

        if (!isLatestActivityIsDemolished && !previousActivity) {
          // if round 2 and no activity in round 1
          if (currentRoundNumber === 2 && !lastestPreviousRoundSectorActivity) {
            const key = `${sectorNumber}_${sectorNumber}B_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;
            const { score, coin } = sceneSectorConfigurations[key];

            scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }

          if (currentRoundNumber === 2 && lastestPreviousRoundSectorActivity) {
            if (lastestPreviousRoundSectorActivity?.isDemolished) {
              const key = `${sectorNumber}_${sectorNumber}B_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            } else {
              const key = `${sectorNumber}_${sectorNumber}B_${lastestPreviousRoundSectorActivity.action}-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }
          }

          // if round 3 but no activity on round 2 and round 1
          if (currentRoundNumber === 3 && !lastestPreviousRoundSectorActivity && !roundOneActivity) {
            const key = `${sectorNumber}_${sectorNumber}B_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
            ERROR_KEY = key;
            const { score, coin } = sceneSectorConfigurations[key];

            scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
          }

          if (currentRoundNumber === 3 && lastestPreviousRoundSectorActivity) {
            if (lastestPreviousRoundSectorActivity?.isDemolished) {
              const key = `${sectorNumber}_${sectorNumber}B_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            } else {
              const key = `${sectorNumber}_${sectorNumber}B_${lastestPreviousRoundSectorActivity.action}-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }
          }

          if (currentRoundNumber === 3 && !lastestPreviousRoundSectorActivity && roundOneActivity) {
            if (roundOneActivity?.isDemolished) {
              const key = `${sectorNumber}_${sectorNumber}B_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const data = sceneSectorConfigurations[key];
              const score = ((data.coin ?? 0) + 1) * 10;
              const coin = 1;

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            } else {
              const key = `${sectorNumber}_${sectorNumber}B_None-${activity.action}-${meanSeaLevels[roundNumber]}-${sessionRandomizeEffect}`;
              ERROR_KEY = key;
              const { score, coin } = sceneSectorConfigurations[key];

              scores = addUpScoreAndCoinB(Object.assign(scores), userId, score ?? 0, coin ?? 0, key, roundNumber, currentRoundNumber, gameStatus); 
            }
          }
        }
      });
    }
  } catch (error) {
    try {
      const date = new Date();
      const formattedDate = date.toLocaleString('en-US', {
        weekday: 'long', // "Monday"
        year: 'numeric', // "2023"
        month: 'long', // "October"
        day: 'numeric', // "30"
        hour: 'numeric', // "10"
        minute: 'numeric', // "30"
        second: 'numeric', // "15"
        hour12: true // "AM/PM" format
      });

      const leaderboardRef = ref(database, 'errorKeys');
        const newEntryRef = push(leaderboardRef);
      
        set(newEntryRef, {
          created: formattedDate,
          timestamp: Date.now(),
          roomName,
          errorKey: ERROR_KEY,
          activities: activities
        });
      } catch(error2) {}
  }

  return scores;
}

export const addUpScoreAndCoinA = (
  scoreData: OverallScoresTypes,
  userId: UserSectorEnum,
  score: number,
  coin: number,
  key: string,
  round: number,
  currentRound: number,
  gameStatus: GameLobbyStatus) => {
  const newScoreData = {...scoreData};
  if (gameStatus === GameLobbyStatus.ROUND_GAMEPLAY) {
    if (currentRound === 1 && key.includes("_None-")) {
      newScoreData[userId]!.partialTotalScoreToDeduct += score;
    }
    if (currentRound === 2 && key.includes("-None-0")) {
      newScoreData[userId]!.partialTotalScoreToDeduct += score;
    }
    if (currentRound === 3 && key.includes("-None-1")) {
      newScoreData[userId]!.partialTotalScoreToDeduct += score;
    }
  }

  

  newScoreData[userId]!.sectorA.scores.push(score);
  newScoreData[userId]!.sectorA.coins.push(coin);
  newScoreData[userId]!.sectorA.keys.push(key);
  newScoreData[userId]!.totalScoreToDeduct += score; 
  newScoreData[userId]!.totalCoinsToDeduct += coin; 
  newScoreData[userId]!.totalScoreToDeductInRound = newScoreData[userId]!.totalScoreToDeduct - newScoreData[userId]!.partialTotalScoreToDeduct;

  return newScoreData;
}

export const addUpScoreAndCoinB = (
  scoreData: OverallScoresTypes,
  userId: UserSectorEnum,
  score: number,
  coin: number,
  key: string,
  round: number,
  currentRound: number,
  gameStatus: GameLobbyStatus
) => {
  const newScoreData = {...scoreData};
  if (!(gameStatus !== GameLobbyStatus.ROUND_GAMEPLAY)) {
    if (currentRound === 1 && key.includes("_None-")) {
      newScoreData[userId]!.partialTotalScoreToDeduct += score;
    }
    if (currentRound === 2 && key.includes("-None-0")) {
      newScoreData[userId]!.partialTotalScoreToDeduct += score;
    }
    if (currentRound === 3 && key.includes("-None-1")) {
      newScoreData[userId]!.partialTotalScoreToDeduct += score;
    }
  }

  newScoreData[userId]!.sectorB.scores.push(score);
  newScoreData[userId]!.sectorB.coins.push(coin);
  newScoreData[userId]!.sectorB.keys.push(key);
  newScoreData[userId]!.totalScoreToDeduct += score; 
  newScoreData[userId]!.totalCoinsToDeduct += coin;
  newScoreData[userId]!.totalScoreToDeductInRound = newScoreData[userId]!.totalScoreToDeduct - newScoreData[userId]!.partialTotalScoreToDeduct;

  return newScoreData;
}

/**
 * Coordinates content between main screen and controllers based on game phase
 * @param currentPhase The current game lobby status
 * @param currentRound The current round number
 * @returns GameContentState with what to show on main screen vs controllers
 */
export function getGameContentCoordination(
  currentPhase: GameLobbyStatus,
  currentRound: number
): GameContentState {
  let mainScreenContent: MainScreenContent = 'overworld';
  let controllerContent: GameLobbyStatus = currentPhase;

  switch (currentPhase) {
    case GameLobbyStatus.INTRODUCTION:
      // Show storyline content on main screen
      mainScreenContent = 'storyline';
      break;
    
    case GameLobbyStatus.ROUND_STORYLINE:
      // Show storyline on main screen, instructions on controllers
      mainScreenContent = 'storyline';
      controllerContent = GameLobbyStatus.ROUND_STORYLINE;
      break;

    case GameLobbyStatus.ROUND_GAMEPLAY:
      // Show overworld on main screen, game interface on controllers
      mainScreenContent = 'overworld';
      break;
    
    case GameLobbyStatus.ROUND_CUTSCENES:
      // Show cutscenes on main screen, maybe status on controllers
      mainScreenContent = 'cutscenes';
      break;
    
    case GameLobbyStatus.ROUND_SCORE_BREAKDOWN:
      // Could show scores on main screen or keep overworld
      mainScreenContent = 'overworld';
      break;
    
    case GameLobbyStatus.ENDING:
      // Show ending on main screen, congrats on controllers
      mainScreenContent = 'ending';
      break;
    
    case GameLobbyStatus.TEAM_NAME_INPUT:
      // Show ending/leaderboard prep on main screen, input form on controllers
      mainScreenContent = 'leaderboard';
      break;
    
    case GameLobbyStatus.LEADERBOARD_DISPLAY:
      // Show leaderboard on main screen, maybe final congrats on controllers
      mainScreenContent = 'leaderboard';
      break;
    
    default:
      // Default to overworld for any other phases
      mainScreenContent = 'overworld';
      break;
  }

  return {
    mainScreenContent,
    controllerContent,
    currentRound,
  };
}

/**
 * Gets the appropriate storyline content for the main screen based on current phase and round
 * @param currentPhase The current game lobby status
 * @param currentRound The current round number
 * @returns Storyline content object
 */
export function getMainScreenStoryline(
  currentPhase: GameLobbyStatus,
  currentRound: number
): { title: string; content: string; years: string } {
  switch (currentPhase) {
    case GameLobbyStatus.INTRODUCTION:
      return {
        title: "Welcome to Coastal Protectors",
        content: "The year is 2025. Sea levels are beginning to rise. Your team must work together to protect our coastlines for the next 75 years.",
        years: "2025 - 2100"
      };
    

    
    case GameLobbyStatus.ROUND_STORYLINE:
      switch (currentRound) {
        case 1:
          return {
            title: "Round 1: The First Challenge",
            content: "2025-2050: Sea levels begin to rise. Initial protection measures are crucial. Build your first line of defense.",
            years: "2025 - 2050"
          };
        case 2:
          return {
            title: "Round 2: Rising Tides",
            content: "2050-2075: Sea levels accelerate. Your initial defenses will be tested. Upgrade and expand your protection systems.",
            years: "2050 - 2075"
          };
        case 3:
          return {
            title: "Round 3: Final Stand",
            content: "2075-2100: Maximum sea level rise. This is your final chance to save the coast. Deploy your ultimate protection strategies.",
            years: "2075 - 2100"
          };
        default:
          return {
            title: "Round " + currentRound,
            content: "Protect your sector from rising seas.",
            years: "Future"
          };
      }
    
    case GameLobbyStatus.ENDING:
      return {
        title: "Mission Complete",
        content: "2100: Your efforts have shaped the future of our coastlines. See how your team performed against the challenge of rising seas.",
        years: "2100"
      };
    
    default:
      return {
        title: "Coastal Protectors",
        content: "Work together to protect our coastlines from rising seas.",
        years: "2025 - 2100"
      };
  }
}