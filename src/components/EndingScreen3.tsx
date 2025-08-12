import React from 'react';
import Image from 'next/image';

interface EndingScreen3Props {
  finalScore?: number;
  onRestart?: () => void;
  onMainMenu?: () => void;
}

export default function EndingScreen3({ 
  finalScore = 3500, 
  onRestart, 
  onMainMenu 
}: EndingScreen3Props) {
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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="flex flex-col items-center gap-15 max-w-screen w-full">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-20 w-full">
            <h1 className="text-white text-7xl font-bold text-center leading-[0.8] drop-shadow-[0px_4px_4px_rgba(148,107,199,1)]">
              Oh no
            </h1>
            
            <div className='flex flex-col gap-6 max-w-[75vw]'>
              <p className="text-white text-3xl uppercase font-bold text-center leading-[1.2] max-w-screen drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
                too many floods have breached Singapore's defenses this time. But don't give up!
              </p>
              
              <p className="text-white text-3xl font-bold text-center leading-[1.2] max-w-screen drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
                YOUR FINAL SCORE: {finalScore.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Message Box */}
          <div className="relative max-w-[75vw] w-full rounded-[56px] backdrop-blur-[37px] shadow-[0px_13px_63px_rgba(0,0,0,0.15)]">
            {/* Border using ::after pseudo-element */}
            <style jsx>{`
              div::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 56px;
                padding: 5px;
                background: linear-gradient(135deg, rgba(17, 68, 153, 0) 0%, #FFFFFF 100%);
                -webkit-mask: 
                  linear-gradient(#fff 0 0) content-box, 
                  linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask: 
                  linear-gradient(#fff 0 0) content-box, 
                  linear-gradient(#fff 0 0);
                mask-composite: exclude;
                pointer-events: none;
              }
            `}</style>
            
            <div 
              className="relative w-full h-full rounded-[56px] py-10 px-20"
              style={{ backgroundColor: 'rgba(255, 175, 175, 0.3)' }}
            >
              <p className="text-white text-3xl font-bold text-center drop-shadow-[0px_2px_2px_rgba(148,107,199,1)] font-condensed">
                Try again to improve your strategy and better protect our shores.
                <br />
                Remember, no single solution is perfect, but we must act now and together to protect future generations.
                <br />
                We're counting on you, coastal protector.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 