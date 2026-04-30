import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { GoalServices } from "./goal.service";

const createGoal = catchAsync(async (req: Request, res: Response) => {
  const result = await GoalServices.createGoal((req as any).user.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Goal created successfully!",
    data: result,
  });
});

const getWorkspaceGoals = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await GoalServices.getWorkspaceGoals(workspaceId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Goals fetched successfully!",
    data: result,
  });
});

const updateGoalStatus = catchAsync(async (req: Request, res: Response) => {
  const { goalId } = req.params;
  const { status } = req.body;
  const result = await GoalServices.updateGoalStatus(goalId as string, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Goal status updated successfully!",
    data: result,
  });
});

const addMilestone = catchAsync(async (req: Request, res: Response) => {
  const { goalId } = req.params;
  const result = await GoalServices.addMilestone(goalId as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Milestone added successfully!",
    data: result,
  });
});

const updateMilestoneProgress = catchAsync(async (req: Request, res: Response) => {
  const { milestoneId } = req.params;
  const { progress } = req.body;
  const result = await GoalServices.updateMilestoneProgress(milestoneId as string, progress);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Milestone progress updated successfully!",
    data: result,
  });
});

export const GoalController = {
  createGoal,
  getWorkspaceGoals,
  updateGoalStatus,
  addMilestone,
  updateMilestoneProgress,
};
