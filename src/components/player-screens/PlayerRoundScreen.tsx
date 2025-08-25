import React from 'react';
import Image from 'next/image';
import WaterLevelIndicator from '../WaterLevelIndicator';
import { cn } from '@/lib/utils';

interface PlayerRoundScreenProps {
  onContinue?: () => void;
  timeRemaining?: number;
  isControlScreen?: boolean;
  round: number;
  year: string;
  info: React.ReactNode;
  waterLevelIndicator: React.ReactNode;
  isCenterScreen?: boolean;
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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-h-screen h-full">
        <div
          className={cn(
            'relative z-10 flex flex-row justify-center items-center h-full w-screen',
            isControlScreen && 'justify-center',
          )}
          style={{
            gap: 'var(--space-16)',
            padding: `0 var(--space-16)`,
            minWidth: 'calc(100vw - calc(var(--space-16) * 2))',
          }}
        >
          {!isControlScreen && waterLevelIndicator}
          <div
            className={cn(
              'flex flex-col flex-grow w-full',
              isControlScreen && 'justify-center items-center',
              isCenterScreen && 'text-center',
            )}
            style={{
              gap: 'var(--space-10)',
            }}
          >
            {/* Round Title and Year */}
            <div className="flex flex-col">
              <h1
                className="text-white font-bold leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]"
                style={{ fontSize: 'var(--text-5xl)' }}
              >
                ROUND {round}
              </h1>
              <h2
                className="text-white font-bold leading-tight tracking-wide drop-shadow-[0_2px_2px_rgba(148,107,199,1)]"
                style={{ fontSize: 'var(--text-5xl)' }}
              >
                YEAR {year}
              </h2>
            </div>

            {/* Game Info Card */}
            <div
              className="bg-[rgba(175,240,255,0.3)] w-full border-2 shadow-[0_7px_37px_rgba(0,0,0,0.15)]"
              style={{
                backdropFilter: 'blur(clamp(16px, 0.86vw, 32px))',
                borderRadius: 'var(--radius-3xl)',
              }}
            >
              <div
                style={{
                  padding: 'var(--space-6) var(--space-8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-6)',
                }}
              >
                {info}
              </div>
            </div>
          </div>
        </div>

        {/* Countdown - always reserve space to prevent layout shift */}
        <div className="flex items-center justify-center py-[var(--space-8)]">
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
    </div>
  );
}

