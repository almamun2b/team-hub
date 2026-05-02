# Collaborative Team Hub API Documentation

Detailed reference for all REST endpoints and real-time events.

---

## 🔑 1. Authentication (`/api/v1/auth`)

| Method | Endpoint | Params | Payload Example | Response Example |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/register` | - | `{ "fullName": "...", "email": "...", "password": "..." }` | `{ "success": true, "data": { "id": "...", "email": "..." } }` |
| `POST` | `/login` | - | `{ "email": "...", "password": "..." }` | `{ "success": true, "data": { "accessToken": "...", "user": {...} } }` |
| `POST` | `/refresh-token` | - | - | `{ "success": true, "data": { "accessToken": "..." } }` |
| `POST` | `/logout` | - | - | `{ "success": true, "message": "Logged out" }` |
| `GET` | `/me` | - | - | `{ "success": true, "data": { "id": "...", "fullName": "..." } }` |
| `PATCH` | `/me` | - | FormData `{ "file": "...", "data": "..." }` | Updated user object |

---

## 🏢 2. Workspaces (`/api/v1/workspaces`)

| Method | Endpoint | Params | Payload Example | Response Example |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | - | - | List of workspaces |
| `POST` | `/create` | - | `{ "name": "...", "description": "..." }` | Created workspace object |
| `GET` | `/:id` | `id` | - | Workspace with member details |
| `PATCH` | `/:id` | `id` | `{ "name": "..." }` | Updated workspace object |
| `DELETE` | `/:id` | `id` | - | `{ "success": true, "message": "Deleted" }` |
| `GET` | `/:id/members` | `id` | - | List of members |
| `POST` | `/:id/invite` | `id` | `{ "email": "...", "role": "MEMBER" }` | `{ "success": true, "message": "Invited" }` |
| `DELETE` | `/:id/members/:userId` | `id`, `userId` | - | `{ "success": true, "message": "Removed" }` |
| `GET` | `/:id/export` | `id` | - | CSV File Download |

---

## 🎯 3. Goals & Milestones (`/api/v1/goals`)

| Method | Endpoint | Params | Payload Example | Response Example |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/workspace/:workspaceId` | `workspaceId` | - | List of goals with milestones |
| `POST` | `/create` | - | `{ "workspaceId": "...", "title": "..." }` | Created goal object |
| `PATCH` | `/:id` | `id` | `{ "status": "DONE" }` | Updated goal object |
| `DELETE` | `/:id` | `id` | - | `{ "success": true, "message": "Deleted" }` |
| `POST` | `/:id/milestones` | `id` (Goal) | `{ "title": "...", "progress": 50 }` | Created milestone object |
| `PATCH` | `/:id/milestones` | `id` (Milestone) | `{ "progress": 100 }` | Updated milestone object |

---

## 📢 4. Announcements (`/api/v1/announcements`)

| Method | Endpoint | Params | Payload Example | Response Example |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/workspace/:workspaceId` | `workspaceId` | - | List of announcements |
| `POST` | `/create` | - | `{ "workspaceId": "...", "content": "..." }` | Created announcement object |
| `PATCH` | `/:id` | `id` | `{ "content": "..." }` | Updated announcement object |
| `DELETE` | `/:id` | `id` | - | `{ "success": true, "message": "Deleted" }` |
| `PATCH` | `/:id/pin` | `id` | `{ "isPinned": true }` | Updated pinned status |
| `POST` | `/:id/comments` | `id` | `{ "content": "..." }` | Created comment object |
| `POST` | `/:id/reactions`| `id` | `{ "emoji": "🚀" }` | Reaction object |

---

## ✅ 5. Action Items (`/api/v1/action-items`)

| Method | Endpoint | Params | Payload Example | Response Example |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/workspace/:workspaceId` | `workspaceId` | - | List of items |
| `POST` | `/create` | - | `{ "workspaceId": "...", "title": "..." }` | Created item object |
| `PATCH` | `/:id` | `id` | `{ "status": "DONE" }` | Updated item object |
| `DELETE` | `/:id` | `id` | - | `{ "success": true, "message": "Deleted" }` |

---

## 🔔 6. Notifications (`/api/v1/notifications`)

| Method | Endpoint | Params | Payload Example | Response Example |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | - | - | Notifications with `unreadCount` |
| `PATCH` | `/:id/read` | `id` | - | Updated notification object |
| `PATCH` | `/read-all` | - | - | `{ "success": true, "message": "All read" }` |

---

## 📊 7. Analytics (`/api/v1/analytics`)

| Method | Endpoint | Params | Response Example |
| :--- | :--- | :--- | :--- |
| `GET` | `/summary/:workspaceId` | `workspaceId` | `{ "totalGoals": 5, "completedThisWeek": 2, ... }` |
| `GET` | `/goals-chart/:workspaceId`| `workspaceId` | `[ { "status": "DONE", "count": 10 } ]` |

---

## ⚡ Real-time (Socket.io)

| Event | Type | Payload Example | Description |
| :--- | :--- | :--- | :--- |
| `identify` | `EMIT` | `"user-uuid-here"` | Connects user & auto-joins all workspace rooms |
| `user_status_changed` | `LISTEN` | `{ "userId": "...", "status": "online/offline" }` | Presence update |
| `new_notification` | `LISTEN` | `{ "title": "...", "message": "..." }` | Targeted push notification |
| `new_announcement` | `LISTEN` | Announcement Object | Live feed for new posts |
| `new_reaction` | `LISTEN` | Reaction Object | Real-time emoji reactions |
| `goal_updated` | `LISTEN` | Goal Object | Live status changes for goals |
| `action_item_updated` | `LISTEN` | Action Item Object | Live updates for tasks |
