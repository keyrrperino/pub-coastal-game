import Head from 'next/head';
import { useRouter } from 'next/router';
import StartScreen from '@/components/StartScreen';

export default function StartPage() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push('/round1');
  };

  const handleShowLeaderboard = () => {
    // For now, we'll just log this action
    // You can implement leaderboard functionality later
    console.log('Show leaderboard clicked');
    // router.push('/leaderboard');
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
    </>
  );
}
