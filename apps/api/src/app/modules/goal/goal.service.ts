import prisma from "../../../shared/prisma";
import { ActivityServices } from "../activity/activity.service";
import { NotificationServices } from "../notification/notification.service";

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

  await ActivityServices.createActivity({
    type: "GOAL_CREATED",
    content: `New goal created: ${result.title}`,
    userId,
    workspaceId: result.workspaceId,
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

const updateGoal = async (id: string, payload: any) => {
  const result = await prisma.goal.update({
    where: { id },
    data: payload,
  });

  await ActivityServices.createActivity({
    type: "GOAL_UPDATED",
    content: `Goal updated: ${result.title} (Status: ${result.status})`,
    userId: result.ownerId,
    workspaceId: result.workspaceId,
  });

  if (payload.status === "DONE") {
    await NotificationServices.createNotification({
      userId: result.ownerId,
      type: "GOAL_COMPLETED",
      title: "Goal Completed!",
      message: `Congratulations! The goal "${result.title}" has been marked as completed.`,
      link: `/workspaces/${result.workspaceId}/goals/${result.id}`,
    });
  }

  return result;
};

const deleteGoal = async (id: string) => {
  const result = await prisma.goal.delete({
    where: { id },
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

const updateMilestone = async (id: string, payload: any) => {
  const result = await prisma.milestone.update({
    where: { id },
    data: payload,
    include: { goal: true },
  });

  if (payload.progress === 100) {
    await ActivityServices.createActivity({
      type: "MILESTONE_COMPLETED",
      content: `Milestone reached: ${result.title} in goal "${result.goal.title}"`,
      userId: result.goal.ownerId,
      workspaceId: result.goal.workspaceId,
    });

    await NotificationServices.createNotification({
      userId: result.goal.ownerId,
      type: "MILESTONE",
      title: "Milestone Reached",
      message: `The milestone "${result.title}" has been reached!`,
      link: `/workspaces/${result.goal.workspaceId}/goals/${result.goalId}`,
    });
  }

  return result;
};

export const GoalServices = {
  createGoal,
  getWorkspaceGoals,
  updateGoal,
  deleteGoal,
  addMilestone,
  updateMilestone,
};
