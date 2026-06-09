import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
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

const searchUsers = async (searchTerm: string, currentUserId?: string) => {
  const query = searchTerm?.trim();
  if (!query) {
    return [];
  }

  const where: any = {
    isDeleted: false,
    status: "ACTIVE",
    OR: [
      { email: { contains: query, mode: "insensitive" } },
      { fullName: { contains: query, mode: "insensitive" } },
    ],
  };

  if (currentUserId) {
    where.NOT = { id: currentUserId };
  }

  const result = await prisma.user.findMany({
    where,
    select: {
      id: true,
      email: true,
      fullName: true,
      avatar: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    take: 10,
  });

  return result;
};

export const UserServices = {
  getMyProfile,
  updateMyProfile,
  searchUsers,
};
