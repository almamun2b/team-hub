/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { WorkspaceService } from "@/services/workspace.service";
import { CreateWorkspacePayload, UpdateWorkspacePayload, InviteMemberPayload } from "@/types/workspace";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

export async function createWorkspaceAction(state: any, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const accentColor = formData.get("accentColor") as string;

  const payload: CreateWorkspacePayload = { name };
  if (description) payload.description = description;
  if (accentColor) payload.accentColor = accentColor;

  let workspaceId: string | undefined;

  try {
    const response = await WorkspaceService.createWorkspace(payload);
    if (response.success && response.data) {
      workspaceId = response.data.id;
      updateTag("workspaces");
    } else {
      return { error: response?.message || "Failed to create workspace" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }

  redirect(`/dashboard?workspace=${workspaceId}`);
}

export async function createWorkspaceInlineAction(state: any, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const accentColor = formData.get("accentColor") as string;

  const payload: CreateWorkspacePayload = { name };
  if (description) payload.description = description;
  if (accentColor) payload.accentColor = accentColor;

  try {
    const response = await WorkspaceService.createWorkspace(payload);
    if (response.success && response.data) {
      updateTag("workspaces");
      return { success: true, data: response.data };
    }
    return { error: response?.message || "Failed to create workspace" };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function updateWorkspaceAction(workspaceId: string, state: any, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const accentColor = formData.get("accentColor") as string;

  const payload: UpdateWorkspacePayload = { name, description, accentColor };

  try {
    const response = await WorkspaceService.updateWorkspace(workspaceId, payload);
    if (response.success) {
      updateTag("workspaces");
      return { success: true };
    } else {
      return { error: "Failed to update workspace" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function inviteMemberAction(workspaceId: string, state: any, formData: FormData) {
  const email = formData.get("email") as string;
  const role = formData.get("role") as "ADMIN" | "MEMBER";

  const payload: InviteMemberPayload = { email, role };

  try {
    const response = await WorkspaceService.inviteMember(workspaceId, payload);
    if (response.success) {
      return { success: true };
    } else {
      return { error: "Failed to invite member" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function deleteWorkspaceAction(payload: { workspaceId: string }) {
  try {
    const response = await WorkspaceService.deleteWorkspace(payload.workspaceId);
    if (!response.success) {
      return { error: response?.message || "Failed to delete workspace" };
    }
    updateTag("workspaces");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}
