import React from 'react';
import Image from 'next/image';
import ProgressBar from '@/games/pub-coastal-game/compontents/ProcessBar';

interface TutorialScreen3Props {
  phaseStartTime: number;
  timeRemaining?: number;
}

export default function PlayerTutorialScreen3({ phaseStartTime, timeRemaining }: TutorialScreen3Props) {
  const localStartRef = React.useRef<number>(Date.now());

  const logos = [{
    value: "Mangroves",
    logo: "mangrove.svg"
  },
  {
    value: "Seawall",
    logo: "seawall.svg"
  },
  {
    value: "LAND RECLAMATION",
    logo: "land-reclemation.svg"
  },
  {
    value: "COASTAL BARRIERS",
    logo: "coastal-barriers.svg"
  },
  {
    value: "HYBRID MEASURE",
    logo: "hybrid-measure.svg"
  },
  {
    value: "Artificial reef",
    logo: "artificial-reef.svg"
  }];
  
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
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="px-6 max-w-[95%] w-full uppercase">
          <div className="flex flex-col items-center gap-6">

            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-3 text-center">
              <p className="text-white text-[1.4vw] font-bold">
              In each sector, choose out of three measures to protect your coast. 
              </p>
              <p className="text-[#FFDD3D] text-[1.4vw] font-bold">
              Each measure has different strengths, weaknesses and costs.
              </p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-2 justify-center items-stretch">
              {/* Mangroves Card */}
              {logos.map((logo) => {
                return (
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-lg flex flex-col justify-between h-auto w-[9vw]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-col text-center items-center gap-2">
                        <div className="w-[6vw] h-[6vw] bg-green-400 rounded-full relative overflow-hidden">
                          <Image
                            src={`/assets/${logo.logo}`}
                            alt="Mangroves"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-white text-[0.9vw] font-bold">{logo.value}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Section - Game Instructions */}
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-[#FF6A6C] text-[1.5vw] font-bold max-w-[85%]">
                Hint: Consider your sector's land use to help you make better decisions
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