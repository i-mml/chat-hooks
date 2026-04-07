"use client";

import { useState } from "react";
import { useChatClient, useRoomMessages } from "@chat-hooks/chat-client/react";

const ROOM = "general";

export default function HomePage() {
  const [email, setEmail] = useState("admin@example.com");
  const [text, setText] = useState("");
  const client = useChatClient(process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8080");
  const messages = useRoomMessages(client, ROOM);

  const join = () => {
    client.emit("chat:join", { roomId: ROOM, userId: email });
  };

  const send = () => {
    if (!text.trim()) return;
    client.emit("chat:send", { roomId: ROOM, userId: email, text });
    setText("");
  };

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: 24 }}>
      <h1>Frontend Infrastructure Toolkit - Chat Demo</h1>
      <p>Room: {ROOM}</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          style={{ padding: 8, flex: 1 }}
        />
        <button onClick={join}>Join</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message"
          style={{ padding: 8, flex: 1 }}
        />
        <button onClick={send}>Send</button>
      </div>

      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.userId}</strong>: {message.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
