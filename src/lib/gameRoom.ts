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
  remove,
  runTransaction
} from 'firebase/database';
import { ActivityLogType, LobbyStateType, SubSectorType, UserPresenceType } from './types';
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
  private roundCallback: ((round: number) => void) | null = null;

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
    this.listenToRound();
    this.listenToLobbyState(); // Add this line to listen to lobby state changes
    
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
        // dont change this is or else the scoring will be broken
        activities.sort((a, b) => b.timestamp - a.timestamp);
        this.activityCallback!(activities);
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

  private listenToRound() {
    if (!this.roomId || !this.roundCallback) return;

    console.log('Setting up round listener for room:', this.roomId);
    const roundRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState/round`);
    onValue(roundRef, (snapshot) => {
      console.log('Round snapshot received:', snapshot.exists(), snapshot.val());
      if (snapshot.exists()) {
        const round = snapshot.val();
        console.log('Calling round callback with:', round);
        this.roundCallback!(round);
      } else {
        // No round data exists yet, default to round 1
        console.log('No round data exists, defaulting to round 1');
        this.roundCallback!(1);
      }
    });
  }

  async addElement(
    activityType: ActivityTypeEnum, 
    ActivityValue: string, 
    round: number, 
    cost: number, 
    isCpm: boolean = false, 
    subSector?: SubSectorType
  ): Promise<'ok' | 'insufficient' | 'no-room'> {
    if (!this.roomId) return 'no-room';

    // Force demolish to cost 1
    const finalCost = activityType === ActivityTypeEnum.DEMOLISH ? 1 : Math.max(0, cost | 0);

    // Transactionally spend coins for this round under lobbyState/coinsSpentByRound/{round}
    const coinsRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState/coinsSpentByRound/${round}`);
    const totalPerRoundRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState/coinsTotalPerRound`);

    // Read total per round once (fallback to 10 if missing)
    let coinsTotalPerRound = 10;
    try {
      const snap = await get(totalPerRoundRef);
      if (snap.exists() && typeof snap.val() === 'number') {
        coinsTotalPerRound = snap.val();
      }
    } catch {}

    const committed = await runTransaction(coinsRef, (current) => {
      const spent = typeof current === 'number' ? current : 0;
      const next = spent + finalCost;
      if (next > coinsTotalPerRound) return; // abort
      return next;
    }).then(res => res.committed).catch(() => false);

    if (!committed) {
      return 'insufficient';
    }

    // Log activity after successful spend
    await this.logActivity(activityType, ActivityValue, round, isCpm, subSector);
    return 'ok';
  }

  private async logActivity(activityType: ActivityTypeEnum, activityValue: string, round?: number, isCpm: boolean = false, subSector?: SubSectorType) {
    if (!this.roomId) return;

    const activityRef = ref(database, `${ROOM_NAME}/${this.roomId}/activity`);
    const newActivityRef = push(activityRef);
    
    const activity: ActivityLogType = {
      id: newActivityRef.key!,
      userId: this.userId,
      userName: this.userName,
      action: activityType,
      value: activityValue,
      isCpm,
      isDemolished: activityType === ActivityTypeEnum.DEMOLISH,
      round: round ?? 1,
      subSector: subSector ?? "",
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
    await set(lobbyStateRef, lobbyState); // Overwrites the object
  }

  async updateLobbyStateKeyValue(key: LobbyStateEnum, value: string | number| boolean | GameLobbyStatus): Promise<void> {
    if (!this.roomId) return;

    const lobbyStateRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState/${key}`);
    await set(lobbyStateRef, value); // This sets the value at the specific key
  }

  async updateRound(round: number): Promise<void> {
    if (!this.roomId) return;

    const roundRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState/round`);
    await set(roundRef, round);
  }

  async saveTeamScore(teamName: string, score: number): Promise<void> {
    if (!this.roomId) return;

    const leaderboardRef = ref(database, 'global-leaderboard');
    const newEntryRef = push(leaderboardRef);
    
    const entry = {
      teamName,
      score,
      timestamp: Date.now(),
      submittedBy: this.userId,
      roomId: this.roomId
    };

    await set(newEntryRef, entry);
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

  onRoundChange(callback: (round: number) => void) {
    this.roundCallback = callback;
    if (this.roomId) {
      this.listenToRound();
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

  // Player readiness methods
  async setPlayerReady(isReady: boolean = true): Promise<void> {
    if (!this.roomId) return;

    const readyPlayersRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState/readyPlayers`);
    await update(readyPlayersRef, {
      [this.userId]: isReady
    });
  }

  async setPlayerNotReady(): Promise<void> {
    await this.setPlayerReady(false);
  }

  async resetAllPlayersReady(): Promise<void> {
    if (!this.roomId) return;

    const readyPlayersRef = ref(database, `${ROOM_NAME}/${this.roomId}/lobbyState/readyPlayers`);
    await set(readyPlayersRef, {});
  }

  areAllPlayersReady(lobbyState: LobbyStateType): boolean {
    if (!lobbyState.readyPlayers) {
      return false;
    }

    const readyCount = Object.values(lobbyState.readyPlayers).filter(ready => ready).length;
    return readyCount >= 3; // Always expect 3 players
  }

  getReadyPlayersCount(lobbyState: LobbyStateType): number {
    if (!lobbyState.readyPlayers) {
      return 0;
    }

    return Object.values(lobbyState.readyPlayers).filter(ready => ready).length;
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

// Standalone function for saving team scores (doesn't require GameRoomService instance)
export async function saveTeamScoreToGlobalLeaderboard(
  teamName: string, 
  score: number, 
  roomId: string = 'default',
  userId: string = 'anonymous'
): Promise<void> {
  const leaderboardRef = ref(database, 'global-leaderboard');
  const newEntryRef = push(leaderboardRef);
  
  const entry = {
    teamName,
    score,
    timestamp: Date.now(),
    submittedBy: userId,
    roomId
  };

  await set(newEntryRef, entry);
}

// Types for leaderboard data
export interface LeaderboardEntry {
  teamName: string;
  score: number;
  timestamp: number;
  submittedBy: string;
  roomId: string;
}

export interface ProcessedLeaderboardData {
  topWinner: { name: string; points: number } | null;
  top5: { name: string; points: number }[];
  currentTeamEntry: { name: string; points: number; position: number } | null;
}

// Function to fetch and process leaderboard data
export async function getGlobalLeaderboard(currentTeamName?: string): Promise<ProcessedLeaderboardData> {
  try {
    const leaderboardRef = ref(database, 'global-leaderboard');
    const snapshot = await get(leaderboardRef);
    
    if (!snapshot.exists()) {
      return {
        topWinner: null,
        top5: [],
        currentTeamEntry: null
      };
    }

    // Convert to array and sort by score (descending)
    const entries: LeaderboardEntry[] = Object.values(snapshot.val());
    const sortedEntries = entries.sort((a, b) => b.score - a.score);

    // Find current team position
    let currentTeamEntry = null;
    if (currentTeamName) {
      const currentTeamIndex = sortedEntries.findIndex(entry => entry.teamName === currentTeamName);
      if (currentTeamIndex !== -1) {
        const currentTeam = sortedEntries[currentTeamIndex];
        currentTeamEntry = {
          name: currentTeam.teamName,
          points: currentTeam.score,
          position: currentTeamIndex + 1
        };
      }
    }

    // Process data
    const topWinner = sortedEntries.length > 0 
      ? { name: sortedEntries[0].teamName, points: sortedEntries[0].score }
      : null;

    // Get top 2-5, excluding current team if it's in this range
    const top5Candidates = sortedEntries
      .slice(1, 6)  // Skip the top winner, take next 4 (positions 2-5)
      .filter(entry => !currentTeamName || entry.teamName !== currentTeamName);
    
    // If we filtered out the current team, take one more to fill the gap
    const top5 = top5Candidates.length < 4 && sortedEntries.length > 6
      ? [...top5Candidates, ...sortedEntries.slice(6, 7).filter(entry => !currentTeamName || entry.teamName !== currentTeamName)].slice(0, 4)
      : top5Candidates;

    const processedTop5 = top5.map(entry => ({ name: entry.teamName, points: entry.score }));

    return {
      topWinner,
      top5: processedTop5,
      currentTeamEntry
    };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return {
      topWinner: null,
      top5: [],
      currentTeamEntry: null
    };
  }
}