import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import { GameProvider } from '@/games/pub-coastal-game-spline/GlobalGameContext';

const SectorControl = dynamic(() => import("@/components/coastal-protection/SectorControl"), { ssr: false });

export async function getStaticPaths() {
  return {
    paths: [
      { params: { sector: 'sector-1' } },
      { params: { sector: 'sector-2' } },
      { params: { sector: 'sector-3' } },
    ],
    fallback: false, // Only these paths will be generated
  };
}

export async function getStaticProps() {
  return { props: {} };
}

export default function SectorPage() {
  const router = useRouter();
  const { sector } = router.query;

  // Only allow these sector slugs
  const allowedSectors = ['sector-1', 'sector-2', 'sector-3'];

  // Show 404 if sector is not valid (only after router is ready)
  if (router.isReady && (typeof sector !== 'string' || !allowedSectors.includes(sector))) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>Coastal Pub - {sector?.toString().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</title>
        <meta name="description" content="Interactive coastal protection game control panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href={`/manifest-${sector}.json`} />
      </Head>
      <GameProvider>
        <SectorControl sector={sector as string} />
      </GameProvider>
    </>
  );
}