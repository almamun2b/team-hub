import { WorkspaceRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import prisma from "../../shared/prisma";
import ApiError from "../errors/ApiError";

const checkWorkspaceRole = (...roles: WorkspaceRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workspaceId = req.params.workspaceId || req.body.workspaceId || req.query.workspaceId;
      const user = (req as any).user;

      // Allow Super Admin to bypass workspace checks
      if (user.role === "SUPER_ADMIN") {
        return next();
      }

      if (!workspaceId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Workspace ID is required!");
      }

      const member = await prisma.workspaceMember.findUnique({
        where: {
          workspaceId_userId: {
            workspaceId: workspaceId as string,
            userId: user.id,
          },
        },
      });

      if (!member) {
        throw new ApiError(httpStatus.FORBIDDEN, "You are not a member of this workspace!");
      }

      if (roles.length && !roles.includes(member.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Insufficient permissions in this workspace!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default checkWorkspaceRole;
