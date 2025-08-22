import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/assets/PUB_RidingTheTides_White.png"
      alt="PUB Riding the Tides Logo"
      width={171}
      height={106}
      className="object-contain"
    />
  );
}

