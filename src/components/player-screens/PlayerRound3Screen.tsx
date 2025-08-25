import React from 'react';
import Image from 'next/image';
import WaterLevelIndicator from '../WaterLevelIndicator';
import { cn } from '@/lib/utils';
import PlayerRoundScreen from './PlayerRoundScreen';
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
  const info = (
    <div className="px-9 py-6 4k:px-[80px] 4k:py-[50px] space-y-6">
      <p className="text-white text-3xl 4k:text-[80px] leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
        This is the final stretch!
      </p>

      <p className="text-white text-3xl 4k:text-[80px] leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
        With sea levels projected to rise as{' '}
        <span className="text-[#FF6A6C]">high as 2 metres</span> by
        2100, the choices you make now will determine our future.
      </p>

      <p className="text-white text-3xl 4k:text-[80px] leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
        <span className="text-[#FFDD3D]">
          Strengthen your protection. Close the gaps.
        </span>{' '}
        Better still, integrate your coastal protection measures with
        amenities to create value for your citizens.
      </p>

      <p className="text-white text-3xl 4k:text-[80px] leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
        We believe in you. Let's finish strong.
      </p>
    </div>
  );

  const waterLevelIndicator = (
    <WaterLevelIndicator
      minLevel={1.15}
      maxLevel={2.0}
      currentLevel={1.15}
      scaleMax={2}
      currentWaterColor={{
        from: 'rgba(255, 150, 86, 1)',
        to: 'rgba(255, 127, 48, 1)',
      }}
      projectedWaterColor={{
        from: 'rgba(255, 88, 102, 1)',
        to: 'rgba(255, 13, 33, 1)',
      }}
    />
  );

  return (
    <PlayerRoundScreen
      onContinue={onContinue}
      timeRemaining={timeRemaining}
      isControlScreen={isControlScreen}
      round={3}
      year="2075-2100"
      info={info}
      waterLevelIndicator={waterLevelIndicator}
      screenDuration={30}
    />
  );
}

