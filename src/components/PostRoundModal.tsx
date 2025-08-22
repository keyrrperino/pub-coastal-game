import React from 'react';
import Image from 'next/image';
import { OverallScoresTypes, RoundType } from '@/lib/types';
import { UserSectorEnum } from '@/lib/enums';

export type PostRoundPerformance = 'good' | 'okay' | 'bad';

interface PostRoundModalProps {
  isOpen: boolean;
  performance: PostRoundPerformance;
  currentRound: number;
  sector: UserSectorEnum;
  overallScoresData: { [key in RoundType]?: OverallScoresTypes };
  onClose?: () => void;
  onContinue?: () => void;
}

interface PerformanceConfig {
  title: string;
  message: string;
  bgColor: string;
  borderGradient: string;
}

const performanceConfigs: Record<
  PostRoundPerformance,
  PerformanceConfig
> = {
  good: {
    title: 'NO FLOODING',
    message:
      "You've successfully protected our coasts - continue to implement further adaptive measures.",
    bgColor: 'rgba(123, 255, 215, 0.5)',
    borderGradient:
      'linear-gradient(135deg, #91E2FF 0%, #FFFFFF 100%)',
  },
  okay: {
    title: 'MODERATE FLOODING',
    message:
      'Build your measures higher in response to sea level rise to avoid flooding in your sector',
    bgColor: 'rgba(251, 255, 176, 0.5)',
    borderGradient:
      'linear-gradient(135deg, #F7FF69 0%, #FFFFFF 100%)',
  },
  bad: {
    title: 'HEAVY FLOODING',
    message:
      'Your coastal defence is not water-tight. Immediate changes are required to ensure adequate protection against rising sea levels.',
    bgColor: 'rgba(255, 176, 176, 0.5)',
    borderGradient:
      'linear-gradient(135deg, #FF7CE3 0%, #FFFFFF 100%)',
  },
};

export default function PostRoundModal({
  isOpen,
  performance,
  onClose,
  sector,
  overallScoresData,
  currentRound,
  onContinue,
}: PostRoundModalProps) {
  if (!isOpen) return null;

  const getPerformanceRound = (): PostRoundPerformance => {
    const roundData =
      overallScoresData[(currentRound ?? 1) as RoundType];

    const totalScoreRound = roundData
      ? (roundData[sector]?.totalScoreToDeduct ?? 0)
      : 0;

    let performance = 'okay';
    if (currentRound === 1) {
      // Round 1: No Flooding 0 to -5, Moderate -5.01 to -60, Heavy -60.01 to -120
      if (totalScoreRound >= 0 && totalScoreRound <= 5) {
        performance = 'good';
      }
      if (totalScoreRound > 5 && totalScoreRound <= 60) {
        performance = 'okay';
      }
      if (totalScoreRound > 60 && totalScoreRound <= 120) {
        performance = 'bad';
      }
    }

    if (currentRound === 2) {
      // Round 2: No Flooding 0 to -5, Moderate -5.01 to -149.99, Heavy -150 to -300
      if (totalScoreRound >= 0 && totalScoreRound <= 5) {
        performance = 'good';
      }
      if (totalScoreRound > 5 && totalScoreRound <= 149.99) {
        performance = 'okay';
      }
      if (totalScoreRound > 149.99 && totalScoreRound <= 300) {
        performance = 'bad';
      }
    }

    if (currentRound === 3) {
      // Round 3: No Flooding 0 to -5, Moderate -5.01 to -179.99, Heavy -180 to -400
      if (totalScoreRound >= 0 && totalScoreRound <= 5) {
        performance = 'good';
      }
      if (totalScoreRound > 5 && totalScoreRound <= 179.99) {
        performance = 'okay';
      }
      if (totalScoreRound > 179.99 && totalScoreRound <= 400) {
        performance = 'bad';
      }
    }

    return performance as PostRoundPerformance;
  };

  const config = performanceConfigs[getPerformanceRound()];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={handleBackdropClick}
    >
      {/* Main Modal Container */}
      <div
        className="relative w-[812px] max-w-[70vw] w-full py-4 rounded-[26px] backdrop-blur-[17px] shadow-lg"
        style={{
          backgroundColor: config.bgColor,
        }}
      >
        {/* Border using ::after pseudo-element */}
        <style jsx>{`
          div::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 26px;
            padding: 2px;
            background: ${config.borderGradient};
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
          }
        `}</style>
        {/* Content */}
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-white text-3xl font-bold max-w-full w-full uppercase">
            {config.title}
          </h2>
          <p className="text-white text-xl font-bold max-w-[60%] uppercase leading-relaxed">
            {config.message}
          </p>
        </div>
      </div>
    </div>
  );
}

