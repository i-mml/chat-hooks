import type {
  ClientToServerEventMap,
  ServerEventEnvelope,
  ServerToClientEventMap
} from "@chat-hooks/shared";

type ClientEventType = keyof ClientToServerEventMap;
type ServerEventType = keyof ServerToClientEventMap;
type ServerEventHandler<T extends ServerEventType> = (
  payload: ServerToClientEventMap[T],
) => void;

export type ChatClientConfig = {
  url: string;
};

export class ChatClient {
  private ws: WebSocket | null = null;
  private handlers: Partial<
    Record<ServerEventType, Set<(payload: unknown) => void>>
  > = {};

  constructor(private readonly config: ChatClientConfig) {}

  connect(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(this.config.url);
    this.ws.onmessage = (event) => {
      const envelope = JSON.parse(event.data) as ServerEventEnvelope;
      const listeners = this.handlers[envelope.type];
      listeners?.forEach((listener) => listener(envelope.payload));
    };
  }

  disconnect(): void {
    this.ws?.close();
    this.ws = null;
  }

  emit<T extends ClientEventType>(
    type: T,
    payload: ClientToServerEventMap[T],
  ): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    this.ws.send(JSON.stringify({ type, payload }));
  }

  on<T extends ServerEventType>(
    type: T,
    handler: ServerEventHandler<T>,
  ): () => void {
    if (!this.handlers[type]) {
      this.handlers[type] = new Set();
    }
    this.handlers[type]?.add(handler as (payload: unknown) => void);

    return () => {
      this.handlers[type]?.delete(handler as (payload: unknown) => void);
    };
  }
}
