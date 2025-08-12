import React from 'react';
import RoundScreen from './RoundScreen';

interface Round2ScreenProps {
  timeRemaining: number;
}

export default function Round2Screen({ timeRemaining }: Round2ScreenProps) {
  const description = `You've made it through the first phase - but the tides are still rising.
Between now and 2075, mean sea levels are projected to increase by 0.7 to 1.5 meters.
It's time to adapt, upgrade, or rethink your strategy.

In this round, you may:
Upgrade your existing defenses - raise their height or enhance them with recreational features
Demolish earlier measures - but be warned: demolition costs money and lowers your score.
Your mission: strengthen your coastline and cover any weak spots left behind.
The stakes are higher.
The waters are too.

30 seconds on the clock. Let's go!`;

  return (
    <RoundScreen
      roundNumber={2}
      yearRange="2050-2075"
      description={description}
      timeRemaining={timeRemaining}
    />
  );
} 