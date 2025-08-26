import { getGlobalLeaderboard, LeaderboardEntry } from '../gameRoom';
import { get } from 'firebase/database';

// Mock Firebase
jest.mock('../firebase', () => ({
  database: {}
}));

// Mock Firebase functions
jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  get: jest.fn()
}));

describe('getGlobalLeaderboard', () => {
  const mockLeaderboardData: Record<string, LeaderboardEntry> = {
    entry1: {
      teamName: 'Team Alpha',
      score: 100,
      timestamp: 1000,
      submittedBy: 'user1',
      roomId: 'room1'
    },
    entry2: {
      teamName: 'Team Beta',
      score: 200,
      timestamp: 2000,
      submittedBy: 'user2',
      roomId: 'room2'
    },
    entry3: {
      teamName: 'Team Gamma',
      score: 150,
      timestamp: 3000,
      submittedBy: 'user3',
      roomId: 'room3'
    },
    entry4: {
      teamName: 'Team Alpha', // Same team name as entry1 but different timestamp
      score: 300,
      timestamp: 4000,
      submittedBy: 'user1',
      roomId: 'room1'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return processed leaderboard data with correct sorting', async () => {
    (get as jest.Mock).mockResolvedValue({
      exists: () => true,
      val: () => mockLeaderboardData
    });

    const result = await getGlobalLeaderboard();
    
    expect(result.topWinner).toEqual({ name: 'Team Alpha', points: 300 });
    expect(result.top5).toEqual([
      { name: 'Team Beta', points: 200 },
      { name: 'Team Gamma', points: 150 },
      { name: 'Team Alpha', points: 100 }
    ]);
    expect(result.currentTeamEntry).toBeNull();
  });

  it('should handle multiple entries for the same team name correctly', async () => {
    (get as jest.Mock).mockResolvedValue({
      exists: () => true,
      val: () => mockLeaderboardData
    });

    const result = await getGlobalLeaderboard('Team Alpha');
    
    // Should have Team Alpha with highest score as top winner
    expect(result.topWinner).toEqual({ name: 'Team Alpha', points: 300 });
    
    // Should have the remaining entries in top5
    expect(result.top5).toEqual([
      { name: 'Team Beta', points: 200 },
      { name: 'Team Gamma', points: 150 },
      { name: 'Team Alpha', points: 100 }
    ]);
    
    // Should show the most recent entry for Team Alpha (300 points) as current team entry
    expect(result.currentTeamEntry).toEqual({ name: 'Team Alpha', points: 300, position: 1 });
  });

  it('should sort entries properly by score', async () => {
    (get as jest.Mock).mockResolvedValue({
      exists: () => true,
      val: () => mockLeaderboardData
    });

    const result = await getGlobalLeaderboard();
    
    // Check that entries are sorted by score (descending)
    const allScores = [...result.top5.map(e => e.points)];
    if (result.topWinner) {
      allScores.unshift(result.topWinner.points);
    }
    
    const sortedScores = [...allScores].sort((a, b) => b - a);
    expect(allScores).toEqual(sortedScores);
  });

  it('should identify current team\'s entry and position correctly', async () => {
    (get as jest.Mock).mockResolvedValue({
      exists: () => true,
      val: () => mockLeaderboardData
    });

    const result = await getGlobalLeaderboard('Team Gamma');
    
    expect(result.currentTeamEntry).toEqual({ name: 'Team Gamma', points: 150, position: 3 });
  });

  it('should handle empty database', async () => {
    (get as jest.Mock).mockResolvedValue({
      exists: () => false
    });

    const result = await getGlobalLeaderboard();
    
    expect(result.topWinner).toBeNull();
    expect(result.top5).toEqual([]);
    expect(result.currentTeamEntry).toBeNull();
  });

  it('should handle database error gracefully', async () => {
    (get as jest.Mock).mockRejectedValue(new Error('Database error'));

    const result = await getGlobalLeaderboard();
    
    expect(result.topWinner).toBeNull();
    expect(result.top5).toEqual([]);
    expect(result.currentTeamEntry).toBeNull();
  });

  it('should show multiple entries for the same team name in leaderboard', async () => {
    const mockDataWithMultipleSameTeams: Record<string, LeaderboardEntry> = {
      entry1: {
        teamName: 'TOM',
        score: 2500,
        timestamp: 1000,
        submittedBy: 'user1',
        roomId: 'room1'
      },
      entry2: {
        teamName: 'TOM', // Same team name but different score and timestamp
        score: 2300,
        timestamp: 2000,
        submittedBy: 'user1',
        roomId: 'room1'
      },
      entry3: {
        teamName: 'KEN',
        score: 2400,
        timestamp: 1500,
        submittedBy: 'user2',
        roomId: 'room1'
      },
      entry4: {
        teamName: 'MZH',
        score: 2200,
        timestamp: 1800,
        submittedBy: 'user3',
        roomId: 'room1'
      }
    };

    (get as jest.Mock).mockResolvedValue({
      exists: () => true,
      val: () => mockDataWithMultipleSameTeams
    });

    const result = await getGlobalLeaderboard('TOM');
    
    // Should show the highest scoring TOM as top winner
    expect(result.topWinner).toEqual({ name: 'TOM', points: 2500 });
    
    // Should include the second TOM entry in the top5 list
    // The top5 should contain entries with scores: 2400 (KEN), 2300 (TOM), 2200 (MZH)
    expect(result.top5).toEqual([
      { name: 'KEN', points: 2400 },
      { name: 'TOM', points: 2300 },
      { name: 'MZH', points: 2200 }
    ]);
    
    // Current team entry should be the most recent TOM entry (timestamp 2000)
    // Position should be 3 because:
    // 1. TOM 2500 points (topWinner)
    // 2. KEN 2400 points 
    // 3. TOM 2300 points (current team entry)
    expect(result.currentTeamEntry).toEqual({ name: 'TOM', points: 2300, position: 3 });
  });
});