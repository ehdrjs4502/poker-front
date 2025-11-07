"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { RoomLobby } from "@/_components/room";
import { PokerGameBoard } from "@/_components/game";

type RoomState = "WAITING" | "PLAYING" | "FINISHED";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;

  // TODO: WebSocket으로 실제 방 상태를 받아오도록 수정
  const [roomState, setRoomState] = useState<RoomState>("WAITING");

  // 방 상태에 따라 다른 UI 렌더링
  if (roomState === "WAITING") {
    return <RoomLobby roomId={roomId} onGameStart={() => setRoomState("PLAYING")} />;
  }

  if (roomState === "PLAYING") {
    return <PokerGameBoard roomId={roomId} onGameEnd={() => setRoomState("FINISHED")} />;
  }

  if (roomState === "FINISHED") {
    return <RoomLobby roomId={roomId} onGameStart={() => setRoomState("PLAYING")} />;
  }

  return null;
}
