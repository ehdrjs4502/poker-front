import apiClient from "./api-client";

export type RoomListResponse = {
  roomId: string;
  roomName: string;
  maxUserCount: number;
  isPrivate: boolean;
  bbAmount: number;
  sbAmount: number;
  currentPlayerCount: number;
};

export type CreateRoomRequest = {
  title: string;
  password: string;
  maxPlayerCount: number;
  bbAmount: number;
  sbAmount: number;
};

export type UpdateRoomRequest = CreateRoomRequest;

export const getRoomList = async () => {
  const response = await apiClient.get("/rooms/list");
  return response.data.rooms as RoomListResponse[];
};

export const createRoom = async (request: CreateRoomRequest) => {
  const response = await apiClient.post("/rooms", request);
  return response.data;
};

export const updateRoom = async (
  roomId: string,
  request: UpdateRoomRequest
) => {
  const response = await apiClient.patch(`/rooms/${roomId}`, request);
  return response.data;
};
