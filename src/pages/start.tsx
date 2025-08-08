import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import LeaderboardOverlay from '@/components/LeaderboardOverlay';

export default function StartPage() {
  const router = useRouter();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const handleStartGame = () => {
    router.push('/round1');
  };

  const handleShowLeaderboard = () => {
    setIsLeaderboardOpen(true);
  };

  const handleCloseLeaderboard = () => {
    setIsLeaderboardOpen(false);
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Start</title>
        <meta
          name="description"
          content="Start your coastal protection journey"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <StartScreen
        onStartGame={handleStartGame}
        onShowLeaderboard={handleShowLeaderboard}
      />
      <LeaderboardOverlay
        isOpen={isLeaderboardOpen}
        onClose={handleCloseLeaderboard}
      />
    </>
  );
}
