import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AnalyticsServices } from "./analytics.service";

const getWorkspaceSummary = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await AnalyticsServices.getWorkspaceSummary(workspaceId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Workspace summary fetched successfully!",
    data: result,
  });
});

const getGoalsChartData = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await AnalyticsServices.getGoalsChartData(workspaceId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Goals chart data fetched successfully!",
    data: result,
  });
});

export const AnalyticsController = {
  getWorkspaceSummary,
  getGoalsChartData,
};
