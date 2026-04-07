# Chat Hooks Monorepo

Production-oriented monorepo for real-time chat infrastructure with strict architectural boundaries and reusable packages.

## Overview

This repository is organized as a `pnpm` workspace with:

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

## Technology Versions

| Technology | Version |
| --- | --- |
| Node.js | 18+ recommended |
| pnpm | `9.12.0` (workspace package manager) |
| TypeScript | `^5.6.3` |
| Next.js | `15.0.0` |
| React | `18.3.1` |
| WebSocket server (`ws`) | `^8.18.0` |
| React Query | `^5.59.20` |
| Supabase JS | `^2.47.10` |
| Zustand | `^5.0.1` |
| Vitest | `^2.1.4` |
| TSX | `^4.19.1` |
| Tailwind CSS | `^3.4.14` |

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
