import { $fetch } from "@/lib/fetch";
import { Goal, CreateGoalPayload, UpdateGoalPayload, Milestone, CreateMilestonePayload, UpdateMilestonePayload } from "@/types/goal";

export class GoalService {
  static async getGoals(workspaceId: string): Promise<{ success: boolean; message?: string; data?: Goal[] }> {
    const response = await $fetch.get<{ success: boolean; message?: string; data?: Goal[] }>(`/goals/workspace/${workspaceId}`, {
      cache: "force-cache",
      next: { tags: ["goals", `goals:${workspaceId}`] },
    });
    return response || { success: false };
  }

  static async createGoal(payload: CreateGoalPayload): Promise<{ success: boolean; message?: string; data?: Goal }> {
    const response = await $fetch.post<{ success: boolean; message?: string; data?: Goal }>("/goals/create", payload);
    return response || { success: false };
  }

  static async updateGoal(id: string, payload: UpdateGoalPayload): Promise<{ success: boolean; message?: string; data?: Goal }> {
    const response = await $fetch.patch<{ success: boolean; message?: string; data?: Goal }>(`/goals/${id}`, payload);
    return response || { success: false };
  }

  static async deleteGoal(id: string): Promise<{ success: boolean; message?: string }> {
    const response = await $fetch.delete<{ success: boolean; message?: string }>(`/goals/${id}`);
    return response || { success: false };
  }

  static async createMilestone(goalId: string, payload: CreateMilestonePayload): Promise<{ success: boolean; message?: string; data?: Milestone }> {
    const response = await $fetch.post<{ success: boolean; message?: string; data?: Milestone }>(`/goals/${goalId}/milestones`, payload);
    return response || { success: false };
  }

  static async updateMilestone(milestoneId: string, payload: UpdateMilestonePayload): Promise<{ success: boolean; message?: string; data?: Milestone }> {
    const response = await $fetch.patch<{ success: boolean; message?: string; data?: Milestone }>(`/goals/${milestoneId}/milestones`, payload);
    return response || { success: false };
  }
}
