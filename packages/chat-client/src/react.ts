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
