import { useEffect } from 'react';
import { ActivityLogType, LobbyStateType, RoundType } from '@/lib/types';
import { UserSectorEnum } from '@/lib/enums';
import { getSectorRoundScore } from '@/lib/utils';
import { OVERALL_SCORE_POINTS, TOTAL_COINS_PER_ROUND } from '@/lib/constants';

export type SectorPerformance = 'good' | 'okay' | 'bad';

interface UseSectorScoresProps {
  activities: ActivityLogType[];
  lobbyState: LobbyStateType;
  setTotalScore: (score: number) => void;
  setCoinsLeft: (coins: number) => void;
  setSector1Performance?: (performance: SectorPerformance) => void;
  setSector2Performance?: (performance: SectorPerformance) => void;
  setSector3Performance?: (performance: SectorPerformance) => void;
  setTotalPerformance?: (performance: SectorPerformance) => void;
}

// Per-round sector performance evaluation
const getRoundSectorPerformance = (deduction: number, round: number): SectorPerformance => {
  const absoluteDeduction = Math.abs(deduction);
  
  switch (round) {
    case 1:
      // Round 1: Light 0 to -39.99, Medium -40 to -60, Heavy -60.01+
      if (absoluteDeduction <= 39.99) return 'good';   // Light/No Flooding
      if (absoluteDeduction <= 60) return 'okay';      // Medium Flooding
      return 'bad';                                     // Heavy Flooding
      
    case 2:
      // Round 2: Light 0 to -70, Medium -70.01 to -140, Heavy -140.01+
      if (absoluteDeduction <= 70) return 'good';      // Light/No Flooding
      if (absoluteDeduction <= 140) return 'okay';     // Medium Flooding
      return 'bad';                                     // Heavy Flooding
      
    case 3:
      // Round 3: Light 0 to -70, Medium -70.01 to -230, Heavy -230.01+
      if (absoluteDeduction <= 70) return 'good';      // Light/No Flooding
      if (absoluteDeduction <= 230) return 'okay';     // Medium Flooding
      return 'bad';                                     // Heavy Flooding
      
    default:
      // Fallback to Round 1 thresholds
      if (absoluteDeduction <= 39.99) return 'good';
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
  if (totalScore > 1000) return 'good';
  if (totalScore >= 625 && totalScore <= 999) return 'okay';
  return 'bad'; // < 625
};

export function useSectorScores({
  activities,
  lobbyState,
  setTotalScore,
  setCoinsLeft,
  setSector1Performance,
  setSector2Performance,
  setSector3Performance,
  setTotalPerformance,
}: UseSectorScoresProps) {
  useEffect(() => {
    const sector1R1 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[1],
      1 as RoundType,
      UserSectorEnum.USER_SECTOR_ONE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus
    );
    const sector2R1 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[1],
      1 as RoundType,
      UserSectorEnum.USER_SECTOR_TWO,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus
    );
    const sector3R1 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[1],
      1 as RoundType,
      UserSectorEnum.USER_SECTOR_THREE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus
    );

    const sector1R2 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[2],
      2 as RoundType,
      UserSectorEnum.USER_SECTOR_ONE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus
    );
    const sector2R2 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[2],
      2 as RoundType,
      UserSectorEnum.USER_SECTOR_TWO,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus
    );
    const sector3R2 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[2],
      2 as RoundType,
      UserSectorEnum.USER_SECTOR_THREE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus
    );

    const sector1R3 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[3],
      3 as RoundType,
      UserSectorEnum.USER_SECTOR_ONE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus
    );
    const sector2R3 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[3],
      3 as RoundType,
      UserSectorEnum.USER_SECTOR_TWO,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus
    );
    const sector3R3 = getSectorRoundScore(
      activities ?? [],
      lobbyState.randomizeEffect[3],
      3 as RoundType,
      UserSectorEnum.USER_SECTOR_THREE,
      lobbyState.round ?? 1,
      lobbyState.gameLobbyStatus
    );

    const overAllScore = OVERALL_SCORE_POINTS - (
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

    setTotalScore(overAllScore);

    const coinsR1 = (
      (sector1R1.user_sector_1?.totalCoinsToDeduct ?? 0) +
      (sector2R1.user_sector_2?.totalCoinsToDeduct ?? 0) +
      (sector3R1.user_sector_3?.totalCoinsToDeduct ?? 0)
    );

    const coinsR2 = (
      (sector1R2.user_sector_1?.totalCoinsToDeduct ?? 0) +
      (sector2R2.user_sector_2?.totalCoinsToDeduct ?? 0) +
      (sector3R2.user_sector_3?.totalCoinsToDeduct ?? 0)
    );

    const coinsR3 = (
      (sector1R3.user_sector_1?.totalCoinsToDeduct ?? 0) +
      (sector2R3.user_sector_2?.totalCoinsToDeduct ?? 0) +
      (sector3R3.user_sector_3?.totalCoinsToDeduct ?? 0)
    );

    const currentRoundCoins = lobbyState.round === 1 ? coinsR1 : lobbyState.round === 2 ? coinsR2 : coinsR3;
    setCoinsLeft(TOTAL_COINS_PER_ROUND - currentRoundCoins);

    // Calculate sector performances and set them if setters are provided
    if (setSector1Performance) {
      const sector1R1Deduction = sector1R1.user_sector_1?.totalScoreToDeductInRound ?? 0;
      const sector1R2Deduction = sector1R2.user_sector_1?.totalScoreToDeductInRound ?? 0;
      const sector1R3Deduction = sector1R3.user_sector_1?.totalScoreToDeductInRound ?? 0;
      const sector1Performance = getSectorPerformance(sector1R1Deduction, sector1R2Deduction, sector1R3Deduction);
      console.log('🔵 SECTOR 1 PERFORMANCE:', {
        r1: sector1R1Deduction, 
        r2: sector1R2Deduction, 
        r3: sector1R3Deduction,
        overall: sector1Performance
      });
      setSector1Performance(sector1Performance);
    }

    if (setSector2Performance) {
      const sector2R1Deduction = sector2R1.user_sector_2?.totalScoreToDeductInRound ?? 0;
      const sector2R2Deduction = sector2R2.user_sector_2?.totalScoreToDeductInRound ?? 0;
      const sector2R3Deduction = sector2R3.user_sector_2?.totalScoreToDeductInRound ?? 0;
      const sector2Performance = getSectorPerformance(sector2R1Deduction, sector2R2Deduction, sector2R3Deduction);
      console.log('🔵 SECTOR 2 PERFORMANCE:', {
        r1: sector2R1Deduction, 
        r2: sector2R2Deduction, 
        r3: sector2R3Deduction,
        overall: sector2Performance
      });
      setSector2Performance(sector2Performance);
    }

    if (setSector3Performance) {
      const sector3R1Deduction = sector3R1.user_sector_3?.totalScoreToDeductInRound ?? 0;
      const sector3R2Deduction = sector3R2.user_sector_3?.totalScoreToDeductInRound ?? 0;
      const sector3R3Deduction = sector3R3.user_sector_3?.totalScoreToDeductInRound ?? 0;
      const sector3Performance = getSectorPerformance(sector3R1Deduction, sector3R2Deduction, sector3R3Deduction);
      console.log('🔵 SECTOR 3 PERFORMANCE:', {
        r1: sector3R1Deduction, 
        r2: sector3R2Deduction, 
        r3: sector3R3Deduction,
        overall: sector3Performance
      });
      setSector3Performance(sector3Performance);
    }

    // Calculate total performance based on overall score
    if (setTotalPerformance) {
      const performance = getTotalPerformance(overAllScore);
      console.log('🟡 TOTAL PERFORMANCE CALCULATION:');
      console.log('Overall Score:', overAllScore);
      console.log('Overall Score Points:', OVERALL_SCORE_POINTS);
      console.log('Performance:', performance);
      console.log('Thresholds: >1000=good, 625-999=okay, <625=bad');
      setTotalPerformance(performance);
    }

  }, [activities, lobbyState, setSector1Performance, setSector2Performance, setSector3Performance, setTotalPerformance]);
}