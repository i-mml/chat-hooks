# Chat Hooks

A modern monorepo for real-time chat infrastructure, built for scale and clean architecture.

## Highlights

- **Monorepo-first** with `pnpm` workspaces
- **Decoupled apps** (`frontend` + `backend`)
- **Shared contracts** in one place (`packages/shared`)
- **Framework-agnostic SDK core** with optional React hooks adapter
- **Single command DX** for local development

## Workspace Structure

```text
apps/
  frontend/      # Next.js demo app
  backend/       # WebSocket real-time server

packages/
  chat-client/   # Core chat SDK + React adapter
  shared/        # Shared types, contracts, and utilities
```

## Architecture Rules

- Frontend and backend are fully decoupled.
- Event/message schemas live only in `packages/shared`.
- SDK core logic stays framework-agnostic in `packages/chat-client/src/index.ts`.
- UI-specific hooks live separately in `packages/chat-client/src/react.ts`.
- No duplicated business logic between apps.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend WebSocket: `ws://localhost:8080`

## Scripts

### Root Scripts

- `pnpm dev` — run frontend + backend with hot reload
- `pnpm build` — build all workspaces
- `pnpm test` — run tests in all workspaces
- `pnpm typecheck` — type-check all workspaces
- `pnpm lint` — lint all workspaces

### Run a Single Workspace

```bash
pnpm --filter @chat-hooks/frontend dev
pnpm --filter @chat-hooks/backend dev
pnpm --filter @chat-hooks/chat-client test
pnpm --filter @chat-hooks/shared build
```

## Package Overview

- `@chat-hooks/frontend`: Next.js app consuming the SDK
- `@chat-hooks/backend`: WebSocket server implementing shared contracts
- `@chat-hooks/chat-client`: reusable client SDK
- `@chat-hooks/shared`: shared types and protocol envelopes

## Tech Stack

- TypeScript
- Next.js
- WebSocket (`ws`)
- React
- Vitest
- pnpm workspaces
