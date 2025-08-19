import React from 'react';
import Image from 'next/image';
import ProgressBar from '@/games/pub-coastal-game/compontents/ProcessBar';

interface TutorialScreen2Props {
  phaseStartTime: number;
}

export default function PlayerTutorialScreen2({ phaseStartTime }: TutorialScreen2Props) {
  const localStartRef = React.useRef<number>(Date.now());
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
        <div className="flex flex-col items-center gap-3 max-w-[90%] w-full h-full max-h-[85%]">

          {/* Description */}
          <div className="w-full">
            <p className="text-white text-[2.2vh] text-center font-bold uppercase">
              Singapore is divided into three sectors and six subsectors, each with its own land use. Take a look around — which sector are you in charge of?
            </p>
          </div>

          {/* Map Container - Fill remaining height */}
          <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center">
            {/* Base Singapore Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/assets/map-v2.svg"
                alt="Singapore Map"
                width={800}
                height={430}
                className="object-contain"
              />
            </div>

            {/* Map Highlight Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Sector 1 Highlight */}
              <Image
                src="/assets/sector1-highlight-v2.svg"
                alt="Sector 1 Highlight"
                width={800}
                height={430}
                className="object-contain absolute opacity-0 animate-fadeIn"
                style={{
                  animation: 'fadeIn 1s ease-in-out 0.5s forwards'
                }}
              />
              
              {/* Sector 2 Highlight */}
              <Image
                src="/assets/sector2-highlight-v2.svg"
                alt="Sector 2 Highlight"
                width={800}
                height={430}
                className="object-contain absolute opacity-0"
                style={{
                  animation: 'fadeIn 1s ease-in-out 1.5s forwards'
                }}
              />
              
              {/* Sector 3 Highlight */}
              <Image
                src="/assets/sector3-highlight-v2.svg"
                alt="Sector 3 Highlight"
                width={800}
                height={430}
                className="object-contain absolute opacity-0"
                style={{
                  animation: 'fadeIn 1s ease-in-out 2.5s forwards'
                }}
              />
            </div>          
            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
            `}</style>
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
  );
} 