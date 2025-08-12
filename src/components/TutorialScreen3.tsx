import React from 'react';
import Image from 'next/image';

interface TutorialScreen3Props {
  onContinue: () => void;
}

export default function TutorialScreen3({ onContinue }: TutorialScreen3Props) {
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
            <div className="flex flex-col gap-6 text-center">
              <p className="text-white text-2xl font-bold">
                IN EACH SECTOR, YOU HAVE A SELECTION OF THREE COASTAL PROTECTION MEASURES TO CHOOSE FROM: FROM PLANTING MANGROVES, TO BUILDING A SEAWALL OR A COASTAL BARRIER. ALL HAVE COSTS TIED TO THEM.
              </p>
              <p className="text-white text-2xl font-bold">
                REMEMBER, EACH HAS ITS OWN STRENGTHS, WEAKNESSES, AND COSTS – TAKE A MOMENT TO EXPLORE YOUR OPTIONS.
              </p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-8 justify-center items-stretch">
              {/* Mangroves Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/mangroves-icon-3a15a8.png"
                        alt="Mangroves"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-xl font-bold">MANGROVES</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                      <span className="text-black text-sm font-bold">PLANT</span>
                    </div>
                    <div className="flex gap-1">
                      <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seawall Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/seawall-icon-41fadd.png"
                        alt="Seawall"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-xl font-bold">SEAWALL</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-1">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-1">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">2M</span>
                      </div>
                      <div className="flex gap-1">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Land Reclamation Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/land-reclamation-icon-6b707d.png"
                        alt="Land Reclamation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-xl font-bold">LAND RECLAMATION</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-1">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-1">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">2M</span>
                      </div>
                      <div className="flex gap-1">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={12} height={12} className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Game Instructions and Countdown */}
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="text-white text-2xl font-bold">
                DURING GAMEPLAY, YOUR COASTAL MEASURE IS LOCKED IN FOR THE ROUND ONCE DEPLOYED. CHOOSE WISELY. STRATEGIZE WITH YOUR TEAMMATES.
              </p>
              
              <h2 className="text-white text-6xl font-bold text-center leading-tight tracking-wide mt-8">
                3... 2... 1... GO!
              </h2>
              
              <p className="text-white text-xl text-center font-bold">
                THE TIDES ARE RISING. START PLANNING!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 