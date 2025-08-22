import React from 'react';
import Image from 'next/image';
import WaterLevelIndicator from '../WaterLevelIndicator';

interface PlayerRound3ScreenProps {
  onContinue?: () => void;
  timeRemaining?: number;
  isControlScreen?: boolean;
}

export default function PlayerRound3Screen({
  onContinue,
  timeRemaining,
  isControlScreen = false,
}: PlayerRound3ScreenProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/start-screen-bg-updated.png"
          alt="Coastal background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {!isControlScreen && (
          <WaterLevelIndicator
            minLevel={1.5}
            maxLevel={2.0}
            currentLevel={1.5}
            scaleMax={2}
            containerHeight={627}
            currentWaterColor={{
              from: 'rgba(152, 209, 255, 1)',
              to: 'rgba(117, 193, 255, 1)',
            }}
            projectedWaterColor={{
              from: 'rgba(66, 100, 255, 1)',
              to: 'rgba(27, 68, 255, 1)',
            }}
          />
        )}
        <div className="flex flex-col items-center gap-10 max-w-4xl w-full">
          {/* Round Title and Year */}
          <div className="flex flex-col items-center">
            <h1 className="text-white text-[8vh] font-bold text-center leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
              ROUND 3
            </h1>
            <h2 className="text-white text-5xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_2px_2px_rgba(148,107,199,1)]">
              YEAR 2075-2100
            </h2>
          </div>

          {/* Game Info Card */}
          <div className="max-w-4xl w-full mx-8">
            <div className="bg-[rgba(175,240,255,0.3)] backdrop-blur-[22px] border-2 border-gradient-to-br from-[#91E2FF] to-white rounded-[26px] px-8 py-4 shadow-[0_6px_30px_rgba(0,0,0,0.15)]">
              <p className="text-white text-[21px] text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                The stakes are higher. The waters are too. With
                projections rising as high as{' '}
                <span className="text-[#FFDD3D]">2 metres</span>,
              </p>
              <p className="text-white text-[21px] -mt-2 text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                THE CHOICES YOU MAKE NOW WILL DETERMINE OUR FUTURE.
              </p>

              <p className="text-white text-[21px] mt-7 text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                <span className="text-[#FFDD3D]">
                  ENHANCE THE COASTS.
                </span>{' '}
                STRENGTHEN YOUR DEFENSES. CLOSE THE GAPS.
              </p>
              <p className="text-white text-[21px] mt-7 text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                THE RISING TIDE WON’T WAIT.
              </p>
              <p className="text-white text-[21px] mt-7 text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                WE BELIEVE IN YOU. LET’S FINISH STRONG.
              </p>
            </div>
          </div>

          {/* Countdown - always reserve space to prevent layout shift */}
          <div className="h-24 flex items-center justify-center">
            {timeRemaining !== undefined && (
              <h3 className="text-white text-7xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
                {Math.ceil(timeRemaining) === 0
                  ? 'GO!'
                  : `${Math.ceil(timeRemaining)}...`}
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

