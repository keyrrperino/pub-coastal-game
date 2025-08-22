import React from 'react';
import Image from 'next/image';

interface RoundScreenProps {
  roundNumber: number;
  yearRange: string;
  description: string;
  timeRemaining: number;
}

export default function RoundScreen({
  roundNumber,
  yearRange,
  description,
  timeRemaining
}: RoundScreenProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/start-screen-bg-updated.webp"
          alt="Coastal background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

            {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center max-h-screen h-full pt-16 pb-16">
        {/* Round Title and Year */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <h1 className="text-white text-7xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_4px_4px_rgba(148,107,199,1)]">
             Round {roundNumber}
          </h1>
          <h2 className="text-white text-6xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_2px_2px_rgba(148,107,199,1)]">
            Year {yearRange}
          </h2>
        </div>
        
        {/* Description Card */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl w-full">
            <div className="bg-[rgba(175,240,255,0.3)] backdrop-blur-[22px] border-2 border-gradient-to-br from-[#91E2FF] to-white rounded-[33px] p-8 shadow-[0_7px_37px_rgba(0,0,0,0.15)]">
              <p className="text-white text-2xl text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] whitespace-pre-line uppercase font-condensed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-6">
          <button
            className="text-white text-7xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_4px_4px_rgba(148,107,199,1)] hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          >
            {timeRemaining === 0 ? 'GO!' : timeRemaining}
          </button>
        </div>
      </div>
    </div>
  );
} 