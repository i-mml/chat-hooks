export const appEnv = {
  wsUrl: process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8080",
  defaultRoomId: process.env.NEXT_PUBLIC_DEFAULT_ROOM_ID ?? "general",
};
