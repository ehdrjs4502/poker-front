"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { PATH } from "@/_lib/constants/path";

interface Props {
  roomId: string;
  roomName: string;
  playerCount: number;
  maxPlayerCount: number;
  bigBlind: number;
}

export default function RoomCard({ roomId, roomName, playerCount, maxPlayerCount, bigBlind }: Props) {
  const router = useRouter();

  const handleJoinRoom = () => {
    router.push(PATH.ROOM(roomId));
  };

  return (
    <div className="flex flex-col gap-2 border border-neutral-600 rounded-lg p-4">
      <div>
        <h3 className="text-lg font-bold text-white">{roomName}</h3>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 text-white">
          {playerCount} / {maxPlayerCount} Players
        </span>
        <span className="text-sm text-gray-500 text-white">{bigBlind} Big Blind</span>
      </div>
      <Button className="w-full" onClick={handleJoinRoom}>
        Join Game
      </Button>
    </div>
  );
}
