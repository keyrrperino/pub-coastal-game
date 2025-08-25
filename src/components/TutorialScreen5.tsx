import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import Logo from './Logo';
import { motion } from 'motion/react';

interface TutorialScreen3Props {
  timeRemaining?: number;
  phaseStartTime: number;
}

export default function TutorialScreen5({
  timeRemaining,
  phaseStartTime,
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
        <TimerBar duration={15} isRunning={true} />
      </div>

      {/* Dark Overlay with Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[64px]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="px-12 max-w-[89%] w-full">
          <div className="flex flex-col items-center gap-16">
            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-6 text-center  uppercase">
              <motion.p 
                className="text-white text-[3vh] 4k:text-[74px] font-bold tracking-wider"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Spend wisely, your team has a{' '}
                <span className="text-[#FFDD3D]">
                  collective budget of{' '}
                  <span className="number-enhanced">10</span> coins
                  per round.
                </span>
              </motion.p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-8 justify-center items-stretch">
              <motion.div 
                className="bg-white/20 backdrop-blur-sm border rounded-lg p-6 4k:px-[75px] 4k:py-[50px] border-[#91E2FF] 4k:border-4 4k:rounded-[60px] shadow-lg flex flex-col justify-between h-[auto] w-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-white text-[5vh] 4k:text-[112px] font-bold tracking-wider">
                      OVERALL BUDGET
                    </span>
                  </div>

                  <div className="flex gap-2 w-full items-center justify-center">
                    <div className="flex flex-col items-center gap-1 w-full justify-center">
                      <div className="grid grid-cols-5 grid-rows-2 gap-8 w-full items-center justify-center">
                        {Array.from({ length: 10 }).map(
                          (_, index) => (
                            <motion.img
                              key={'coin-' + index}
                              src="/assets/coin-icon.png"
                              alt="Coin"
                              className="object-contain w-[75px] h-[75px] 4k:w-[160px] 4k:h-[160px]"
                              initial={{ opacity: 0, y: 100 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: index * 0.25 + 1 }}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-[3vh] 4k:text-[74px] font-bold">
                      <motion.span 
                        className="number-enhanced"
                        initial={{ content: "0" }}
                        animate={{ content: "10" }}
                        transition={{ duration: 2.0, delay: 3.0 }}
                      >
                        10
                      </motion.span>{' '}
                      coins PER ROUND
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex flex-col gap-6 text-center  uppercase">
              <motion.p 
                className="text-white text-[3vh] 4k:text-[74px] max-w-[80%] mx-auto font-bold tracking-wider"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 3.5 }}
              >
                Your starting score is 2500. Each negative outcome
                will deduct points from the total score.
              </motion.p>
              <motion.p 
                className="text-[#FF8181] text-[3vh] 4k:text-[74px] font-bold tracking-wider"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 4 }}
              >
                Strategize with your teammates NOW!
              </motion.p>
            </div>

            <div className="absolute inset-x-0 bottom-5 flex justify-center items-center">
              <Logo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

