import Head from 'next/head';
import { useRouter } from 'next/router';
import Round3Screen from '@/components/Round3Screen';

export default function Round3Page() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the game or next round
    console.log('Round 3 started');
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Round 3</title>
        <meta
          name="description"
          content="Round 3: 2075-2100 - The final stretch to protect Singapore's future"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Round3Screen onContinue={handleContinue} />
    </>
  );
} 