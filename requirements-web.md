# Collaborative Team Hub — Frontend Requirements (Next.js)

This document specifies the technical architecture, functional requirements, and design standards for the Team Hub frontend, built with Next.js 16+ (App Router).

---

## 🏗️ Technical Architecture & Stack

### Core Technologies
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + Shadcn UI (Customized components)
- **State Management:** 
    - **Server State:** Next.js Server Actions + `useActionState` (or `useFormState`)
    - **Global Client State:** Zustand (for UI state, sidebar toggles, etc.)
- **Real-time:** Socket.io-client (Singleton instance with provider)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts

### Modular MVC Pattern
The project follows a centralized but domain-grouped structure to ensure scalability:
- **`src/actions/`**: Server Actions grouped by domain (e.g., `auth.ts`, `workspace.ts`).
- **`src/services/`**: API client logic and backend communication layer.
- **`src/types/`**: Centralized TypeScript interfaces and Zod schemas.
- **`src/hooks/`**: Custom React hooks for global and feature-specific logic.
- **`src/components/modules/`**: Complex components organized by feature (e.g., `auth/LoginForm.tsx`).
- **`src/components/shared/`**: Reusable layout components (e.g., `Header`, `Sidebar`).
- **`src/components/ui/`**: Atomic Shadcn components and base building blocks.
- **`src/lib/`**: External library configurations (Socket.io, Cloudinary).

---

## 🎨 Layout & Design System

### 🏗️ Global Layout
- **Landing Page:** 
    - Hero section with high-quality visuals (generated via AI).
    - Feature highlights (Real-time, Kanban, Analytics).
    - Clear CTA: "Get Started" / "Login".
- **Dashboard Shell (Post-Login):**
    - **Header:**
        - Workspace switcher (Dropdown).
        - Important Routes: Dashboard, Goals, Announcements, Kanban.
        - User Profile Dropdown (Settings, Logout).
        - Notifications Bell (with unread count).
    - **Sidebar:**
        - Quick links to all workspace features.
        - List of active workspace members (Online status).
    - **Footer:** Minimalist, containing versioning, support links, and status indicator.

---

## 🔑 1. Authentication & User Flow

### Features
- **Register/Login:** Clean, centered forms with Zod validation and server-side error handling.
- **Session Management:**
    - JWT-based auth via httpOnly cookies (managed by the backend).
    - Client-side `useAuth` hook to track `user` state.
    - Middleware-protected routes: Redirect unauthenticated users to `/login`.
- **User Profile:**
    - Dedicated page (`/profile`) for updating name and avatar.
    - **Avatar Upload:** Integrated with Cloudinary via Server Actions.

---

## 🏢 2. Workspace Management

### UI/UX Requirements
- **Workspace Dashboard:** High-level summary cards for the active workspace.
- **Workspace Settings:**
    - Edit name, description, and **Accent Color** (Dynamic CSS variables).
    - **Member Invitations:** Modal-based invite system via email.
    - **Role Management:** Admin UI to promote/remove members.
- **Data Export:** Button to trigger CSV download from the backend.

---

## 🎯 3. Goals & Milestones

### Functionality
- **Goal Feed:** Vertical activity timeline showing status updates and milestone progress.
- **Interactive Milestones:** 
    - Progress sliders or numeric inputs to update percentage (0-100%).
    - Auto-calculation of parent goal status based on milestone completion.
- **Activity Feed:** Real-time updates when a teammate posts progress.

---

## 📢 4. Announcements & Reactions

### Rich Communication
- **Rich Text Editor:** For Admins to create formatted announcements (e.g., TipTap or simple Markdown).
- **Pinned Posts:** Visual highlight for important announcements at the top of the feed.
- **Engagement:**
    - **Emoji Reactions:** Quick-click reactions with real-time count updates.
    - **Threaded Comments:** Hierarchical view for team discussions.
    - **@Mentions:** Integrated autocomplete for member names in comments.

---

## ✅ 5. Action Items (Kanban Board)

### Task Management UI
- **Dual View Toggle:** Seamless transition between **Kanban Board** and **List View**.
- **Kanban Functionality:**
    - Drag-and-drop status transitions (using `dnd-kit` or `react-beautiful-dnd`).
    - Priority-based color coding (Low, Medium, High).
- **Filtering:** Filter tasks by assignee, priority, or due date.

---

## ⚡ 6. Real-time Infrastructure (Socket.io)

### Implementation
- **Socket Provider:** React Context provider to manage the socket lifecycle.
- **Event Listeners:**
    - `user_status_changed`: Updates sidebar online indicators.
    - `new_notification`: Triggers toast notifications and increments bell count.
    - `goal_updated` / `action_item_updated`: Optimistic or instant UI refresh.
- **Auto-Join:** Frontend automatically sends `identify` event with JWT upon socket connection.

---

## 📊 7. Analytics Dashboard

### Data Visualization
- **Stats Grid:** 4-column layout for (Total Goals, Completed, Overdue, Active Members).
- **Progress Charts:** 
    - Bar chart for goal status distribution.
    - Line chart for completion trends over time.
- **Dynamic Filtering:** Toggle analytics view between "All Time" and "This Week".

---

## 🚀 8. Performance & Advanced UI

### Production Level Standards
- **Optimistic UI:** Use React `useOptimistic` for instant status changes (e.g., marking a task as done).
- **Server Components:** Fetch initial data on the server to minimize Layout Shift and improve LCP.
- **Skeleton States:** Tailwind-based skeleton loaders for all data-heavy sections.
- **Dark Mode:** Full support via `next-themes` with system preference detection.
- **SEO:** 
    - Dynamic Metadata generation for each workspace/goal page.
    - Proper Semantic HTML5 structure.

---

## 📁 9. File Handling

### Cloudinary Integration
- Direct upload from Server Actions to keep client-side API keys hidden.
- Image optimization using `next/image` for avatars and attachments.
- File preview before upload for better UX.

---

## 📋 Folder Structure
```text
src/
├── app/                  # App Router Pages
├── actions/              # Server Actions (grouped by domain)
├── services/             # API Data Services
├── types/                # Global & Domain TypeScript Types
├── hooks/                # Reusable React Hooks
├── lib/                  # Library Configs (Socket, Utils)
├── store/                # Zustand Global State
└── components/
    ├── modules/          # Feature-specific components
    ├── shared/           # Cross-cutting UI components (Layout, Feed)
    └── ui/               # Atomic Shadcn components
```
