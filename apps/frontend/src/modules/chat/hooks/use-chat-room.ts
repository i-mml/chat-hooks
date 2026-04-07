"use client";

import { useMemo, useState } from "react";
import { useChat } from "@chat-hooks/chat-client/react";
import { appEnv } from "@/src/core/config/env";

export function useChatRoom(roomId: string) {
  const [userId, setUserId] = useState("admin@example.com");
  const chat = useChat(roomId, {
    url: appEnv.wsUrl,
    userId,
  });

  const sortedMessages = useMemo(
    () => [...chat.messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [chat.messages],
  );

  return {
    ...chat,
    userId,
    setUserId,
    messages: sortedMessages,
  };
}
