import React from 'react';
import Image from 'next/image';
import WaterLevelIndicator from '../WaterLevelIndicator';
import { cn } from '@/lib/utils';
import PlayerRoundScreen from './PlayerRoundScreen';

interface PlayerRound1ScreenProps {
  onContinue?: () => void;
  timeRemaining?: number;
  isControlScreen?: boolean;
}

export default function PlayerRound1Screen({
  onContinue,
  timeRemaining,
  isControlScreen = false,
}: PlayerRound1ScreenProps) {
  const info = (
    <div className="flex flex-col gap-4 py-6 px-9 4k:px-[80px] 4k:py-[50px]">
      <p className="text-white text-3xl 4k:text-[80px] leading-tight drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
        Sea levels are beginning to rise — slowly, but steadily. By
        2050, they could climb anywhere between{' '}
        <span className="text-[#FF6A6C]">0.2 and 0.6 metres</span>.
        <br />
        <br />
        You now have{' '}
        <span className="text-[#FFDD3D]">30 seconds</span> to choose
        your coastal defences. Remember you can only deploy one
        measure per sector at a time.
        <br />
        <br />
        Budget is limited, use it wisely!
      </p>
    </div>
  );

  return (
    <PlayerRoundScreen
      onContinue={onContinue}
      timeRemaining={timeRemaining}
      isControlScreen={isControlScreen}
      isCenterScreen={isControlScreen}
      round={1}
      year="2025-2050"
      info={info}
      waterLevelIndicator={
        <WaterLevelIndicator
          minLevel={0.2}
          maxLevel={0.6}
          currentLevel={0.2}
          scaleMax={2}
          currentWaterColor={{
            from: 'rgba(152, 209, 255, 1)',
            to: 'rgba(117, 193, 255, 1)',
          }}
          projectedWaterColor={{
            from: 'rgba(66, 100, 255, 1)',
            to: 'rgba(27, 68, 255, 1)',
          }}
        />
      }
      screenDuration={30}
    />
  );
}

