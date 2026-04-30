# Collaborative Team Hub API Documentation

Production-grade REST API for managing shared goals, announcements, and action items in real time. Built with Node.js, Express, Prisma, and Socket.io.

---

## 🔐 Authentication

### Register User
`POST /api/v1/auth/register`
- **Payload:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "User registered successfully!",
    "data": {
      "id": "uuid-string",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "MEMBER"
    }
  }
  ```

### Login
`POST /api/v1/auth/login`
- **Payload:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200):** Sets `refreshToken` in httpOnly cookie.
  ```json
  {
    "success": true,
    "message": "User logged in successfully!",
    "data": {
      "accessToken": "jwt-token-string",
      "user": { "id": "...", "fullName": "...", "role": "..." }
    }
  }
  ```

---

## 🏢 Workspaces

### Create Workspace
`POST /api/v1/workspaces/create`
- **Headers:** `Authorization: Bearer <token>`
- **Payload:**
  ```json
  {
    "name": "Design Team",
    "description": "Creative workspace for design team",
    "accentColor": "#FF5733"
  }
  ```

### Invite Member
`POST /api/v1/workspaces/:workspaceId/invite`
- **Params:** `workspaceId` (UUID)
- **Payload:**
  ```json
  {
    "email": "jane@example.com",
    "role": "MEMBER"
  }
  ```

### Export Workspace Data (CSV)
`GET /api/v1/workspaces/:workspaceId/export`
- **Response:** Returns a downloadable `.csv` file containing goals and statuses.

---

## 🎯 Goals & Milestones

### Create Goal
`POST /api/v1/goals/create`
- **Payload:**
  ```json
  {
    "workspaceId": "ws-uuid",
    "title": "Launch Q3 Campaign",
    "description": "Reach 10k users",
    "dueDate": "2024-09-30T00:00:00Z",
    "status": "IN_PROGRESS"
  }
  ```

### Add Milestone
`POST /api/v1/goals/:goalId/milestones`
- **Payload:**
  ```json
  {
    "title": "Finalize Ad Copies",
    "progress": 0
  }
  ```

---

## 📢 Announcements

### Create Announcement
`POST /api/v1/announcements/create`
- **Payload:**
  ```json
  {
    "workspaceId": "ws-uuid",
    "title": "Weekly Sync Time Change",
    "content": "Sync is now at 10 AM on Mondays.",
    "isPinned": false
  }
  ```

### Add Reaction
`POST /api/v1/announcements/:announcementId/reactions`
- **Payload:**
  ```json
  {
    "emoji": "🚀"
  }
  ```

---

## ✅ Action Items (Kanban)

### Create Action Item
`POST /api/v1/action-items/create`
- **Payload:**
  ```json
  {
    "workspaceId": "ws-uuid",
    "goalId": "goal-uuid",
    "assigneeId": "user-uuid",
    "title": "Design Banner Assets",
    "priority": "HIGH",
    "status": "TODO",
    "dueDate": "2024-08-15T00:00:00Z"
  }
  ```

---

## ⚡ Real-time (Socket.io)

### Room: `workspace_{id}`
Users should join a room corresponding to their active workspace.

| Event | Direction | Description |
| :--- | :--- | :--- |
| `join_workspace` | Client -> Server | Joins the specific workspace room. |
| `new_post` | Server -> Client | Notifies when a new goal/announcement is made. |
| `status_changed` | Server -> Client | Notifies when an item status is updated. |

---

## 🛠️ Advanced Features Implemented
1. **Advanced RBAC:** Hierarchical role checking for both global roles (Super Admin) and Workspace-specific roles (Admin/Member).
2. **Audit Logs:** Automated tracking of sensitive actions (Invitations, Goal deletions, Settings changes).

---

## 🚀 Setup & Run
1. Install dependencies: `pnpm install`
2. Sync Database: `pnpm db:push`
3. Run Development: `pnpm dev`
