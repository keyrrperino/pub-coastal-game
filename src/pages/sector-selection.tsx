import Head from "next/head";
import { Button } from "@/components/ui/button";

export default function SectorSelection() {
  const handleSelect = (sector: number) => {
    window.location.href = `/player-controller?sector=${sector}`;
  };

  return (
    <>
      <Head>
        <title>Select Sector</title>
        <meta name="description" content="Select a sector to play" />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-blue-200">
        <div className="flex flex-col gap-8 w-full max-w-md items-center">
          <h1 className="text-3xl font-bold mb-8 text-center">Select a Sector</h1>
          <Button size="lg" className="w-full h-24 text-2xl" onClick={() => handleSelect(1)}>
            Sector 1
          </Button>
          <Button size="lg" className="w-full h-24 text-2xl" onClick={() => handleSelect(2)}>
            Sector 2
          </Button>
          <Button size="lg" className="w-full h-24 text-2xl" onClick={() => handleSelect(3)}>
            Sector 3
          </Button>
        </div>
      </main>
    </>
  );
}
