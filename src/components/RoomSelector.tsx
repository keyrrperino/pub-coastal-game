import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RoomSelectorProps {
  onJoinRoom: (roomId: string, username: string) => Promise<boolean>;
  onCreateRoom: (username: string) => Promise<string>;
}

export default function RoomSelector({ onJoinRoom, onCreateRoom }: RoomSelectorProps) {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoinRoom = async () => {
    if (!roomId.trim()) {
      setError('Please enter a room ID');
      return;
    }
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await onJoinRoom(roomId.trim(), username.trim());
      if (!success) {
        setError('Room not found. Please check the room ID or create a new room.');
      }
    } catch (err) {
      setError('Failed to join room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const newRoomId = await onCreateRoom(username.trim());
      await onJoinRoom(newRoomId, username.trim());
    } catch (err) {
      setError('Failed to create room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">
            🏝️ Coastal Pub
          </CardTitle>
          <CardDescription>
            Join an existing room or create a new one to start building your coastal scene with others!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Username Field */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Your Username</h3>
            <input
              type="text"
              placeholder="Enter your display name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              maxLength={20}
            />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
          </div>

          {/* Join Existing Room */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Join Room</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter Room ID (e.g., room_TZ6OFIAM)"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-mono text-lg"
                disabled={isLoading}
                maxLength={13}
              />
              <Button 
                onClick={handleJoinRoom}
                disabled={isLoading || !roomId.trim() || !username.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Joining...' : 'Join Room'}
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Create New Room */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Create New Room</h3>
            <Button 
              onClick={handleCreateRoom}
              disabled={isLoading || !username.trim()}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? 'Creating...' : 'Create New Room'}
            </Button>
            <p className="text-sm text-gray-600 text-center">
              A unique room ID will be generated for you to share with others
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}