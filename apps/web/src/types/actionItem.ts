export type ActionItemPriority = "LOW" | "MEDIUM" | "HIGH";
export type ActionItemStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface ActionItem {
  id: string;
  title: string;
  description?: string;
  assigneeId?: string;
  assignee?: {
    id: string;
    fullName: string;
    avatar?: string;
  };
  priority: ActionItemPriority;
  status: ActionItemStatus;
  dueDate?: string;
  goalId?: string;
  goal?: {
    id: string;
    title: string;
  };
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateActionItemPayload {
  workspaceId: string;
  title: string;
  description?: string;
  assigneeId?: string;
  priority?: ActionItemPriority;
  dueDate?: string;
  goalId?: string;
}

export interface UpdateActionItemPayload {
  title?: string;
  description?: string;
  assigneeId?: string;
  priority?: ActionItemPriority;
  status?: ActionItemStatus;
  dueDate?: string;
  goalId?: string;
}