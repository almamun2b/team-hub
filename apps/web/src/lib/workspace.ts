"use server";

import { cookies } from "next/headers";
import { WorkspaceService } from "@/services/workspace.service";
import { Workspace } from "@/types/workspace";

export const getCurrentWorkspace = async (): Promise<Workspace | null> => {
  const cookieStore = await cookies();
  const workspaceCookie = cookieStore.get("currentWorkspace")?.value;

  if (workspaceCookie) {
    try {
      return JSON.parse(workspaceCookie) as Workspace;
    } catch {
      // continue to fallback
    }
  }

  // Fallback: if cookie is missing/invalid, select the first available workspace.
  const response = await WorkspaceService.getWorkspaces();
  const firstWorkspace = response?.success ? response.data?.[0] : undefined;

  if (!firstWorkspace) {
    return null;
  }

  return firstWorkspace;
};

export const setCurrentWorkspace = async (workspace: Workspace) => {
  const cookieStore = await cookies();
  cookieStore.set("currentWorkspace", JSON.stringify(workspace), {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, // Allow client-side access
  });
};
