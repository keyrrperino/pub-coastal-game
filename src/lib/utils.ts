import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ActivityTypeEnum, CutScenesEnum, GameLobbyStatus, UserSectorEnum } from "./enums";
import { ActivityLogType, NormalizedActivities } from "./types";
import { sceneSectorConfigurations, subSectors, userIdToSector } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomEffectValue(): number {
  const values = [0.5, 1, 2];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

export function hasActivityForSubSector(activities: ActivityLogType[], userId: string, subSector: string) {
  return activities.some(
    (a) => {
      return a.userId === userId && extractSubSector(a.value) === subSector
    }
  );
}

export function isGameOnGoing(value: GameLobbyStatus) {
  return !![GameLobbyStatus.STARTED, GameLobbyStatus.ROUND_ONE_GAME_ENDED].includes(value);
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
        return actSector === sector && actSubSector === subSector;
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
export function calculateOverallScore(
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
        console.log(actSector, actSubSector);
        return a.value && a.value.trim() !== "" && actSector === sector && actSubSector === subSector;
      })
      .slice(-1)[0];

    console.log('activity: ', activity)

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

    console.log(`${key}: `, config?.score);
    if (config) {
      totalScore += config.score;
    }
  });

  // Start from 10,000 and add the (negative) totalScore
  console.log('totalScore: ', totalScore);
  return 10000 + totalScore;
}

export function getMeanSeaLevelForRound(round: number): number {
  if (round === 1) return 0.3;
  if (round === 2) return 0.7;
  if (round === 3) return 1;
  return 0.3; // default/fallback
}