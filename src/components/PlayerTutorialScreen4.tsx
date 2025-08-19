import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';

interface TutorialScreen3Props {
  phaseStartTime?: number;
  timeRemaining?: number;
  screenDuration: number;
}

export default function PlayerTutorialScreen4({ phaseStartTime, timeRemaining, screenDuration }: TutorialScreen3Props) {
  const coinSize = window.innerHeight / 100;
  
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

      <div className="fixed z-10 top-[2vh] left-1/2 transform -translate-x-1/2 scale-75">
        <TimerBar
          duration={screenDuration}
          isRunning={true}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-[0.5vh] items-center justify-center h-full px-4 pt-[1vh]">
        <div className="px-6 max-w-[95%] w-full">
          <div className="flex flex-col items-center gap-[1.2vh] uppercase">
            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-[0.8vh] text-center">
              <p className="text-[#FFDD3D] text-[2.8vh] font-bold">
                Once you select your coastal protection, it is locked in for the round.
              </p>
              <p className="text-white text-[2.8vh] font-bold">
                Remember to build them according to the right height of sea level rise for maximum protection.
              </p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-[2.5vh] justify-center items-stretch">
              {/* Mangroves Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-5 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-[2vh]">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[3vh] h-[3vh] bg-green-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/mangroves-icon-3a15a8.png"
                        alt="Mangroves"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-[2vh] font-bold">MANGROVES</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-[0.5vh]">
                    <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                      <span className="text-black text-[1.6vh] font-bold">PLANT</span>
                    </div>
                    <div className="flex gap-[0.5vh]">
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seawall Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-5 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-[2vh]">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[3vh] h-[3vh] bg-blue-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/seawall-icon-41fadd.png"
                        alt="Seawall"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-[2vh] font-bold">SEAWALL</span>
                  </div>
                  
                  <div className="flex gap-[1vh]">
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">2M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Land Reclamation Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-5 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-[2vh]">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[3vh] h-[3vh] bg-orange-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/land-reclamation-icon-6b707d.png"
                        alt="Land Reclamation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-[2vh] font-bold">LAND RECLAMATION</span>
                  </div>
                  
                  <div className="flex gap-[1vh]">
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">2M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Image
              src="/assets/arrows-down.svg"
              alt="Mangroves"
              width={window.innerHeight / 2}
              height={8}
              className="position"
            />

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-[2.5vh] justify-center items-stretch">
              {/* Mangroves Card */}
              <div className="bg-white/20 opacity-50 backdrop-blur-sm border border-white/30 rounded-lg p-5 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-[2vh]">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[3vh] h-[3vh] bg-green-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/mangroves-icon-3a15a8.png"
                        alt="Mangroves"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-[2vh] font-bold">MANGROVES</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-[0.5vh]">
                    <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                      <span className="text-black text-[1.6vh] font-bold">PLANT</span>
                    </div>
                    <div className="flex gap-[0.5vh]">
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seawall Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-5 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-[2vh]">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[3vh] h-[3vh] bg-blue-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/seawall-icon-41fadd.png"
                        alt="Seawall"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-[2vh] font-bold">SEAWALL</span>
                  </div>
                  <div className="flex gap-[1vh]">
                    <div className="flex flex-col items-center gap-[0.5vh] opacity-50">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#FFEF3E] to-[#FFA557] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.5vh] opacity-50">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">2M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Land Reclamation Card */}
              <div className="bg-white/20 opacity-50 backdrop-blur-sm border border-white/30 rounded-lg p-5 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-[2vh]">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[3vh] h-[3vh] bg-orange-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/land-reclamation-icon-6b707d.png"
                        alt="Land Reclamation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-[2vh] font-bold">LAND RECLAMATION</span>
                  </div>
                  
                  <div className="flex gap-[1vh]">
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.5vh]">
                      <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-[1.6vh] font-bold">2M</span>
                      </div>
                      <div className="flex gap-[0.3vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize * 1.3} height={coinSize * 1.3} className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  );
} 