import Head from 'next/head';
import { useRouter } from 'next/router';
import TutorialScreen2 from '@/components/TutorialScreen2';

export default function Tutorial2Page() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/tutorial/3');
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Tutorial 2</title>
        <meta
          name="description"
          content="Singapore Sectors Overview"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <TutorialScreen2 onContinue={handleContinue} />
    </>
  );
} 