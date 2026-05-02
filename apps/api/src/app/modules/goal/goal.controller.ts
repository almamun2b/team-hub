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

const updateGoal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GoalServices.updateGoal(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Goal updated successfully!",
    data: result,
  });
});

const deleteGoal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await GoalServices.deleteGoal(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Goal deleted successfully!",
  });
});

const addMilestone = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GoalServices.addMilestone(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Milestone added successfully!",
    data: result,
  });
});

const updateMilestone = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GoalServices.updateMilestone(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Milestone updated successfully!",
    data: result,
  });
});

export const GoalController = {
  createGoal,
  getWorkspaceGoals,
  updateGoal,
  deleteGoal,
  addMilestone,
  updateMilestone,
};
