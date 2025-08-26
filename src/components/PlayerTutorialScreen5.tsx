import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import Logo from './Logo';
import { motion } from 'motion/react';

interface TutorialScreen3Props {
  timeRemaining?: number;
  phaseStartTime?: number;
  screenDuration: number;
}

export default function PlayerTutorialScreen5({
  timeRemaining,
  phaseStartTime,
  screenDuration,
}: TutorialScreen3Props) {
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
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="px-6 max-w-[95%] w-full">
          <div className="flex flex-col items-center gap-8">
            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-3 text-center  uppercase">
              <p className="text-white text-[3vh] font-bold">
                Spend wisely, your team has a{' '}
                <span className="text-[#FFDD3D]">
                  collective budget of{' '}
                  <span className="number-enhanced">10</span> coins
                  per round.
                </span>
              </p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-4 justify-center items-stretch">
              <div className="bg-white/20 backdrop-blur-sm border-2 border-[#91E2FF] rounded-[25px] p-6 shadow-lg flex flex-col justify-between h-[auto] w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-white text-5xl font-bold">
                      OVERALL BUDGET
                    </span>
                  </div>

                  <div className="flex gap-2 w-full items-center justify-center">
                    <div className="grid grid-cols-5 grid-rows-2 gap-x-4 gap-y-2.5 w-full items-center justify-center">
                      {Array.from({ length: 10 }).map((_, index) => (
                        <motion.img
                          key={'coin-' + index}
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          className="object-contain w-[75px] h-[75px] 4k:w-[160px] 4k:h-[160px]"
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: index * 0.25 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-3xl font-bold">
                      <motion.span 
                        className="number-enhanced"
                        initial={{ content: "0" }}
                        animate={{ content: "10" }}
                        transition={{ duration: 2.0, delay: 2.0 }}
                      >
                        10
                      </motion.span>{' '}
                      coins PER ROUND
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center  uppercase">
              <p className="text-white text-3xl font-bold">
                Your starting score is 2500. Each negative outcome
                will deduct points from the total score.
              </p>
              <p className="text-[#FF8181] text-3xl font-bold">
                Strategize with your teammates NOW!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

