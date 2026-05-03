import prisma from "../../../shared/prisma";
import { startOfWeek, endOfWeek } from "date-fns";

const getWorkspaceSummary = async (workspaceId: string) => {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);

  const totalGoals = await prisma.goal.count({
    where: { workspaceId },
  });

  const completedThisWeek = await prisma.goal.count({
    where: {
      workspaceId,
      status: "DONE",
      updatedAt: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
  });

  const overdueCount = await prisma.goal.count({
    where: {
      workspaceId,
      status: { not: "DONE" },
      dueDate: {
        lt: now,
      },
    },
  });

  const totalActions = await prisma.actionItem.count({
    where: { workspaceId },
  });

  const activeMembers = await prisma.workspaceMember.count({
    where: { workspaceId },
  });

  const actionsCompletedThisWeek = await prisma.actionItem.count({
    where: {
      workspaceId,
      status: "DONE",
      updatedAt: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
  });

  return {
    totalGoals,
    completedThisWeek,
    overdueCount,
    activeMembers,
    totalActions,
    actionsCompletedThisWeek,
  };
};

const getGoalsChartData = async (workspaceId: string) => {
  // Simple aggregation for chart (grouped by week or status)
  // For demonstration, let's return counts by status
  const goals = await prisma.goal.groupBy({
    by: ["status"],
    where: { workspaceId },
    _count: {
      id: true,
    },
  });

  return goals.map((g) => ({
    status: g.status,
    count: g._count.id,
  }));
};

export const AnalyticsServices = {
  getWorkspaceSummary,
  getGoalsChartData,
};
