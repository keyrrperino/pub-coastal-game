import React from 'react';
import Image from 'next/image';
import ProgressBar from '@/games/pub-coastal-game/compontents/ProcessBar';

interface TutorialScreen3Props {
  phaseStartTime: number;
  timeRemaining?: number;
}

export default function PlayerTutorialScreen4({ phaseStartTime, timeRemaining }: TutorialScreen3Props) {
  const localStartRef = React.useRef<number>(Date.now());
  const coinSize = window.innerHeight / 120;
  
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

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-[0.5vh] items-center justify-center h-full px-4 pt-[1vh]">
        <div className="px-6 max-w-[95%] w-full">
          <div className="flex flex-col items-center gap-[1.2vh] uppercase">
            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-[0.8vh] text-center">
              <p className="text-[#FFDD3D] text-[2.5vh] font-bold">
                Once you select your coastal protection, it is locked in for the round.
              </p>
              <p className="text-white text-[2.5vh] font-bold">
                Remember to build them according to the right height of sea level rise for maximum protection.
              </p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-[1.5vh] justify-center items-stretch">
              {/* Mangroves Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-[0.5vh]">
                  <div className="flex items-center gap-[0.5vh]">
                    <div className="w-[1.2vh] h-[1.2vh] bg-green-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/mangroves-icon-3a15a8.png"
                        alt="Mangroves"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-sm font-bold">MANGROVES</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-[0.5vh]">
                    <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">PLANT</span>
                    </div>
                    <div className="flex gap-[0.3vh]">
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seawall Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-[0.5vh]">
                    <div className="w-[1.2vh] h-[1.2vh] bg-blue-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/seawall-icon-41fadd.png"
                        alt="Seawall"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-sm font-bold">SEAWALL</span>
                  </div>
                  
                  <div className="flex gap-[0.5vh]">
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">2M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Land Reclamation Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-[0.5vh]">
                    <div className="w-[1.2vh] h-[1.2vh] bg-orange-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/land-reclamation-icon-6b707d.png"
                        alt="Land Reclamation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-sm font-bold">LAND RECLAMATION</span>
                  </div>
                  
                  <div className="flex gap-[0.5vh]">
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">2M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Image
              src="/assets/arrows-down.svg"
              alt="Mangroves"
              width={window.innerHeight / 2.5}
              height={8}
              className="position"
            />

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-[1.5vh] justify-center items-stretch">
              {/* Mangroves Card */}
              <div className="bg-white/20 opacity-50 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-[0.5vh]">
                    <div className="w-[1.2vh] h-[1.2vh] bg-green-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/mangroves-icon-3a15a8.png"
                        alt="Mangroves"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-sm font-bold">MANGROVES</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-[0.5vh]">
                    <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">PLANT</span>
                    </div>
                    <div className="flex gap-[0.3vh]">
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seawall Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-[0.5vh]">
                    <div className="w-[1.2vh] h-[1.2vh] bg-blue-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/seawall-icon-41fadd.png"
                        alt="Seawall"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-sm font-bold">SEAWALL</span>
                  </div>
                  
                  <div className="flex gap-[0.5vh]">
                    <div className="flex flex-col items-center gap-[0.3vh] opacity-50">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#FFEF3E] to-[#FFA557] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.3vh] opacity-50">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">2M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Land Reclamation Card */}
              <div className="bg-white/20 opacity-50 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-[0.5vh]">
                    <div className="w-[1.2vh] h-[1.2vh] bg-orange-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/land-reclamation-icon-6b707d.png"
                        alt="Land Reclamation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-sm font-bold">LAND RECLAMATION</span>
                  </div>
                  
                  <div className="flex gap-[0.5vh]">
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">0.5M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">1.15M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[0.3vh]">
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">2M</span>
                      </div>
                      <div className="flex gap-[0.2vh]">
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
                        <Image src="/assets/coin-icon.png" alt="Coin" width={coinSize} height={coinSize} className="object-contain" />
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