# Collaborative Team Hub — Frontend (Next.js)

This is the **frontend** application for the Collaborative Team Hub monorepo.

- **App**: Next.js (App Router) + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Real-time**: socket.io-client

For the full monorepo overview, see the root README:

- [`../../README.md`](../../README.md)

Backend docs:

- [`../api/README.md`](../api/README.md)

---

## Features

- Authentication flows (cookie-based JWT via the backend)
- Workspace dashboard UI
- Goals, announcements, action items, notifications
- Real-time updates via Socket.io
- API proxy route under `/api/v1/*` for browser-safe cookie forwarding

---

## Project structure (frontend)

```txt
apps/web/
  src/
    app/                 # Next.js App Router routes
    actions/             # Server actions
    components/          # UI + feature components
    hooks/               # Custom hooks
    lib/                 # fetch + socket + helpers
    services/            # API communication layer
    types/               # Types and schemas
```

---

## Environment variables

Create an env file for the frontend (Railway variables or a local `.env.local`).

Required:

```env
# Points to the backend API base (including /api/v1)
NEXT_PUBLIC_BASE_API_URL=http://localhost:4000/api/v1

# Points to the backend host (no /api/v1)
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000

# Used for server-side absolute URL building
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Notes:

- Requests from the browser typically hit `http(s)://<web>/api/v1/...`.
- `src/app/api/v1/[...path]/route.ts` proxies those calls to `NEXT_PUBLIC_BASE_API_URL`.

---

## Running locally

From the monorepo root:

```bash
pnpm install
pnpm dev
```

Or run only the frontend:

```bash
pnpm --filter @team-hub/web dev
```

---

## Build & start

From the monorepo root:

```bash
pnpm --filter @team-hub/web build
pnpm --filter @team-hub/web start
```

---

## Deployment (Railway)

Deploy the frontend as a **separate Railway service** from the backend.

- **Build command**

```bash
pnpm install --frozen-lockfile && pnpm --filter @team-hub/web build
```

- **Start command**

```bash
pnpm --filter @team-hub/web start
```

Make sure these point to your API service domain (not the web domain):

- `NEXT_PUBLIC_BASE_API_URL=https://<api-domain>/api/v1`
- `NEXT_PUBLIC_SOCKET_URL=https://<api-domain>`
