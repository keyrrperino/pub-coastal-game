import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import Logo from './Logo';
import { motion } from 'motion/react';

interface TutorialScreen1Props {
  phaseStartTime?: number;
  timeRemaining?: number;
  screenDuration: number;
}

export default function PlayerTutorialScreen1({
  phaseStartTime,
  timeRemaining,
  screenDuration,
}: TutorialScreen1Props) {
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

      <div className="fixed z-10 top-[2vh] left-1/2 transform -translate-x-1/2">
        <TimerBar duration={screenDuration} isRunning={true} />
      </div>

      {/* Dark Overlay with Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[64px]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 overflow-scroll">
        {/* Dark Blue Central Panel with Light Gray Border */}
        <div className="max-w-[85vw] max-h-[85%] h-full w-full px-6">
          <div className="flex flex-col h-full justify-center uppercase gap-8">
            {/* Welcome Title - Centered */}

            <div className="text-center">
              <motion.h1
                className="text-white text-5xl font-bold leading-tight tracking-wide"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Welcome to the
                <br />
                Coastal Protection Taskforce!
              </motion.h1>
            </div>

            {/* Mission Description - Centered */}
            <p className="text-white text-center text-3xl tracking-wider">
              <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Sea levels around Singapore are rising due to climate
                change.
              </motion.span>
              <br />
              <br />
              <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 2 }}
              >
                Your goal is to protect every sector of our nation
                from coastal flooding. You have three rounds to
                carefully place your coastal defences - balancing the{' '}
                <span className="text-[#FFDD3D]">time</span>,{' '}
                <span className="text-[#FFDD3D]">budget</span>, and{' '}
                <span className="text-[#FFDD3D]">effectiveness</span>.
              </motion.span>
              <br />
              <br />
              <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 4 }}
              >
                The future of our island is in your hands. Are you
                ready to protect our shores?
              </motion.span>
            </p>

            {/* Disclaimer - Centered */}
            <motion.p
              className="text-white text-xl text-center tracking-wider"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 5 }}
            >
              *Disclaimer: This game is a simplified simulation and
              might not reflect real-life situations or scenarios.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

