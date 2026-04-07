# Chat Hooks

> A real-time chat infrastructure that feels like `useState`.

Build scalable real-time applications without dealing with WebSocket complexity directly.

---

## What is this?

Most real-time systems force you to think in terms of:

- WebSocket connections
- Event listeners
- Manual state synchronization
- Reconnection logic
- Backend coordination

**Chat Hooks flips that model.**

Instead of managing infrastructure, you use a simple hook:

```ts
const { messages, sendMessage, status } = useChat(roomId);
```

## Monorepo Overview

This repository is organized as a `pnpm` workspace:

- `apps/frontend`: Next.js demo application
- `apps/backend`: WebSocket real-time server
- `packages/chat-client`: framework-agnostic chat SDK + React adapter
- `packages/shared`: shared contracts, types, and utilities

## Repository Structure

```text
apps/
  frontend/
  backend/

packages/
  chat-client/
  shared/
```

## Architecture Constraints

- Frontend and backend are fully decoupled.
- Shared schemas and contracts are defined only in `packages/shared`.
- SDK core remains framework-agnostic in `packages/chat-client/src/index.ts`.
- Framework bindings are isolated in `packages/chat-client/src/react.ts`.
- Business logic is not duplicated across frontend/backend.

## Stack

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20Realtime-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-Data%20Layer-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/query)
[![Storybook](https://img.shields.io/badge/Storybook-Design%20System-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)

## Getting Started

```bash
pnpm install
pnpm dev
```

Endpoints:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend WebSocket: `ws://localhost:8080`

## Root Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Run frontend and backend together with hot reload |
| `pnpm build` | Build all workspaces |
| `pnpm test` | Run tests across all workspaces |
| `pnpm typecheck` | Type-check all workspaces |
| `pnpm lint` | Run lint script in all workspaces |

## Workspace Commands

```bash
pnpm --filter @chat-hooks/frontend dev
pnpm --filter @chat-hooks/backend dev
pnpm --filter @chat-hooks/chat-client test
pnpm --filter @chat-hooks/shared build
```

## Package Responsibilities

| Package | Responsibility |
| --- | --- |
| `@chat-hooks/frontend` | Demo app and UI integration |
| `@chat-hooks/backend` | Real-time server implementation |
| `@chat-hooks/chat-client` | Reusable SDK for client communication |
| `@chat-hooks/shared` | Event contracts and shared domain types |
