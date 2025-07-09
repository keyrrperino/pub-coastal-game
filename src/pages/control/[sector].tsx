import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import { GameEnum, SectorsButtonConfig } from '@/lib/gameRoom';

const ControllerWithoutSSR = dynamic(() => import("@/games/pub-coastal-game/Controller"), { ssr: false });

export default function SectorPage() {
  const router = useRouter();
  const { sector } = router.query;

  // Only allow these sector slugs
  const allowedSectors = ['sector-one', 'sector-two', 'sector-three'];

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
      <main className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            <ControllerWithoutSSR sector={sector as string} />
          </div>
        </div>
      </main>
    </>
  );
}