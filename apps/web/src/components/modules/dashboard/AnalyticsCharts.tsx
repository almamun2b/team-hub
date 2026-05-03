"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsChartsProps {
  chartData: Array<{ status: string; count: number }>;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function AnalyticsCharts({ chartData }: AnalyticsChartsProps) {
  return (
    <Card>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ payload }) => `${payload.status}: ${payload.count}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
