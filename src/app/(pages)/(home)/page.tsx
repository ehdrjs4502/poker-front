"use client";

import { CreateRoomDialog, RoomCard } from "@/_components/room";
import { Button } from "@/_components/ui/button";
import { UserProfile } from "@/_components/common";
import { useGetRoomList } from "@/_hooks/query/rooms";

export default function Home() {
  const { data: roomList, refetch } = useGetRoomList();
  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between px-10 py-5 border border-neutral-600 rounded-lg">
        <UserProfile userName="John Doe" />
        <Button>History</Button>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <div className="flex items-center justify-end gap-4">
          <Button onClick={() => refetch()}>Refresh</Button>
          <CreateRoomDialog />
        </div>
        <div className="flex flex-col gap-4">
          {roomList && roomList.length > 0 ? (
            roomList.map((room) => (
              <RoomCard
                key={room.roomId}
                roomId={room.roomId}
                roomName={room.roomName}
                playerCount={room.currentPlayerCount}
                maxPlayerCount={room.maxUserCount}
                bigBlind={room.bbAmount}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-20 text-neutral-400">
              <p className="text-lg">현재 생성된 방이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
