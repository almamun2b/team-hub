import { create } from "zustand";
import { User } from "@/types/auth";
import { Workspace } from "@/types/workspace";
import { Notification } from "@/types/notification";

interface AppState {
  user: User | null;
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  notifications: Notification[];
  unreadCount: number;
  setUser: (user: User | null) => void;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (workspace: Workspace) => void;
  removeWorkspace: (id: string) => void;
  addNotification: (notification: Notification) => void;
  setNotifications: (notifications: Notification[], unreadCount: number) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  currentWorkspace: null,
  workspaces: [],
  notifications: [],
  unreadCount: 0,
  setUser: (user) => set({ user }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  setWorkspaces: (workspaces) => set({ workspaces }),
  addWorkspace: (workspace) => set((state) => ({ workspaces: [...state.workspaces, workspace] })),
  updateWorkspace: (workspace) => set((state) => ({
    workspaces: state.workspaces.map((w) => w.id === workspace.id ? workspace : w),
    currentWorkspace: state.currentWorkspace?.id === workspace.id ? workspace : state.currentWorkspace,
  })),
  removeWorkspace: (id) => set((state) => ({
    workspaces: state.workspaces.filter((w) => w.id !== id),
    currentWorkspace: state.currentWorkspace?.id === id ? null : state.currentWorkspace,
  })),
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
    unreadCount: state.unreadCount + 1,
  })),
  setNotifications: (notifications, unreadCount) => set({ notifications, unreadCount }),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? { ...n, isRead: true } : n),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  markAllNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    unreadCount: 0,
  })),
}));