import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { WorkspaceController } from "./workspace.controller";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  WorkspaceController.createWorkspace
);

router.get(
  "/my-workspaces",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  WorkspaceController.getMyWorkspaces
);

router.post(
  "/:workspaceId/invite",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), // Only admins can invite
  WorkspaceController.inviteMember
);

router.get(
  "/:workspaceId/members",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  WorkspaceController.getWorkspaceMembers
);

router.get(
  "/:workspaceId/export",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  WorkspaceController.exportWorkspaceData
);

export const WorkspaceRoutes = router;
