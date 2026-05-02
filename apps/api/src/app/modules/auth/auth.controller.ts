import { Request, Response } from "express";
import httpStatus from "http-status";
import { env } from "../../../config/env";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  const cookieOptions = {
    secure: true,
    httpOnly: true,
    sameSite: "none" as const,
  };

  // Set tokens in httpOnly cookies
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.cookie("accessToken", accessToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: {
      accessToken,
      refreshToken,
      user,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken: oldRefreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(oldRefreshToken);
  const { accessToken } = result;

  const cookieOptions = {
    secure: true,
    httpOnly: true,
    sameSite: "none" as const,
  };

  res.cookie("accessToken", accessToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Token refreshed successfully!",
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged out successfully!",
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
};
