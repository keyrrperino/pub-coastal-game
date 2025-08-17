import React from 'react';
import Image from 'next/image';

interface TutorialScreen1Props {
  onContinue?: () => void;
}

export default function TutorialScreen1({ onContinue }: TutorialScreen1Props) {
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

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 overflow-scroll">
        {/* Dark Blue Central Panel with Light Gray Border */}
        <div className="max-w-[70vw] max-h-[80%] h-full w-full px-12">
          <div className="flex flex-col h-full justify-between">
            {/* Welcome Title - Centered */}
            <div className="text-center">
              <h1 className="text-white text-[5vh] font-bold leading-tight tracking-wide">
                WELCOME TO THE<br/>COASTAL PROTECTION TASKFORCE!
              </h1>
            </div>
            
            {/* Mission Description - Centered */}
            <div className="flex flex-col gap-6 text-center text-[3vh] uppercase">
              <p className="text-white">
              Singapore’s sea levels are projected to rise by up to 1.15m by 2100.
              </p>
              <p className="text-white">
              Your goal is to protect every sector of our nation’s coast from coastal flooding. You have three rounds to carefully place your coastal defences - balancing the time, budget, and effectiveness. 
                </p>
              <p className="text-white">
                The future of our island is in your hands. Are you ready to defend our shores?
              </p>
            </div>

            {/* Disclaimer - Centered */}
            <div className="mt-4 px-12">
              <p className="text-white text-[2vh] text-center">
                *DISCLAIMER: THIS GAME IS A SIMPLIFIED SIMULATION AND MIGHT NOT REFLECT REAL-LIFE SITUATIONS OR SCENARIOS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 