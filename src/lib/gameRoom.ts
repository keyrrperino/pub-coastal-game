import { database } from './firebase';
import { 
  ref, 
  push, 
  set, 
  get, 
  onValue, 
  onDisconnect, 
  serverTimestamp,
  update,
  remove
} from 'firebase/database';
import { ActivityLogType, LobbyStateType, UserPresenceType } from './types';
import { ActivityTypeEnum, GameEnum, GameLobbyStatus, LobbyStateEnum } from './enums';
import { lobbyStateDefaultValue, ROOM_NAME } from './constants';

export class GameRoomService {
  private roomId: string | null = null;
  private userId: string;
  private userName: string;
  private activityCallback: ((activities: ActivityLogType[]) => void) | null = null;
  private presenceCallback: ((users: UserPresenceType[]) => void) | null = null;
  private gobalStateCallback: ((lobbyState: LobbyStateType) => void) | null = null;
  private waterLevelCallback: ((waterLevel: number) => void) | null = null;

  constructor(customUserName?: string, roomId?: string) {
    this.userName = customUserName || this.generateUserName();
    this.userId = this.generateUserId(this.userName);
    this.roomId = roomId ?? "default";
  }

  private generateUserId(userName: string): string {
    // Use username as unique identifier (case insensitive)
    return 'user_' + userName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  }

  private generateUserName(): string {
    const adjectives = ['Happy', 'Coastal', 'Sunny', 'Ocean', 'Beach', 'Wave', 'Sand', 'Shell'];
    const nouns = ['Explorer', 'Builder', 'Creator', 'Designer', 'Visitor', 'Traveler'];
    return adjectives[Math.floor(Math.random() * adjectives.length)] + 
           nouns[Math.floor(Math.random() * nouns.length)];
  }

  generateRoomId(): string {
    return 'room_' + Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  async createRoom(isDefault?: true): Promise<string> {
    const newRoomId = isDefault ? GameEnum.DEFAULT_ROOM_NAME : this.generateRoomId();
    const roomRef = ref(database, `${ROOM_NAME}/${newRoomId}`);
    
    await set(roomRef, {
      createdAt: serverTimestamp(),
      createdBy: this.userId,
      lobbyState: lobbyStateDefaultValue
    });

    return newRoomId;
  }

  async joinRoom(roomId: string): Promise<boolean> {
    const roomRef = ref(database, `${ROOM_NAME}/${roomId}`);
    console.log( `${ROOM_NAME}/${roomId}`);
    const snapshot = await get(roomRef);
    
    if (!snapshot.exists()) {
      return false;
    }

    if (snapshot.exists() && !snapshot.val().lobbyState) {
      return false;
    }

    this.roomId = roomId;
    this.setupPresence();
    this.listenToActivity();
    this.listenToPresence();
    this.listenToWaterLevel();
    
    return true;
  }

  async getActivities(roomId: string): Promise<ActivityLogType[]> {
    const activitiesRef = ref(database, `${ROOM_NAME}/${roomId}/activity`);
    const snapshot = await get(activitiesRef);

    if (!snapshot.exists()) return [];
    const activities = Object.values(snapshot.val()) as ActivityLogType[];
    // Sort by timestamp, oldest first
    activities.sort((a, b) => a.timestamp - b.timestamp);
    return activities;
  }

  private setupPresence() {
    if (!this.roomId) return;

    const userPresenceRef = ref(database, `${ROOM_NAME}/${this.roomId}/presence/${this.userId}`);
    const userPresenceData = {
      id: this.userId,
      name: this.userName,
      lastSeen: serverTimestamp(),
      isOnline: true
    };

    set(userPresenceRef, userPresenceData);

    // Set up disconnect handler
    onDisconnect(userPresenceRef).update({
      isOnline: false,
      lastSeen: serverTimestamp()
    });

    // Update presence every 30 seconds
    setInterval(() => {
      update(userPresenceRef, { lastSeen: serverTimestamp() });
    }, 30000);
  }

  private listenToActivity() {
    if (!this.roomId || !this.activityCallback) return;

    const activityRef = ref(database, `${ROOM_NAME}/${this.roomId}/activity`);
    onValue(activityRef, (snapshot) => {
      if (snapshot.exists()) {
        const activities = Object.values(snapshot.val()) as ActivityLogType[];
        // Sort by timestamp, newest first
        activities.sort((a, b) => a.timestamp - b.timestamp);
        this.activityCallback!(activities); // Show last 10 activities
      }
    });
  }

  private listenToPresence() {
    if (!this.roomId || !this.presenceCallback) return;

    const presenceRef = ref(database, `${ROOM_NAME}/${this.roomId}/presence`);
    onValue(presenceRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = Object.values(snapshot.val()) as UserPresenceType[];
        // Filter online users and users seen in last 2 minutes
        const currentTime = Date.now();
        const activeUsers = users.filter(user => {
          // Check if user is marked online OR if lastSeen is recent (within 2 minutes)
          const isRecentlyActive = user.lastSeen && (currentTime - user.lastSeen < 120000);
          return user.isOnline === true || isRecentlyActive;
        });
        this.presenceCallback!(activeUsers);
      } else {
        // No presence data exists yet
        this.presenceCallback!([]);
      }
    });
  }

  private listenToLobbyState() {
    if (!this.roomId || !this.gobalStateCallback) return;

    const presenceRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState`);
    onValue(presenceRef, (snapshot) => {
      if (snapshot.exists()) {
        const lobbyState = snapshot.val();
        this.gobalStateCallback!(lobbyState);
      } else {
        // No presence data exists yet
        this.gobalStateCallback!(lobbyStateDefaultValue);
      }
    });
  }

  private listenToWaterLevel() {
    if (!this.roomId || !this.waterLevelCallback) return;

    const presenceRef = ref(database, `${ROOM_NAME}/${this.roomId}/waterLevel`);
    onValue(presenceRef, (snapshot) => {
      if (snapshot.exists()) {
        const waterLevel = snapshot.val();
        this.waterLevelCallback!(waterLevel);
      } else {
        // No presence data exists yet
        this.waterLevelCallback!(0);
      }
    });
  }

  async addElement(activityType: ActivityTypeEnum): Promise<void> {
    if (!this.roomId) return;

    // Log activity
    await this.logActivity(activityType);
  }

  private async logActivity(activityType: ActivityTypeEnum, round?: number) {
    if (!this.roomId) return;

    const activityRef = ref(database, `${ROOM_NAME}/${this.roomId}/activity`);
    const newActivityRef = push(activityRef);
    
    const activity: ActivityLogType = {
      id: newActivityRef.key!,
      userId: this.userId,
      userName: this.userName,
      action: activityType,
      round: round ?? 1,
      timestamp: Date.now()
    };

    await set(newActivityRef, activity);
  }

  async updateWaterLevel(waterLevel: number): Promise<void> {
    if (!this.roomId) return;

    const waterLevelRef = ref(database, `${ROOM_NAME}/${this.roomId}/waterLevel`);
    const newWaterLevelRef = push(waterLevelRef);

    await set(newWaterLevelRef, waterLevel);
  }

  async updateLobbyState(lobbyState: LobbyStateType): Promise<void> {
    if (!this.roomId) return;

    const lobbyStateRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState`);
    const newLobbyStateRef = push(lobbyStateRef);

    await set(newLobbyStateRef, lobbyState);
  }

  async updateLobbyStateKeyValue(key: LobbyStateEnum, value: string | number| boolean | GameLobbyStatus): Promise<void> {
    if (!this.roomId) return;

    const lobbyStateRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState/${key}`);
    await set(lobbyStateRef, value); // This sets the value at the specific key
  }

  onActivityChange(callback: (activities: ActivityLogType[]) => void) {
    this.activityCallback = callback;
    if (this.roomId) {
      this.listenToActivity();
    }
  }

  onPresenceChange(callback: (users: UserPresenceType[]) => void) {
    this.presenceCallback = callback;
    if (this.roomId) {
      this.listenToPresence();
    }
  }

  onLobbyStateChange(callback: (lobbyState: LobbyStateType) => void) {
    this.gobalStateCallback = callback;
    if (this.roomId) {
      this.listenToLobbyState();
    }
  }

  onWaterLevelChange(callback: (waterLevel: number) => void) {
    this.waterLevelCallback = callback;
    if (this.roomId) {
      this.listenToWaterLevel();
    }
  }

  async deleteActivities(roomId: string): Promise<void> {
    const activitiesRef = ref(database, `${ROOM_NAME}/${roomId}/activity`);
    await remove(activitiesRef);
  }

  getCurrentUserId(): string {
    return this.userId;
  }

  getCurrentUserName(): string {
    return this.userName;
  }

  getCurrentRoomId(): string | null {
    return this.roomId;
  }

  disconnect() {
    if (this.roomId) {
      const userPresenceRef = ref(database, `${ROOM_NAME}/${this.roomId}/presence/${this.userId}`);
      update(userPresenceRef, {
        isOnline: false,
        lastSeen: serverTimestamp()
      });
    }
  }
}