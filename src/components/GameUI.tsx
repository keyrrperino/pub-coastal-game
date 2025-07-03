import { ActivityLog, UserPresence } from '@/lib/gameRoom';

interface GameUIProps {
  roomId: string;
  onlineUsers: UserPresence[];
  activities: ActivityLog[];
  currentUserId: string;
}

export default function GameUI({ roomId, onlineUsers, activities, currentUserId }: GameUIProps) {
  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
      {/* Room Info */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg mb-2 text-slate-800">Room Info</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Room ID:</span>
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {roomId}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Online Users:</span>
            <span className="text-sm font-semibold text-green-600">
              {onlineUsers.length}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(roomId)}
          className="mt-2 w-full text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
        >
          📋 Copy Room ID
        </button>
      </div>

      {/* Online Users */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg mb-2 text-slate-800">
          Online Users ({onlineUsers.length})
        </h3>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {onlineUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={`text-sm ${user.id === currentUserId ? 'font-semibold text-blue-600' : 'text-gray-700'}`}>
                {user.name} {user.id === currentUserId && '(You)'}
              </span>
            </div>
          ))}
          {onlineUsers.length === 0 && (
            <div className="text-sm text-gray-500 italic">No users online</div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg mb-2 text-slate-800">Recent Activity</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="text-xs border-l-2 border-gray-200 pl-2">
              <div className="flex justify-between items-start">
                <span className={`font-medium ${activity.userId === currentUserId ? 'text-blue-600' : 'text-gray-700'}`}>
                  {activity.userName}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatTime(activity.timestamp)}
                </span>
              </div>
              <div className="text-gray-600">
                {activity.action}
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-sm text-gray-500 italic">No activity yet</div>
          )}
        </div>
      </div>
    </div>
  );
}