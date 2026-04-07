import { describe, expect, it } from "vitest";
import { ChatClient } from "./index";

describe("ChatClient", () => {
  it("constructs with config", () => {
    const client = new ChatClient({ url: "ws://localhost:8080" });
    expect(client).toBeDefined();
  });
});
