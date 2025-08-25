import React from 'react';
import Image from 'next/image';

export type PlayerEndingType = 'success' | 'moderate' | 'failure';

interface PlayerEndingScreenProps {
  endingType: PlayerEndingType;
  finalScore?: number;
}

interface PlayerEndingConfig {
  title: string;
  subtitle: string;
  bgColor: string;
  borderGradient: string;
  buttonColor: string;
  buttonHoverColor: string;
}

const playerEndingConfigs: Record<
  PlayerEndingType,
  PlayerEndingConfig
> = {
  success: {
    title: 'Well done!',
    subtitle:
      "Your strategic choices have made a real difference in safeguarding our island for generations to come.<br/><br/>But no solution is perfect. We'll strengthen our defences against the rising seas and work with stakeholders to create coastlines that everyone cherishes.<br/><br/>Together, we can protect Singapore's future!",
    bgColor: 'rgba(175, 255, 178, 0.3)',
    borderGradient:
      'linear-gradient(135deg, #91E2FF 0%, #FFFFFF 100%)',
    buttonColor: 'from-green-500 to-green-600',
    buttonHoverColor: 'from-green-600 to-green-700',
  },
  moderate: {
    title: 'Good Effort!',
    subtitle:
      'There’s still room to improve, but you’ve made important progress to protect Singapore’s coasts.<br/><br/>Keep learning, keep adapting, and keep engaging stakeholders!<br/><br/>Thank you for being part of our coastal protection journey!',
    borderGradient:
      'linear-gradient(135deg, #FFEEAF 0%, #FFFFFF 100%)',
    buttonColor: 'from-yellow-500 to-yellow-600',
    buttonHoverColor: 'from-yellow-600 to-yellow-700',
    bgColor: 'rgba(255, 238, 175, 0.3)',
  },
  failure: {
    title: 'Oh no!',
    subtitle:
      'The floods have breached Singapore’s coastal defences and caused severe damages everywhere.<br/><br/>Coastal protection requires careful planning and balancing many considerations.<br/><br/>Learn from this game and plan a stronger defence next time.',
    bgColor: 'rgba(255, 175, 175, 0.3)',
    borderGradient:
      'linear-gradient(135deg, rgba(17, 68, 153, 0) 0%, #FFFFFF 100%)',
    buttonColor: 'from-red-500 to-red-600',
    buttonHoverColor: 'from-red-600 to-red-700',
  },
};

export default function PlayerEndingScreen({
  endingType,
  finalScore = 5000,
}: PlayerEndingScreenProps) {
  const config = playerEndingConfigs[endingType];

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
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="flex flex-col items-center gap-20 max-w-screen w-full">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-10 w-full">
            <h1 className="text-white text-7xl font-bold text-center leading-[0.8] drop-shadow-[0px_4px_4px_rgba(148,107,199,1)]">
              {config.title}
            </h1>

            <div className="max-w-[75vw]">
              <p className="text-white text-4xl font-bold text-center leading-[1.2] max-w-screen drop-shadow-[0px_2px_2px_rgba(148,107,199,1)]">
                YOUR FINAL SCORE:
                <br />
                <span className="text-[#FFDD3D]">
                  {finalScore.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="relative max-w-[85vw] w-full rounded-[56px] backdrop-blur-[37px] shadow-[0px_13px_63px_rgba(0,0,0,0.15)]">
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
                  background: ${config.borderGradient};
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
                style={{ backgroundColor: config.bgColor }}
              >
                <p
                  className="text-white text-3xl font-bold text-center drop-shadow-[0px_2px_2px_rgba(148,107,199,1)] font-condensed"
                  dangerouslySetInnerHTML={{
                    __html: config.subtitle,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

