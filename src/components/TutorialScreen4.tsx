import React from 'react';
import Image from 'next/image';

interface TutorialScreen3Props {
  onContinue?: () => void;
  timeRemaining?: number;
}

export default function TutorialScreen4({ onContinue, timeRemaining }: TutorialScreen3Props) {
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
        <div className="px-12 max-w-6xl w-full">
          <div className="flex flex-col items-center gap-16">
            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-6 text-center  uppercase">
              <p className="text-white text-2xl font-bold">
                Choose wisely, your team has a <span className="text-[#FFDD3D]">collective budget of 10 coins.</span>
              </p>
              <p className="text-white text-2xl font-bold">
                Strategize with your teammates.
              </p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-8 justify-center items-stretch">
              <div className="bg-white/20 backdrop-blur-sm border border-white/70 rounded-lg p-6 shadow-lg flex flex-col justify-between h-[auto] w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
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
                </div>
              </div>
            </div>

            {/* Bottom Section - Game Instructions and Countdown */}
            <div className="flex flex-col items-center gap-6 text-center">
              
              {/* Reserved space for countdown - always present to prevent layout shift */}
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-white text-[6vh] font-bold text-center leading-tight tracking-wide mt-8 min-h-[72px] flex items-center">
                  {timeRemaining !== undefined && (
                    timeRemaining === 0 ? 'GO!' : 
                    (timeRemaining <= 3 && timeRemaining >= 1 ? `${Math.ceil(timeRemaining)}...` : null)
                  )}
                </h2>
                
                <p className="text-white text-xl text-center font-bold min-h-[28px] flex items-center">
                  {timeRemaining !== undefined && timeRemaining <= 3 && "ONTO THE YEAR 2025-2050!"}
                </p>
              </div>
            </div>
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