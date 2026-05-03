import { $fetch } from "@/lib/fetch";
import { AnalyticsResponse, GoalChartResponse } from "@/types/analytics";

export class AnalyticsService {
  static async getSummary(workspaceId: string): Promise<AnalyticsResponse> {
    const response = await $fetch.get<AnalyticsResponse>(`/analytics/summary/${workspaceId}`, {
      cache: "force-cache",
      next: { tags: ["analytics", `analytics:${workspaceId}`] },
    });
    return response || { success: false, data: { totalGoals: 0, completedThisWeek: 0, overdueCount: 0, activeMembers: 0 } };
  }

  static async getGoalChart(workspaceId: string): Promise<GoalChartResponse> {
    const response = await $fetch.get<GoalChartResponse>(`/analytics/goals-chart/${workspaceId}`, {
      cache: "force-cache",
      next: { tags: ["analytics", `analytics:${workspaceId}`] },
    });
    return response || { success: false, data: [] };
  }
}
