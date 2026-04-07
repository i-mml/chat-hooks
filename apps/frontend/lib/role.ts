import type { ChatRole } from "@chat-hooks/shared";

export function deriveRoleByEmail(email: string): ChatRole {
  const lower = email.toLowerCase();
  if (lower.includes("admin")) return "admin";
  if (lower.includes("manager")) return "manager";
  return "user";
}
