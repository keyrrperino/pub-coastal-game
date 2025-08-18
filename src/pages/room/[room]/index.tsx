import Head from "next/head";
import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticProps } from "next";

const AppWithoutSSR = dynamic(() => import("@/games/pub-coastal-game/App"), { ssr: false });

export const getStaticPaths: GetStaticPaths = async () => {
  // Define some static paths if needed, or leave empty

  return {
    paths: [],
    fallback: "blocking", // generate on-demand for any room
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { room } = params as { room: string };

  // Use the room parameter directly
  return {
    props: {
      roomName: room,
    },
  };
};

export default function Room({ roomName }: {roomName: string}) {
    return (
        <>
            <Head>
                <title>Coastal Pub</title>
                <meta name="description" content="Create your own coastal scene with trees, islands, and water" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className="h-screen w-screen">
                {roomName && <AppWithoutSSR roomName={roomName} />}
            </main>
        </>
    );
}