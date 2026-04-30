import { UserStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { env } from "../../../config/env";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const registerUser = async (payload: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, "User already exists!");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(env.bcryptSaltRound)
  );

  const newUser = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return newUser;
};

const loginUser = async (payload: any) => {
  const userData = await prisma.user.findUnique({
    where: { email: payload.email, isDeleted: false },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (userData.status !== UserStatus.ACTIVE) {
    throw new ApiError(httpStatus.FORBIDDEN, "User account is not active!");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials!");
  }

  const accessToken = jwtHelpers.generateToken(
    { id: userData.id, email: userData.email, role: userData.role },
    env.jwt.accessTokenSecret as Secret,
    env.jwt.accessTokenExpiresIn
  );

  const refreshToken = jwtHelpers.generateToken(
    { id: userData.id, email: userData.email, role: userData.role },
    env.jwt.refreshTokenSecret as Secret,
    env.jwt.refreshTokenExpiresIn
  );

  const { password, ...user } = userData;

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      env.jwt.refreshTokenSecret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token!");
  }

  const userData = await prisma.user.findUnique({
    where: { id: decodedData.id, isDeleted: false },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const accessToken = jwtHelpers.generateToken(
    { id: userData.id, email: userData.email, role: userData.role },
    env.jwt.accessTokenSecret as Secret,
    env.jwt.accessTokenExpiresIn
  );

  return { accessToken };
};

export const AuthServices = {
  registerUser,
  loginUser,
  refreshToken,
};
