import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import Logo from './Logo';
import { motion } from 'motion/react';

interface TutorialScreen2Props {
  phaseStartTime?: number;
  timeRemaining?: number;
  screenDuration: number;
}

export default function PlayerTutorialScreen2({
  phaseStartTime,
  timeRemaining,
  screenDuration,
}: TutorialScreen2Props) {
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
        <TimerBar duration={screenDuration} isRunning={true} />
      </div>

      {/* Main container to center content vertically */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {/* Content Container */}
        <div
          className="flex flex-col px-4"
          style={{ height: 'calc(80vh - 60px)' }}
        >
          {/* Description */}
          <div className="w-full mb-4">
            <motion.p
              className="text-white text-3xl text-center font-bold uppercase max-w-[65%] mx-auto tracking-wider"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Singapore is divided into three sectors with two
              subsectors, each with its own land use. Take a look
              around — which sector are you in charge of?
            </motion.p>
          </div>

          {/* Map Container */}
          <div className="relative w-full flex-1">
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
                width={1012}
                height={567}
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
                src="/assets/sector1-highlight-v2.svg"
                alt="Sector 1 Highlight"
                width={1012}
                height={567}
                className="object-contain absolute opacity-0 animate-fadeIn"
                style={{
                  animation: 'fadeIn 1s ease-in-out 0.5s forwards',
                }}
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
                src="/assets/sector2-highlight-v2.svg"
                alt="Sector 2 Highlight"
                width={1012}
                height={567}
                className="object-contain absolute opacity-0"
                style={{
                  animation: 'fadeIn 1s ease-in-out 1.5s forwards',
                }}
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
                src="/assets/sector3-highlight-v2.svg"
                alt="Sector 3 Highlight"
                width={1012}
                height={567}
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
        </div>
      </div>
    </div>
  );
}

