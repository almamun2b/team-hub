export interface AnalyticsSummary {
  totalGoals: number;
  completedThisWeek: number;
  overdueCount: number;
  activeMembers: number;
}

export interface GoalChartData {
  status: string;
  count: number;
}

export interface AnalyticsResponse {
  success: boolean;
  data: AnalyticsSummary;
}

export interface GoalChartResponse {
  success: boolean;
  data: GoalChartData[];
}