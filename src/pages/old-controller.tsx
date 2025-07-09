import Head from "next/head";
import dynamic from "next/dynamic";

const AppWithoutSSR = dynamic(() => import("@/games/pub-coastal-game-spline/App"), { ssr: false });

export default function Controller() {
    return (
        <>
            <Head>
                <title>Coastal Pub Controller</title>
                <meta name="description" content="Control the coastal scene actions" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-center items-center">
                        <AppWithoutSSR showViewer={false} showController={true} />
                    </div>
                </div>
            </main>
        </>
    );
} 