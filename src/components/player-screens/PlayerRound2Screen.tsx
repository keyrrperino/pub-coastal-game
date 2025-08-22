import React from 'react';
import Image from 'next/image';
import WaterLevelIndicator from '../WaterLevelIndicator';
import { cn } from '@/lib/utils';

interface PlayerRound2ScreenProps {
  onContinue?: () => void;
  timeRemaining?: number;
  isControlScreen?: boolean;
}

export default function PlayerRound2Screen({
  onContinue,
  timeRemaining,
  isControlScreen = false,
}: PlayerRound2ScreenProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/start-screen-bg-updated.webp"
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
          'relative z-10 flex flex-row justify-center items-center gap-16 h-full px-[60px] min-w-[calc(100vw-120px)] w-full',
          isControlScreen && 'justify-center',
        )}
      >
        {!isControlScreen && (
          <WaterLevelIndicator
            minLevel={0.7}
            maxLevel={1.15}
            currentLevel={0.7}
            scaleMax={2}
            containerHeight={900}
            currentWaterColor={{
              from: 'rgba(255, 220, 156, 1)',
              to: 'rgba(255, 207, 117, 1)',
            }}
            projectedWaterColor={{
              from: 'rgba(255, 123, 47, 1)',
              to: 'rgba(255, 94, 2, 1)',
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
              ROUND 2
            </h1>
            <h2 className="text-white text-[5vh] font-bold leading-tight tracking-wide drop-shadow-[0_2px_2px_rgba(148,107,199,1)]">
              YEAR 2050-2075
            </h2>
          </div>

          {/* Game Info Card */}
          <div className="w-full text-left">
            <div className="bg-[rgba(175,240,255,0.3)] backdrop-blur-[22px] border-2 rounded-[33px] shadow-[0_7px_37px_rgba(0,0,0,0.15)]">
              <div className="px-8 py-6 space-y-6">
                <p className="text-white text-2xl leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                  Between now and 2075, mean sea levels are projected
                  to rise by{' '}
                  <span className="text-[#FF6A6C]">
                    0.7 to 1.5 metres
                  </span>
                  .
                </p>

                <p className="text-white text-2xl leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                  It's time to{' '}
                  <span className="text-[#FFDD3D]">
                    upgrade or rethink your strategy
                  </span>{' '}
                  to strengthen any remaining weak spots.
                </p>

                <div>
                  <p className="text-white text-2xl leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                    In this round, you may:
                  </p>
                  <ul className="space-y-2 pl-8 list-disc">
                    <li className="text-white text-2xl leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                      Raise the heights of your existing defences or,
                    </li>
                    <li className="text-white text-2xl leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                      Demolish and explore alternatives - but be
                      warned: this costs money and lowers your score.
                    </li>
                  </ul>
                </div>

                <p className="text-white text-2xl leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                  The stakes are higher. The waters are too.
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

