"use client";

import { useEffect, useState } from "react";
import { AnalyticsService } from "@/services/analytics.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsCharts } from "@/components/modules/dashboard/AnalyticsCharts";

interface AnalyticsSectionProps {
  workspaceId: string;
}

interface SummaryData {
  totalGoals: number;
  completedThisWeek: number;
  overdueCount: number;
  activeMembers: number;
}

export function AnalyticsSection({ workspaceId }: AnalyticsSectionProps) {
  const [summary, setSummary] = useState<SummaryData>({
    totalGoals: 0,
    completedThisWeek: 0,
    overdueCount: 0,
    activeMembers: 0,
  });
  const [chartData, setChartData] = useState<Array<{ status: string; count: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const [summaryResponse, chartResponse] = await Promise.all([
        AnalyticsService.getSummary(workspaceId),
        AnalyticsService.getGoalChart(workspaceId),
      ]);

      if (summaryResponse.success && summaryResponse.data) {
        setSummary(summaryResponse.data);
      }

      if (chartResponse.success && chartResponse.data) {
        setChartData(chartResponse.data);
      }

      setIsLoading(false);
    };

    fetchAnalytics();
  }, [workspaceId]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <div className="grid gap-4 grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalGoals}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.completedThisWeek}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{summary.overdueCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.activeMembers}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Goal Status Distribution</h2>
        {isLoading ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              Loading analytics...
            </CardContent>
          </Card>
        ) : chartData.length > 0 ? (
          <AnalyticsCharts chartData={chartData} />
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                <p>No goal data available</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
