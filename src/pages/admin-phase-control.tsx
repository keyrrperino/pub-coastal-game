import { useEffect, useState } from 'react';
import { GameLobbyStatus, LobbyStateEnum } from '@/lib/enums';
import { GameRoomService } from '@/lib/gameRoom';
import { getPhaseDuration } from '@/components/hooks/phaseUtils';
import {
  GAME_ROUND_TIMER,
  lobbyStateDefaultValue,
} from '@/lib/constants';

const gameRoomService = new GameRoomService();

// Single round cycle that repeats based on current round
const ROUND_PHASES = [
  GameLobbyStatus.ROUND_STORYLINE,
  GameLobbyStatus.ROUND_GAMEPLAY,
  GameLobbyStatus.ROUND_CUTSCENES,
  GameLobbyStatus.ROUND_ANIMATION,
  GameLobbyStatus.ROUND_SCORE_BREAKDOWN,
];

const PRE_GAME_PHASES = [GameLobbyStatus.INTRODUCTION];

const POST_GAME_PHASES = [
  GameLobbyStatus.ENDING,
  GameLobbyStatus.TEAM_NAME_INPUT,
  GameLobbyStatus.LEADERBOARD_DISPLAY,
];

// Build complete phase sequence
const PHASE_SEQUENCE = [
  ...PRE_GAME_PHASES,
  ...ROUND_PHASES, // Round 1
  ...ROUND_PHASES, // Round 2
  ...ROUND_PHASES, // Round 3
  ...POST_GAME_PHASES,
];

// Simple round management: use Firebase as source of truth
const shouldIncrementRound = (
  newPhase: GameLobbyStatus,
  currentPhase: GameLobbyStatus,
): boolean => {
  // Increment round when entering ROUND_STORYLINE from a non-storyline phase
  return (
    newPhase === GameLobbyStatus.ROUND_STORYLINE &&
    currentPhase !== GameLobbyStatus.ROUND_STORYLINE
  );
};

export default function AdminPhaseControl() {
  const [currentPhase, setCurrentPhase] = useState<GameLobbyStatus>(
    GameLobbyStatus.INTRODUCTION,
  );
  const [selectedPhase, setSelectedPhase] = useState<GameLobbyStatus>(
    GameLobbyStatus.INTRODUCTION,
  );
  const [isConnected, setIsConnected] = useState(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentPhaseIndex, setCurrentPhaseIndex] =
    useState<number>(0);
  const [room, setRoom] = useState<string>('default');

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await gameRoomService.joinRoom(room ?? 'default');
        setIsConnected(true);

        // Listen to phase changes
        gameRoomService.onLobbyStateChange((lobbyState) => {
          console.log('🔥 Firebase lobbyState changed:', lobbyState);

          if (lobbyState.gameLobbyStatus) {
            setCurrentPhase(lobbyState.gameLobbyStatus);

            // Set current phase index
            const phaseIndex = PHASE_SEQUENCE.indexOf(
              lobbyState.gameLobbyStatus,
            );
            if (phaseIndex !== -1) {
              setCurrentPhaseIndex(phaseIndex);
            }
          }

          // Also get round from Firebase if available
          if (lobbyState.round !== undefined) {
            console.log(
              `🔥 Firebase round value: ${lobbyState.round}`,
            );
            setCurrentRound(lobbyState.round);
          }
        });
      } catch (error) {
        console.error('Failed to connect:', error);
      }
    };

    initializeConnection();

    return () => {
      gameRoomService.disconnect();
    };
  }, [room]);

  const updatePhase = async (newPhase: GameLobbyStatus) => {
    console.log(
      `🚀 updatePhase called with: ${newPhase} (current: ${currentPhase})`,
    );

    if (!isConnected) {
      console.log('❌ Not connected, aborting updatePhase');
      return;
    }

    const phaseDuration = getPhaseDuration(newPhase);

    try {
      console.log('🔥 Starting Firebase updates...');

      // Always update the phase first
      console.log(`🔥 Updating phase to: ${newPhase}`);
      await gameRoomService.updateLobbyStateKeyValue(
        LobbyStateEnum.GAME_LOBBY_STATUS,
        newPhase,
      );
      console.log('✅ Phase updated successfully');

      // Increment round if entering ROUND_STORYLINE from different phase
      if (shouldIncrementRound(newPhase, currentPhase)) {
        const newRound = Math.min(currentRound + 1, 3); // Cap at round 3
        console.log(
          `🎯 Incrementing round: ${currentRound} → ${newRound}`,
        );
        await gameRoomService.updateLobbyStateKeyValue(
          LobbyStateEnum.ROUND,
          newRound,
        );
        console.log(`✅ Round incremented to: ${newRound}`);
      }

      // Reset timer when entering ROUND_GAMEPLAY phase
      if (newPhase === GameLobbyStatus.ROUND_GAMEPLAY) {
        console.log('⏰ Updating timer for gameplay phase');
        await gameRoomService.updatePhaseStartTimeWithServerTimestamp();
        await gameRoomService.updateLobbyStateKeyValue(
          LobbyStateEnum.PHASE_DURATION,
          GAME_ROUND_TIMER,
        );
        console.log(
          `✅ Timer reset for gameplay phase: ${GAME_ROUND_TIMER}s`,
        );
      } else {
        console.log('⏰ Updating timer for regular phase');
        // For other phases, just update duration and start time normally
        await gameRoomService.updatePhaseStartTimeWithServerTimestamp();
        await gameRoomService.updateLobbyStateKeyValue(
          LobbyStateEnum.PHASE_DURATION,
          phaseDuration,
        );
        console.log(
          `✅ Timer updated with duration: ${phaseDuration}s`,
        );
      }

      console.log(
        `🎉 All updates complete. Phase: ${newPhase}, Round: ${currentRound}`,
      );
    } catch (error) {
      console.error('💥 Failed to update phase:', error);
    }
  };

  const resetAdminPhaseControl = async () => {
    if (!isConnected) return;

    const confirmReset = window.confirm(
      'Are you sure you want to reset the Admin Phase Control? This will:\n\n' +
        '• Reset all game state to defaults\n' +
        '• Clear all activity logs\n' +
        '• Reset all player ready states\n' +
        '• Set phase back to INTRODUCTION\n' +
        '• Set round to 0\n' +
        '• Clear all coin spending data\n\n' +
        'This action cannot be undone!',
    );

    if (!confirmReset) return;

    try {
      // Reset lobby state to default
      await gameRoomService.updateLobbyState(lobbyStateDefaultValue);

      // Explicitly set phase to INTRODUCTION and round to 0
      await gameRoomService.updateLobbyStateKeyValue(
        LobbyStateEnum.GAME_LOBBY_STATUS,
        GameLobbyStatus.INTRODUCTION,
      );
      await gameRoomService.updateLobbyStateKeyValue(
        LobbyStateEnum.ROUND,
        0,
      );

      // Clear all activities
      await gameRoomService.deleteActivities();

      // Reset all players ready state
      await gameRoomService.resetAllPlayersReady();

      console.log(
        'Admin Phase Control has been reset - phase: INTRODUCTION, round: 0',
      );
    } catch (error) {
      console.error('Failed to reset Admin Phase Control:', error);
      alert(
        'Failed to reset Admin Phase Control. Check console for details.',
      );
    }
  };

  const deleteFirebaseRoom = async () => {
    if (!isConnected) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to DELETE and recreate the Firebase room? This will:\n\n' +
        '• PERMANENTLY DELETE the entire room from Firebase\n' +
        '• Remove all game data, activities, presence, and state\n' +
        '• Recreate the room with default lobby state\n' +
        '• Reset to INTRODUCTION phase with round 1\n\n' +
        'WARNING: This action is IRREVERSIBLE!',
    );

    if (!confirmDelete) return;

    try {
      // Delete the entire room first
      await gameRoomService.deleteEntireRoom();
      console.log('Firebase room has been completely deleted');

      // Recreate the room with default state
      await gameRoomService.createRoom(room);
      console.log(
        'Firebase room has been recreated with default state',
      );

      // The room is recreated and we're still connected, so the listeners will pick up the new state
      alert(
        'Firebase room has been deleted and recreated with default settings.',
      );
    } catch (error) {
      console.error(
        'Failed to delete and recreate Firebase room:',
        error,
      );
      alert(
        'Failed to delete and recreate Firebase room. Check console for details.',
      );
    }
  };

  const goToNextPhase = () => {
    // Special logic: if current is Round 3 Score Breakdown, go to ENDING
    if (
      currentPhase === GameLobbyStatus.ROUND_SCORE_BREAKDOWN &&
      currentRound === 3
    ) {
      updatePhase(GameLobbyStatus.ENDING);
      return;
    }

    const nextIndex = (currentPhaseIndex + 1) % PHASE_SEQUENCE.length;
    updatePhase(PHASE_SEQUENCE[nextIndex]);
  };

  const goToPreviousPhase = () => {
    const prevIndex =
      currentPhaseIndex === 0
        ? PHASE_SEQUENCE.length - 1
        : currentPhaseIndex - 1;
    updatePhase(PHASE_SEQUENCE[prevIndex]);
  };

  const getPhaseRoundInfo = (phaseIndex: number) => {
    const phase = PHASE_SEQUENCE[phaseIndex];

    // Determine round based on position in sequence
    let round = currentRound;
    if (phaseIndex >= 2 && phaseIndex <= 6)
      round = 1; // First round cycle
    else if (phaseIndex >= 7 && phaseIndex <= 11)
      round = 2; // Second round cycle
    else if (phaseIndex >= 12 && phaseIndex <= 16) round = 3; // Third round cycle

    return {
      phase,
      round,
      isRoundPhase: phase.startsWith('ROUND_'), // Any phase that starts with ROUND_
    };
  };

  const getNextPhaseInfo = () => {
    // Special case: Round 3 Score Breakdown -> ENDING
    if (
      currentPhase === GameLobbyStatus.ROUND_SCORE_BREAKDOWN &&
      currentRound === 3
    ) {
      return {
        phase: GameLobbyStatus.ENDING,
        round: 3,
        isRoundPhase: false,
      };
    }

    const nextIndex = (currentPhaseIndex + 1) % PHASE_SEQUENCE.length;
    return getPhaseRoundInfo(nextIndex);
  };

  const getPreviousPhaseInfo = () => {
    const prevIndex =
      currentPhaseIndex === 0
        ? PHASE_SEQUENCE.length - 1
        : currentPhaseIndex - 1;
    return getPhaseRoundInfo(prevIndex);
  };

  if (!isConnected) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Admin Phase Control
        </h1>
        <p>Connecting to Firebase...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Admin Phase Control</h1>

      <div className="space-y-6">
        {/* Current Phase Display */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Current Status:
          </h2>
          <p className="text-xl text-blue-600">{currentPhase}</p>
          <p className="text-lg text-gray-600">
            Round {currentRound}
          </p>
          <p className="text-sm text-gray-500">
            Phase Index: {currentPhaseIndex + 1} of{' '}
            {PHASE_SEQUENCE.length}
          </p>
        </div>

        {/* Phase Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Specify Room:
          </label>
          <input
            type="text"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter room name"
          />
          <label className="block text-sm font-medium mb-2">
            Select Phase:
          </label>
          <select
            value={selectedPhase}
            onChange={(e) =>
              setSelectedPhase(e.target.value as GameLobbyStatus)
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.values(GameLobbyStatus).map((phase) => (
              <option key={phase} value={phase}>
                {phase}
              </option>
            ))}
          </select>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={goToPreviousPhase}
            className="w-32 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex flex-col items-center"
          >
            <span>← Previous</span>
            <span className="text-xs mt-1 truncate max-w-full">
              {(() => {
                const prevInfo = getPreviousPhaseInfo();
                return prevInfo.isRoundPhase
                  ? `${prevInfo.phase.replace('ROUND_', '')}`
                  : prevInfo.phase;
              })()}
            </span>
          </button>

          <button
            onClick={goToNextPhase}
            className="w-32 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex flex-col items-center"
          >
            <span>Next →</span>
            <span className="text-xs mt-1 truncate max-w-full">
              {(() => {
                const nextInfo = getNextPhaseInfo();
                return nextInfo.isRoundPhase
                  ? `${nextInfo.phase.replace('ROUND_', '')}`
                  : nextInfo.phase;
              })()}
            </span>
          </button>

          <button
            onClick={() => updatePhase(selectedPhase)}
            className="w-40 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Set Selected Phase
          </button>
        </div>

        <div className="text-sm text-gray-600 mt-2">
          <p>
            💡 <strong>Navigation:</strong> Previous/Next buttons
            automatically handle round transitions and show the next
            phase with round info.
          </p>
          <p>
            🎯 <strong>Auto-logic:</strong> Round number updates when
            entering ROUND_STORYLINE. Timer resets when entering
            ROUND_GAMEPLAY.
          </p>
        </div>

        {/* Reset Controls */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-3 text-red-600">
            Reset Options:
          </h3>
          <div className="space-y-4">
            <div>
              <button
                onClick={resetAdminPhaseControl}
                className="px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
              >
                Reset Admin Phase Control
              </button>
              <p className="text-sm text-gray-600 mt-2">
                🎮 <strong>For Admin Phase Control usage:</strong>{' '}
                Resets game state, sets round to 0, returns to
                INTRODUCTION phase. Use this when controlling the game
                through the admin interface.
              </p>
            </div>

            <div>
              <button
                onClick={deleteFirebaseRoom}
                className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                DELETE & Recreate Firebase Room
              </button>
              <p className="text-sm text-gray-600 mt-2">
                📱 <strong>For Main Screen/Player usage:</strong>{' '}
                Permanently deletes the entire Firebase room and
                recreates it with default lobby state. Use this when
                players need a completely fresh start. Cannot be
                undone!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
