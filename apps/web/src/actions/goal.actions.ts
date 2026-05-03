/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { GoalService } from "@/services/goal.service";
import { CreateGoalPayload, UpdateGoalPayload, CreateMilestonePayload, UpdateMilestonePayload } from "@/types/goal";
import { updateTag } from "next/cache";

export async function createGoalAction(state: any, formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = formData.get("dueDate") as string;

  const payload: CreateGoalPayload = { workspaceId, title };
  if (description) payload.description = description;
  if (dueDate) {
    payload.dueDate = new Date(`${dueDate}T00:00:00.000Z`).toISOString();
  }

  try {
    const response = await GoalService.createGoal(payload);
    if (response.success) {
      updateTag("goals");
      updateTag(`goals:${workspaceId}`);
      updateTag("analytics");
      updateTag(`analytics:${workspaceId}`);
      return { success: true };
    } else {
      return { error: response?.message || "Failed to create goal" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function updateGoalAction(goalId: string, state: any, formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as "NOT_STARTED" | "IN_PROGRESS" | "DONE";
  const dueDate = formData.get("dueDate") as string;

  const payload: UpdateGoalPayload = {};
  if (title) payload.title = title;
  if (description) payload.description = description;
  if (status) payload.status = status;
  if (dueDate) {
    payload.dueDate = new Date(`${dueDate}T00:00:00.000Z`).toISOString();
  }

  try {
    const response = await GoalService.updateGoal(goalId, payload);
    if (response.success) {
      if (workspaceId) {
        updateTag("goals");
        updateTag(`goals:${workspaceId}`);
        updateTag("analytics");
        updateTag(`analytics:${workspaceId}`);
      }
      return { success: true };
    } else {
      return { error: response?.message || "Failed to update goal" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function createMilestoneAction(goalId: string, state: any, formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const title = formData.get("title") as string;
  const progress = parseInt(formData.get("progress") as string);

  const payload: CreateMilestonePayload = { title, progress };

  try {
    const response = await GoalService.createMilestone(goalId, payload);
    if (response.success) {
      if (workspaceId) {
        updateTag("goals");
        updateTag(`goals:${workspaceId}`);
        updateTag("analytics");
        updateTag(`analytics:${workspaceId}`);
      }
      return { success: true };
    } else {
      return { error: response?.message || "Failed to create milestone" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function updateMilestoneAction(milestoneId: string, state: any, formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const title = formData.get("title") as string;
  const progress = parseInt(formData.get("progress") as string);

  const payload: UpdateMilestonePayload = { title, progress };

  try {
    const response = await GoalService.updateMilestone(milestoneId, payload);
    if (response.success) {
      if (workspaceId) {
        updateTag("goals");
        updateTag(`goals:${workspaceId}`);
        updateTag("analytics");
        updateTag(`analytics:${workspaceId}`);
      }
      return { success: true };
    } else {
      return { error: response?.message || "Failed to update milestone" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function deleteGoalAction(payload: { goalId: string; workspaceId: string }) {
  try {
    const response = await GoalService.deleteGoal(payload.goalId);
    if (!response.success) {
      return { error: response?.message || "Failed to delete goal" };
    }
    updateTag("goals");
    updateTag(`goals:${payload.workspaceId}`);
    updateTag("analytics");
    updateTag(`analytics:${payload.workspaceId}`);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}
