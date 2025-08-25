import React from 'react';

interface PlayerData {
  actions: number;
  moneySpent: number;
}

interface RoundBreakdownOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  round: 1 | 2 | 3;
  previousRoundPoints?: number;
  totalPoints?: number;
  players: PlayerData[];
}

export default function RoundBreakdownOverlay({
  isOpen,
  onClose,
  round,
  previousRoundPoints,
  totalPoints,
  players,
}: RoundBreakdownOverlayProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // Color schemes for each round
  const colorSchemes = {
    1: {
      background: '#8491C6',
      border: '#2A81FA',
      finalScoreBg: '#2A81FA',
    },
    2: {
      background: '#E6CA77',
      border: '#EF9F0C',
      finalScoreBg: '#EF9F0C',
    },
    3: {
      background: '#E67785',
      border: '#DD0046',
      finalScoreBg: '#DD0046',
    },
  };

  const colors = colorSchemes[round];

  // Get the appropriate title and data based on round
  const getRoundTitle = () => {
    return `Round ${round}<br />BREAKDOWN`;
  };

  const getFirstRowLabel = () => {
    if (round === 1) return 'Total Points';
    return `round ${round - 1} points`;
  };

  const getFirstRowValue = () => {
    if (round === 1) return totalPoints || 10000;
    return previousRoundPoints || 0;
  };

  const renderMoneySpent = (amount: number) => {
    if (amount === 0) {
      return (
        <span className="text-[#202020] text-[clamp(16px,2.5vw,31px)] font-bold font-condensed">
          0
        </span>
      );
    }

    return (
      <div className="flex gap-2">
        {Array.from({ length: amount }, (_, i) => (
          <img
            key={i}
            src="/assets/coin-icon.png"
            alt="coin"
            className="w-5 h-5"
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={handleBackdropClick}
    >
      {/* Main Container - responsive and larger */}
      <div className="relative w-[90vw] h-[90vh] scale-90">
        {/* Background Container - positioned behind white sections */}
        <div
          className="absolute top-[29px] left-[26px] w-full h-full rounded-[22px]"
          style={{ backgroundColor: colors.background }}
        />

        {/* White sections that extend to edges */}
        <div className="absolute inset-0 flex flex-col">
          {/* This will be handled by the content overlay */}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col rounded-[22px] overflow-hidden">
          {/* Header Section */}
          <div className="flex-1 bg-white flex items-center justify-center">
            <h1
              className="text-[#202020] text-[90px] font-bold text-center leading-[1.2] tracking-wide pt-6 pb-2"
              dangerouslySetInnerHTML={{ __html: getRoundTitle() }}
            />
          </div>

          {/* Breakdown List in White Section */}
          <div className="flex-1 bg-white px-14 py-8">
            <div className="flex flex-col space-y-2">
              {/* First Row - Total Points or Previous Round Points */}
              <div className="flex items-center justify-between">
                <span className="text-[#202020] text-[40px] font-bold font-condensed">
                  {getFirstRowLabel()}
                </span>
                <div
                  className="flex-1 mx-3 border-b-[3.37px] border-dashed"
                  style={{ borderColor: colors.border }}
                />
                <span className="text-[#202020] text-[40px] font-bold font-condensed">
                  {getFirstRowValue().toLocaleString()}
                </span>
              </div>

              {/* Player Rows */}
              {players.map((player, index) => (
                <React.Fragment key={index}>
                  {/* Player Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-[#202020] text-[40px] font-bold font-condensed">
                      P{index + 1} actions
                    </span>
                    <div
                      className="flex-1 mx-3 border-b-[3.37px] border-dashed"
                      style={{ borderColor: colors.border }}
                    />
                    <span className="text-[#FF0000] text-[40px] font-bold font-condensed">
                      {player.actions}
                    </span>
                  </div>

                  {/* Player Money spent */}
                  <div className="flex items-center justify-between">
                    <span className="text-[#202020] text-[40px] font-bold font-condensed">
                      P{index + 1} Money spent
                    </span>
                    <div
                      className="flex-1 mx-3 border-b-[3.37px] border-dashed"
                      style={{ borderColor: colors.border }}
                    />
                    {renderMoneySpent(player.moneySpent)}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Bottom Section - Final Score */}
          <div
            className="px-8 py-6"
            style={{ backgroundColor: colors.finalScoreBg }}
          >
            <div className="text-center">
              <div className="text-[40px] font-bold text-white">
                ROUND {round} POINTS
              </div>
              <div className="text-[68px] font-bold text-white">
                {totalPoints?.toLocaleString() || '0'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

