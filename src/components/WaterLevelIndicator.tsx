import React from 'react';
import { cn } from '@/lib/utils';

interface WaterLevelIndicatorProps {
  minLevel: number;
  maxLevel: number;
  currentLevel: number;
  unit?: string;
  className?: string;
  scaleMax: number;
  containerHeight: number;
  currentWaterColor: {
    from: string;
    to: string;
  };
  projectedWaterColor: {
    from: string;
    to: string;
  };
}

export default function WaterLevelIndicator({
  minLevel,
  maxLevel,
  currentLevel,
  unit = 'metres',
  className = '',
  scaleMax,
  containerHeight,
  currentWaterColor,
  projectedWaterColor,
}: WaterLevelIndicatorProps) {
  // Calculate heights based on water levels and scale
  const usableHeight = containerHeight - 4; // Account for border
  const currentHeight = Math.max(
    0,
    (currentLevel / scaleMax) * usableHeight,
  );
  const projectedHeight = Math.max(
    0,
    ((maxLevel - currentLevel) / scaleMax) * usableHeight,
  );

  // Generate scale labels dynamically
  const scaleLabels = [];
  const labelCount = 3; // Number of scale labels
  for (let i = 0; i < labelCount; i++) {
    const value = scaleMax - (i * scaleMax) / (labelCount - 1);
    scaleLabels.push(value);
  }

  return (
    <div
      className={cn(
        'flex w-auto items-end gap-4 h-[627px]',
        className,
      )}
    >
      {/* Text Information */}
      <div className="flex w-full flex-col items-end gap-2">
        <div className="text-white text-[40px] font-bold text-nowrap leading-[1.3] text-right drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          Seawater level rise:
        </div>
        <div className="text-[#FF6A6C] text-[40px] font-bold text-nowrap leading-[1.3] text-right drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          {minLevel} to {maxLevel} {unit}
        </div>
      </div>

      {/* Visual Water Level Gauge */}
      <div className="flex flex-row h-full gap-3">
        {/* Scale Labels */}
        <div className="h-full flex flex-col justify-between items-start">
          {scaleLabels.map((value, index) => (
            <span
              key={index}
              className="text-white text-[20px] font-bold leading-[1.3] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            >
              {value}
              {unit.charAt(0)}
            </span>
          ))}
        </div>

        {/* Water Level Container */}
        <div className="relative">
          {/* Main container with border */}
          <div
            className="w-[49px] border-2 border-white rounded-[24px] relative overflow-hidden"
            style={{ height: `${containerHeight}px` }}
          >
            {/* Current water level */}
            {currentHeight > 0 && (
              <div
                className="absolute bottom-0 left-0 right-0 rounded-b-[22px]"
                style={{
                  height: `${currentHeight}px`,
                  background: `linear-gradient(180deg, ${currentWaterColor.from} 0%, ${currentWaterColor.to} 100%)`,
                }}
              />
            )}

            {/* Projected additional water level */}
            {projectedHeight > 0 && (
              <div
                className="absolute left-0 right-0"
                style={{
                  bottom: `${currentHeight}px`,
                  height: `${projectedHeight}px`,
                  background: `linear-gradient(180deg, ${projectedWaterColor.from} 0%, ${projectedWaterColor.to} 100%)`,
                  borderRadius:
                    projectedHeight + currentHeight >=
                    containerHeight - 4
                      ? '22px 22px 0 0'
                      : '0',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

