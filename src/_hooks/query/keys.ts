export const QUERY_KEYS = {
  MY_INFO: ["myInfo"],

  ROOM: {
    INDEX: ["room"],
    LIST: () => [...QUERY_KEYS.ROOM.INDEX, "list"],
    DETAIL: (roomId: string) => [...QUERY_KEYS.ROOM.INDEX, "detail", roomId],
  },
};
