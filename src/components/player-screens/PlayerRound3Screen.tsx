import React from 'react';
import Image from 'next/image';

interface PlayerRound3ScreenProps {
  onContinue?: () => void;
}

export default function PlayerRound3Screen({
  onContinue,
}: PlayerRound3ScreenProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/start-screen-bg.png"
          alt="Coastal background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center gap-10 max-w-4xl w-full">
          {/* Round Title and Year */}
          <div className="flex flex-col items-center">
            <h1 className="text-white text-7xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)]">
              ROUND 3
            </h1>
            <h2 className="text-white text-5xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_2px_2px_rgba(148,107,199,1)]">
              YEAR 2075-2100
            </h2>
          </div>

          {/* Game Info Card */}
          <div className="max-w-4xl w-full mx-8">
            <div className="bg-[rgba(175,240,255,0.3)] backdrop-blur-[22px] border-2 border-gradient-to-br from-[#91E2FF] to-white rounded-[26px] px-8 py-4 shadow-[0_6px_30px_rgba(0,0,0,0.15)]">
              <p className="text-white text-2xl text-center leading-relaxed drop-shadow-[0_1px_1px_rgba(148,107,199,1)] font-condensed">
                30 seconds, 10 coins, "built to x sea level rise"
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="m">
            <h3 className="text-white text-7xl font-bold text-center leading-tight tracking-wide drop-shadow-[0_3px_3px_rgba(148,107,199,1)] relative h-20">
              <span
                className="inline-block absolute left-1/2 transform -translate-x-1/2 opacity-0 text-center"
                style={{
                  animation:
                    'countdownShow 1s ease-in-out 0s forwards, countdownHide 1s ease-in-out 1s forwards',
                }}
              >
                3
              </span>
              <span
                className="inline-block absolute left-1/2 transform -translate-x-1/2 opacity-0 text-center"
                style={{
                  animation:
                    'countdownShow 1s ease-in-out 2s forwards, countdownHide 1s ease-in-out 3s forwards',
                }}
              >
                2
              </span>
              <span
                className="inline-block absolute left-1/2 transform -translate-x-1/2 opacity-0 text-center"
                style={{
                  animation:
                    'countdownShow 1s ease-in-out 4s forwards, countdownHide 1s ease-in-out 5s forwards',
                }}
              >
                1
              </span>
              <span
                className="inline-block absolute left-1/2 transform -translate-x-1/2 opacity-0 text-center"
                style={{
                  animation:
                    'countdownShow 1s ease-in-out 6s forwards',
                }}
              >
                GO!
              </span>
            </h3>

            <style jsx>{`
              @keyframes countdownShow {
                from {
                  opacity: 0;
                  transform: scale(0.8);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              @keyframes countdownHide {
                from {
                  opacity: 1;
                  transform: scale(1);
                }
                to {
                  opacity: 0;
                  transform: scale(0.8);
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}
