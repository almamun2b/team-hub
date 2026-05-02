import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { WorkspaceServices } from "./workspace.service";

const createWorkspace = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkspaceServices.createWorkspace((req as any).user.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Workspace created successfully!",
    data: result,
  });
});

const getMyWorkspaces = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkspaceServices.getMyWorkspaces((req as any).user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Workspaces fetched successfully!",
    data: result,
  });
});

const inviteMember = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await WorkspaceServices.inviteMember(workspaceId as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member invited successfully!",
    data: result,
  });
});

const getWorkspaceMembers = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await WorkspaceServices.getWorkspaceMembers(workspaceId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Workspace members fetched successfully!",
    data: result,
  });
});

const exportWorkspaceData = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await WorkspaceServices.exportWorkspaceData(workspaceId as string);

  res.header("Content-Type", "text/csv");
  res.attachment(`workspace-${workspaceId}-data.csv`);
  res.send(result);
});

const getWorkspaceById = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await WorkspaceServices.getWorkspaceById(workspaceId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Workspace details fetched successfully!",
    data: result,
  });
});

const updateWorkspace = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await WorkspaceServices.updateWorkspace(
    workspaceId as string,
    (req as any).user.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Workspace updated successfully!",
    data: result,
  });
});

const deleteWorkspace = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  await WorkspaceServices.deleteWorkspace(workspaceId as string, (req as any).user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Workspace deleted successfully!",
  });
});

const removeMember = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId, userId } = req.params;
  await WorkspaceServices.removeMember(workspaceId as string, userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member removed successfully!",
  });
});

export const WorkspaceController = {
  createWorkspace,
  getMyWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  inviteMember,
  getWorkspaceMembers,
  removeMember,
  exportWorkspaceData,
};
