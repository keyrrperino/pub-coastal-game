import Head from 'next/head';
import { useRouter } from 'next/router';
import PlayerRound2Screen from '@/components/player-screens/PlayerRound2Screen';

export default function PlayerRound2Page() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the game or next round
    console.log('Player Round 2 started');
    router.push('/player/round3');
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Player Round 2</title>
        <meta
          name="description"
          content="Player Round 2: 2050-2075 - Deploy your second line of defense"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PlayerRound2Screen onContinue={handleContinue} />
    </>
  );
} 