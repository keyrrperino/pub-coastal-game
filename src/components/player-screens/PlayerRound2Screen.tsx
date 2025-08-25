import React from 'react';
import Image from 'next/image';
import WaterLevelIndicator from '../WaterLevelIndicator';
import { cn } from '@/lib/utils';
import PlayerRoundScreen from './PlayerRoundScreen';

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
  const info = (
    <>
      <p
        className="text-white leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed"
        style={{ fontSize: 'var(--text-2xl)' }}
      >
        Between now and 2075, mean sea levels are projected to rise by{' '}
        <span className="text-[#FF6A6C]">0.7 to 1.5 metres</span>.
      </p>

      <p
        className="text-white leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed"
        style={{ fontSize: 'var(--text-2xl)' }}
      >
        It's time to{' '}
        <span className="text-[#FFDD3D]">
          upgrade or rethink your strategy
        </span>{' '}
        to strengthen any remaining weak spots.
      </p>

      <div>
        <p
          className="text-white leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed"
          style={{ fontSize: 'var(--text-2xl)' }}
        >
          In this round, you may:
        </p>
        <ul
          className="list-disc"
          style={{
            marginTop: 'var(--space-2)',
            paddingLeft: 'var(--padding-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          <li
            className="text-white leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed"
            style={{ fontSize: 'var(--text-2xl)' }}
          >
            Raise the heights of your existing defences or,
          </li>
          <li
            className="text-white leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed"
            style={{ fontSize: 'var(--text-2xl)' }}
          >
            Demolish and explore alternatives - but be warned: this
            costs money and lowers your score.
          </li>
        </ul>
      </div>

      <p
        className="text-white leading-normal drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed"
        style={{ fontSize: 'var(--text-2xl)' }}
      >
        The stakes are higher. The waters are too.
      </p>
    </>
  );

  return (
    <PlayerRoundScreen
      onContinue={onContinue}
      timeRemaining={timeRemaining}
      isControlScreen={isControlScreen}
      round={2}
      year="2050-2075"
      info={info}
      waterLevelIndicator={
        <WaterLevelIndicator
          minLevel={0.7}
          maxLevel={1.5}
          currentLevel={0.7}
          scaleMax={2}
          currentWaterColor={{
            from: 'rgba(255, 220, 156, 1)',
            to: 'rgba(255, 207, 117, 1)',
          }}
          projectedWaterColor={{
            from: 'rgba(255, 123, 47, 1)',
            to: 'rgba(255, 94, 2, 1)',
          }}
        />
      }
    />
  );
}

