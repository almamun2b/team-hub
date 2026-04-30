import { WorkspaceRole } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const createWorkspace = async (userId: string, payload: any) => {
  const result = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: payload,
    });

    await tx.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId,
        role: WorkspaceRole.ADMIN,
      },
    });

    return workspace;
  });

  return result;
};

const getMyWorkspaces = async (userId: string) => {
  const result = await prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: true,
    },
  });

  return result;
};

const inviteMember = async (workspaceId: string, payload: { email: string, role: WorkspaceRole }) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found with this email!");
  }

  const existingMember = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId: user.id,
      },
    },
  });

  if (existingMember) {
    throw new ApiError(httpStatus.CONFLICT, "User is already a member of this workspace!");
  }

  const result = await prisma.workspaceMember.create({
    data: {
      workspaceId,
      userId: user.id,
      role: payload.role,
    },
  });

  return result;
};

const getWorkspaceMembers = async (workspaceId: string) => {
  const result = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          fullName: true,
          avatar: true,
        },
      },
    },
  });

  return result;
};

const exportWorkspaceData = async (workspaceId: string) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      goals: true,
      members: {
        include: { user: true },
      },
    },
  });

  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found!");
  }

  // Very simple CSV construction
  let csv = "Goal Title,Status,Due Date\n";
  workspace.goals.forEach((goal) => {
    csv += `${goal.title},${goal.status},${goal.dueDate.toISOString()}\n`;
  });

  return csv;
};

export const WorkspaceServices = {
  createWorkspace,
  getMyWorkspaces,
  inviteMember,
  getWorkspaceMembers,
  exportWorkspaceData,
};
