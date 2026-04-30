import prisma from "../../../shared/prisma";

const createGoal = async (userId: string, payload: any) => {
  const result = await prisma.goal.create({
    data: {
      ...payload,
      ownerId: userId,
    },
    include: {
      milestones: true,
    },
  });

  return result;
};

const getWorkspaceGoals = async (workspaceId: string) => {
  const result = await prisma.goal.findMany({
    where: { workspaceId },
    include: {
      owner: {
        select: {
          id: true,
          fullName: true,
          avatar: true,
        },
      },
      milestones: true,
    },
  });

  return result;
};

const updateGoalStatus = async (goalId: string, status: any) => {
  const result = await prisma.goal.update({
    where: { id: goalId },
    data: { status },
  });

  return result;
};

const addMilestone = async (goalId: string, payload: any) => {
  const result = await prisma.milestone.create({
    data: {
      ...payload,
      goalId,
    },
  });

  return result;
};

const updateMilestoneProgress = async (milestoneId: string, progress: number) => {
  const result = await prisma.milestone.update({
    where: { id: milestoneId },
    data: { progress },
  });

  return result;
};

export const GoalServices = {
  createGoal,
  getWorkspaceGoals,
  updateGoalStatus,
  addMilestone,
  updateMilestoneProgress,
};
