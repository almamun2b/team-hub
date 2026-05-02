import { WorkspaceRole } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import { SocketHelper } from "../../../helpers/socketHelper";
import ApiError from "../../errors/ApiError";
import { AuditLogServices } from "../auditLog/auditLog.service";
import { NotificationServices } from "../notification/notification.service";

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

    await AuditLogServices.createLog({
      action: "WORKSPACE_CREATED",
      entityType: "WORKSPACE",
      entityId: workspace.id,
      userId,
      workspaceId: workspace.id,
      changes: payload,
    }, tx);

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

  await NotificationServices.createNotification({
    userId: user.id,
    type: "INVITE",
    title: "Workspace Invitation",
    message: `You have been invited to a new workspace!`,
    link: `/workspaces/${workspaceId}`,
  });

  SocketHelper.joinRoomForUser(user.id, workspaceId);

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

const getWorkspaceById = async (id: string) => {
  const result = await prisma.workspace.findUnique({
    where: { id },
    include: {
      _count: {
        select: { members: true, goals: true },
      },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found!");
  }

  return result;
};

const updateWorkspace = async (id: string, userId: string, payload: any) => {
  const result = await prisma.workspace.update({
    where: { id },
    data: payload,
  });

  await AuditLogServices.createLog({
    action: "WORKSPACE_UPDATED",
    entityType: "WORKSPACE",
    entityId: id,
    userId,
    workspaceId: id,
    changes: payload,
  });

  return result;
};

const deleteWorkspace = async (id: string, userId: string) => {
  await AuditLogServices.createLog({
    action: "WORKSPACE_DELETED",
    entityType: "WORKSPACE",
    entityId: id,
    userId,
    workspaceId: id,
    changes: { deleted: true },
  });

  await prisma.workspace.delete({
    where: { id },
  });
};

const removeMember = async (workspaceId: string, userId: string) => {
  const member = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
  });

  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found in this workspace!");
  }

  await prisma.workspaceMember.delete({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
  });
};

export const WorkspaceServices = {
  createWorkspace,
  getMyWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  inviteMember,
  getWorkspaceMembers,
  removeMember,
  exportWorkspaceData,
};
