import { useEffect, useState } from 'react';
import { ActivityLogType, LobbyStateType, OverallScoresTypes, RoundType } from '@/lib/types';
import { UserSectorEnum, LobbyStateEnum } from '@/lib/enums';
import { getSectorRoundScore } from '@/lib/utils';
import { OVERALL_SCORE_POINTS, TOTAL_COINS_PER_ROUND } from '@/lib/constants';

export type SectorPerformance = 'good' | 'okay' | 'bad';

interface UseSectorScoresProps {
  activities: ActivityLogType[];
  newActivities: ActivityLogType[];
  roomName: string;
  lobbyState: LobbyStateType;
  setTotalScore: (score: number) => void;
  setCoinsLeft: (coins: number) => void;
  setSector1Performance?: (performance: SectorPerformance) => void;
  setSector2Performance?: (performance: SectorPerformance) => void;
  setSector3Performance?: (performance: SectorPerformance) => void;
  setTotalPerformance?: (performance: SectorPerformance) => void;
  triggersLoading?: boolean;
}

// Per-round sector performance evaluation
const getRoundSectorPerformance = (deduction: number, round: number): SectorPerformance => {
  const absoluteDeduction = Math.abs(deduction);
  
  switch (round) {
    case 1:
      // Round 1: No Flooding 0 to -5, Moderate -5.01 to -60, Heavy -60.01 to -120
      if (absoluteDeduction <= 5) return 'good';       // No Flooding
      if (absoluteDeduction <= 60) return 'okay';      // Moderate Flooding
      return 'bad';                                     // Heavy Flooding
      
    case 2:
      // Round 2: No Flooding 0 to -5, Moderate -5.01 to -149.99, Heavy -150 to -300
      if (absoluteDeduction <= 5) return 'good';       // No Flooding
      if (absoluteDeduction <= 149.99) return 'okay'; // Moderate Flooding
      return 'bad';                                     // Heavy Flooding
      
    case 3:
      // Round 3: No Flooding 0 to -5, Moderate -5.01 to -179.99, Heavy -180 to -400
      if (absoluteDeduction <= 5) return 'good';       // No Flooding
      if (absoluteDeduction <= 179.99) return 'okay';  // Moderate Flooding
      return 'bad';                                     // Heavy Flooding
      
    default:
      // Fallback to Round 1 thresholds
      if (absoluteDeduction <= 5) return 'good';
      if (absoluteDeduction <= 60) return 'okay';
      return 'bad';
  }
};

// Overall sector performance across all rounds
const getSectorPerformance = (
  round1Deduction: number, 
  round2Deduction: number, 
  round3Deduction: number
): SectorPerformance => {
  const r1Performance = getRoundSectorPerformance(round1Deduction, 1);
  const r2Performance = getRoundSectorPerformance(round2Deduction, 2);
  const r3Performance = getRoundSectorPerformance(round3Deduction, 3);
  
  // Count performance levels
  const performanceCounts = { good: 0, okay: 0, bad: 0 };
  [r1Performance, r2Performance, r3Performance].forEach(perf => {
    performanceCounts[perf]++;
  });
  
  // Determine overall performance: majority wins, worst case for ties
  if (performanceCounts.bad >= 2) return 'bad';       // 2+ bad rounds
  if (performanceCounts.good >= 2) return 'good';     // 2+ good rounds
  return 'okay';                                       // Mixed or majority okay
};

const getTotalPerformance = (totalScore: number): SectorPerformance => {
  if (totalScore >= 2200) return 'good';
  if (totalScore >= 1600) return 'okay';
  return 'bad'; // < 1599
};

export function useSectorScores({
  activities,
  newActivities,
  lobbyState,
  setTotalScore,
  setCoinsLeft,
  setSector1Performance,
  setSector2Performance,
  setSector3Performance,
  setTotalPerformance,
  triggersLoading,
  roomName
}: UseSectorScoresProps) {
  const [overallScoresData, setOverallScoreData] = useState<{ [key in RoundType]?: OverallScoresTypes }>({});

  useEffect(() => {
    const sector1R1 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[1],
      1 as RoundType,
      UserSectorEnum.USER_SECTOR_ONE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus,
      roomName
    );
    const sector2R1 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[1],
      1 as RoundType,
      UserSectorEnum.USER_SECTOR_TWO,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus,
      roomName
    );
    const sector3R1 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[1],
      1 as RoundType,
      UserSectorEnum.USER_SECTOR_THREE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus,
      roomName
    );

    const sector1R2 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[2],
      2 as RoundType,
      UserSectorEnum.USER_SECTOR_ONE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus,
      roomName
    );
    const sector2R2 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[2],
      2 as RoundType,
      UserSectorEnum.USER_SECTOR_TWO,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus,
      roomName
    );
    const sector3R2 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[2],
      2 as RoundType,
      UserSectorEnum.USER_SECTOR_THREE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus,
      roomName
    );

    const sector1R3 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[3],
      3 as RoundType,
      UserSectorEnum.USER_SECTOR_ONE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus,
      roomName
    );
    const sector2R3 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[3],
      3 as RoundType,
      UserSectorEnum.USER_SECTOR_TWO,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus,
      roomName
    );
    const sector3R3 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[3],
      3 as RoundType,
      UserSectorEnum.USER_SECTOR_THREE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus,
      roomName
    );

    setOverallScoreData({
      1: {
        ...sector1R1,
        ...sector2R1,
        ...sector3R1,
      },
      2: {

        ...sector1R2,
        ...sector2R2,
        ...sector3R2,
      },
      3: {
        ...sector1R3,
        ...sector2R3,
        ...sector3R3,
      },
    });

    let overAllScore = OVERALL_SCORE_POINTS - (
      (sector1R1.user_sector_1?.totalScoreToDeductInRound ?? 0) +
      (sector2R1.user_sector_2?.totalScoreToDeductInRound ?? 0) +
      (sector3R1.user_sector_3?.totalScoreToDeductInRound ?? 0) +
      (sector1R2.user_sector_1?.totalScoreToDeductInRound ?? 0) +
      (sector2R2.user_sector_2?.totalScoreToDeductInRound ?? 0) +
      (sector3R2.user_sector_3?.totalScoreToDeductInRound ?? 0) +
      (sector1R3.user_sector_1?.totalScoreToDeductInRound ?? 0) +
      (sector2R3.user_sector_2?.totalScoreToDeductInRound ?? 0) +
      (sector3R3.user_sector_3?.totalScoreToDeductInRound ?? 0)
    );

    if (lobbyState.round === 1) {
      overAllScore = OVERALL_SCORE_POINTS - (
        (sector1R1.user_sector_1?.totalScoreToDeductInRound ?? 0) +
        (sector2R1.user_sector_2?.totalScoreToDeductInRound ?? 0) +
        (sector3R1.user_sector_3?.totalScoreToDeductInRound ?? 0))
    }
  
    if (lobbyState.round === 2) {
      overAllScore = OVERALL_SCORE_POINTS - (
        (sector1R1.user_sector_1?.totalScoreToDeductInRound ?? 0) +
        (sector2R1.user_sector_2?.totalScoreToDeductInRound ?? 0) +
        (sector3R1.user_sector_3?.totalScoreToDeductInRound ?? 0) +
        (sector1R2.user_sector_1?.totalScoreToDeductInRound ?? 0) +
        (sector2R2.user_sector_2?.totalScoreToDeductInRound ?? 0) +
        (sector3R2.user_sector_3?.totalScoreToDeductInRound ?? 0)
      )
    }

    setTotalScore(overAllScore);

    const coinsSpentByRound = lobbyState[LobbyStateEnum.COINS_SPENT_BY_ROUND] || {};
    const coinsTotalPerRound = lobbyState[LobbyStateEnum.COINS_TOTAL_PER_ROUND] || TOTAL_COINS_PER_ROUND;
    const currentRoundCoinsSpent = coinsSpentByRound[lobbyState.round] || 0;
    const currentRoundCoinsLeft = coinsTotalPerRound - currentRoundCoinsSpent;
    
    setCoinsLeft(currentRoundCoinsLeft);

    if (setSector1Performance) {
      const sector1R1Deduction = sector1R1.user_sector_1?.totalScoreToDeductInRound ?? 0;
      const sector1R2Deduction = sector1R2.user_sector_1?.totalScoreToDeductInRound ?? 0;
      const sector1R3Deduction = sector1R3.user_sector_1?.totalScoreToDeductInRound ?? 0;
      const sector1Performance = getSectorPerformance(sector1R1Deduction, sector1R2Deduction, sector1R3Deduction);
      setSector1Performance(sector1Performance);
    }

    if (setSector2Performance) {
      const sector2R1Deduction = sector2R1.user_sector_2?.totalScoreToDeductInRound ?? 0;
      const sector2R2Deduction = sector2R2.user_sector_2?.totalScoreToDeductInRound ?? 0;
      const sector2R3Deduction = sector2R3.user_sector_2?.totalScoreToDeductInRound ?? 0;
      const sector2Performance = getSectorPerformance(sector2R1Deduction, sector2R2Deduction, sector2R3Deduction);
      setSector2Performance(sector2Performance);
    }

    if (setSector3Performance) {
      const sector3R1Deduction = sector3R1.user_sector_3?.totalScoreToDeductInRound ?? 0;
      const sector3R2Deduction = sector3R2.user_sector_3?.totalScoreToDeductInRound ?? 0;
      const sector3R3Deduction = sector3R3.user_sector_3?.totalScoreToDeductInRound ?? 0;
      const sector3Performance = getSectorPerformance(sector3R1Deduction, sector3R2Deduction, sector3R3Deduction);
      setSector3Performance(sector3Performance);
    }

    if (setTotalPerformance) {
      const performance = getTotalPerformance(overAllScore);
      setTotalPerformance(performance);
    }

    console.log({
      1: {
        ...sector1R1,
        ...sector2R1,
        ...sector3R1,
      },
      2: {

        ...sector1R2,
        ...sector2R2,
        ...sector3R2,
      },
      3: {
        ...sector1R3,
        ...sector2R3,
        ...sector3R3,
      },
    })

  }, [newActivities, triggersLoading, lobbyState.gameLobbyStatus]);


  return overallScoresData;
}