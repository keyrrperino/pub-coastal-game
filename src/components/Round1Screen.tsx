import React from 'react';
import RoundScreen from './RoundScreen';

interface Round1ScreenProps {
  timeRemaining: number;
}

export default function Round1Screen({ timeRemaining }: Round1ScreenProps) {
  const description = `Sea levels are beginning to rise — slowly, but steadily.
By 2050, they could climb anywhere between 0.2 to 0.6 metres.

You now have 30 seconds to deploy your first line of defense.
 Review your assigned sectors. Choose the most suitable coastal protection measure for your land use and remember you can only deploy one measure at a time.

You have a limited budget. Use it wisely — stronger defenses may cost more, but some areas are more vulnerable than others.

Think fast. Plan smart.
The next 25 years start now.`;

  return (
    <RoundScreen
      roundNumber={1}
      yearRange="2025-2050"
      description={description}
      timeRemaining={timeRemaining}
    />
  );
} 