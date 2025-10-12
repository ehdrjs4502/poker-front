import RoomCard from "@/_components/room-card";
import { Button } from "@/_components/ui/button";
import UserProfile from "@/_components/user-profile";

export default function Home() {
  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between px-10 py-5 border border-neutral-600 rounded-lg">
        <UserProfile userName="John Doe" />
        <Button>History</Button>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <div className="flex items-center justify-end gap-4">
          <Button>Refresh</Button>
          <Button>Create Room</Button>
        </div>
        <div className="flex flex-col gap-4">
          <RoomCard
            roomName="Room 1"
            playerCount={1}
            maxPlayerCount={4}
            credit={100}
          />
          <RoomCard
            roomName="Room 2"
            playerCount={2}
            maxPlayerCount={4}
            credit={100}
          />
        </div>
      </div>
    </div>
  );
}
