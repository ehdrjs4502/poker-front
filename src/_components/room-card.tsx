import { Button } from "./ui/button";

interface Props {
  roomName: string;
  playerCount: number;
  maxPlayerCount: number;
  credit: number;
}

export default function RoomCard({
  roomName,
  playerCount,
  maxPlayerCount,
  credit,
}: Props) {
  return (
    <div className="flex flex-col gap-2 border border-neutral-600 rounded-lg p-4">
      <div>
        <h3 className="text-lg font-bold text-white">{roomName}</h3>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 text-white">
          {playerCount} / {maxPlayerCount} Players
        </span>
        <span className="text-sm text-gray-500 text-white">
          {credit} Credits
        </span>
      </div>
      <Button className="w-full">Join Game</Button>
    </div>
  );
}
