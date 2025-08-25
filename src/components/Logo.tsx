import { cn } from '@/lib/utils';

export default function Logo({
  width = 171,
  height = 106,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <img
      src="/assets/PUB_RidingTheTides_White.png"
      alt="PUB Riding the Tides Logo"
      className={cn(
        'w-[171px] h-[106px] 4k:!w-[342px] 4k:!h-[212px]',
        'object-contain',
      )}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
}

