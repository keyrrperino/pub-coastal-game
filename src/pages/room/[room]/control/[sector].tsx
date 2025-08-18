import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GameProvider } from '@/games/pub-coastal-game-spline/GlobalGameContext';
import { GetStaticPaths, GetStaticProps } from 'next';

const SectorControl = dynamic(() => import('@/components/coastal-protection/SectorControl'), { ssr: false });

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { room, sector } = params as { room: string; sector: string };

  console.log('Room:', room, 'Sector:', sector);

  const allowedSectors = ['sector-1', 'sector-2', 'sector-3'];
  if (!allowedSectors.includes(sector)) {
    return { notFound: true };
  }

  return {
    props: { room, sector },
  };
};

export default function SectorPage({ room, sector }: { room: string; sector: string }) {
  return (
    <>
      <Head>
        <title>Coastal Pub</title>
        <meta name="description" content="Create your own coastal scene with trees, islands, and water" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <GameProvider>
        {sector && room && <SectorControl sector={sector} roomName={room} />}
      </GameProvider>
    </>
  );
}