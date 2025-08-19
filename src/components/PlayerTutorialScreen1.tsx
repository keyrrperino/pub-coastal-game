import React from 'react';
import Image from 'next/image';
import ProgressBar from '@/games/pub-coastal-game/compontents/ProcessBar';

interface TutorialScreen1Props {
  phaseStartTime?: number;
}

export default function PlayerTutorialScreen1({ phaseStartTime }: TutorialScreen1Props) {
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

      <ProgressBar
        containerClassName="fixed w-[25vw] z-10 top-[1vh] left-[37.5vw] py-[0.8vw] px-[0.4vw]"
        key={`Intro2`}
        duration={12}
        isRunning={true}
        clockStyle={{
          marginRight: 4,
          width: '1.2vw',
          height: '1.2vw',
          border: '0.15vw solid #060606',
        }}
      />

      {/* Dark Overlay with Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[64px]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 overflow-scroll">
        {/* Dark Blue Central Panel with Light Gray Border */}
        <div className="max-w-[85vw] max-h-[85%] h-full w-full px-6">
          <div className="flex flex-col h-full justify-center uppercase gap-8">
            {/* Welcome Title - Centered */}

            <div className="text-center">
              <h1 className="text-white text-[4.2vh] font-bold leading-tight tracking-wide">
              Welcome to the<br />
              Coastal Protection Taskforce!
              </h1>
            </div>
            
            {/* Mission Description - Centered */}
            <div className="flex flex-col gap-4 text-center text-[2.8vh]">
              <p className="text-white">
                Singapore's sea levels are projected to rise <span className="text-[#FF6A6C]">by up to 1.15m by 2100</span>.
              </p>
              <p className="text-white">
                Your goal is to protect every sector of our nation's coast from coastal flooding. You have three rounds to carefully place your coastal defences - balancing the <span className="text-[#FFDD3D]">time</span>, <span className="text-[#FFDD3D]">budget</span>, and <span className="text-[#FFDD3D]">effectiveness</span>.
              </p>
              <p className="text-white">
                The future of our island is in your hands. Are you ready to defend our shores?
              </p>
            </div>

            {/* Disclaimer - Centered */}
            <div className="mt-3 px-6">
              <p className="text-white text-[1.9vh] text-center">
                *Disclaimer: This game is a simplified simulation and might not reflect real-life situations or scenarios.
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-3 flex justify-center items-center">
              <Image
                  src="/assets/PUB logo_white_transparent.svg"
                  alt="pub logo"
                  width={180}
                  height={35}
                  className="object-contain"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}