import React from 'react';
import Image from 'next/image';
import PostRoundModal, { PostRoundPerformance } from './PostRoundModal';

interface CoastalGameModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onContinue?: () => void;
  performance?: PostRoundPerformance;
  showPostRoundFeedback?: boolean;
  timeRemaining?: number;
  budget?: number;
  sector1A?: {
    landReclamation: { height: string; coins: number };
    seawall: { height: string; coins: number };
    mangroves: { planted: boolean; coins: number };
  };
  sector1B?: {
    landReclamation: { height: string; coins: number };
    seawall: { height: string; coins: number };
    mangroves: { planted: boolean; coins: number };
  };
}

interface ProtectionMeasureProps {
  type: 'landReclamation' | 'seawall' | 'mangroves';
  height?: string;
  planted?: boolean;
  coins: number;
  isSelected?: boolean;
  isDisabled?: boolean;
}

function ProtectionMeasure({ type, height, planted, coins, isSelected, isDisabled }: ProtectionMeasureProps) {
  const getIconSrc = () => {
    switch (type) {
      case 'landReclamation':
        return '/assets/land-reclamation-icon-6b707d.png';
      case 'seawall':
        return '/assets/seawall-icon-41fadd.png';
      case 'mangroves':
        return '/assets/mangroves-icon-3a15a8.png';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'landReclamation':
        return 'LAND RECLAMATION';
      case 'seawall':
        return 'SEAWALL';
      case 'mangroves':
        return 'MANGROVES';
    }
  };

  const getIconBgColor = () => {
    switch (type) {
      case 'landReclamation':
        return 'bg-[#8CFFEC]';
      case 'seawall':
        return 'bg-[#8CFFEC]';
      case 'mangroves':
        return 'bg-[#BFFFBE]';
    }
  };

  return (
    <div className={`
      flex flex-col items-center gap-5 p-5 rounded-[26px] backdrop-blur-[17px] shadow-lg border-2
      ${isSelected ? 'bg-white/30' : 'bg-white/20'}
      ${isDisabled ? 'opacity-40' : ''}
      ${isSelected ? 'border-gradient-to-br from-[#91E2FF] to-white' : 'border-white/30'}
    `}>
      {/* Header with Icon and Title */}
      <div className="flex items-center gap-3">
        <div className={`w-[37px] h-[37px] ${getIconBgColor()} rounded-full relative overflow-hidden`}>
          <Image
            src={getIconSrc()}
            alt={getTitle()}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-white text-[22px] font-bold">{getTitle()}</span>
      </div>

      {/* Height Options and Coins */}
      <div className="flex flex-col gap-4">
        {type === 'mangroves' ? (
          <div className="flex items-center gap-2">
            <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
              <span className="text-black text-sm font-bold">PLANT</span>
            </div>
            <div className="flex flex-col gap-1">
              {Array.from({ length: coins }, (_, i) => (
                <div key={i} className="w-4 h-4 bg-[#EFAD2B] rounded-sm flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">$</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* 2m Option */}
            <div className="flex items-center gap-2">
              <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">2M</span>
              </div>
              <div className="flex flex-col gap-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="w-4 h-4 bg-[#EFAD2B] rounded-sm flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">$</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 1.15m Option */}
            <div className="flex items-center gap-2">
              <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">1.15M</span>
              </div>
              <div className="flex flex-col gap-1">
                {Array.from({ length: 2 }, (_, i) => (
                  <div key={i} className="w-4 h-4 bg-[#EFAD2B] rounded-sm flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">$</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 0.5m Option */}
            <div className="flex items-center gap-2">
              <div className="w-[76px] h-[76px] bg-gradient-to-br from-[#B6FFF3] to-[#14F4CF] rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">0.5M</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-4 h-4 bg-[#EFAD2B] rounded-sm flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">$</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DemolishButton({ isDisabled = false }: { isDisabled?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${isDisabled ? 'opacity-40' : ''}`}>
      <div className="w-[135px] h-[135px] bg-[#FF4949] border-6 border-gradient-to-br from-[#8CFFEC] to-[#92D0FF] rounded-full flex items-center justify-center">
        <span className="text-white text-[20px] font-bold">DEMOLISH</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-4 h-4 bg-[#EFAD2B] rounded-sm flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">$</span>
        </div>
      </div>
    </div>
  );
}

export default function CoastalGameModal({
  isOpen,
  onClose,
  onContinue,
  performance = 'good',
  showPostRoundFeedback = false,
  timeRemaining = 30,
  budget = 30,
  sector1A,
  sector1B
}: CoastalGameModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onClick={handleBackdropClick}
      >
        {/* Background Image with Blur */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/tutorial-bg.png"
            alt="Coastal background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#335C8F]/60" />

        {/* Main Game Interface */}
        <div className="relative w-[1194px] max-w-[95vw] h-[834px] max-h-[90vh] flex flex-col">
          {/* Header Section */}
          <div className="flex justify-between items-end px-5 py-10">
            <div className="flex items-end gap-5">
              <span className="text-white text-[24px] font-bold">Overall Budget:</span>
            </div>
            
            <div className="flex items-end gap-2">
              <span className="text-white text-[158px] font-bold leading-[0.8] number-enhanced">{budget}</span>
              <span className="text-white text-[43px] font-bold">s</span>
            </div>
          </div>

          {/* Timer and Warning */}
          <div className="flex items-center gap-6 px-5">
            <div className="w-[621px] h-[53px] bg-white rounded-[12px] relative overflow-hidden">
              <div className="absolute left-[69px] top-[16px] w-[532px] h-[21px] bg-[#002CFF] rounded" />
              <div className="absolute left-[20px] top-[10px] w-[33px] h-[33px] border-4 border-black rounded-full" />
              <div className="absolute left-[35px] top-[18px] w-1 h-2 bg-black" />
              <div className="absolute left-[35px] top-[26px] w-2 h-1 bg-black" />
            </div>
            <span className="text-white text-[21px] font-bold">
              WARNING: You only get to choose once
            </span>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex gap-15 px-10 py-6">
            {/* Sector 1A: Industrial */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-white text-[37px] font-bold">Sector 1A: Industrial</span>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <ProtectionMeasure
                    type="landReclamation"
                    coins={3}
                    isSelected={sector1A?.landReclamation.height === '2m'}
                  />
                  <ProtectionMeasure
                    type="seawall"
                    coins={3}
                    isSelected={sector1A?.seawall.height === '2m'}
                  />
                  <ProtectionMeasure
                    type="mangroves"
                    coins={1}
                    planted={sector1A?.mangroves.planted}
                    isSelected={sector1A?.mangroves.planted}
                  />
                </div>
                <DemolishButton isDisabled={true} />
              </div>
            </div>

            {/* Sector 1B: Residential */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-white text-[37px] font-bold">Sector 1B: Residential</span>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <ProtectionMeasure
                    type="landReclamation"
                    coins={1}
                    isSelected={sector1B?.landReclamation.height === '2m'}
                  />
                  <ProtectionMeasure
                    type="seawall"
                    coins={1}
                    isSelected={sector1B?.seawall.height === '2m'}
                  />
                  <ProtectionMeasure
                    type="mangroves"
                    coins={1}
                    planted={sector1B?.mangroves.planted}
                    isSelected={sector1B?.mangroves.planted}
                  />
                </div>
                <DemolishButton isDisabled={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post-Round Feedback Modal */}
      {/* {showPostRoundFeedback && (
        // <PostRoundModal
        //   isOpen={showPostRoundFeedback}
        //   performance={performance}
        //   onClose={onClose}
        //   onContinue={onContinue}
        // />
      )} */}
    </>
  );
} 