import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import { useEffect } from 'react';
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
  const { sector, roomId } = router.query;

  // Only allow these sector slugs
  const allowedSectors = ['sector-1', 'sector-2', 'sector-3'];

  // Handle room ID persistence for PWA
  useEffect(() => {
    if (!router.isReady || !sector) return;

    const sectorStr = sector as string;
    const roomIdStr = roomId as string;

    // If we have a room ID, store it
    if (roomIdStr) {
      localStorage.setItem(`pwa-room-${sectorStr}`, roomIdStr);
    } 
    // If we don't have room ID but are in PWA mode, try to restore it
    else {
      const storedRoomId = localStorage.getItem(`pwa-room-${sectorStr}`);
      if (storedRoomId) {
        // Check if this is a PWA launch (multiple ways to detect)
        const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                     (window.navigator as any).standalone ||
                     document.referrer.includes('android-app://');
        
        if (isPWA || window.location.search === '') {
          // Redirect to include room ID
          console.log('PWA detected, restoring room ID:', storedRoomId);
          router.replace(`/control/${sectorStr}?roomId=${storedRoomId}`);
          return;
        }
      }
    }
  }, [router.isReady, sector, roomId, router]);

  // Show 404 if sector is not valid (only after router is ready)
  if (router.isReady && (typeof sector !== 'string' || !allowedSectors.includes(sector))) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>Coastal Pub - {sector?.toString().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}{roomId ? ` - Room ${roomId}` : ''}</title>
        <meta name="description" content={`Interactive coastal protection game control panel${roomId ? ` - Room ${roomId}` : ''}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href={`/manifest-${sector}.json`} />
      </Head>
      <GameProvider>
        <SectorControl sector={sector as string} roomId={roomId as string} />
      </GameProvider>
    </>
  );
}