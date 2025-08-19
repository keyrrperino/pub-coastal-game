import React from 'react';
import Image from 'next/image';
import ProgressBar from '@/games/pub-coastal-game/compontents/ProcessBar';

interface TutorialScreen3Props {
  timeRemaining?: number;
  phaseStartTime: number;
}

export default function PlayerTutorialScreen5({ timeRemaining }: TutorialScreen3Props) {
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
        containerClassName="fixed w-[30vw] z-10 top-[2vh] left-[35vw] py-[1vw] px-[0.5vw]"
        key={`Intro2`}
        duration={12}
        isRunning={true}
        clockStyle={{
          marginRight: 5,
          width: '1.5vw',
          height: '1.5vw',
          border: '0.2vw solid #060606',
        }}
      />

      {/* Dark Overlay with Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[64px]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="px-12 max-w-[89%] w-full">
          <div className="flex flex-col items-center gap-16">
            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-6 text-center  uppercase">
              <p className="text-white text-[3vh] font-bold">
                Choose wisely, your team has a <span className="text-[#FFDD3D]">collective budget of 10 coins</span> per round
              </p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-8 justify-center items-stretch">
              <div className="bg-white/20 backdrop-blur-sm border border-white/70 rounded-lg p-6 shadow-lg flex flex-col justify-between h-[auto] w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-white text-[5vh] font-bold">OVERALL BUDGET</span>
                  </div>
                  
                  <div className="flex gap-2 w-full items-center justify-center">
                    <div className="flex flex-col items-center gap-1 w-full justify-center">
                      <div className="flex gap-1 w-full items-center justify-center">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                      </div>
                      <div className="flex gap-1 w-full items-center justify-center">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={75} height={75} className="object-contain" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-[3vh] font-bold">10 coins PER ROUND</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 text-center  uppercase">
              <p className="text-white text-[3vh] font-bold">
              Every action deducts from the total score of 2,500
              </p>
              <p className="text-[#FF8181] text-[4.5vh] font-bold">
                Strategize with your teammates NOW!
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-5 flex justify-center items-center">
              <Image
                  src="/assets/PUB logo_white_transparent.svg"
                  alt="pub logo"
                  width={238}
                  height={46}
                  className="object-contain"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 