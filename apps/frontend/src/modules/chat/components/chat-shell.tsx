"use client";

import { useState } from "react";
import { appEnv } from "@/src/core/config/env";
import { useChatRoom } from "@/src/modules/chat/hooks/use-chat-room";
import { Label, PrimaryButton, Surface, TextInput } from "@/src/shared/ui/primitives";

export function ChatShell() {
  const [text, setText] = useState("");
  const roomId = appEnv.defaultRoomId;
  const { status, messages, sendMessage, userId, setUserId } = useChatRoom(roomId);

  const send = () => {
    const next = text.trim();
    if (!next) return;
    sendMessage(next);
    setText("");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-4 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Chat Hooks Demo</h1>
        <p className="text-sm text-zinc-400">
          Infrastructure-grade realtime chat with an app-level API that feels like local state.
        </p>
      </header>

      <Surface>
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
          <div>
            <Label>User ID</Label>
            <TextInput value={userId} onChange={(event) => setUserId(event.target.value)} placeholder="your@email.com" />
          </div>
          <div>
            <Label>Room</Label>
            <TextInput value={roomId} readOnly />
          </div>
          <div className="text-sm text-zinc-400">Status: {status}</div>
        </div>
      </Surface>

      <Surface>
        <div className="mb-3 grid gap-3 md:grid-cols-[1fr_auto]">
          <TextInput value={text} onChange={(event) => setText(event.target.value)} placeholder="Type a message" />
          <PrimaryButton onClick={send} disabled={status !== "connected"}>Send</PrimaryButton>
        </div>

        <ul className="space-y-2">
          {messages.length === 0 ? (
            <li className="text-sm text-zinc-500">No messages yet.</li>
          ) : (
            messages.map((message) => (
              <li key={message.id} className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-sm">
                <span className="font-medium text-zinc-200">{message.userId}</span>
                <span className="text-zinc-500">: </span>
                <span>{message.text}</span>
              </li>
            ))
          )}
        </ul>
      </Surface>
    </main>
  );
}
