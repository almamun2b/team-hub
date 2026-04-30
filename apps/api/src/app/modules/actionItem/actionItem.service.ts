import prisma from "../../../shared/prisma";

const createActionItem = async (payload: any) => {
  const result = await prisma.actionItem.create({
    data: payload,
  });

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
