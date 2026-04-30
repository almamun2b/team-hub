import prisma from "../../../shared/prisma";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";

const getMyProfile = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: { id: userId, isDeleted: false },
    select: {
      id: true,
      email: true,
      fullName: true,
      avatar: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  return result;
};

const updateMyProfile = async (userId: string, payload: any) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      email: true,
      fullName: true,
      avatar: true,
      role: true,
      status: true,
    },
  });

  return result;
};

export const UserServices = {
  getMyProfile,
  updateMyProfile,
};
