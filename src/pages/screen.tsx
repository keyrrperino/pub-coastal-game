import Head from "next/head";
import dynamic from "next/dynamic";

const AppWithoutSSR = dynamic(() => import("@/games/pub-coastal-game/App"), { ssr: false });

export default function Home() {
    return (
        <>
            <Head>
                <title>Coastal Pub</title>
                <meta name="description" content="Create your own coastal scene with trees, islands, and water" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className="h-screen w-screen">
                <AppWithoutSSR />
            </main>
        </>
    );
}