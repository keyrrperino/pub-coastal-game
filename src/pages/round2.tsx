import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Round2Screen from '@/components/Round2Screen';
import Round2BreakdownOverlay from '@/components/Round2BreakdownOverlay';

export default function Round2Page() {
  const router = useRouter();
  const [showBreakdown, setShowBreakdown] = useState(true);

  const handleContinue = () => {
    // Navigate to the game or next round
    console.log('Round 2 started');
    router.push('/round3');
  };

  const handleCloseBreakdown = () => {
    setShowBreakdown(false);
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Round 2</title>
        <meta
          name="description"
          content="Round 2: 2050-2075 - Adapt and upgrade your defenses"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Round2Screen onContinue={handleContinue} />
      <Round2BreakdownOverlay
        isOpen={showBreakdown}
        onClose={handleCloseBreakdown}
      />
    </>
  );
} 