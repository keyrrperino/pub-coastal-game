import React from 'react';
import Image from 'next/image';

interface EndingScreen1Props {
  finalScore?: number;
  onRestart?: () => void;
  onMainMenu?: () => void;
}

export default function EndingScreen1({ 
  finalScore = 9500, 
  onRestart, 
  onMainMenu 
}: EndingScreen1Props) {
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
          <div className="flex flex-col items-center gap-12 w-full">
            <h1 className="text-white text-[99px] font-bold text-center leading-[0.8] drop-shadow-[0px_4px_4px_rgba(148,107,199,1)]">
              Congratulations!
            </h1>
            
            <p className="text-white text-[43px] font-bold text-center leading-[1.2] max-w-[1160px] drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
              You've successfully defended Singapore's shores from rising sea levels.
            </p>
            
            <p className="text-white text-[43px] font-bold text-center leading-[1.2] max-w-[1160px] drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
              YOUR FINAL SCORE: {finalScore.toLocaleString()}
            </p>
          </div>

          {/* Message Box */}
          <div className="relative w-[1490px] max-w-full p-[43px] rounded-[56px] backdrop-blur-[37px] shadow-[0px_13px_63px_rgba(0,0,0,0.15)]">
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
                background: linear-gradient(135deg, #91E2FF 0%, #FFFFFF 100%);
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
              className="relative w-full h-full rounded-[56px] p-[43px]"
              style={{ backgroundColor: 'rgba(175, 255, 178, 0.3)' }}
            >
              <p className="text-white text-[56px] font-bold text-center leading-[1.2] drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
                Your strategic choices have made a real difference in safeguarding our island for generations to come.
                <br /><br />
                But remember: no solution is perfect, and the fight against the rising tides is far from over.
                <br /><br />
                We need you - our coastal protector - to keep standing strong.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-8 mt-8">
            {onRestart && (
              <button
                onClick={onRestart}
                className="px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-2xl rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Play Again
              </button>
            )}
            
            {onMainMenu && (
              <button
                onClick={onMainMenu}
                className="px-12 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-2xl rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Main Menu
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 