import { WebSocketServer } from "ws";
import type {
  ChatMessage,
  ClientEventEnvelope,
  EventEnvelope,
  ServerToClientEventMap,
} from "@chat-hooks/shared";

const port = Number(process.env.PORT ?? 8080);
const wss = new WebSocketServer({ port });

const roomMessages = new Map<string, ChatMessage[]>();

function sendEvent<T extends keyof ServerToClientEventMap>(
  ws: { send: (payload: string) => void },
  type: T,
  payload: ServerToClientEventMap[T],
): void {
  const message: EventEnvelope<T, ServerToClientEventMap[T]> = { type, payload };
  ws.send(JSON.stringify(message));
}

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const parsed = JSON.parse(data.toString()) as ClientEventEnvelope;

    if (parsed.type === "chat:join") {
      const history = roomMessages.get(parsed.payload.roomId) ?? [];
      sendEvent(ws, "chat:history", {
        roomId: parsed.payload.roomId,
        messages: history,
      });
      return;
    }

    if (parsed.type === "chat:send") {
      const nextMessage: ChatMessage = {
        id: crypto.randomUUID(),
        roomId: parsed.payload.roomId,
        userId: parsed.payload.userId,
        text: parsed.payload.text,
        createdAt: new Date().toISOString(),
      };

      const existing = roomMessages.get(nextMessage.roomId) ?? [];
      roomMessages.set(nextMessage.roomId, [...existing, nextMessage]);

      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          sendEvent(client, "chat:new", { message: nextMessage });
        }
      });
    }
  });
});

console.log(`WebSocket server running on ws://localhost:${port}`);
