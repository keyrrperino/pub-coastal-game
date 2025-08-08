import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Round1Screen from '@/components/Round1Screen';
import Round1BreakdownOverlay from '@/components/Round1BreakdownOverlay';

export default function Round1Page() {
  const router = useRouter();
  const [showBreakdown, setShowBreakdown] = useState(true);

  const handleContinue = () => {
    // Navigate to the game or next round
    console.log('Round 1 started');
    router.push('/round2');
  };

  const handleCloseBreakdown = () => {
    setShowBreakdown(false);
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
      <Round1BreakdownOverlay
        isOpen={showBreakdown}
        onClose={handleCloseBreakdown}
      />
    </>
  );
} 