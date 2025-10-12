import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./keys";
import {
  createRoom,
  CreateRoomRequest,
  getRoomList,
  updateRoom,
  UpdateRoomRequest,
} from "@/_api/rooms";

export const useGetRoomList = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ROOM.LIST(),
    queryFn: getRoomList,
  });
};

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: ({ request }: { request: CreateRoomRequest }) =>
      createRoom(request),
  });
};

export const useUpdateRoom = () => {
  return useMutation({
    mutationFn: ({
      roomId,
      request,
    }: {
      roomId: string;
      request: UpdateRoomRequest;
    }) => updateRoom(roomId, request),
  });
};
