import React from 'react';
import RoundScreen from './RoundScreen';

interface Round3ScreenProps {
  timeRemaining: number
}

export default function Round3Screen({ timeRemaining }: Round3ScreenProps) {
  const description = `This is it - the final stretch.

Sea levels are approaching their peak, with projections rising as high as 2 metres by the end of the century. The choices you make now will determine Singapore's future.

Strengthen your defenses. Close the gaps.
 This is your last chance to build a continuous line of protection across every coast.
Every dollar, every structure, every upgrade matters.
The rising tide won't wait.

Stand firm. Build wisely. Protect what matters.
We believe in you. Let's finish strong.`;

  return (
    <RoundScreen
      roundNumber={3}
      yearRange="2075-2100"
      description={description}
      timeRemaining={timeRemaining}
    />
  );
} 