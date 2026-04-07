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
[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![WebSocket](https://img.shields.io/badge/WebSocket-ws%20server-333333)](https://github.com/websockets/ws)
[![Vitest](https://img.shields.io/badge/Vitest-Tests-729B1B?logo=vitest&logoColor=white)](https://vitest.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-Workspaces-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

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
