import React from 'react';
import Image from 'next/image';
import { SectorPerformance } from './hooks/useSectorScores';
import { PlayerEndingType } from './PlayerEndingScreen';
import { OverallScoresTypes, RoundType } from '@/lib/types';

export type EndingType = 'success' | 'moderate' | 'failure';

interface EndingScreenProps {
  performance: SectorPerformance;
  finalScore?: number;
  onRestart?: () => void;
  onMainMenu?: () => void;
}

interface EndingConfig {
  title: string;
  subtitle: string;
  bgColor: string;
  borderGradient: string;
  content: React.ReactNode;
  buttonColor: string;
  buttonHoverColor: string;
}

const endingConfigs: Record<EndingType, EndingConfig> = {
  success: {
    title: "Congratulations!",
    subtitle: "You've successfully defended Singapore's shores from rising sea levels. ",
    bgColor: "rgba(175, 255, 178, 0.3)",
    borderGradient: "linear-gradient(135deg, #91E2FF 0%, #FFFFFF 100%)",
    buttonColor: "from-green-500 to-green-600",
    buttonHoverColor: "from-green-600 to-green-700",
    content: <>
      Your strategic choices have made a real difference in safeguarding our island for generations to come.
      <br />
      But remember: no solution is perfect, and the fight against the rising tides is far from over.
      <br />
      We need you - our coastal protector - to keep standing strong.
    </>,
  },
  moderate: {
    title: "Well done!",
    subtitle: "You've made important progress protecting Singapore's coasts.",
    content: <>
      Not bad! There's still room to improve, but every step counts in this ongoing battle against sea level rise.
      <br />
      Keep learning, keep adapting - our island depends on it.
      <br />
      You are a vital part of the coastal protection effort.
    </>,
    bgColor: "rgba(255, 238, 175, 0.3)",
    borderGradient: "linear-gradient(135deg, #FFEEAF 0%, #FFFFFF 100%)",
    buttonColor: "from-yellow-500 to-yellow-600",
    buttonHoverColor: "from-yellow-600 to-yellow-700"
  },
  failure: {
    title: "Oh no",
    subtitle: "Oh no, too many floods have breached Singapore’s defenses.",
    bgColor: "rgba(255, 175, 175, 0.3)",
    borderGradient: "linear-gradient(135deg, rgba(17, 68, 153, 0) 0%, #FFFFFF 100%)",
    buttonColor: "from-red-500 to-red-600",
    buttonHoverColor: "from-red-600 to-red-700",
    content: <>
      Try again to improve your strategy.
      <br />
      Remember, no single solution is perfect, but we must act now and together to protect future generations.
      <br />
      We're counting on you, coastal protector.
    </>,
  }
};

export default function EndingScreen({ 
  performance,
  finalScore = 2500, 
  onRestart, 
  onMainMenu 
}: EndingScreenProps) {
  const getEndingType = (performance: SectorPerformance): PlayerEndingType => {
    switch (performance) {
      case 'good':
        return 'success';
      case 'okay':
        return 'moderate';
      case 'bad':
        return 'failure';
      default:
        return 'moderate';
    }
  };


  const endingType = getEndingType(performance);
  const config = endingConfigs[endingType];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/tutorial-bg.png"
          alt="Coastal background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="flex flex-col items-center gap-15 max-w-screen w-full">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-20 w-full">
            <h1 className="text-white text-7xl font-bold text-center leading-[0.8] drop-shadow-[0px_4px_4px_rgba(148,107,199,1)]">
              {config.title}
            </h1>
            
            <div className='flex flex-col gap-6 max-w-[75vw]'>
              <p className="text-white text-3xl uppercase font-bold text-center leading-[1.2] max-w-screen drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
                {config.subtitle}
              </p>
              
            </div>
          </div>

          {/* Message Box */}
          <div className="relative max-w-[60vw] w-full rounded-[56px] backdrop-blur-[37px] shadow-[0px_13px_63px_rgba(0,0,0,0.15)]">
            {/* Border using ::after pseudo-element */}
            <style jsx>{`
              div::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 56px;
                padding: 5px;
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
            
            <div 
              className="relative w-full h-full rounded-[56px] py-10 px-20"
              style={{ backgroundColor: config.bgColor }}
            >
              <p className="text-white text-3xl font-bold text-center drop-shadow-[0px_2px_2px_rgba(148,107,199,1)] font-condensed">
                {config.content}
              </p>
            </div>
          </div>

          <p className="text-white text-3xl font-bold text-center leading-[1.2] max-w-screen drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
            YOUR FINAL SCORE: <br />
            <span className="text-[#FFDD3D]">{finalScore.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
} 