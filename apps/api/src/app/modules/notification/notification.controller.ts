import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NotificationServices } from "./notification.service";

const getMyNotifications = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationServices.getMyNotifications((req as any).user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notifications fetched successfully!",
    data: result,
  });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NotificationServices.markAsRead(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification marked as read!",
    data: result,
  });
});

const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  await NotificationServices.markAllAsRead((req as any).user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All notifications marked as read!",
  });
});

export const NotificationController = {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
};
