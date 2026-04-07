import { describe, expect, it } from "vitest";

describe("backend", () => {
  it("has runtime env", () => {
    expect(process.env).toBeDefined();
  });
});
