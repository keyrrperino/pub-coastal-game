import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import { useServerTime } from '@/components/ServerTimeContext';
import Logo from './Logo';
import { motion } from 'motion/react';

interface TutorialScreen3Props {
  phaseStartTime: number;
  timeRemaining?: number;
}

export default function TutorialScreen3({
  phaseStartTime,
  timeRemaining,
}: TutorialScreen3Props) {
  const { getAdjustedCurrentTime } = useServerTime();
  const localStartRef = React.useRef<number>(
    getAdjustedCurrentTime(),
  );

  const logos = [
    {
      value: 'Mangroves',
      logo: 'mangrove.svg',
      bg: '#BFFFBE',
    },
    {
      value: 'Seawall',
      logo: 'seawall.svg',
      bg: '#8CFFEC',
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
        <TimerBar duration={15} isRunning={true} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="px-12 max-w-[100%] w-full uppercase">
          <div className="flex flex-col items-center gap-10">
            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-6 text-center">
              <motion.p 
                className="text-white text-[1.8vw] 4k:text-[74px] font-bold"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                In each sector, choose one measure to protect your
                coast.
              </motion.p>
              <motion.p 
                className="text-[#FFDD3D] text-[1.8vw] 4k:text-[74px] font-bold"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Each measure has different strengths, weaknesses and
                costs.
              </motion.p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-4 4k:gap-9 justify-center items-stretch">
              {/* Mangroves Card */}
              {logos.map((logo, index) => {
                return (
                  <motion.div
                    key={logo.value}
                    className="bg-white/20 text-center items-center gap-9 backdrop-blur-sm border-2 border-[#91E2FF] 4k:border-4 rounded-lg 4k:rounded-[54px] p-6 4k:px-[60px] 4k:py-[40px] shadow-lg grid grid-rows-[auto_1fr] h-auto w-[12vw] 4k:w-[480px]"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.25 + 1.5,
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src={`/assets/${logo.logo}`}
                        alt="Mangroves"
                        className="object-cover w-[8vw] h-[8vw] 4k:w-[370px] 4k:h-[370px] aspect-square rounded-full "
                        style={{ backgroundColor: logo.bg }}
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-white text-[1.2vw] 4k:text-[74px] font-bold leading-none">
                        {logo.value}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Section - Game Instructions */}
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.p 
                className="text-[#FF6A6C] text-[2vw] 4k:text-[74px] font-bold"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
              >
                Hint: Consider your sector's land use to help you make
                better decisions
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

