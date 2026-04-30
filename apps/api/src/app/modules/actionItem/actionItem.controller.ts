import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ActionItemServices } from "./actionItem.service";

const createActionItem = catchAsync(async (req: Request, res: Response) => {
  const result = await ActionItemServices.createActionItem(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Action item created successfully!",
    data: result,
  });
});

const getWorkspaceActionItems = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await ActionItemServices.getWorkspaceActionItems(workspaceId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Action items fetched successfully!",
    data: result,
  });
});

const updateActionItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ActionItemServices.updateActionItem(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Action item updated successfully!",
    data: result,
  });
});

const deleteActionItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ActionItemServices.deleteActionItem(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Action item deleted successfully!",
  });
});

export const ActionItemController = {
  createActionItem,
  getWorkspaceActionItems,
  updateActionItem,
  deleteActionItem,
};
