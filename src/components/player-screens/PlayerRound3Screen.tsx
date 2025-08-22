import React from 'react';
import Image from 'next/image';
import WaterLevelIndicator from '../WaterLevelIndicator';
import { cn } from '@/lib/utils';

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
      <div
        className={cn(
          'relative z-10 flex flex-row items-center gap-16 h-full px-[60px] min-w-[calc(100vw-120px)] w-full',
          isControlScreen && 'justify-center',
        )}
      >
        {!isControlScreen && (
          <WaterLevelIndicator
            minLevel={1.5}
            maxLevel={2.0}
            currentLevel={1.5}
            scaleMax={2}
            containerHeight={627}
            currentWaterColor={{
              from: 'rgba(255, 150, 86, 1)',
              to: 'rgba(255, 127, 48, 1)',
            }}
            projectedWaterColor={{
              from: 'rgba(255, 88, 102, 1)',
              to: 'rgba(255, 13, 33, 1)',
            }}
          />
        )}
        <div
          className={cn(
            'flex flex-col flex-grow gap-10 max-w-4xl w-full',
            isControlScreen &&
              'justify-center items-center text-center',
          )}
        >
          {/* Round Title and Year */}
          <div className="flex flex-col">
            <h1 className="text-white text-[8vh] font-bold leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
              ROUND 3
            </h1>
            <h2 className="text-white text-[5vh] font-bold leading-tight tracking-wide drop-shadow-[0_2px_2px_rgba(148,107,199,1)]">
              YEAR 2075-2100
            </h2>
          </div>

          {/* Game Info Card */}
          <div className="w-full">
            <div className="bg-[rgba(175,240,255,0.3)] backdrop-blur-[22px] border-2 rounded-[33px] shadow-[0_7px_37px_rgba(0,0,0,0.15)]">
              <div className="px-8 py-6 space-y-6">
                <p className="text-white text-2xl leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                  This is the final stretch!
                </p>

                <p className="text-white text-2xl leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                  With sea levels projected to rise as{' '}
                  <span className="text-[#FF6A6C]">
                    high as 2 metres
                  </span>{' '}
                  by 2100, the choices you make now will determine our
                  future.
                </p>

                <p className="text-white text-2xl leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                  <span className="text-[#FFDD3D]">
                    Strengthen your protection. Close the gaps.
                  </span>{' '}
                  Better still, integrate your coastal protection
                  measures with amenities to create value for your
                  citizens.
                </p>

                <p className="text-white text-2xl leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                  We believe in you. Let's finish strong.
                </p>
              </div>
            </div>
          </div>

          {/* Countdown - always reserve space to prevent layout shift */}
          <div className="h-24 flex items-center justify-center">
            {timeRemaining !== undefined && (
              <h3 className="text-white text-7xl font-bold leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
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

