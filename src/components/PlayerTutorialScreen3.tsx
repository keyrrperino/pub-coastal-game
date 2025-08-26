import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import Logo from './Logo';
import { motion } from 'motion/react';

interface TutorialScreen3Props {
  phaseStartTime?: number;
  timeRemaining?: number;
  screenDuration: number;
}

export default function PlayerTutorialScreen3({
  phaseStartTime,
  timeRemaining,
  screenDuration,
}: TutorialScreen3Props) {
  const logos = [
    {
      value: 'Mangroves',
      logo: 'mangrove.svg',
    },
    {
      value: 'Seawall',
      logo: 'seawall.svg',
    },
    {
      value: 'LAND RECLAMATION',
      logo: 'land-reclemation.svg',
    },
    {
      value: 'COASTAL BARRIERS',
      logo: 'coastal-barriers.svg',
    },
    {
      value: 'HYBRID MEASURE',
      logo: 'hybrid-measure.svg',
    },
    {
      value: 'Artificial reef',
      logo: 'artificial-reef.svg',
    },
  ];

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
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="px-6 max-w-[95%] w-full uppercase">
          <div className="flex flex-col items-center gap-6">
            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-3 text-center">
              <motion.p
                className="text-white text-3xl font-bold"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                In each sector, choose one measure to protect your
                coast.
              </motion.p>
              <motion.p
                className="text-[#FFDD3D] text-3xl font-bold"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Each measure has different strengths, weaknesses and
                costs.
              </motion.p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-4 justify-center items-stretch">
              {/* Mangroves Card */}
              {logos.map((logo, index) => {
                return (
                  <motion.div
                    key={logo.value}
                    className="bg-white/20 backdrop-blur-sm border-2 border-[#91E2FF] rounded-lg p-4 shadow-lg flex flex-col justify-between h-auto w-[12vw]"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.25,
                    }}
                  >
                    <div className="flex flex-col text-center items-center gap-3">
                      <div className="w-[8vw] h-[8vw] bg-green-400 rounded-full relative overflow-hidden">
                        <Image
                          src={`/assets/${logo.logo}`}
                          alt={logo.value}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-white text-[1.1vw] font-bold">
                        {logo.value}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Section - Game Instructions */}
            <div className="flex flex-col items-center gap-3 text-center">
              <motion.p
                className="text-[#FF6A6C] text-3xl font-bold max-w-[85%]"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Hint: Consider your sector's land use to help you make
                better decisions
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

