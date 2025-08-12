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
}

const getSectorPerformance = (score: number): SectorPerformance => {
  if (score >= 0 && score <= 30) return 'good';
  if (score >= 31 && score <= 60) return 'okay';
  return 'bad';
};

export function useSectorScores({
  activities,
  lobbyState,
  setTotalScore,
  setCoinsLeft,
  setSector1Performance,
  setSector2Performance,
  setSector3Performance,
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
      const sector1TotalDeduction = 
        (sector1R1.user_sector_1?.totalScoreToDeductInRound ?? 0) +
        (sector1R2.user_sector_1?.totalScoreToDeductInRound ?? 0) +
        (sector1R3.user_sector_1?.totalScoreToDeductInRound ?? 0);
      setSector1Performance(getSectorPerformance(sector1TotalDeduction));
    }

    if (setSector2Performance) {
      const sector2TotalDeduction = 
        (sector2R1.user_sector_2?.totalScoreToDeductInRound ?? 0) +
        (sector2R2.user_sector_2?.totalScoreToDeductInRound ?? 0) +
        (sector2R3.user_sector_2?.totalScoreToDeductInRound ?? 0);
      setSector2Performance(getSectorPerformance(sector2TotalDeduction));
    }

    if (setSector3Performance) {
      const sector3TotalDeduction = 
        (sector3R1.user_sector_3?.totalScoreToDeductInRound ?? 0) +
        (sector3R2.user_sector_3?.totalScoreToDeductInRound ?? 0) +
        (sector3R3.user_sector_3?.totalScoreToDeductInRound ?? 0);
      setSector3Performance(getSectorPerformance(sector3TotalDeduction));
    }

  }, [activities, lobbyState, setSector1Performance, setSector2Performance, setSector3Performance]);
}