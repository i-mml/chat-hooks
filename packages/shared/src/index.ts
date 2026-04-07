export type ChatRole = "admin" | "manager" | "user";

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface ClientToServerEventMap {
  "chat:join": { roomId: string; userId: string };
  "chat:send": { roomId: string; userId: string; text: string };
}

export interface ServerToClientEventMap {
  "chat:history": { roomId: string; messages: ChatMessage[] };
  "chat:new": { message: ChatMessage };
  "chat:error": { code: string; message: string };
}

export type EventEnvelope<TType extends string, TPayload> = {
  type: TType;
  payload: TPayload;
};

export type ClientEventEnvelope = {
  [K in keyof ClientToServerEventMap]: EventEnvelope<K, ClientToServerEventMap[K]>;
}[keyof ClientToServerEventMap];

export type ServerEventEnvelope = {
  [K in keyof ServerToClientEventMap]: EventEnvelope<K, ServerToClientEventMap[K]>;
}[keyof ServerToClientEventMap];

export function createEventEnvelope<TType extends string, TPayload>(
  type: TType,
  payload: TPayload,
): EventEnvelope<TType, TPayload> {
  return { type, payload };
}
