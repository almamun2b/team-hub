# Collaborative Team Hub — Final Backend Requirements

This document outlines the full functional and technical requirements for the Team Hub backend, synthesized from the initial brief and the detailed API endpoint reference.

## 🏗️ Core Architecture
- **Monorepo:** Turborepo orchestration.
- **Framework:** Node.js + Express.js.
- **ORM:** Prisma with PostgreSQL.
- **Authentication:** JWT with Access + Refresh tokens (Stored in httpOnly cookies).
- **Real-time:** Socket.io for live updates and presence.
- **File Storage:** Cloudinary for avatars and attachments.

---

## 🔑 1. Authentication & User Management
- **Registration:** Email/password sign-up.
- **Login:** Returns JWT access token and sets `refreshToken` in an httpOnly cookie.
- **Refresh:** Endpoint to issue new access tokens using the refresh cookie.
- **Logout:** Clears the refresh cookie and invalidates the session.
- **Profile:**
    - Get current user profile (`/api/auth/me`).
    - Update name/avatar URL.
    - Upload avatar directly to Cloudinary.

---

## 🏢 2. Workspace Management
- **CRUD Workspaces:**
    - Create workspace (Creator becomes `ADMIN`).
    - List user's workspaces.
    - Update workspace metadata (Name, Description, Accent Color).
    - Delete workspace (Cascading delete of all related data).
- **Member Management:**
    - Invite members by email.
    - Role assignment: `ADMIN` vs `MEMBER`.
    - Change roles or remove members.
    - List members with real-time online status.

---

## 🎯 3. Goals & Milestones
- **Goals:**
    - Create/Update/Delete goals.
    - Attributes: Title, Description, Owner, Due Date, Status (`NOT_STARTED`, `IN_PROGRESS`, `DONE`).
    - Activity feed for each goal showing progress updates.
- **Milestones:**
    - Nested under goals.
    - Track progress percentage (0-100%).
    - Update milestone title/progress.

---

## 📢 4. Announcements & Engagement
- **Announcements:**
    - Admin-only publishing.
    - Rich-text content support.
    - Pinning functionality (Pinned items appear at the top).
- **Interactions:**
    - Emoji reactions (Toggleable).
    - Threaded comments.
    - **@Mentions:** Parsing mentions in comments to trigger notifications.

---

## ✅ 5. Action Items (Kanban)
- **Task Tracking:**
    - Create action items linked to a parent Goal (optional).
    - Attributes: Title, Assignee, Priority (`LOW`, `MEDIUM`, `HIGH`), Status (`TODO`, `IN_PROGRESS`, `DONE`), Due Date.
- **Views:**
    - Support for Kanban board (grouped by status) and List views via API filters.

---

## 🔔 6. Notifications
- **Types:** `MENTION`, `INVITE`, `GOAL_UPDATE`, `ACTION_ASSIGNED`.
- **Functionality:**
    - Fetch user notifications.
    - Mark single or all as read.
    - Real-time push via Socket.io.

---

## 📊 7. Analytics & Export
- **Dashboard Stats:**
    - Total goals.
    - Items completed this week.
    - Overdue count.
- **Visualization:**
    - Data endpoint for Recharts (Goal completion over time).
- **Data Portability:**
    - Export full workspace data as **CSV**.

---

## ⚡ 8. Real-time & Socket.io Events
- **Rooms:** Users join `workspace:{id}` rooms on connection.
- **Server-to-Client Events:**
    - `goal:created` / `goal:updated`.
    - `announcement:new`.
    - `reaction:toggled`.
    - `comment:new`.
    - `action:statusChanged`.
    - `notification:new`.
    - `presence:join` / `presence:leave`.

---

## 🛡️ 9. Advanced Features (Mandatory)
1. **Advanced RBAC:** Permission matrix enforced via middleware (`checkWorkspaceRole`).
2. **Audit Log:**
    - Automated logging of every workspace change.
    - Immutable storage of "Who did what and when".
    - Filterable via API for Admin view.

---

---

## 📋 API Endpoint Summary (38 REST Endpoints)
Refer to the [Full API Reference](./projects-full-API-endpoint-reference.md) for the exact mapping of all 38 endpoints, including request/response examples.
