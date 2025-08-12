import Head from 'next/head';
import { useRouter } from 'next/router';
import PlayerRound3Screen from '@/components/player-screens/PlayerRound3Screen';

export default function PlayerRound3Page() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the game or next round
    console.log('Player Round 3 started');
    router.push('/player/game'); // or wherever the game should go
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Player Round 3</title>
        <meta
          name="description"
          content="Player Round 3: 2075-2100 - Deploy your final line of defense"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PlayerRound3Screen onContinue={handleContinue} />
    </>
  );
} 