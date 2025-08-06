import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Error from 'next/error';

const ControllerWithoutSSR = dynamic(() => import("@/games/pub-coastal-game/Controller"), { ssr: false });

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
        <title>Coastal Pub</title>
        <meta name="description" content="Create your own coastal scene with trees, islands, and water" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ControllerWithoutSSR sector={sector as string} />
    </>
  );
}