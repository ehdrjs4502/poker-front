"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RoomLobby } from "@/_components/room";
import { PokerGameBoard } from "@/_components/game";
import { useWebSocket } from "@/_hooks/useWebSocket";
import { API_CONFIG } from "@/_lib/constants/config";

type RoomState = "WAITING" | "PLAYING" | "FINISHED";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;
  const [roomState, setRoomState] = useState<RoomState>("WAITING");

  // WebSocket 연결
  const { isConnected, subscribe, publish } = useWebSocket({
    url: API_CONFIG.WS_URL,
    onConnect: () => {
      console.log("Lobby WebSocket connected");
      // 로비 입장 메시지 전송
      publish("/app/lobby/message", {
        type: "JOIN_ROOM",
        roomId,
        message: "방에 입장했습니다",
      });
    },
    onDisconnect: () => {
      console.log("Lobby WebSocket disconnected");
    },
    onError: (error) => {
      console.error("WebSocket error:", error);
    },
  });

  useEffect(() => {
    if (!isConnected) return;

    // 로비 메시지 구독
    const unsubscribe = subscribe("/topic/lobby", (message) => {
      const data = JSON.parse(message.body);
      console.log("Received lobby message:", data);

      // 메시지 타입에 따라 처리
      if (data.roomId === roomId) {
        if (data.type === "GAME_START") {
          setRoomState("PLAYING");
        } else if (data.type === "GAME_END") {
          setRoomState("FINISHED");
        }
      }
    });

    return unsubscribe;
  }, [isConnected, roomId, subscribe]);

  // 방 상태에 따라 다른 UI 렌더링
  if (roomState === "WAITING") {
    return (
      <RoomLobby
        roomId={roomId}
        onGameStart={() => setRoomState("PLAYING")}
      />
    );
  }

  if (roomState === "PLAYING") {
    return (
      <PokerGameBoard
        roomId={roomId}
        onGameEnd={() => setRoomState("FINISHED")}
      />
    );
  }

  if (roomState === "FINISHED") {
    return (
      <RoomLobby
        roomId={roomId}
        onGameStart={() => setRoomState("PLAYING")}
      />
    );
  }

  return null;
}
