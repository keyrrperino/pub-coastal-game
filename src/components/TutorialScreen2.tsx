import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import { useServerTime } from '@/components/ServerTimeContext';
import Logo from './Logo';
import { motion } from 'motion/react';

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

      <div className="fixed z-10 top-[2vh] left-1/2 transform -translate-x-1/2">
        <TimerBar duration={15} isRunning={true} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="flex flex-col items-center gap-5 max-w-[80%] w-full h-full max-h-[80%]">
          {/* Description */}
          <div className="w-full">
            <motion.p 
              className="text-white text-[3vh] 4k:text-[74px] mx-auto 4k:max-w-[75%] text-center font-bold uppercase tracking-wider"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Singapore is divided into three sectors with two
              subsectors, each with its own land use. Take a look
              around — which sector are you in charge of?
            </motion.p>
          </div>

          {/* Map Container - Fill remaining height */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            {/* Base Singapore Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut',
                }}
                src="/assets/map-v2.svg"
                alt="Singapore Map"
                width={2749}
                height={1237}
                className="object-contain"
              />
            </div>

            {/* Map Highlight Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Sector 1 Highlight */}
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 1.5,
                  ease: 'easeInOut',
                }}
                src="/assets/map-4k-sector-1.svg"
                width={2749}
                height={1237}
                alt="Sector 1 Highlight"
                className="object-contain absolute"
              />
              {/* Sector 2 Highlight */}
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 2.5,
                  ease: 'easeInOut',
                }}
                src="/assets/map-4k-sector-2.svg"
                alt="Sector 2 Highlight"
                width={2749}
                height={1237}
                className="object-contain absolute"
              />
              {/* Sector 3 Highlight */}
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 3.5,
                  ease: 'easeInOut',
                }}
                src="/assets/map-4k-sector-3.svg"
                alt="Sector 3 Highlight"
                width={2749}
                height={1237}
                className="object-contain absolute "
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-5 flex justify-center items-center">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}

