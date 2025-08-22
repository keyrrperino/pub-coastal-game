import React from 'react';
import Image from 'next/image';
import WaterLevelIndicator from '../WaterLevelIndicator';

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
            minLevel={0.7}
            maxLevel={1.15}
            currentLevel={0.7}
            scaleMax={2}
            containerHeight={627}
            currentWaterColor={{
              from: 'rgba(255, 220, 156, 1)',
              to: 'rgba(255, 207, 117, 1)'
            }}
            projectedWaterColor={{
              from: 'rgba(255, 123, 47, 1)',
              to: 'rgba(255, 94, 2, 1)'
            }}
          />
        )}
        <div className="flex flex-col items-center gap-10 max-w-4xl w-full">
          {/* Round Title and Year */}
          <div className="flex flex-col items-center">
            <h1 className="text-white text-[8vh] font-bold text-center leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
              ROUND 2
            </h1>
            <h2 className="text-white text-5xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_2px_2px_rgba(148,107,199,1)]">
              YEAR 2050-2075
            </h2>
          </div>

          {/* Game Info Card */}
          <div className="max-w-4xl w-full mx-8">
            <div className="bg-[rgba(175,240,255,0.3)] backdrop-blur-[22px] border-2 border-gradient-to-br from-[#91E2FF] to-white rounded-[26px] px-6 py-4 shadow-[0_6px_30px_rgba(0,0,0,0.15)] gap-2 flex flex-col">
              <p className="text-white text-[22px] text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                Between now and 2075, mean sea levels are projected to
                increase by{' '}
                <span className="text-[#FFDD3D]">
                  0.7 to 1.5 metres
                </span>
                . It's time to{' '}
                <span className="text-[#FFDD3D]">upgrade</span>, or{' '}
                <span className="text-[#FFDD3D]">rethink</span> your
                strategy to cover any weak spots left behind.
              </p>
              <p className="text-white text-[22px] -mt-2 text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                In this round, you may:
              </p>
              <div className="flex flex-col mt-3 items-start">
                <ul className="list-disc pl-5">
                  <li className="text-white text-[22px] leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                    Raise the heights of your existing defenses or,
                  </li>
                  <li className="text-white text-[22px] leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                    Demolish and explore alternatives, but be warned:
                    this costs money and lowers your score.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col mt-3 items-center">
                <p className="text-white text-[22px] text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                  The stakes are higher.
                </p>
                <p className="text-white text-[22px] text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                  The waters are too.
                </p>
              </div>
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
