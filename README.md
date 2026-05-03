# Collaborative Team Hub (Monorepo)

A full-stack **Collaborative Team Hub** for teams to manage shared workspaces, goals, announcements, action items, and notifications with **real-time updates**.

This repository is a **pnpm + Turborepo monorepo** containing:

- **Frontend**: `apps/web` — Next.js (App Router)
- **Backend**: `apps/api` — Node.js + Express + Prisma (PostgreSQL)
- **Shared package**: `packages/common` — shared types/utilities used by both apps

---

## Quick links

- **Frontend README**: [`apps/web/README.md`](./apps/web/README.md)
- **Backend README**: [`apps/api/README.md`](./apps/api/README.md)

## Features

- **Authentication**
  - Email/password auth
  - JWT access/refresh flow (cookie-based)
- **Workspaces**
  - Create workspaces
  - Invite/manage members and roles
- **Goals & milestones**
  - Goals tracking with nested milestones
- **Announcements**
  - Post announcements with reactions/comments
- **Action items + Kanban**
  - Task tracking with status/priority and board-style workflow
- **Real-time**
  - Socket.io events for live updates (notifications, announcements, etc.)
- **Analytics**
  - Dashboard metrics and charts

---

## Repository structure

```txt
team-hub/
  apps/
    api/              # Express + Prisma backend
    web/              # Next.js frontend
  packages/
    common/           # Shared workspace package
  turbo.json
  pnpm-workspace.yaml
  pnpm-lock.yaml
```

---

## Prerequisites

- Node.js **18+**
- pnpm (**pnpm@9** recommended — see `package.json`)
- PostgreSQL database (local or hosted)

---

## Getting started (local development)

### 1) Install dependencies

From the repo root:

```bash
pnpm install
```

### 2) Configure environment variables

#### Backend (`apps/api`)

Create an environment file for the API (example keys — set real values):

- `DATABASE_URL` (PostgreSQL connection string)
- `PORT` (optional locally; Railway provides it)
- `CLIENT_URL` (frontend URL for CORS)
- `JWT_ACCESS_TOKEN_SECRET`
- `JWT_REFRESH_TOKEN_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `BREVO_API_KEY`
- `BREVO_SENDER_EMAIL`

#### Frontend (`apps/web`)

Set these for the Next.js app:

- `NEXT_PUBLIC_BASE_API_URL` (example: `http://localhost:4000/api/v1`)
- `NEXT_PUBLIC_SOCKET_URL` (example: `http://localhost:4000`)
- `NEXT_PUBLIC_APP_URL` (example: `http://localhost:3000`)

> Tip: the frontend includes a proxy route at `/api/v1/*` that forwards to `NEXT_PUBLIC_BASE_API_URL`.

### 3) Run database setup (API)

From the repo root:

```bash
pnpm db:generate
pnpm db:migrate
```

### 4) Start dev servers

From the repo root:

```bash
pnpm dev
```

---

## Production build

From the repo root:

```bash
pnpm build
```

---

## Deployment (Railway)

Railway deployment is intended to run as **two separate services** in the same Railway project:

- **`api` service** deployed from this repo
- **`web` service** deployed from this repo
- Add a **PostgreSQL plugin** in Railway to provide `DATABASE_URL`

Make sure the frontend variables point to the **API** domain (not the web domain):

- `NEXT_PUBLIC_BASE_API_URL=https://<api-domain>/api/v1`
- `NEXT_PUBLIC_SOCKET_URL=https://<api-domain>`

And ensure the API CORS `origin` includes your deployed web domain (or uses `CLIENT_URL`).

---

## Documentation links

- **Frontend app docs**: [`apps/web/README.md`](./apps/web/README.md)
- **Backend API docs**: [`apps/api/README.md`](./apps/api/README.md)
- **Frontend requirements**: [`requirements-web.md`](./requirements-web.md)
- **Backend requirements**: [`requirements-api.md`](./requirements-api.md)
- **Overall assessment/spec**: [`projects-requirements.md`](./projects-requirements.md)
