import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AppWithoutSSR = dynamic(() => import("@/games/coastal-pub/App"), { ssr: false });

export default function Home() {
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
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800">Pub Coastal Game</h1>
                        <div className="w-[100px]"></div>
                    </div>
                    
                    <div className="flex justify-center items-center">
                        <div className="w-full max-w-6xl">
                            <AppWithoutSSR />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}