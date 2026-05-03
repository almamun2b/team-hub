/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AnnouncementService } from "@/services/announcement.service";
import { CreateAnnouncementPayload, UpdateAnnouncementPayload, CreateCommentPayload, CreateReactionPayload } from "@/types/announcement";
import { updateTag } from "next/cache";

export async function createAnnouncementAction(state: any, formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const payload: CreateAnnouncementPayload = { workspaceId, title, content };

  try {
    const response = await AnnouncementService.createAnnouncement(payload);
    if (response.success) {
      updateTag("announcements");
      updateTag(`announcements:${workspaceId}`);
      return { success: true };
    } else {
      return { error: response?.message || "Failed to create announcement" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function updateAnnouncementAction(announcementId: string, state: any, formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const payload: UpdateAnnouncementPayload = {};
  if (title) payload.title = title;
  if (content) payload.content = content;

  try {
    const response = await AnnouncementService.updateAnnouncement(announcementId, payload);
    if (response.success) {
      if (workspaceId) {
        updateTag("announcements");
        updateTag(`announcements:${workspaceId}`);
      }
      return { success: true };
    } else {
      return { error: response?.message || "Failed to update announcement" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function createCommentAction(
  announcementId: string,
  stateOrFormData: any,
  formData?: FormData
) {
  let content: string;
  let workspaceId: string | undefined;

  if (formData instanceof FormData) {
    // Called with useFormState
    content = formData.get("content") as string;
    workspaceId = (formData.get("workspaceId") as string) || undefined;
  } else {
    // Called directly
    content = stateOrFormData.content;
    workspaceId = stateOrFormData.workspaceId;
  }

  const payload: CreateCommentPayload = { content };

  try {
    const response = await AnnouncementService.createComment(announcementId, payload);
    if (response.success) {
      if (workspaceId) {
        updateTag("announcements");
        updateTag(`announcements:${workspaceId}`);
      }
      return { success: true };
    } else {
      return { error: response?.message || "Failed to create comment" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function createReactionAction(announcementId: string, emoji: string, workspaceId?: string) {
  const payload: CreateReactionPayload = { emoji };

  try {
    const response = await AnnouncementService.createReaction(announcementId, payload);
    if (response.success) {
      if (workspaceId) {
        updateTag("announcements");
        updateTag(`announcements:${workspaceId}`);
      }
      return { success: true };
    } else {
      return { error: response?.message || "Failed to create reaction" };
    }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function deleteAnnouncementAction(payload: {
  announcementId: string;
  workspaceId: string;
}) {
  try {
    const response = await AnnouncementService.deleteAnnouncement(payload.announcementId);
    if (!response.success) {
      return { error: response?.message || "Failed to delete announcement" };
    }
    updateTag("announcements");
    updateTag(`announcements:${payload.workspaceId}`);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
}
