import Head from 'next/head';
import { useRouter } from 'next/router';
import Round1Screen from '@/components/Round1Screen';

export default function Round1Page() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the game or next round
    console.log('Round 1 started');
    router.push('/round2');
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Round 1</title>
        <meta
          name="description"
          content="Round 1: 2025-2050 - Deploy your first line of defense"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Round1Screen onContinue={handleContinue} />
    </>
  );
} 