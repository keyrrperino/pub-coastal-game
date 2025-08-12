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
              {/* Sector 1 Highlight */}
              <Image
                src="/assets/sector1-highlight.svg"
                alt="Sector 1 Highlight"
                width={1109}
                height={598}
                className="object-contain absolute opacity-0 animate-fadeIn"
                style={{
                  animation: 'fadeIn 1s ease-in-out 0.5s forwards'
                }}
              />
              
              {/* Sector 2 Highlight */}
              <Image
                src="/assets/sector2-highlight.svg"
                alt="Sector 2 Highlight"
                width={1109}
                height={598}
                className="object-contain absolute opacity-0"
                style={{
                  animation: 'fadeIn 1s ease-in-out 1.5s forwards'
                }}
              />
              
              {/* Sector 3 Highlight */}
              <Image
                src="/assets/sector3-highlight.svg"
                alt="Sector 3 Highlight"
                width={1109}
                height={598}
                className="object-contain absolute opacity-0"
                style={{
                  animation: 'fadeIn 1s ease-in-out 2.5s forwards'
                }}
              />
            </div>

            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
} 