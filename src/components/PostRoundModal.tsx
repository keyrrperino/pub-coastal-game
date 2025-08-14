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

const performanceConfigs: Record<PostRoundPerformance, PerformanceConfig> = {
  good: {
    title: "LITTLE TO NO FLOODING",
    message: "Excellent work! You've successfully protected our coasts from the impacts of rising sea levels. Continue your efforts and implement further adaptive measures.",
    bgColor: "rgba(123, 255, 215, 0.5)",
    borderGradient: "linear-gradient(135deg, #91E2FF 0%, #FFFFFF 100%)"
  },
  okay: {
    title: "medium flooding",
    message: "Occasional flooding has been detected in your sector. It's recommended to build higher in response to sea lever rise. Keep up the good work!",
    bgColor: "rgba(251, 255, 176, 0.5)",
    borderGradient: "linear-gradient(135deg, #F7FF69 0%, #FFFFFF 100%)"
  },
  bad: {
    title: "heavy flooding",
    message: "alert! Heavy flooding detected in your sector. Immediate changes are required to ensure adequate protection against rising sea levels.",
    bgColor: "rgba(255, 176, 176, 0.5)",
    borderGradient: "linear-gradient(135deg, #FF7CE3 0%, #FFFFFF 100%)"
  }
};

export default function PostRoundModal({
  isOpen,
  performance,
  onClose,
  sector,
  overallScoresData,
  currentRound,
  onContinue
}: PostRoundModalProps) {
  if (!isOpen) return null;

  const getPerformanceRound = (): PostRoundPerformance => {
    const roundData = overallScoresData[(currentRound ?? 1) as RoundType];

    const totalScoreRound = roundData ? (roundData[sector]?.totalScoreToDeduct ?? 0) : 0;

    let performance = "okay";
    if (currentRound === 1) {
      if (totalScoreRound >= 0 && totalScoreRound <= 30) {
        performance = "good";
      }
      if (totalScoreRound > 30 && totalScoreRound <= 60) {
        performance = "okay";
      }
      if (totalScoreRound > 60 && totalScoreRound <= 120) {
        performance = "bad";
      }
    }

    if (currentRound === 2) {
      if (totalScoreRound >= 0 && totalScoreRound <= 69.99) {
        performance = "good";
      }
      if (totalScoreRound > 70 && totalScoreRound <= 160) {
        performance = "okay";
      }
      if (totalScoreRound > 160 && totalScoreRound <= 300) {
        performance = "bad";
      }
    }

    if (currentRound === 3) {
      if (totalScoreRound >= 0 && totalScoreRound <= 89.99) {
        performance = "good";
      }
      if (totalScoreRound > 90 && totalScoreRound <= 230) {
        performance = "okay";
      }
      if (totalScoreRound > 230 && totalScoreRound <= 400) {
        performance = "bad";
      }
    }

    return performance as PostRoundPerformance;
  }


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
          backgroundColor: config.bgColor
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