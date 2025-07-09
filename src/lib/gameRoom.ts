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
  update,
  remove
} from 'firebase/database';

export enum ActivityTypeEnum {
  START_GAME = "UI Play Btn",
  BUILD_SEA_WALL = "UI SW 1",
  RAISE_SEA_WALL = "UI SW 2",
  EXTEND_EARTH_BUND = "UI EB 2",
  BUILD_EARTH_BUND = "UI EB 1",
  BUILD_LAND_RECLAMATION = "UI RC 1",
  EXTEND_LAND_RECLAMATION = "UI RC 2",
  FLOOD_AREA = "UI FLOOD",
  DEPLOY_HUGE_WAVE = "UI WAVE",
  BUILD_REVERTMENT = "UI RV 1",
  RAISE_REVERTMENT = "UI RV 2",
  PLANT_MANGROVES = "UI MG",
  RESET_SCENE = "UI RST"
}

export enum GameEnum {
  DEFAULT_ROOM_NAME = "default",
  DEFAULT_USERNAME = "master",
};

export enum UserSectorEnum {
  USER_SECTOR_ONE = "user_sector_one",
  USER_SECTOR_TWO = "user_sector_two",
  USER_SECTOR_THREE = "user_sector_three",
}

export type SplineTriggerConfigItem = {
  state: string[];
  events: string[];
  buttonValue: string;
  activityType: ActivityTypeEnum
};

type SplineTriggersConfigType = {
  [key in ActivityTypeEnum]: SplineTriggerConfigItem;
};

export const SplineTriggersConfig: SplineTriggersConfigType = {
  [ActivityTypeEnum.BUILD_EARTH_BUND]: {
    state: ['hidden'],
    events: ['mouseUp'],
    buttonValue: "BUILD EARTH BUND",
    activityType: ActivityTypeEnum.BUILD_EARTH_BUND
  },
  [ActivityTypeEnum.EXTEND_EARTH_BUND]: {
    state: ['state'],
    events: ['stateChange', 'mouseUp'],
    buttonValue: "EXTEND EARTH BUND",
    activityType: ActivityTypeEnum.EXTEND_EARTH_BUND
  },
  [ActivityTypeEnum.BUILD_LAND_RECLAMATION]: {
    state: ['hidden'],
    events: ['mouseUp'],
    buttonValue: "RECLAIM LAND",
    activityType: ActivityTypeEnum.BUILD_LAND_RECLAMATION
  },
  [ActivityTypeEnum.EXTEND_LAND_RECLAMATION]: {
    state: ['state'],
    events: ['stateChange', 'mouseUp'],
    buttonValue: "EXTEND LAND RECLAMATION",
    activityType: ActivityTypeEnum.EXTEND_LAND_RECLAMATION
  },
  [ActivityTypeEnum.START_GAME]: {
    state: ['State', 'hovered'],
    events: ['mouseUp', 'start', 'mouseHover'],
    buttonValue: "Click to Start",
    activityType: ActivityTypeEnum.START_GAME
  },
  [ActivityTypeEnum.BUILD_SEA_WALL]: {
    state: ['hidden'],
    events: ['mouseUp'],
    buttonValue: 'BUILD SEA WALL',
    activityType: ActivityTypeEnum.BUILD_SEA_WALL
  },
  [ActivityTypeEnum.RAISE_SEA_WALL]: {
    state: ['state'],
    events: ['stateChange', 'mouseUp'],
    buttonValue: 'RAISE SEA WALL',
    activityType: ActivityTypeEnum.RAISE_SEA_WALL
  },
  [ActivityTypeEnum.FLOOD_AREA]: {
    state: [],
    events: ['mouseUp'],
    buttonValue: 'FLOOD THE AREA',
    activityType: ActivityTypeEnum.FLOOD_AREA
  },
  [ActivityTypeEnum.DEPLOY_HUGE_WAVE]: {
    state: [],
    events: ['mouseUp'],
    buttonValue: 'DEPLOY HUGE WAVE',
    activityType: ActivityTypeEnum.DEPLOY_HUGE_WAVE
  },
  [ActivityTypeEnum.BUILD_REVERTMENT]: {
    state: ['hidden'],
    events: ['mouseUp'],
    buttonValue: 'BUILD REVERTMENT',
    activityType: ActivityTypeEnum.BUILD_REVERTMENT
  },
  [ActivityTypeEnum.RAISE_REVERTMENT]: {
    state: ['state'],
    events: ['stateChange', 'mouseUp'],
    buttonValue: 'RAISE REVERTMENT',
    activityType: ActivityTypeEnum.RAISE_REVERTMENT
  },
  [ActivityTypeEnum.PLANT_MANGROVES]: {
    state: [],
    events: ['mouseUp'],
    buttonValue: 'PLANT MANGROVES',
    activityType: ActivityTypeEnum.PLANT_MANGROVES
  },
  [ActivityTypeEnum.RESET_SCENE]: {
    state: [],
    events: ['mouseUp'],
    buttonValue: 'RESET SCENE',
    activityType: ActivityTypeEnum.RESET_SCENE
  },
}

export type SectorsButtonConfigType = {
  [key in UserSectorEnum]: Array<{
    state: string[];
    events: string[];
    buttonValue: string;
    activityType: ActivityTypeEnum;
  }>;
};

export const SectorsButtonConfig: SectorsButtonConfigType = {
  [UserSectorEnum.USER_SECTOR_ONE]: [
    SplineTriggersConfig[ActivityTypeEnum.START_GAME],
    SplineTriggersConfig[ActivityTypeEnum.BUILD_SEA_WALL],
    SplineTriggersConfig[ActivityTypeEnum.RAISE_SEA_WALL],
    SplineTriggersConfig[ActivityTypeEnum.BUILD_EARTH_BUND],
    SplineTriggersConfig[ActivityTypeEnum.EXTEND_EARTH_BUND],
    SplineTriggersConfig[ActivityTypeEnum.FLOOD_AREA],
    SplineTriggersConfig[ActivityTypeEnum.DEPLOY_HUGE_WAVE],
    SplineTriggersConfig[ActivityTypeEnum.RESET_SCENE],
  ],
  [UserSectorEnum.USER_SECTOR_TWO]: [
    SplineTriggersConfig[ActivityTypeEnum.START_GAME],
    SplineTriggersConfig[ActivityTypeEnum.BUILD_REVERTMENT],
    SplineTriggersConfig[ActivityTypeEnum.RAISE_REVERTMENT],
    SplineTriggersConfig[ActivityTypeEnum.BUILD_LAND_RECLAMATION],
    SplineTriggersConfig[ActivityTypeEnum.EXTEND_LAND_RECLAMATION],
    SplineTriggersConfig[ActivityTypeEnum.FLOOD_AREA],
    SplineTriggersConfig[ActivityTypeEnum.DEPLOY_HUGE_WAVE],
    SplineTriggersConfig[ActivityTypeEnum.RESET_SCENE],
  ],
  [UserSectorEnum.USER_SECTOR_THREE]: [
    SplineTriggersConfig[ActivityTypeEnum.START_GAME],
    SplineTriggersConfig[ActivityTypeEnum.PLANT_MANGROVES],
    SplineTriggersConfig[ActivityTypeEnum.FLOOD_AREA],
    SplineTriggersConfig[ActivityTypeEnum.DEPLOY_HUGE_WAVE],
    SplineTriggersConfig[ActivityTypeEnum.RESET_SCENE],
  ]
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
  action: ActivityTypeEnum;
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
    const newRoomId = isDefault ? GameEnum.DEFAULT_ROOM_NAME : this.generateRoomId();
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

  async getActivities(roomId: string): Promise<ActivityLog[]> {
    const activitiesRef = ref(database, `rooms/${roomId}/activity`);
    const snapshot = await get(activitiesRef);

    if (!snapshot.exists()) return [];
    const activities = Object.values(snapshot.val()) as ActivityLog[];
    // Sort by timestamp, oldest first
    activities.sort((a, b) => a.timestamp - b.timestamp);
    return activities;
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
        activities.sort((a, b) => a.timestamp - b.timestamp);
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
      round: round ?? 1,
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

  async deleteActivities(roomId: string): Promise<void> {
    const activitiesRef = ref(database, `rooms/${roomId}/activity`);
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
      const userPresenceRef = ref(database, `rooms/${this.roomId}/presence/${this.userId}`);
      update(userPresenceRef, {
        isOnline: false,
        lastSeen: serverTimestamp()
      });
    }
  }
}