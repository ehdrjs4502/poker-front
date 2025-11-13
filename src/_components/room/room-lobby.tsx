"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { PATH } from "@/_lib/constants/path";
import { Alert, AlertDescription } from "../ui/alert";

interface Player {
  id: string;
  name: string;
  chips: number;
  isReady: boolean;
}

interface RoomLobbyProps {
  roomId: string;
  onGameStart: () => void;
}

export default function RoomLobby({ roomId, onGameStart }: RoomLobbyProps) {
  const router = useRouter();

  // TODO: WebSocket으로 실제 데이터를 받아오도록 수정
  const [roomInfo] = useState({
    roomName: "포커룸 #1",
    maxPlayers: 6,
    bigBlind: 1000,
    smallBlind: 500,
  });

  const [players] = useState<Player[]>([
    { id: "1", name: "John Doe", chips: 10000, isReady: true },
    { id: "2", name: "Jane Smith", chips: 10000, isReady: false },
  ]);

  const [isReady, setIsReady] = useState(false);

  const handleLeaveRoom = () => {
    router.push(PATH.MAIN);
  };

  const handleToggleReady = () => {
    setIsReady(!isReady);
    // TODO: WebSocket으로 준비 상태 전송
  };

  const handleStartGame = () => {
    // TODO: WebSocket으로 게임 시작 요청
    onGameStart();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-2">{roomInfo.roomName}</h1>
            <div className="flex gap-4 text-sm text-neutral-400">
              <span>Big Blind: {roomInfo.bigBlind}</span>
              <span>Small Blind: {roomInfo.smallBlind}</span>
            </div>
          </div>
          <Button variant="outline" onClick={handleLeaveRoom} className="text-neutral-50">
            방 나가기
          </Button>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {players.map((player) => (
            <div key={player.id} className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-neutral-50">{player.name}</h3>
                {player.isReady ? (
                  <Badge className="bg-green-600">준비 완료</Badge>
                ) : (
                  <Badge variant="secondary">대기 중</Badge>
                )}
              </div>
              <p className="text-sm text-neutral-400">칩: {player.chips.toLocaleString()}</p>
            </div>
          ))}

          {/* Empty Slots */}
          {Array.from({ length: roomInfo.maxPlayers - players.length }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="bg-neutral-800 border border-dashed border-neutral-700 rounded-lg p-6 flex items-center justify-center"
            >
              <p className="text-neutral-500">빈 자리</p>
            </div>
          ))}
        </div>

        {/* Control Panel */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="text-neutral-50">
              <p className="text-lg font-semibold mb-1">
                플레이어: {players.length} / {roomInfo.maxPlayers}
              </p>
              <p className="text-sm text-neutral-400">
                준비 완료: {players.filter((p) => p.isReady).length} / {players.length}
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleToggleReady}>
                {isReady ? "준비 취소" : "준비 완료"}
              </Button>
              <Button
                variant="outline"
                onClick={handleStartGame}
                disabled={players.filter((p) => p.isReady).length < 2}
              >
                게임 시작
              </Button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6">
          <Alert>
            <AlertDescription>💡 모든 플레이어가 준비 완료 상태여야 게임을 시작할 수 있습니다.</AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
