import { useEffect, useMemo, useState } from "react";
import type { ChatMessage } from "@chat-hooks/shared";
import { ChatClient } from "./index";

export function useChatClient(url: string): ChatClient {
  const client = useMemo(() => new ChatClient({ url }), [url]);

  useEffect(() => {
    client.connect();
    return () => client.disconnect();
  }, [client]);

  return client;
}

export function useRoomMessages(client: ChatClient, roomId: string): ChatMessage[] {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const unsubHistory = client.on("chat:history", ({ roomId: incomingRoom, messages }) => {
      if (incomingRoom !== roomId) return;
      setMessages(messages);
    });

    const unsubNew = client.on("chat:new", ({ message }) => {
      if (message.roomId !== roomId) return;
      setMessages((current) => [...current, message]);
    });

    return () => {
      unsubHistory();
      unsubNew();
    };
  }, [client, roomId]);

  return messages;
}

type ChatStatus = "connecting" | "connected" | "disconnected";

type UseChatConfig = {
  url: string;
  userId: string;
};

export function useChat(roomId: string, config: UseChatConfig) {
  const client = useChatClient(config.url);
  const messages = useRoomMessages(client, roomId);
  const [status, setStatus] = useState<ChatStatus>("connecting");

  useEffect(() => {
    // Keep trying to join until the socket becomes ready.
    setStatus("connecting");
    const interval = window.setInterval(() => {
      try {
        client.emit("chat:join", { roomId, userId: config.userId });
        setStatus("connected");
        window.clearInterval(interval);
      } catch {
        setStatus("connecting");
      }
    }, 300);

    return () => window.clearInterval(interval);
  }, [client, roomId, config.userId]);

  useEffect(() => {
    const handleOffline = () => setStatus("disconnected");
    const handleOnline = () => setStatus("connected");
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return {
    messages,
    status,
    sendMessage: (text: string) =>
      client.emit("chat:send", {
        roomId,
        userId: config.userId,
        text,
      }),
  };
}
