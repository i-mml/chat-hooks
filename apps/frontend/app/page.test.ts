import { describe, expect, it } from "vitest";
import { deriveRoleByEmail } from "../lib/role";

describe("deriveRoleByEmail", () => {
  it("maps email to role", () => {
    expect(deriveRoleByEmail("admin@x.com")).toBe("admin");
    expect(deriveRoleByEmail("manager@x.com")).toBe("manager");
    expect(deriveRoleByEmail("user@x.com")).toBe("user");
  });
});
