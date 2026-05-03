/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ActionItemService } from "@/services/actionItem.service";
import { CreateActionItemPayload, UpdateActionItemPayload } from "@/types/actionItem";
import { updateTag } from "next/cache";

export async function createActionItemAction(state: any, formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const title = formData.get("title") as string;
  const assigneeId = formData.get("assigneeId") as string;
  const priority = formData.get("priority") as "LOW" | "MEDIUM" | "HIGH";
  const dueDate = formData.get("dueDate") as string;
  const goalId = formData.get("goalId") as string;

  const payload: CreateActionItemPayload = { workspaceId, title };
  if (assigneeId) payload.assigneeId = assigneeId;
  if (priority) payload.priority = priority;
  if (dueDate) payload.dueDate = new Date(`${dueDate}T00:00:00.000Z`).toISOString();
  if (goalId) payload.goalId = goalId;

  try {
    const response = await ActionItemService.createActionItem(payload);
    if (response.success) {
      updateTag("action-items");
      updateTag(`action-items:${workspaceId}`);
      updateTag("analytics");
      updateTag(`analytics:${workspaceId}`);
      return { success: true };
    } else {
      return { error: response?.message || "Failed to create action item" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function updateActionItemAction(actionItemId: string, state: any, formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const title = formData.get("title") as string;
  const assigneeId = formData.get("assigneeId") as string;
  const priority = formData.get("priority") as "LOW" | "MEDIUM" | "HIGH";
  const status = formData.get("status") as "TODO" | "IN_PROGRESS" | "DONE";
  const dueDate = formData.get("dueDate") as string;
  const goalId = formData.get("goalId") as string;

  const payload: UpdateActionItemPayload = {};
  if (title) payload.title = title;
  if (assigneeId) payload.assigneeId = assigneeId;
  if (priority) payload.priority = priority;
  if (status) payload.status = status;
  if (dueDate) payload.dueDate = new Date(`${dueDate}T00:00:00.000Z`).toISOString();
  if (goalId) payload.goalId = goalId;

  try {
    const response = await ActionItemService.updateActionItem(actionItemId, payload);
    if (response.success) {
      if (workspaceId) {
        updateTag("action-items");
        updateTag(`action-items:${workspaceId}`);
        updateTag("analytics");
        updateTag(`analytics:${workspaceId}`);
      }
      return { success: true };
    } else {
      return { error: response?.message || "Failed to update action item" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function deleteActionItemAction(payload: {
  actionItemId: string;
  workspaceId: string;
}) {
  try {
    const response = await ActionItemService.deleteActionItem(payload.actionItemId);
    if (!response.success) {
      return { error: response?.message || "Failed to delete action item" };
    }
    updateTag("action-items");
    updateTag(`action-items:${payload.workspaceId}`);
    updateTag("analytics");
    updateTag(`analytics:${payload.workspaceId}`);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}
