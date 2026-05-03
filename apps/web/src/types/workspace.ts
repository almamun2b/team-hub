export type WorkspaceRole = "ADMIN" | "MEMBER";

export interface WorkspaceMember {
  id: string; // membership id
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  joinedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  accentColor?: string;
  createdAt: string;
  updatedAt: string;
  members: WorkspaceMember[];
}

export interface CreateWorkspacePayload {
  name: string;
  description?: string;
  accentColor?: string;
}

export interface UpdateWorkspacePayload {
  name?: string;
  description?: string;
  accentColor?: string;
}

export interface InviteMemberPayload {
  email: string;
  role: WorkspaceRole;
}
