import Image from 'next/image';

export default function Logo({
  width = 171,
  height = 106,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src="/assets/PUB_RidingTheTides_White.png"
      alt="PUB Riding the Tides Logo"
      width={width}
      height={height}
      className="object-contain"
    />
  );
}

