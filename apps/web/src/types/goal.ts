export type GoalStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

export interface Milestone {
  id: string;
  title: string;
  progress: number; // 0-100
  goalId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  owner: {
    id: string;
    fullName: string;
    avatar?: string;
  };
  dueDate?: string;
  status: GoalStatus;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  milestones: Milestone[];
}

export interface CreateGoalPayload {
  workspaceId: string;
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateGoalPayload {
  title?: string;
  description?: string;
  status?: GoalStatus;
  dueDate?: string;
}

export interface CreateMilestonePayload {
  title: string;
  progress: number;
}

export interface UpdateMilestonePayload {
  title?: string;
  progress?: number;
}