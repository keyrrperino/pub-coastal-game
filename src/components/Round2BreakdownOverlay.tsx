import React from 'react';

interface Round2BreakdownOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Round2BreakdownOverlay({
  isOpen,
  onClose,
}: Round2BreakdownOverlayProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={handleBackdropClick}
    >
      {/* Main Container - responsive and larger */}
      <div className="relative w-[90vw] max-w-[600px] h-[90vh] max-h-[800px] scale-90">
        {/* Background Container - positioned behind white sections */}
        <div className="absolute top-[29px] left-[26px] w-full h-full bg-[#E6CA77] rounded-[22px]" />
        
        {/* White sections that extend to edges */}
        <div className="absolute inset-0 flex flex-col">
          {/* This will be handled by the content overlay */}
        </div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col rounded-[22px] overflow-hidden">
          {/* Header Section */}
          <div className="flex-1 bg-white flex items-center justify-center">
            <h1 className="text-[#202020] text-[clamp(24px,4vw,38px)] font-bold text-center leading-[1.2] tracking-wide pt-6 pb-2">
              Round 2<br />BREAKDOWN
            </h1>
          </div>
          
          {/* Breakdown List in White Section */}
          <div className="flex-1 bg-white px-14 py-8">
            <div className="flex flex-col space-y-2">
              {/* Round 1 Points */}
              <div className="flex items-center justify-between">
                <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  round 1 points
                </span>
                <div className="flex-1 mx-3 border-b border-dotted border-[#EF9F0C] border-[1.68px]" />
                <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  9,400
                </span>
              </div>
              
              {/* P1 Actions */}
              <div className="flex items-center justify-between">
                <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  P1 actions
                </span>
                <div className="flex-1 mx-3 border-b border-dotted border-[#EF9F0C] border-[1.68px]" />
                <div className='flex gap-2'>
                  {/* Empty - no coins spent */}
                </div>
              </div>
              
              {/* P1 Money spent */}
              <div className="flex items-center justify-between">
                <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  P1 Money spent
                </span>
                <div className="flex-1 mx-3 border-b border-dotted border-[#EF9F0C] border-[1.68px]" />
                <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  0
                </span>
              </div>
              
              {/* P2 Actions */}
              <div className="flex items-center justify-between">
                <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  P2 actions
                </span>
                <div className="flex-1 mx-3 border-b border-dotted border-[#EF9F0C] border-[1.68px]" />
                <span className="text-[#FF0000] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  -200
                </span>
              </div>
              
              {/* P2 Money spent */}
              <div className="flex items-center justify-between">
                <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  P2 Money spent
                </span>
                <div className="flex-1 mx-3 border-b border-dotted border-[#EF9F0C] border-[1.68px]" />
                <div className="flex gap-2">
                  <img src="/assets/coin-icon.png" alt="coin" className="w-5 h-5" />
                  <img src="/assets/coin-icon.png" alt="coin" className="w-5 h-5" />
                  <img src="/assets/coin-icon.png" alt="coin" className="w-5 h-5" />
                  <img src="/assets/coin-icon.png" alt="coin" className="w-5 h-5" />
                  <img src="/assets/coin-icon.png" alt="coin" className="w-5 h-5" />
                  <img src="/assets/coin-icon.png" alt="coin" className="w-5 h-5" />
                </div>
              </div>
              
              {/* P3 Actions */}
              <div className="flex items-center justify-between">
                <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  P3 actions
                </span>
                <div className="flex-1 mx-3 border-b border-dotted border-[#EF9F0C] border-[1.68px]" />
                <span className="text-[#FF0000] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  -200
                </span>
              </div>
              
              {/* P3 Money spent */}
              <div className="flex items-center justify-between">
                <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
                  P3 Money spent
                </span>
                <div className="flex-1 mx-3 border-b border-dotted border-[#EF9F0C] border-[1.68px]" />
                <div className="flex gap-2">
                  <img src="/assets/coin-icon.png" alt="coin" className="w-5 h-5" />
                  <img src="/assets/coin-icon.png" alt="coin" className="w-5 h-5" />
                  <img src="/assets/coin-icon.png" alt="coin" className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Final Score */}
          <div className="bg-[#EF9F0C] px-8 py-6">
            <div className="text-center">
              <div className="text-[clamp(20px,3vw,34px)] font-bold text-white">
                ROUND 2 POINTS
              </div>
              <div className="text-[clamp(40px,8vw,73px)] font-bold text-white">
                9,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 