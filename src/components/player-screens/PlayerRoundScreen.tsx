import React from 'react';
import Image from 'next/image';
import WaterLevelIndicator from '../WaterLevelIndicator';
import { cn } from '@/lib/utils';
import TimerBar from '../coastal-protection/TimerBar';

interface PlayerRoundScreenProps {
  onContinue?: () => void;
  timeRemaining?: number;
  isControlScreen?: boolean;
  round: number;
  year: string;
  info: React.ReactNode;
  waterLevelIndicator: React.ReactNode;
  isCenterScreen?: boolean;
  screenDuration: number;
}

export default function PlayerRoundScreen({
  onContinue,
  timeRemaining,
  isControlScreen = false,
  isCenterScreen = false,
  round,
  year,
  info,
  waterLevelIndicator,
  screenDuration,
}: PlayerRoundScreenProps) {
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

      {/* <div className="fixed z-10 top-[2vh] left-1/2 transform -translate-x-1/2">
        <TimerBar duration={screenDuration} isRunning={true} />
      </div> */}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Container */}
      <div
        className={cn(
          'relative z-10 flex mx-auto flex-row justify-around items-center h-full w-screen max-w-[955px] 4k:max-w-[3600px]',
          isControlScreen && 'justify-center',
        )}
      >
        {!isControlScreen && waterLevelIndicator}
        <div
          className={cn(
            'flex flex-col flex-grow w-full gap-4 4k:gap-10',
            isControlScreen
              ? 'justify-center items-center'
              : '4k:max-w-[2348px]',
            isCenterScreen && 'text-center',
          )}
        >
          {/* Round Title and Year */}
          <div
            className={cn(
              'flex flex-col',
              isControlScreen && 'text-center',
            )}
          >
            <h1 className="text-white text-7xl 4k:text-[140px] font-bold leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
              ROUND {round}
            </h1>
            <h2 className="text-white text-7xl 4k:text-[140px] font-bold leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
              YEAR {year}
            </h2>
          </div>

          {/* Game Info Card */}
          <div className="bg-[rgba(175,240,255,0.3)] backdrop-blur-[22px] border-2 rounded-[33px] shadow-[0_7px_37px_rgba(0,0,0,0.15)]">
            {info}
          </div>
        </div>
      </div>

      {/* Countdown - always reserve space to prevent layout shift */}
      <div className="flex items-center justify-center absolute bottom-15 left-1/2 -translate-x-1/2">
        {timeRemaining !== undefined && (
          <h3
            className="text-white font-bold leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]"
            style={{ fontSize: 'clamp(72px, 6vh, 144px)' }}
          >
            {Math.ceil(timeRemaining) === 0
              ? 'GO!'
              : `${Math.ceil(timeRemaining)}...`}
          </h3>
        )}
      </div>
    </div>
  );
}

