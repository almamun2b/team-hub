import prisma from "../../../shared/prisma";
import { SocketHelper } from "../../../helpers/socketHelper";
import { ActivityServices } from "../activity/activity.service";
import { NotificationServices } from "../notification/notification.service";

const createActionItem = async (payload: any) => {
  const result = await prisma.actionItem.create({
    data: payload,
  });

  if (payload.assigneeId) {
    await NotificationServices.createNotification({
      userId: payload.assigneeId,
      type: "ACTION_ASSIGNED",
      title: "New Action Item Assigned",
      message: `You have been assigned a new action item: ${payload.title}`,
      link: `/workspaces/${payload.workspaceId}/actions/${result.id}`,
    });

    await ActivityServices.createActivity({
      type: "ACTION_ITEM_ASSIGNED",
      content: `Action item assigned: ${result.title}`,
      userId: payload.assigneeId,
      workspaceId: result.workspaceId,
    });
  }

  return result;
};

const getWorkspaceActionItems = async (workspaceId: string) => {
  const result = await prisma.actionItem.findMany({
    where: { workspaceId },
    include: {
      assignee: {
        select: { id: true, fullName: true, avatar: true },
      },
      goal: {
        select: { id: true, title: true },
      },
    },
  });

  return result;
};

const updateActionItem = async (id: string, payload: any) => {
  const result = await prisma.actionItem.update({
    where: { id },
    data: payload,
  });

  // Real-time broadcast
  SocketHelper.broadcastToWorkspace(result.workspaceId, "action_item_updated", result);

  if (payload.status === "DONE") {
    await ActivityServices.createActivity({
      type: "ACTION_ITEM_COMPLETED",
      content: `Action item completed: ${result.title}`,
      userId: result.assigneeId || "system",
      workspaceId: result.workspaceId,
    });
  }

  return result;
};

const deleteActionItem = async (id: string) => {
  const result = await prisma.actionItem.delete({
    where: { id },
  });

  return result;
};

export const ActionItemServices = {
  createActionItem,
  getWorkspaceActionItems,
  updateActionItem,
  deleteActionItem,
};
