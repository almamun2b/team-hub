import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { fileUploader } from "../../../helpers/fileUploader";
import { UserServices } from "./user.service";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getMyProfile((req as any).user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile fetched successfully!",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  let payload = req.body;

  // Handle FormData where data might be a stringified JSON
  if (req.body.data) {
    payload = JSON.parse(req.body.data);
  }

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file as any);
    payload.avatar = uploadResult.secure_url;
  }

  const result = await UserServices.updateMyProfile((req as any).user.id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully!",
    data: result,
  });
});

export const UserController = {
  getMyProfile,
  updateMyProfile,
};
