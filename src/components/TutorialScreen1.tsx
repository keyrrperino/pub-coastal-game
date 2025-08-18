import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';

interface TutorialScreen1Props {
  onContinue?: () => void;
  screenDuration?: number;
}

export default function TutorialScreen1({ onContinue, screenDuration = 15 }: TutorialScreen1Props) {
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

      {/* Dark Overlay with Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[64px]" />

      {/* Timer Bar - Fixed at top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <TimerBar
          duration={screenDuration}
          isRunning={true}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* Main Content */}
        <div className="flex flex-col items-center gap-5 max-w-[1030px] mt-8">
          {/* Welcome Title */}
          <h1 className="text-white text-5xl leading-[1.1] text-center max-w-[938px]">
            Welcome to the<br/>Coastal Protection Taskforce!
          </h1>
          
          {/* Mission Description */}
          <div className="text-white text-3xl leading-[1.3] text-center max-w-full">
            <p className="mb-6">
              Singapore's sea levels are projected to rise <span style={{ color: 'rgba(255, 106, 108, 1)' }}>by up to 1.15m by 2100</span>.
            </p>
            <p className="mb-6">
              Your goal is to protect every sector of our nation's coast from coastal flooding. You have three rounds to carefully place your coastal defences - balancing the <span style={{ color: 'yellow' }}>time</span>, <span style={{ color: 'yellow' }}>budget</span>, and <span style={{ color: 'yellow' }}>effectiveness</span>.
            </p>
            <p>
              The future of our island is in your hands. Are you ready to defend our shores?
            </p>
          </div>

          {/* Disclaimer */}
          <div className="max-w-[890px]">
            <p className="text-white text-[22px] leading-[1.3] text-center">
              *Disclaimer: This game is a simplified simulation and might not reflect real-life situations or scenarios.
            </p>
          </div>
        </div>

        {/* PUB Logo - Fixed at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Image
            src="/assets/pub-logo-white-7ae72a.png"
            alt="PUB Logo"
            width={238}
            height={46}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}