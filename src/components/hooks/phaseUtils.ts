import { GameLobbyStatus } from '@/lib/enums';

// Phase duration configuration
export const PHASE_DURATIONS: Record<GameLobbyStatus, number> = {
  [GameLobbyStatus.INTRODUCTION]: 3000000,
  [GameLobbyStatus.ROUND_STORYLINE]: 1500000,
  [GameLobbyStatus.ROUND_GAMEPLAY]: 3000000,
  [GameLobbyStatus.ROUND_CUTSCENES]: 3300000,
  [GameLobbyStatus.ROUND_SCORE_BREAKDOWN]: 500000,
  [GameLobbyStatus.ENDING]: 1500000,
  [GameLobbyStatus.TEAM_NAME_INPUT]: 0, // Manual transition
  [GameLobbyStatus.LEADERBOARD_DISPLAY]: 500000,
  [GameLobbyStatus.INITIALIZING]: 0,
  [GameLobbyStatus.PREPARING]: 0,
  [GameLobbyStatus.RESTARTING]: 0,
  [GameLobbyStatus.STARTED]: 0,
  [GameLobbyStatus.ENDED]: 0,
  [GameLobbyStatus.ROUND_ONE_GAME_ENDED]: 0
};

// Utility function to get phase duration
export function getPhaseDuration(phase: GameLobbyStatus): number {
  return PHASE_DURATIONS[phase] || 0;
}

// Utility function to check if phase has automatic timing
export function hasAutomaticTiming(phase: GameLobbyStatus): boolean {
  return PHASE_DURATIONS[phase] > 0;
}