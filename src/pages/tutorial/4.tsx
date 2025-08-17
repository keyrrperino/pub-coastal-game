import Head from 'next/head';
import { useRouter } from 'next/router';
import TutorialScreen4 from '@/components/TutorialScreen4';

export default function Tutorial3Page() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the first round or game start
    router.push('/round1');
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Tutorial 3</title>
        <meta
          name="description"
          content="Coastal Protection Measures Overview"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <TutorialScreen4 onContinue={handleContinue} />
    </>
  );
} 