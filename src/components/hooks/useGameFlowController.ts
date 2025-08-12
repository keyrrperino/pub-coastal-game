import { useState, useEffect, useCallback } from 'react';
import { GameLobbyStatus, LobbyStateEnum } from '@/lib/enums';
import { LobbyStateType } from '@/lib/types';
import { serverTimestamp } from 'firebase/database';
import { lobbyStateDefaultValue } from '@/lib/constants';

interface GameFlowControllerReturn {
  currentPhase: GameLobbyStatus;
  currentRound: number;
  isTransitioning: boolean;
  startGameFlow: () => void;
  getPhaseDuration: (phase: GameLobbyStatus) => number;
  resetGameFlow: () => void;
  startActualGameFlow: () => void;
}

const PHASE_DURATIONS: Record<GameLobbyStatus, number> = {
  [GameLobbyStatus.INTRODUCTION]: 15,
  [GameLobbyStatus.TUTORIAL]: 15,
  [GameLobbyStatus.ROUND_STORYLINE]: 15,
  [GameLobbyStatus.ROUND_INSTRUCTIONS]: 15,
  [GameLobbyStatus.ROUND_GAMEPLAY]: 30,
  [GameLobbyStatus.ROUND_CUTSCENES]: 30,
  [GameLobbyStatus.ROUND_SCORE_BREAKDOWN]: 5,
  [GameLobbyStatus.ENDING]: 15,
  [GameLobbyStatus.LEADERBOARD_DISPLAY]: 5,
  [GameLobbyStatus.TEAM_NAME_INPUT]: 0, // Manual transition
  [GameLobbyStatus.INITIALIZING]: 0,
  [GameLobbyStatus.PREPARING]: 0,
  [GameLobbyStatus.STARTED]: 0,
  [GameLobbyStatus.ENDED]: 0,
  [GameLobbyStatus.RESTARTING]: 0,
  [GameLobbyStatus.ROUND_ONE_GAME_ENDED]: 0,
  [GameLobbyStatus.ROUND_TWO_GAME_ENDED]: 0,
  [GameLobbyStatus.ROUND_THREE_THREE_GAME_ENDED]: 0,
};

const GAME_FLOW_SEQUENCE: GameLobbyStatus[] = [
  GameLobbyStatus.INTRODUCTION,
  GameLobbyStatus.ROUND_STORYLINE,
  GameLobbyStatus.ROUND_INSTRUCTIONS,
  GameLobbyStatus.ROUND_GAMEPLAY,
  GameLobbyStatus.ROUND_CUTSCENES,
  GameLobbyStatus.ROUND_SCORE_BREAKDOWN,
  GameLobbyStatus.ROUND_STORYLINE,
  GameLobbyStatus.ROUND_INSTRUCTIONS,
  GameLobbyStatus.ROUND_GAMEPLAY,
  GameLobbyStatus.ROUND_CUTSCENES,
  GameLobbyStatus.ROUND_SCORE_BREAKDOWN,
  GameLobbyStatus.ROUND_STORYLINE,
  GameLobbyStatus.ROUND_INSTRUCTIONS,
  GameLobbyStatus.ROUND_GAMEPLAY,
  GameLobbyStatus.ROUND_CUTSCENES,
  GameLobbyStatus.ROUND_SCORE_BREAKDOWN,
  GameLobbyStatus.ENDING,
  GameLobbyStatus.TEAM_NAME_INPUT,
  GameLobbyStatus.LEADERBOARD_DISPLAY,
];

const createDefaultLobbyState = (overrides: Partial<LobbyStateType> = {}): LobbyStateType => ({
  ...lobbyStateDefaultValue,
  ...overrides,
});

export { createDefaultLobbyState };

export function useGameFlowController(
  lobbyState: LobbyStateType | null,
  setLobbyState: React.Dispatch<React.SetStateAction<LobbyStateType | null>>
): GameFlowControllerReturn {
  const [currentPhase, setCurrentPhase] = useState<GameLobbyStatus>(GameLobbyStatus.INTRODUCTION);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [flowIndex, setFlowIndex] = useState<number>(0);

  const getPhaseDuration = useCallback((phase: GameLobbyStatus): number => {
    return PHASE_DURATIONS[phase] || 0;
  }, []);



  const startGameFlow = useCallback(() => {
    // This function is now handled by the handlePlayerReady function instead
    // which properly updates Firebase without race conditions
  }, []);

  const startActualGameFlow = useCallback(() => {
    const phaseDuration = getPhaseDuration(GameLobbyStatus.INTRODUCTION);
    setCurrentPhase(GameLobbyStatus.INTRODUCTION);
    setFlowIndex(0);
    setCurrentRound(1);
    setIsTransitioning(false);
    setLobbyState(prev => createDefaultLobbyState({
      ...(prev || {}),
      gameLobbyStatus: GameLobbyStatus.INTRODUCTION,
      round: 1,
      phaseStartTime: Date.now(),
      phaseDuration: phaseDuration
    }));
  }, [setLobbyState, getPhaseDuration]);

  const resetGameFlow = useCallback(() => {
    const phaseDuration = getPhaseDuration(GameLobbyStatus.INTRODUCTION);
    setCurrentPhase(GameLobbyStatus.INTRODUCTION);
    setFlowIndex(0);
    setCurrentRound(1);
    setIsTransitioning(false);
    setLobbyState(prev => createDefaultLobbyState({
      ...(prev || {}),
      gameLobbyStatus: GameLobbyStatus.INTRODUCTION,
      round: 1,
      phaseStartTime: Date.now(),
      phaseDuration: phaseDuration,
      readyPlayers: {} // Reset ready players
    }));
  }, [setLobbyState, getPhaseDuration]);

  // Monitor player readiness and auto-start game when all players are ready
  useEffect(() => {
    if (lobbyState && lobbyState.gameLobbyStatus === GameLobbyStatus.PREPARING) {
      const readyCount = Object.values(lobbyState.readyPlayers || {}).filter(ready => ready).length;
      
      if (readyCount >= 3) { // All 3 players are ready
        console.log('All players are ready! Starting game flow...');
        startActualGameFlow();
      }
    }
  }, [lobbyState?.readyPlayers, lobbyState?.gameLobbyStatus, startActualGameFlow]);

  // Sync with lobby state changes from other clients
  useEffect(() => {
    if (lobbyState && lobbyState.gameLobbyStatus && lobbyState.gameLobbyStatus !== currentPhase) {
      setCurrentPhase(lobbyState.gameLobbyStatus);
      
      // Update flow index based on current phase
      const phaseIndex = GAME_FLOW_SEQUENCE.indexOf(lobbyState.gameLobbyStatus);
      if (phaseIndex !== -1) {
        setFlowIndex(phaseIndex);
        
        // Update round number
        const roundNumber = Math.floor(phaseIndex / 6) + 1;
        setCurrentRound(roundNumber);
      }
    }
  }, [lobbyState?.gameLobbyStatus, currentPhase]);

  return {
    currentPhase,
    currentRound,
    isTransitioning,
    startGameFlow,
    getPhaseDuration,
    resetGameFlow,
    startActualGameFlow,
  };
}