import { useEffect, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { Button } from '@/components/ui/button';
import { CoastalPubScene } from './game/scenes/CoastalPubScene';
import { GameRoomService, GameState, ActivityLog, UserPresence } from '@/lib/gameRoom';
import RoomSelector from '@/components/RoomSelector';
import GameUI from '@/components/GameUI';

export default function App() {
    const phaserRef = useRef<IRefPhaserGame>(null);
    const gameRoomService = useRef<GameRoomService | null>(null);
    
    const [canAddElements, setCanAddElements] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
    const [currentScene, setCurrentScene] = useState<CoastalPubScene | null>(null);

    useEffect(() => {
        const service = gameRoomService.current;
        if (!service) return;
        
        service.onGameStateChange((state) => {
            setGameState(state);
            if (currentScene) {
                currentScene.syncGameState(state);
            }
        });
        
        service.onActivityChange(setActivities);
        service.onPresenceChange(setOnlineUsers);
        
        return () => {
            service.disconnect();
        };
    }, [currentScene]);

    const handleSceneReady = (scene: Phaser.Scene) => {
        const isCoastalScene = scene instanceof CoastalPubScene;
        setCanAddElements(isCoastalScene);
        
        if (isCoastalScene) {
            setCurrentScene(scene);
            // Sync existing game state if available
            if (gameState) {
                scene.syncGameState(gameState);
            }
        }
    };

    const handleJoinRoom = async (roomId: string, username: string): Promise<boolean> => {
        // Initialize the service with the username
        gameRoomService.current = new GameRoomService(username);
        
        const success = await gameRoomService.current.joinRoom(roomId);
        if (success) {
            setRoomId(roomId);
        }
        return success;
    };

    const handleCreateRoom = async (username: string): Promise<string> => {
        // Initialize the service with the username
        gameRoomService.current = new GameRoomService(username);
        
        return await gameRoomService.current.createRoom();
    };

    const addTree = async () => {
        if (currentScene && roomId && gameRoomService.current) {
            const position = currentScene.getRandomPosition('tree');
            await gameRoomService.current.addElement('tree', position.x, position.y);
        }
    };

    const addIsland = async () => {
        if (currentScene && roomId && gameRoomService.current) {
            const position = currentScene.getRandomPosition('island');
            await gameRoomService.current.addElement('island', position.x, position.y);
        }
    };

    const addWater = async () => {
        if (currentScene && roomId && gameRoomService.current) {
            const position = currentScene.getRandomPosition('water');
            await gameRoomService.current.addElement('water', position.x, position.y);
        }
    };

    // Show room selector if not in a room
    if (!roomId) {
        return (
            <RoomSelector
                onJoinRoom={handleJoinRoom}
                onCreateRoom={handleCreateRoom}
            />
        );
    }

    return (
        <div className="w-full">
            <div className="game-wrapper bg-card rounded-lg shadow-xl overflow-hidden border border-border">
                <div id="game-container" className="w-full h-full min-h-[768px] flex items-center justify-center">
                    <PhaserGame ref={phaserRef} currentActiveScene={handleSceneReady} />
                </div>
            </div>
            
            {/* Control buttons */}
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <Button 
                    onClick={addTree}
                    disabled={!canAddElements}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold min-w-[120px]"
                >
                    🌳 Add Tree
                </Button>
                <Button 
                    onClick={addIsland}
                    disabled={!canAddElements}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg font-semibold min-w-[120px]"
                >
                    🏝️ Add Island
                </Button>
                <Button 
                    onClick={addWater}
                    disabled={!canAddElements}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold min-w-[120px]"
                >
                    💧 Add Water
                </Button>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
                Click the buttons to add elements to your coastal scene. Watch them grow as you add more!
            </div>
            
            {/* Game UI with room info, users, and activity */}
            <GameUI 
                roomId={roomId}
                onlineUsers={onlineUsers}
                activities={activities}
                currentUserId={gameRoomService.current?.getCurrentUserId() || ''}
            />
        </div>
    );
}