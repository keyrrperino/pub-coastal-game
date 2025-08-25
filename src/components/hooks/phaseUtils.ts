import { GameLobbyStatus } from '@/lib/enums';

// Phase duration configuration
export const PHASE_DURATIONS: Record<GameLobbyStatus, number> = {
  [GameLobbyStatus.INTRODUCTION]: 75,
  [GameLobbyStatus.ROUND_STORYLINE]: 15,
  [GameLobbyStatus.ROUND_GAMEPLAY]: 30,
  [GameLobbyStatus.ROUND_CUTSCENES]: 45,
  [GameLobbyStatus.ROUND_SCORE_BREAKDOWN]: 5,
  [GameLobbyStatus.ROUND_ANIMATION]: 5,
  [GameLobbyStatus.ENDING]: 15,
  [GameLobbyStatus.TEAM_NAME_INPUT]: 0, // Manual transition
  [GameLobbyStatus.LEADERBOARD_DISPLAY]: 5,
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