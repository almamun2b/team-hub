import { $fetch } from "@/lib/fetch";
import { Workspace, CreateWorkspacePayload, UpdateWorkspacePayload, InviteMemberPayload, WorkspaceMember } from "@/types/workspace";

export class WorkspaceService {
  static async getWorkspaces(): Promise<{ success: boolean; message?: string; data?: Workspace[] }> {
    const response = await $fetch.get<{ success: boolean; message?: string; data?: Workspace[] }>("/workspaces", {
      cache: "force-cache",
      next: { tags: ["workspaces"] },
    });
    return response || { success: false };
  }

  static async createWorkspace(payload: CreateWorkspacePayload): Promise<{ success: boolean; message?: string; data?: Workspace }> {
    const response = await $fetch.post<{ success: boolean; message?: string; data?: Workspace }>("/workspaces/create", payload);
    return response || { success: false };
  }

  static async getWorkspace(id: string): Promise<{ success: boolean; message?: string; data?: Workspace }> {
    const response = await $fetch.get<{ success: boolean; message?: string; data?: Workspace }>(`/workspaces/${id}`);
    return response || { success: false };
  }

  static async updateWorkspace(id: string, payload: UpdateWorkspacePayload): Promise<{ success: boolean; message?: string; data?: Workspace }> {
    const response = await $fetch.patch<{ success: boolean; message?: string; data?: Workspace }>(`/workspaces/${id}`, payload);
    return response || { success: false };
  }

  static async deleteWorkspace(id: string): Promise<{ success: boolean; message?: string }> {
    const response = await $fetch.delete<{ success: boolean; message?: string }>(`/workspaces/${id}`);
    return response || { success: false };
  }

  static async getMembers(workspaceId: string): Promise<{ success: boolean; message?: string; data?: WorkspaceMember[] }> {
    const response = await $fetch.get<{ success: boolean; message?: string; data?: WorkspaceMember[] }>(`/workspaces/${workspaceId}/members`);
    return response || { success: false };
  }

  static async inviteMember(workspaceId: string, payload: InviteMemberPayload): Promise<{ success: boolean; message?: string }> {
    const response = await $fetch.post<{ success: boolean; message?: string }>(`/workspaces/${workspaceId}/invite`, payload);
    return response || { success: false };
  }

  static async removeMember(workspaceId: string, userId: string): Promise<{ success: boolean; message?: string }> {
    const response = await $fetch.delete<{ success: boolean; message?: string }>(`/workspaces/${workspaceId}/members/${userId}`);
    return response || { success: false };
  }

  static async exportWorkspace(workspaceId: string): Promise<Blob> {
    const response = await $fetch.get<Blob>(`/workspaces/${workspaceId}/export`);
    return response || new Blob();
  }
}
