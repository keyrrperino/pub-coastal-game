import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const AppWithoutSSR = dynamic(
  () => import('@/games/pub-coastal-game-spline/App'),
  { ssr: false },
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Coastal Pub</title>
        <meta
          name="description"
          content="Create your own coastal scene with trees, islands, and water"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center">
            <AppWithoutSSR showViewer={true} showController={false} />
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/start"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Start Screen
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
