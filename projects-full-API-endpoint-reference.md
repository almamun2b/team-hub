# Team Hub — API Endpoints Reference

> Base URL (local): `http://localhost:4000`  
> Base URL (production): `https://your-api.up.railway.app`  
> All protected routes require `Authorization: Bearer <accessToken>` header.  
> Admin routes additionally require the user to have `ADMIN` role in the workspace.

---

## Legend

| Badge | Meaning |
|-------|---------|
| 🔓 public | No authentication required |
| 🔐 JWT | Valid access token required |
| 🛡️ admin | Admin role in workspace required |

---

## 1. Auth — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register new user with email + password | 🔓 public |
| `POST` | `/api/auth/login` | Login — returns access token + sets httpOnly refresh cookie | 🔓 public |
| `POST` | `/api/auth/refresh` | Issue new access token using httpOnly refresh cookie | 🔓 public |
| `POST` | `/api/auth/logout` | Clear refresh cookie + invalidate token | 🔐 JWT |
| `GET` | `/api/auth/me` | Get current authenticated user profile | 🔐 JWT |
| `PATCH` | `/api/auth/me` | Update name or avatar URL | 🔐 JWT |
| `POST` | `/api/auth/me/avatar` | Upload avatar image to Cloudinary | 🔐 JWT |

### Request / Response Examples

#### `POST /api/auth/register`
```json
// Request body
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword123"
}

// Response 201
{
  "user": { "id": "uuid", "name": "Jane Doe", "email": "jane@example.com" },
  "accessToken": "eyJ..."
}
```

#### `POST /api/auth/login`
```json
// Request body
{
  "email": "jane@example.com",
  "password": "securePassword123"
}

// Response 200
{
  "user": { "id": "uuid", "name": "Jane Doe", "email": "jane@example.com", "avatar": null },
  "accessToken": "eyJ..."
}
// Sets httpOnly cookie: refreshToken=<token>
```

#### `POST /api/auth/refresh`
```json
// No body — reads refreshToken from httpOnly cookie

// Response 200
{
  "accessToken": "eyJ..."
}
```

---

## 2. Workspaces — `/api/workspaces`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/workspaces` | List all workspaces the current user belongs to | 🔐 JWT |
| `POST` | `/api/workspaces` | Create new workspace (creator becomes admin automatically) | 🔐 JWT |
| `GET` | `/api/workspaces/:id` | Get workspace details + full member list | 🔐 JWT |
| `PATCH` | `/api/workspaces/:id` | Update name, description, accent color | 🛡️ admin |
| `DELETE` | `/api/workspaces/:id` | Delete workspace and all its data | 🛡️ admin |

### Member Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/workspaces/:id/members` | List all members with roles + online status | 🔐 JWT |
| `POST` | `/api/workspaces/:id/invite` | Invite member by email, assign role | 🛡️ admin |
| `PATCH` | `/api/workspaces/:id/members/:userId` | Change member role (`ADMIN` / `MEMBER`) | 🛡️ admin |
| `DELETE` | `/api/workspaces/:id/members/:userId` | Remove member from workspace | 🛡️ admin |

### Request / Response Examples

#### `POST /api/workspaces`
```json
// Request body
{
  "name": "Product Team",
  "description": "Main product workspace",
  "accentColor": "#6366f1"
}

// Response 201
{
  "id": "uuid",
  "name": "Product Team",
  "description": "Main product workspace",
  "accentColor": "#6366f1",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

#### `POST /api/workspaces/:id/invite`
```json
// Request body
{
  "email": "bob@example.com",
  "role": "MEMBER"
}

// Response 200
{
  "message": "Invitation sent",
  "member": { "userId": "uuid", "role": "MEMBER" }
}
```

---

## 3. Goals — `/api/workspaces/:wsId/goals`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/workspaces/:wsId/goals` | List all goals (supports `?status=` filter) | 🔐 JWT |
| `POST` | `/api/workspaces/:wsId/goals` | Create goal with title, owner, dueDate, status | 🔐 JWT |
| `GET` | `/api/workspaces/:wsId/goals/:id` | Get single goal + milestones + activity feed | 🔐 JWT |
| `PATCH` | `/api/workspaces/:wsId/goals/:id` | Update title, description, status, dueDate | 🔐 JWT |
| `DELETE` | `/api/workspaces/:wsId/goals/:id` | Delete goal and its milestones | 🛡️ admin |
| `POST` | `/api/workspaces/:wsId/goals/:id/updates` | Post a progress update to the activity feed | 🔐 JWT |

### Request / Response Examples

#### `POST /api/workspaces/:wsId/goals`
```json
// Request body
{
  "title": "Launch v2.0",
  "description": "Full product relaunch",
  "ownerId": "uuid",
  "dueDate": "2025-06-01T00:00:00.000Z",
  "status": "NOT_STARTED"
}

// Response 201
{
  "id": "uuid",
  "title": "Launch v2.0",
  "status": "NOT_STARTED",
  "dueDate": "2025-06-01T00:00:00.000Z",
  "owner": { "id": "uuid", "name": "Jane Doe" }
}
```

#### `PATCH /api/workspaces/:wsId/goals/:id`
```json
// Request body (all fields optional)
{
  "status": "IN_PROGRESS",
  "dueDate": "2025-07-01T00:00:00.000Z"
}

// Response 200 — updated goal object
```

### Goal Status Enum
```
NOT_STARTED | IN_PROGRESS | DONE
```

---

## 4. Milestones — `/api/workspaces/:wsId/goals/:goalId/milestones`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/milestones` | List all milestones for a goal | 🔐 JWT |
| `POST` | `/milestones` | Create milestone with title + progress % | 🔐 JWT |
| `PATCH` | `/milestones/:id` | Update milestone title or progress percentage | 🔐 JWT |
| `DELETE` | `/milestones/:id` | Delete a milestone | 🔐 JWT |

### Request / Response Examples

#### `POST /api/workspaces/:wsId/goals/:goalId/milestones`
```json
// Request body
{
  "title": "Design complete",
  "progress": 0
}

// Response 201
{
  "id": "uuid",
  "title": "Design complete",
  "progress": 0,
  "goalId": "uuid"
}
```

#### `PATCH /api/workspaces/:wsId/goals/:goalId/milestones/:id`
```json
// Request body
{
  "progress": 75
}

// Response 200 — updated milestone object
```

---

## 5. Announcements — `/api/workspaces/:wsId/announcements`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/announcements` | List all announcements (pinned first) | 🔐 JWT |
| `POST` | `/announcements` | Publish a rich-text announcement | 🛡️ admin |
| `PATCH` | `/announcements/:id` | Edit announcement content | 🛡️ admin |
| `DELETE` | `/announcements/:id` | Delete announcement | 🛡️ admin |
| `PATCH` | `/announcements/:id/pin` | Toggle pinned status on/off | 🛡️ admin |
| `POST` | `/announcements/:id/reactions` | Add or toggle an emoji reaction | 🔐 JWT |
| `GET` | `/announcements/:id/comments` | Get all comments for an announcement | 🔐 JWT |
| `POST` | `/announcements/:id/comments` | Post a comment (parses @mentions) | 🔐 JWT |
| `DELETE` | `/announcements/:id/comments/:commentId` | Delete own comment | 🔐 JWT |

### Request / Response Examples

#### `POST /api/workspaces/:wsId/announcements`
```json
// Request body
{
  "content": "<p>Team meeting on Friday at 3pm!</p>",
  "pinned": false
}

// Response 201
{
  "id": "uuid",
  "content": "<p>Team meeting on Friday at 3pm!</p>",
  "pinned": false,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

#### `POST /api/workspaces/:wsId/announcements/:id/reactions`
```json
// Request body
{
  "emoji": "👍"
}

// Response 200
{
  "added": true,   // false if reaction was removed (toggle)
  "emoji": "👍",
  "count": 3
}
```

#### `POST /api/workspaces/:wsId/announcements/:id/comments`
```json
// Request body
{
  "content": "Great news @bob!"
}

// Response 201 — creates notification for @bob automatically
{
  "id": "uuid",
  "content": "Great news @bob!",
  "author": { "id": "uuid", "name": "Jane Doe" },
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

---

## 6. Action Items — `/api/workspaces/:wsId/actions`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/actions` | List all actions (filter: `?status=`, `?assigneeId=`, `?goalId=`) | 🔐 JWT |
| `POST` | `/actions` | Create action with priority, assignee, dueDate | 🔐 JWT |
| `GET` | `/actions/:id` | Get single action item detail | 🔐 JWT |
| `PATCH` | `/actions/:id` | Update status, assignee, priority, dueDate | 🔐 JWT |
| `DELETE` | `/actions/:id` | Delete action item | 🔐 JWT |
| `PATCH` | `/actions/:id/status` | Quick status-only update | 🔐 JWT |

### Request / Response Examples

#### `POST /api/workspaces/:wsId/actions`
```json
// Request body
{
  "title": "Write unit tests for auth",
  "assigneeId": "uuid",
  "priority": "HIGH",
  "status": "TODO",
  "dueDate": "2025-05-15T00:00:00.000Z",
  "goalId": "uuid"   // optional — link to a parent goal
}

// Response 201
{
  "id": "uuid",
  "title": "Write unit tests for auth",
  "priority": "HIGH",
  "status": "TODO",
  "assignee": { "id": "uuid", "name": "Jane Doe" },
  "goal": { "id": "uuid", "title": "Launch v2.0" }
}
```

#### `PATCH /api/workspaces/:wsId/actions/:id/status`
```json
// Request body
{
  "status": "IN_PROGRESS"
}

// Response 200 — updated action object
// Also emits Socket.io event: action:statusChanged
```

### Enums

```
Priority:     LOW | MEDIUM | HIGH
ActionStatus: TODO | IN_PROGRESS | DONE
```

---

## 7. Notifications — `/api/notifications`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/notifications` | Get all notifications for current user | 🔐 JWT |
| `PATCH` | `/api/notifications/:id/read` | Mark a single notification as read | 🔐 JWT |
| `PATCH` | `/api/notifications/read-all` | Mark all notifications as read | 🔐 JWT |

### Response Example

#### `GET /api/notifications`
```json
{
  "notifications": [
    {
      "id": "uuid",
      "type": "MENTION",
      "message": "Jane mentioned you in a comment",
      "read": false,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "link": "/workspaces/uuid/announcements/uuid"
    }
  ],
  "unreadCount": 1
}
```

### Notification Types
```
MENTION | INVITE | GOAL_UPDATE | ACTION_ASSIGNED
```

---

## 8. Analytics — `/api/workspaces/:wsId/analytics`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/analytics/summary` | Dashboard stats: total goals, completed this week, overdue count | 🔐 JWT |
| `GET` | `/analytics/goals-chart` | Goal completion data formatted for Recharts | 🔐 JWT |
| `GET` | `/analytics/export` | Download full workspace data as CSV | 🔐 JWT |

### Response Examples

#### `GET /analytics/summary`
```json
{
  "totalGoals": 12,
  "completedThisWeek": 3,
  "overdueCount": 2,
  "totalActions": 34,
  "actionsCompletedThisWeek": 8
}
```

#### `GET /analytics/goals-chart`
```json
{
  "data": [
    { "week": "2025-W01", "completed": 2, "created": 5 },
    { "week": "2025-W02", "completed": 3, "created": 4 },
    { "week": "2025-W03", "completed": 1, "created": 3 }
  ]
}
```

#### `GET /analytics/export`
```
// Response: CSV file download
Content-Type: text/csv
Content-Disposition: attachment; filename="workspace-export-2025-01-01.csv"
```

---

## 9. File Upload — `/api/upload`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/upload/avatar` | Upload avatar image to Cloudinary | 🔐 JWT |
| `POST` | `/api/upload/attachment` | Upload file attachment to Cloudinary | 🔐 JWT |

### Request Example

```
// multipart/form-data
POST /api/upload/avatar
Content-Type: multipart/form-data

file: <binary image data>
```

```json
// Response 200
{
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1/avatars/uuid.jpg",
  "publicId": "avatars/uuid"
}
```

---

## 10. Health Check

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/health` | API liveness check — used by Railway | 🔓 public |

```json
// Response 200
{ "ok": true, "timestamp": "2025-01-01T00:00:00.000Z" }
```

---

## Socket.io Events

> Connect to: `NEXT_PUBLIC_SOCKET_URL` with `{ withCredentials: true }`

### Client → Server (emit)

| Event | Payload | Description |
|-------|---------|-------------|
| `workspace:join` | `{ workspaceId }` | Join a workspace room |
| `workspace:leave` | `{ workspaceId }` | Leave a workspace room |

### Server → Client (listen)

| Event | Payload | Triggered by |
|-------|---------|-------------|
| `goal:created` | goal object | `POST /goals` |
| `goal:updated` | updated goal | `PATCH /goals/:id` |
| `announcement:new` | announcement object | `POST /announcements` |
| `reaction:toggled` | `{ announcementId, emoji, count }` | `POST /reactions` |
| `comment:new` | comment object | `POST /comments` |
| `action:statusChanged` | `{ actionId, status }` | `PATCH /actions/:id/status` |
| `notification:new` | notification object | @mention or invite |
| `presence:join` | `{ userId, name }` | Member connects to workspace |
| `presence:leave` | `{ userId }` | Member disconnects |

---

## Error Response Format

All errors follow this consistent shape:

```json
{
  "error": "Unauthorized",
  "message": "Access token expired",
  "statusCode": 401
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK |
| `201` | Created |
| `400` | Bad request / validation error |
| `401` | Unauthenticated — missing or expired token |
| `403` | Forbidden — insufficient role |
| `404` | Resource not found |
| `409` | Conflict (e.g. email already registered) |
| `500` | Internal server error |

---

## Environment Variables Reference

### Backend (`apps/api/.env`)
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/teamhub"
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLIENT_URL="http://localhost:3000"
PORT=4000
```

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
```

---

*Total endpoints: 38 REST + 2 Socket emit + 9 Socket listen*