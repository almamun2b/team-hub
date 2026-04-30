import prisma from "../../../shared/prisma";

const createActivity = async (payload: any) => {
  const result = await prisma.activity.create({
    data: payload,
  });

  return result;
};

const getWorkspaceActivities = async (workspaceId: string) => {
  const result = await prisma.activity.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, fullName: true, avatar: true },
      },
    },
  });

  return result;
};

export const ActivityServices = {
  createActivity,
  getWorkspaceActivities,
};
