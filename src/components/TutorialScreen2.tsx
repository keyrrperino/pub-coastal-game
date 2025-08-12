import React from 'react';
import Image from 'next/image';

interface TutorialScreen2Props {
  onContinue: () => void;
}

export default function TutorialScreen2({ onContinue }: TutorialScreen2Props) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/tutorial-bg.png"
          alt="Coastal background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay with Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[64px]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="flex flex-col items-center gap-12 max-w-[90%] w-full h-full max-h-[80%]">
          {/* Description */}
          <div className="w-full">
            <p className="text-white text-3xl text-center font-bold">
              SINGAPORE IS DIVIDED INTO THREE SECTORS AND SIX SUBSECTORS. EACH WITH ITS OWN LAND USE. FOR EXAMPLE. SECTOR 1A IS INDUSTRIAL, SECTOR 2A IS COMMERCIAL, AND SECTOR 3B IS RESIDENTIAL. TAKE A LOOK AROUND — WHICH SECTOR ARE YOU IN CHARGE OF?
            </p>
          </div>

          {/* Map Container - Fill remaining height */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center">
            {/* Base Singapore Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/assets/map.svg"
                alt="Singapore Map"
                width={1109}
                height={598}
                className="object-contain"
              />
            </div>

            {/* Map Highlight Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/assets/map-highlight.svg"
                alt="Map Highlights"
                width={1109}
                height={598}
                className="object-contain"
              />
            </div>

            {/* Player 1 Controls Sector 1 - Bottom Right */}
            <div className="absolute bottom-4 right-4 text-red-400 text-2xl font-bold text-center bottom-[86px] right-[58px]">
              <p>PLAYER 1<br />CONTROLS<br />SECTOR 1</p>
            </div>

            {/* Player 2 Controls Sector 2 - Left */}
            <div className="absolute text-green-400 text-2xl font-bold text-center top-[29%] -left-[4%]">
              <p>PLAYER 2<br />CONTROLS<br />SECTOR 2</p>
            </div>

            {/* Player 3 Controls Sector 3 - Top Right */}
            <div className="absolute text-purple-400 text-2xl font-bold text-center top-[66px] -right-[21px]">
              <p>PLAYER 3<br />CONTROLS<br />SECTOR 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 