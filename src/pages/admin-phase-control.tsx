import { useState, useEffect } from 'react';
import { GameLobbyStatus, LobbyStateEnum } from '@/lib/enums';
import { GameRoomService } from '@/lib/gameRoom';
import { getPhaseDuration } from '@/components/hooks/phaseUtils';
import { GAME_ROUND_TIMER, lobbyStateDefaultValue } from '@/lib/constants';

const gameRoomService = new GameRoomService();

const PHASE_SEQUENCE = [
  GameLobbyStatus.INTRODUCTION,
  GameLobbyStatus.TUTORIAL,
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

export default function AdminPhaseControl() {
  const [currentPhase, setCurrentPhase] = useState<GameLobbyStatus>(GameLobbyStatus.INTRODUCTION);
  const [selectedPhase, setSelectedPhase] = useState<GameLobbyStatus>(GameLobbyStatus.INTRODUCTION);
  const [isConnected, setIsConnected] = useState(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await gameRoomService.joinRoom('default');
        setIsConnected(true);

        // Listen to phase changes
        gameRoomService.onLobbyStateChange((lobbyState) => {
          if (lobbyState.gameLobbyStatus) {
            setCurrentPhase(lobbyState.gameLobbyStatus);
            
            // Calculate current phase index and round
            const phaseIndex = PHASE_SEQUENCE.indexOf(lobbyState.gameLobbyStatus);
            if (phaseIndex !== -1) {
              setCurrentPhaseIndex(phaseIndex);
              // Calculate round number based on phase sequence
              const roundNumber = Math.floor(phaseIndex / 6) + 1;
              setCurrentRound(Math.min(roundNumber, 3)); // Cap at round 3
            }
          }
          
          // Also get round from Firebase if available
          if (lobbyState.round) {
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
  }, []);

  const updatePhase = async (newPhase: GameLobbyStatus) => {
    if (!isConnected) return;

    const phaseDuration = getPhaseDuration(newPhase);
    const phaseIndex = PHASE_SEQUENCE.indexOf(newPhase);
    const roundNumber = Math.floor(phaseIndex / 6) + 1;
    
    try {
      // Always update the phase first
      await gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.GAME_LOBBY_STATUS, newPhase);
      
      // Update round number when entering ROUND_STORYLINE (start of new round)
      if (newPhase === GameLobbyStatus.ROUND_STORYLINE && phaseIndex !== -1) {
        await gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.ROUND, Math.min(roundNumber, 3));
        console.log(`Round updated to: ${Math.min(roundNumber, 3)} (entering storyline phase)`);
      }
      
      // Reset timer when entering ROUND_GAMEPLAY phase
      if (newPhase === GameLobbyStatus.ROUND_GAMEPLAY) {
        await gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.PHASE_START_TIME, Date.now());
        await gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.PHASE_DURATION, GAME_ROUND_TIMER);
        console.log(`Timer reset for gameplay phase: ${GAME_ROUND_TIMER}s`);
      } else {
        // For other phases, just update duration and start time normally
        await gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.PHASE_START_TIME, Date.now());
        await gameRoomService.updateLobbyStateKeyValue(LobbyStateEnum.PHASE_DURATION, phaseDuration);
      }
      
      console.log(`Phase updated to: ${newPhase} (Round ${currentRound})`);
    } catch (error) {
      console.error('Failed to update phase:', error);
    }
  };



  const resetFirebaseRoom = async () => {
    if (!isConnected) return;

    const confirmReset = window.confirm(
      'Are you sure you want to reset the Firebase room? This will:\n\n' +
      '• Reset all game state to defaults\n' +
      '• Clear all activity logs\n' +
      '• Reset all player ready states\n' +
      '• Set phase back to INITIALIZING\n' +
      '• Clear all coin spending data\n\n' +
      'This action cannot be undone!'
    );

    if (!confirmReset) return;

    try {
      // Reset lobby state to default
      await gameRoomService.updateLobbyState(lobbyStateDefaultValue);
      
      // Clear all activities
      await gameRoomService.deleteActivities('default');
      
      // Reset all players ready state
      await gameRoomService.resetAllPlayersReady();
      
      console.log('Firebase room has been completely reset');
      alert('Firebase room has been reset successfully!');
    } catch (error) {
      console.error('Failed to reset Firebase room:', error);
      alert('Failed to reset Firebase room. Check console for details.');
    }
  };

  const goToNextPhase = () => {
    const nextIndex = (currentPhaseIndex + 1) % PHASE_SEQUENCE.length;
    updatePhase(PHASE_SEQUENCE[nextIndex]);
  };

  const goToPreviousPhase = () => {
    const prevIndex = currentPhaseIndex === 0 ? PHASE_SEQUENCE.length - 1 : currentPhaseIndex - 1;
    updatePhase(PHASE_SEQUENCE[prevIndex]);
  };

  const getPhaseRoundInfo = (phaseIndex: number) => {
    const phase = PHASE_SEQUENCE[phaseIndex];
    const roundNumber = Math.floor(phaseIndex / 6) + 1;
    return {
      phase,
      round: Math.min(roundNumber, 3),
      isRoundPhase: roundNumber <= 3
    };
  };

  const getNextPhaseInfo = () => {
    const nextIndex = (currentPhaseIndex + 1) % PHASE_SEQUENCE.length;
    return getPhaseRoundInfo(nextIndex);
  };

  const getPreviousPhaseInfo = () => {
    const prevIndex = currentPhaseIndex === 0 ? PHASE_SEQUENCE.length - 1 : currentPhaseIndex - 1;
    return getPhaseRoundInfo(prevIndex);
  };

  if (!isConnected) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Phase Control</h1>
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
          <h2 className="text-lg font-semibold mb-2">Current Status:</h2>
          <p className="text-xl text-blue-600">{currentPhase}</p>
          <p className="text-lg text-gray-600">Round {currentRound}</p>
          <p className="text-sm text-gray-500">Phase Index: {currentPhaseIndex + 1} of {PHASE_SEQUENCE.length}</p>
        </div>

        {/* Phase Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Phase:
          </label>
          <select 
            value={selectedPhase} 
            onChange={(e) => setSelectedPhase(e.target.value as GameLobbyStatus)}
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
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex flex-col items-center"
          >
            <span>← Previous</span>
            <span className="text-xs mt-1">
              {(() => {
                const prevInfo = getPreviousPhaseInfo();
                return prevInfo.isRoundPhase 
                  ? `R${prevInfo.round}: ${prevInfo.phase.replace('ROUND_', '')}` 
                  : prevInfo.phase;
              })()}
            </span>
          </button>
          
          <button
            onClick={goToNextPhase}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex flex-col items-center"
          >
            <span>Next →</span>
            <span className="text-xs mt-1">
              {(() => {
                const nextInfo = getNextPhaseInfo();
                return nextInfo.isRoundPhase 
                  ? `R${nextInfo.round}: ${nextInfo.phase.replace('ROUND_', '')}` 
                  : nextInfo.phase;
              })()}
            </span>
          </button>
          
          <button
            onClick={() => updatePhase(selectedPhase)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Set Selected Phase
          </button>
        </div>
        
        <div className="text-sm text-gray-600 mt-2">
          <p>💡 <strong>Navigation:</strong> Previous/Next buttons automatically handle round transitions and show the next phase with round info.</p>
          <p>🎯 <strong>Auto-logic:</strong> Round number updates when entering ROUND_STORYLINE. Timer resets when entering ROUND_GAMEPLAY.</p>
        </div>



        {/* Reset Controls */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-3 text-red-600">Danger Zone:</h3>
          <button
            onClick={resetFirebaseRoom}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Reset Firebase Room
          </button>
          <p className="text-sm text-gray-600 mt-2">
            ⚠️ This will completely reset the game state, clear all activities, and reset all players to not ready.
          </p>
        </div>

        {/* Phase Sequence Info */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Phase Sequence:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {PHASE_SEQUENCE.map((phase, index) => {
              // Only highlight if both phase and index match current state
              const isCurrentPhase = index === currentPhaseIndex;
              // Calculate what round this phase belongs to
              const phaseRound = Math.floor(index / 6) + 1;
              
              return (
                <div 
                  key={`${phase}-${index}`}
                  className={`p-2 rounded ${
                    isCurrentPhase ? 'bg-blue-200 border-2 border-blue-400' : 'bg-gray-50'
                  }`}
                >
                  <div className="font-medium">
                    {index + 1}. {phase}
                  </div>
                  {phaseRound <= 3 && (
                    <div className="text-xs text-gray-500">
                      Round {Math.min(phaseRound, 3)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}