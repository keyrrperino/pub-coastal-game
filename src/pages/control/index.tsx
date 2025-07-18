import Head from "next/head";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { GameEnum, GameRoomService, UserPresence, UserSectorEnum } from "@/lib/gameRoom";

const SECTORS = [
  { id: 1, slug: "sector-one", username: UserSectorEnum.USER_SECTOR_ONE, label: "Sector 1" },
  { id: 2, slug: "sector-two", username: UserSectorEnum.USER_SECTOR_TWO, label: "Sector 2" },
  { id: 3, slug: "sector-three", username: UserSectorEnum.USER_SECTOR_THREE, label: "Sector 3" },
];

// Add index signature to type
interface OnlineStatus {
  [key: string]: boolean;
}

export default function SectorSelection() {
  const router = useRouter();
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>({
    [UserSectorEnum.USER_SECTOR_ONE]: false,
    [UserSectorEnum.USER_SECTOR_TWO]: false,
    [UserSectorEnum.USER_SECTOR_THREE]: false,
  });
  const [loading, setLoading] = useState(true);
  // Store GameRoomService instances for each sector
  // Track if listeners are set up
  const listenersSetRef = useRef(false);

  useEffect(() => {
    // Set up presence listeners for each sector
    if (listenersSetRef.current) return;
    listenersSetRef.current = true;

    const service = new GameRoomService(GameEnum.DEFAULT_USERNAME);
    // Join the room for presence tracking (roomId = sector.slug)
    service.joinRoom(GameEnum.DEFAULT_ROOM_NAME).then(() => {
      service.onPresenceChange((users: UserPresence[]) => {
        console.log(users);
        setOnlineStatus((prev) => {
          const updatedStatus = { ...prev };
          SECTORS.forEach((sector) => {
            updatedStatus[sector.username] = users.some(
              (u) => u.id === sector.username && u.isOnline
            );
          });
          return updatedStatus;
        });
      });
    });


    setLoading(false);
    // Cleanup listeners on unmount
    return () => {
      service.disconnect();
    };
  }, [setOnlineStatus]);

  const handleSelect = (sector: number) => {
    let sectorSlug = '';
    switch (sector) {
      case 1:
        sectorSlug = 'sector-one';
        break;
      case 2:
        sectorSlug = 'sector-two';
        break;
      case 3:
        sectorSlug = 'sector-three';
        break;
      default:
        sectorSlug = 'sector-one';
    }
    // When user selects, join as themselves (not as the watcher user)
    // You may want to store the user's real name or a generated one
    // For now, just use the same naming convention
    const userName = `user-${sectorSlug}`;
    const service = new GameRoomService(userName);
    service.joinRoom(sectorSlug).then(() => {
      // Optionally, store service in context or global state
      router.push(`/control/${sectorSlug}`);
    });
  };

  return (
    <>
      <Head>
        <title>Select Sector</title>
        <meta name="description" content="Select a sector to play" />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-blue-200">
        <div className="flex flex-col gap-8 w-full max-w-md items-center">
          <h1 className="text-3xl font-bold mb-8 text-center">Select a Sector</h1>
          {loading ? (
            <div>Loading sector status...</div>
          ) : (
            SECTORS.map(sector => (
              <Button
                key={sector.slug}
                size="lg"
                className={"w-full h-24 text-2xl " + sector.username}
                onClick={() => handleSelect(sector.id)}
                disabled={onlineStatus[sector.username]}
              >
                {sector.label} {onlineStatus[sector.username] ? "(Online)" : ""}
              </Button>
            ))
          )}
        </div>
      </main>
    </>
  );
}
