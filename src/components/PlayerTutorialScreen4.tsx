import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import Logo from './Logo';
import { TUTORIAL_4_CARDS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface TutorialScreen3Props {
  phaseStartTime?: number;
  timeRemaining?: number;
  screenDuration: number;
}

export default function PlayerTutorialScreen4({
  phaseStartTime,
  timeRemaining,
  screenDuration,
}: TutorialScreen3Props) {
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

      <div className="fixed z-10 top-[2vh] left-1/2 transform -translate-x-1/2">
        <TimerBar duration={screenDuration} isRunning={true} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-[0.5vh] items-center justify-center h-full px-4 pt-[1vh]">
        <div className=" w-full">
          <div className="flex flex-col items-center gap-10 uppercase">
            {/* Top Section - Instructional Text */}
            <p className="text-white text-3xl font-bold text-center max-w-[80%] mx-auto">
              Once you select your measure and the sea level rise that
              you are planning for, it is locked in for the round.
            </p>

            <div className="flex flex-col items-center">
              {/* Middle Section - Three Protection Measure Cards */}
              <div className="flex gap-[2.5vh] justify-center items-stretch">
                {TUTORIAL_4_CARDS.map((card, index) => (
                  <motion.div
                    key={card.name}
                    className="bg-white/20 backdrop-blur-sm border-2 border-[#91E2FF] gap-4 rounded-[25px] px-6 py-4 shadow-lg flex flex-col justify-center items-center h-full w-auto"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.4 }}
                  >
                    <div className="flex flex-row items-center gap-[1vh]">
                      <div className="relative overflow-hidden">
                        <img
                          src={card.icon}
                          alt={card.name}
                          className="object-cover w-[37px] h-[37px] rounded-full bg-[#BFFFBE] aspect-square"
                        />
                      </div>
                      <span className="text-white text-lg font-bold">
                        {card.name}
                      </span>
                    </div>
                    <div
                      className="grid"
                      style={{
                        gridTemplateColumns: `repeat(${card.action.length}, 1fr)`,
                      }}
                    >
                      {card.action.map((action) => (
                        <div
                          key={action.name}
                          className="flex flex-col justify-center items-center gap-[1vh] h-auto"
                        >
                          <span className="text-black text-sm font-bold bg-[#B6FFF3] to-[#14F4CF] rounded-full aspect-square h-full w-auto p-6 flex items-center justify-center">
                            {action.name}
                          </span>
                          <div className="flex gap-[1vh]">
                            {Array.from({ length: action.cost }).map(
                              (_) => (
                                <Image
                                  src="/assets/coin-icon.png"
                                  alt="Coin"
                                  width={coinSize}
                                  height={coinSize}
                                  className="object-contain"
                                />
                              ),
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.img
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                src="/assets/arrows-down.svg"
                alt="Mangroves"
                width={window.innerHeight / 2}
                height={8}
                className="position"
              />

              {/* Middle Section - Three Protection Measure Cards */}
              <div className="flex gap-[2.5vh] justify-center items-stretch">
                {TUTORIAL_4_CARDS.map((card, index) => (
                  <motion.div
                    key={card.name}
                    className="bg-white/20 backdrop-blur-sm border-2 border-[#91E2FF] gap-4 rounded-[25px] px-6 py-4 shadow-lg flex flex-col justify-center items-center h-full w-auto"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: card.active ? 1 : 0.4, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 1.7,
                    }}
                  >
                    <div className="flex flex-row items-center gap-[1vh]">
                      <div className="relative overflow-hidden">
                        <img
                          src={card.icon}
                          alt={card.name}
                          className="object-cover w-[37px] h-[37px] rounded-full bg-[#BFFFBE] aspect-square"
                        />
                      </div>
                      <span className="text-white text-lg font-bold">
                        {card.name}
                      </span>
                    </div>
                    <div
                      className="grid"
                      style={{
                        gridTemplateColumns: `repeat(${card.action.length}, 1fr)`,
                      }}
                    >
                      {card.action.map((action) => (
                        <div
                          key={action.name}
                          className="flex flex-col justify-center items-center gap-[1vh] h-auto"
                        >
                          <motion.span
                            initial={
                              action.selected
                                ? {
                                    background:
                                      'radial-gradient(279.64% 279.64% at 10.52% 83.59%, #B6FFF3 0%, #14F4CF 100%)',
                                    boxShadow:
                                      '0 12.57px 62.851px 0 rgba(0, 0, 0, 0.15)',
                                  }
                                : { opacity: 1 }
                            }
                            animate={
                              action.selected
                                ? {
                                    background:
                                      'radial-gradient(279.64% 279.64% at 10.52% 83.59%, #FFEF3E 0%, #FFA557 100%)',
                                    boxShadow:
                                      '0 12.57px 62.851px 0 rgba(0, 0, 0, 0.15)',
                                  }
                                : { opacity: 0.4 }
                            }
                            transition={{
                              duration: 0.5,
                              ease: 'easeInOut',
                              delay: index * 0.1 + 2,
                            }}
                            className="text-black text-sm font-bold bg-[#B6FFF3] to-[#14F4CF] rounded-full aspect-square h-full w-auto p-6 flex items-center justify-center"
                          >
                            {action.name}
                          </motion.span>
                          <div className="flex gap-[1vh]">
                            {Array.from({ length: action.cost }).map(
                              (_) => (
                                <Image
                                  src="/assets/coin-icon.png"
                                  alt="Coin"
                                  width={coinSize}
                                  height={coinSize}
                                  className="object-contain"
                                />
                              ),
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Hint Section */}
            <div className="flex flex-col gap-3 text-center uppercase max-w-[80%] mx-auto">
              <p className="text-[#FF6A6C] text-3xl font-bold">
                Hint: What is the projected sea level rise in that
                period? Can your measure be raised over time?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

