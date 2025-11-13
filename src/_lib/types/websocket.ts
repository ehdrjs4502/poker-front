// WebSocket 메시지 타입 정의

// 로비 메시지 타입
export type LobbyMessageType =
  | "JOIN_LOBBY"
  | "LEAVE_LOBBY"
  | "JOIN_ROOM"
  | "LEAVE_ROOM"
  | "ROOM_CREATED"
  | "ROOM_UPDATED"
  | "ROOM_DELETED"
  | "GAME_START"
  | "GAME_END";

// 로비 메시지 구조
export interface LobbyMessage {
  type: LobbyMessageType;
  roomId?: string;
  userId?: string;
  message?: string;
  data?: any;
  timestamp?: string;
}

// WebSocket 경로
export const WS_PATHS = {
  // 구독 경로
  SUBSCRIBE: {
    LOBBY: "/topic/lobby",
  },
  // 발행 경로
  PUBLISH: {
    LOBBY_MESSAGE: "/app/lobby/message",
  },
} as const;

