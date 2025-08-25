import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import { useServerTime } from '@/components/ServerTimeContext';
import Logo from './Logo';

interface TutorialScreen2Props {
  phaseStartTime: number;
}

export default function TutorialScreen2({
  phaseStartTime,
}: TutorialScreen2Props) {
  const { getAdjustedCurrentTime } = useServerTime();
  const localStartRef = React.useRef<number>(
    getAdjustedCurrentTime(),
  );
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
        <TimerBar duration={15} isRunning={true} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="flex flex-col items-center gap-5 max-w-[80%] w-full h-full max-h-[80%]">
          {/* Description */}
          <div className="w-full">
            <p className="text-white text-[3vh] text-center font-bold uppercase">
              Singapore is divided into three sectors with two
              subsectors, each with its own land use. Take a look
              around — which sector are you in charge of?
            </p>
          </div>

          {/* Map Container - Fill remaining height */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center">
            {/* Base Singapore Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/assets/map-v2.svg"
                alt="Singapore Map"
                width={1109}
                height={598}
                className="object-contain"
              />
            </div>

            {/* Map Highlight Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Sector 1 Highlight */}
              <Image
                src="/assets/sector1-highlight-v2.svg"
                alt="Sector 1 Highlight"
                width={1109}
                height={598}
                className="object-contain absolute opacity-0 animate-fadeIn"
                style={{
                  animation: 'fadeIn 1s ease-in-out 0.5s forwards',
                }}
              />

              {/* Sector 2 Highlight */}
              <Image
                src="/assets/sector2-highlight-v2.svg"
                alt="Sector 2 Highlight"
                width={1109}
                height={598}
                className="object-contain absolute opacity-0"
                style={{
                  animation: 'fadeIn 1s ease-in-out 1.5s forwards',
                }}
              />

              {/* Sector 3 Highlight */}
              <Image
                src="/assets/sector3-highlight-v2.svg"
                alt="Sector 3 Highlight"
                width={1109}
                height={598}
                className="object-contain absolute opacity-0"
                style={{
                  animation: 'fadeIn 1s ease-in-out 2.5s forwards',
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

          <div className="absolute inset-x-0 bottom-5 flex justify-center items-center">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}
