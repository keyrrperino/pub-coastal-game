import Head from "next/head";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { GameRoomService } from "@/lib/gameRoom";
import { GameEnum, UserSectorEnum } from "@/lib/enums";
import { UserPresenceType } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";

const SECTORS = [
  { id: 1, slug: "sector-1", username: UserSectorEnum.USER_SECTOR_ONE, label: "Sector 1" },
  { id: 2, slug: "sector-2", username: UserSectorEnum.USER_SECTOR_TWO, label: "Sector 2" },
  { id: 3, slug: "sector-3", username: UserSectorEnum.USER_SECTOR_THREE, label: "Sector 3" },
];

// Add index signature to type
interface OnlineStatus {
  [key: string]: boolean;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Define some static paths if needed, or leave empty

  return {
    paths: [],
    fallback: "blocking", // generate on-demand for any room
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { room } = params as { room: string };

  // Use the room parameter directly
  return {
    props: {
      roomName: room,
    },
  };
};

export default function SectorSelection({ roomName }: {roomName: string}) {
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
    service.joinRoom(roomName).then(() => {
      service.onPresenceChange((users: UserPresenceType[]) => {
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
        sectorSlug = 'sector-1';
        break;
      case 2:
        sectorSlug = 'sector-2';
        break;
      case 3:
        sectorSlug = 'sector-3';
        break;
      default:
        sectorSlug = 'sector-1';
    }
    // When user selects, join as themselves (not as the watcher user)
    // You may want to store the user's real name or a generated one
    // For now, just use the same naming convention
    const userName = `user-${sectorSlug}`;
    const service = new GameRoomService(userName);
    service.joinRoom(roomName).then(() => {
      // Optionally, store service in context or global state
      router.push(`/room/${roomName}/control/${sectorSlug}`);
    });
  };

  return (
    <>
      <Head>
        <title>Select Player</title>
        <meta name="description" content="Select a sector to play" />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b b">
        <div className="flex flex-col gap-8 w-full max-w-md items-center">
          <h1 className="text-3xl font-bold mb-8 text-center">Select Player</h1>
          {loading ? (
            <div>Loading player status...</div>
          ) : (
            SECTORS.map(sector => (
              <Button
                key={sector.slug}
                size="lg"
                className={"w-full h-24 text-2xl " + sector.username}
                onClick={() => handleSelect(sector.id)}
                disabled={onlineStatus[sector.username]}
              >
                {sector.label.replace('Sector', 'Player') } {onlineStatus[sector.username] ? "(Online)" : ""}
              </Button>
            ))
          )}
        </div>
      </main>
    </>
  );
}
