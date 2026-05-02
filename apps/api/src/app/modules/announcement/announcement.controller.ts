import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AnnouncementServices } from "./announcement.service";

const createAnnouncement = catchAsync(async (req: Request, res: Response) => {
  const result = await AnnouncementServices.createAnnouncement((req as any).user.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Announcement created successfully!",
    data: result,
  });
});

const getWorkspaceAnnouncements = catchAsync(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const result = await AnnouncementServices.getWorkspaceAnnouncements(workspaceId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Announcements fetched successfully!",
    data: result,
  });
});

const togglePin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isPinned } = req.body;
  const result = await AnnouncementServices.togglePin(id as string, isPinned);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Announcement pin status updated!",
    data: result,
  });
});

const addComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const result = await AnnouncementServices.addComment((req as any).user.id, id as string, content);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment added successfully!",
    data: result,
  });
});

const addReaction = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { emoji } = req.body;
  const result = await AnnouncementServices.addReaction((req as any).user.id, id as string, emoji);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reaction added successfully!",
    data: result,
  });
});

const updateAnnouncement = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AnnouncementServices.updateAnnouncement(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Announcement updated successfully!",
    data: result,
  });
});

const deleteAnnouncement = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AnnouncementServices.deleteAnnouncement(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Announcement deleted successfully!",
  });
});

export const AnnouncementController = {
  createAnnouncement,
  getWorkspaceAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  togglePin,
  addComment,
  addReaction,
};
