import Head from 'next/head';
import { useRouter } from 'next/router';
import PlayerRound1Screen from '@/components/player-screens/PlayerRound1Screen';

export default function PlayerRound1Page() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the game or next round
    console.log('Player Round 1 started');
    router.push('/player/round2');
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Player Round 1</title>
        <meta
          name="description"
          content="Player Round 1: 2025-2050 - Deploy your first line of defense"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PlayerRound1Screen onContinue={handleContinue} />
    </>
  );
} 