import React from 'react';
import Image from 'next/image';

interface TutorialScreen1Props {
  onContinue: () => void;
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
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* Dark Blue Central Panel with Light Gray Border */}
        <div className="max-w-6xl max-h-[80%] h-full w-full px-12">
          <div className="flex flex-col h-full justify-between">
            {/* Welcome Title - Centered */}
            <div className="text-center">
              <h1 className="text-white text-5xl font-bold leading-tight tracking-wide">
                WELCOME TO THE<br/>COASTAL PROTECTION TASKFORCE!
              </h1>
            </div>
            
            {/* Mission Description - Centered */}
            <div className="flex flex-col gap-6 text-center">
              <p className="text-white text-3xl">
                SINGAPORE FACES A RISING THREAT: MEAN SEA LEVELS ARE PROJECTED TO RISE 1.15M BY 2100. YOUR MISSION IS TO PROTECT EVERY SECTOR OF OUR NATION'S COAST.
              </p>
              <p className="text-white text-3xl">
                YOU HAVE THREE ROUNDS TO STRATEGICALLY DEPLOY COASTAL DEFENSES - BALANCING YOUR TIME, BUDGET, AND THE EFFECTIVENESS OF YOUR CHOSEN MEASURES.
              </p>
              <p className="text-white text-3xl">
                YOUR SUCCESS IS TALLIED BY HOW WELL YOU PROTECT SINGAPORE BY BUILDING TO THE RIGHT SEA LEVEL RISE.
              </p>
              <p className="text-white text-3xl">
                THE FUTURE OF OUR ISLAND IS IN YOUR HANDS. ARE YOU READY TO DEFEND OUR SHORES?
              </p>
            </div>

            {/* Disclaimer - Centered */}
            <div className="mt-4 px-12">
              <p className="text-white text-xl text-center">
                *DISCLAIMER: THIS GAME IS A SIMPLIFIED SIMULATION AND MIGHT NOT REFLECT REAL-LIFE ENGINEERING OR PLANNING PROCESSES.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 