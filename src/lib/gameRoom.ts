import { database } from './firebase';
import { 
  ref, 
  push, 
  set, 
  get, 
  onValue, 
  off, 
  onDisconnect, 
  serverTimestamp,
  update
} from 'firebase/database';

export enum ActivityTypeEnum {
  RAISE_SEA_WALL = "RAISE SEA WALL",
  EXTEND_EARTH_BUND = "EXTEND EARTH BUND",
  EXTEND_LAND_RECLAMATION = "EXTEND LAND RECLAMATION",
  RAISE_REVERTMENT = "RAISE REVERTMENT",
  START_GAME = "START_GAME"
}

export interface GameElement {
  type: ActivityTypeEnum;
  x: number;
  y: number;
  scale: number;
  id: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: number;
  round?: number;
}

export interface UserPresence {
  id: string;
  name: string;
  lastSeen: number;
  isOnline: boolean;
}

export class GameRoomService {
  private roomId: string | null = null;
  private userId: string;
  private userName: string;
  private activityCallback: ((activities: ActivityLog[]) => void) | null = null;
  private presenceCallback: ((users: UserPresence[]) => void) | null = null;
  private waterLevelCallback: ((waterLevel: number) => void) | null = null;

  constructor(customUserName?: string) {
    this.userName = customUserName || this.generateUserName();
    this.userId = this.generateUserId(this.userName);
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
    const newRoomId = isDefault ? "default" : this.generateRoomId();
    const roomRef = ref(database, `rooms/${newRoomId}`);
    
    await set(roomRef, {
      createdAt: serverTimestamp(),
      createdBy: this.userId,
      waterLevel: 0
    });

    return newRoomId;
  }

  async joinRoom(roomId: string): Promise<boolean> {
    const roomRef = ref(database, `rooms/${roomId}`);
    const snapshot = await get(roomRef);
    
    if (!snapshot.exists()) {
      return false;
    }

    this.roomId = roomId;
    this.setupPresence();
    this.listenToActivity();
    this.listenToPresence();
    this.listenToWaterLevel();
    
    return true;
  }

  private setupPresence() {
    if (!this.roomId) return;

    const userPresenceRef = ref(database, `rooms/${this.roomId}/presence/${this.userId}`);
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

    const activityRef = ref(database, `rooms/${this.roomId}/activity`);
    onValue(activityRef, (snapshot) => {
      if (snapshot.exists()) {
        const activities = Object.values(snapshot.val()) as ActivityLog[];
        // Sort by timestamp, newest first
        activities.sort((a, b) => b.timestamp - a.timestamp);
        this.activityCallback!(activities.slice(0, 10)); // Show last 10 activities
      }
    });
  }

  private listenToPresence() {
    if (!this.roomId || !this.presenceCallback) return;

    const presenceRef = ref(database, `rooms/${this.roomId}/presence`);
    onValue(presenceRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = Object.values(snapshot.val()) as UserPresence[];
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

  private listenToWaterLevel() {
    if (!this.roomId || !this.waterLevelCallback) return;

    const presenceRef = ref(database, `rooms/${this.roomId}/waterLevel`);
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

    const activityRef = ref(database, `rooms/${this.roomId}/activity`);
    const newActivityRef = push(activityRef);
    
    const activity: ActivityLog = {
      id: newActivityRef.key!,
      userId: this.userId,
      userName: this.userName,
      action: activityType,
      round,
      timestamp: Date.now()
    };

    await set(newActivityRef, activity);
  }

  async updateWaterLevel(waterLevel: number): Promise<void> {
    if (!this.roomId) return;

    const waterLevelRef = ref(database, `rooms/${this.roomId}/waterLevel`);
    const newWaterLevelRef = push(waterLevelRef);

    await set(newWaterLevelRef, waterLevel);
  }

  onActivityChange(callback: (activities: ActivityLog[]) => void) {
    this.activityCallback = callback;
    if (this.roomId) {
      this.listenToActivity();
    }
  }

  onPresenceChange(callback: (users: UserPresence[]) => void) {
    this.presenceCallback = callback;
    if (this.roomId) {
      this.listenToPresence();
    }
  }

  onWaterLevelChange(callback: (waterLevel: number) => void) {
    this.waterLevelCallback = callback;
    if (this.roomId) {
      this.listenToWaterLevel();
    }
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
      const userPresenceRef = ref(database, `rooms/${this.roomId}/presence/${this.userId}`);
      update(userPresenceRef, {
        isOnline: false,
        lastSeen: serverTimestamp()
      });
    }
  }
}