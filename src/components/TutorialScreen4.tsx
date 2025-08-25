import React from 'react';
import Image from 'next/image';
import TimerBar from '@/components/coastal-protection/TimerBar';
import { useServerTime } from '@/components/ServerTimeContext';
import Logo from './Logo';

interface TutorialScreen3Props {
  phaseStartTime: number;
  timeRemaining?: number;
}

export default function TutorialScreen3({
  phaseStartTime,
  timeRemaining,
}: TutorialScreen3Props) {
  const { getAdjustedCurrentTime } = useServerTime();
  const localStartRef = React.useRef<number>(
    getAdjustedCurrentTime(),
  );
  const coinSize = window.innerHeight / 90;

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

      <div className="fixed z-10 top-[2vh] left-1/2 transform -translate-x-1/2 scale-75">
        <TimerBar duration={15} isRunning={true} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-[1vh]5 items-center justify-center h-full px-8 pt-[2vh]">
        <div className="px-12 max-w-[89%] w-full">
          <div className="flex flex-col items-center gap-[2vh] uppercase">
            {/* Top Section - Instructional Text */}
            <div className="flex flex-col gap-[1vh] text-center">
              <p className="text-white text-[4vh] font-bold">
                Once you select your measure and the sea level rise
                that you are planning for, it is locked in for the
                round.
              </p>
            </div>

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-[3vh] justify-center items-stretch">
              {/* Mangroves Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-[1vh]">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[1.7vh] h-[1.7vh] bg-green-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/mangroves-icon-3a15a8.png"
                        alt="Mangroves"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-xl font-bold">
                      MANGROVES
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-[1vh]">
                    <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                      <span className="text-black text-sm font-bold">
                        PLANT
                      </span>
                    </div>
                    <div className="flex gap-[1vh]">
                      <Image
                        src="/assets/coin-icon.png"
                        alt="Coin"
                        width={coinSize}
                        height={coinSize}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/coin-icon.png"
                        alt="Coin"
                        width={coinSize}
                        height={coinSize}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/coin-icon.png"
                        alt="Coin"
                        width={coinSize}
                        height={coinSize}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seawall Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[1.7vh] h-[1.7vh] bg-blue-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/seawall-icon-41fadd.png"
                        alt="Seawall"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-xl font-bold">
                      SEAWALL
                    </span>
                  </div>

                  <div className="flex gap-[1vh]">
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          0.5M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          1.15M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          2M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Land Reclamation Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[1.7vh] h-[1.7vh] bg-orange-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/land-reclamation-icon-6b707d.png"
                        alt="Land Reclamation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-xl font-bold">
                      LAND RECLAMATION
                    </span>
                  </div>

                  <div className="flex gap-[1.1vh]">
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          0.5M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          1.15M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          2M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Image
              src="/assets/arrows-down.svg"
              alt="Mangroves"
              width={window.innerHeight / 1.6}
              height={10}
              className="position"
            />

            {/* Middle Section - Three Protection Measure Cards */}
            <div className="flex gap-[3vh] justify-center items-stretch">
              {/* Mangroves Card */}
              <div className="bg-white/20 opacity-50 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[1.5vh] h-[1.7vh] bg-green-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/mangroves-icon-3a15a8.png"
                        alt="Mangroves"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-xl font-bold">
                      MANGROVES
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-[1.1vh]">
                    <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                      <span className="text-black text-sm font-bold">
                        PLANT
                      </span>
                    </div>
                    <div className="flex gap-[1vh]">
                      <Image
                        src="/assets/coin-icon.png"
                        alt="Coin"
                        width={coinSize}
                        height={coinSize}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/coin-icon.png"
                        alt="Coin"
                        width={coinSize}
                        height={coinSize}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/coin-icon.png"
                        alt="Coin"
                        width={coinSize}
                        height={coinSize}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seawall Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[1.5vh] h-[1.7vh] bg-blue-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/seawall-icon-41fadd.png"
                        alt="Seawall"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-xl font-bold">
                      SEAWALL
                    </span>
                  </div>

                  <div className="flex gap-[1.1vh]">
                    <div className="flex flex-col items-center gap-[1vh] opacity-50">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          0.5M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#FFEF3E] to-[#FFA557] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          1.15M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[1vh] opacity-50">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          2M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Land Reclamation Card */}
              <div className="bg-white/20 opacity-50 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg flex flex-col justify-between h-auto w-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-[1vh]">
                    <div className="w-[1.5vh] h-[1.7vh] bg-orange-400 rounded-full relative overflow-hidden">
                      <Image
                        src="/assets/land-reclamation-icon-6b707d.png"
                        alt="Land Reclamation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white text-xl font-bold">
                      LAND RECLAMATION
                    </span>
                  </div>

                  <div className="flex gap-[1.1vh]">
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          0.5M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          1.15M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-[1vh]">
                      <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                        <span className="text-black text-sm font-bold">
                          2M
                        </span>
                      </div>
                      <div className="flex gap-[1vh]">
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                        <Image
                          src="/assets/coin-icon.png"
                          alt="Coin"
                          width={coinSize}
                          height={coinSize}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hint Section */}
            <div className="flex flex-col gap-6 text-center  uppercase">
              <p className="text-[#FF6A6C] text-[4vh] font-bold">
                Hint: What is the projected sea level rise in that
                period? Can your measure be raised over time?
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-5 flex justify-center items-center">
          <Logo />
        </div>
      </div>
    </div>
  );
}
