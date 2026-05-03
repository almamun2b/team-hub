import { $fetch } from "@/lib/fetch";
import { Announcement, CreateAnnouncementPayload, UpdateAnnouncementPayload, Comment, CreateCommentPayload, Reaction, CreateReactionPayload } from "@/types/announcement";

export class AnnouncementService {
  static async getAnnouncements(workspaceId: string): Promise<{ success: boolean; message?: string; data?: Announcement[] }> {
    const response = await $fetch.get<{ success: boolean; message?: string; data?: Announcement[] }>(`/announcements/workspace/${workspaceId}`, {
      cache: "force-cache",
      next: { tags: ["announcements", `announcements:${workspaceId}`] },
    });
    return response || { success: false };
  }

  static async createAnnouncement(payload: CreateAnnouncementPayload): Promise<{ success: boolean; message?: string; data?: Announcement }> {
    const response = await $fetch.post<{ success: boolean; message?: string; data?: Announcement }>("/announcements/create", payload);
    return response || { success: false };
  }

  static async updateAnnouncement(id: string, payload: UpdateAnnouncementPayload): Promise<{ success: boolean; message?: string; data?: Announcement }> {
    const response = await $fetch.patch<{ success: boolean; message?: string; data?: Announcement }>(`/announcements/${id}`, payload);
    return response || { success: false };
  }

  static async deleteAnnouncement(id: string): Promise<{ success: boolean; message?: string }> {
    const response = await $fetch.delete<{ success: boolean; message?: string }>(`/announcements/${id}`);
    return response || { success: false };
  }

  static async pinAnnouncement(id: string, isPinned: boolean): Promise<{ success: boolean; message?: string; data?: Announcement }> {
    const response = await $fetch.patch<{ success: boolean; message?: string; data?: Announcement }>(`/announcements/${id}/pin`, { isPinned });
    return response || { success: false };
  }

  static async createComment(announcementId: string, payload: CreateCommentPayload): Promise<{ success: boolean; message?: string; data?: Comment }> {
    const response = await $fetch.post<{ success: boolean; message?: string; data?: Comment }>(`/announcements/${announcementId}/comments`, payload);
    return response || { success: false };
  }

  static async createReaction(announcementId: string, payload: CreateReactionPayload): Promise<{ success: boolean; message?: string; data?: Reaction }> {
    const response = await $fetch.post<{ success: boolean; message?: string; data?: Reaction }>(`/announcements/${announcementId}/reactions`, payload);
    return response || { success: false };
  }
}
