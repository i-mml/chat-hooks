import { describe, expect, it } from "vitest";
import { createEventEnvelope } from "./index";

describe("createEventEnvelope", () => {
  it("creates a typed envelope", () => {
    const envelope = createEventEnvelope("chat:new", { ok: true });
    expect(envelope).toEqual({ type: "chat:new", payload: { ok: true } });
  });
});
