import Head from 'next/head';
import { useRouter } from 'next/router';
import TutorialScreen1 from '@/components/TutorialScreen1';

export default function Tutorial1Page() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/tutorial/2');
  };

  return (
    <>
      <Head>
        <title>Coastal Protectors - Tutorial 1</title>
        <meta
          name="description"
          content="Welcome to the Coastal Protection Taskforce"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <TutorialScreen1 onContinue={handleContinue} />
    </>
  );
} 