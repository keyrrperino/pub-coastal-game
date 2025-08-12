import React from 'react';
import Image from 'next/image';

export type PlayerEndingType = 'success' | 'moderate' | 'failure';

interface PlayerEndingScreenProps {
  endingType: PlayerEndingType;
  finalScore?: number;
}

interface PlayerEndingConfig {
  title: string;
  subtitle: string;
}

const playerEndingConfigs: Record<PlayerEndingType, PlayerEndingConfig> = {
  success: {
    title: "Congratulations!",
    subtitle: "You've successfully defended Singapore's shores from rising sea levels."
  },
  moderate: {
    title: "Well done!",
    subtitle: "You've made important progress protecting Singapore's coasts."
  },
  failure: {
    title: "Oh no",
    subtitle: "too many floods have breached Singapore's defenses this time. But don't give up!"
  }
};

export default function PlayerEndingScreen({ 
  endingType,
  finalScore = 5000
}: PlayerEndingScreenProps) {
  const config = playerEndingConfigs[endingType];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/player-ending-bg.png"
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
        <div className="flex flex-col items-center gap-20 max-w-screen w-full">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="text-white text-7xl font-bold text-center leading-[0.8] drop-shadow-[0px_4px_4px_rgba(148,107,199,1)]">
              {config.title}
            </h1>
            <p className="text-white text-3xl uppercase font-bold text-center leading-[1.2] max-w-[75vw] drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
              {config.subtitle}
            </p>
            
            <div className='max-w-[75vw] mt-24'>
              <p className="text-white text-4xl font-bold text-center leading-[1.2] max-w-screen drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
                YOUR FINAL SCORE:<br/>{finalScore.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 