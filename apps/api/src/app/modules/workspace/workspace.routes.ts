import { UserRole, WorkspaceRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import checkWorkspaceRole from "../../middlewares/checkWorkspaceRole";
import { WorkspaceController } from "./workspace.controller";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  WorkspaceController.getMyWorkspaces
);

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  WorkspaceController.createWorkspace
);

router.get(
  "/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  WorkspaceController.getWorkspaceById
);

router.patch(
  "/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN),
  WorkspaceController.updateWorkspace
);

router.delete(
  "/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN),
  WorkspaceController.deleteWorkspace
);

router.post(
  "/:workspaceId/invite",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN),
  WorkspaceController.inviteMember
);

router.get(
  "/:workspaceId/members",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  WorkspaceController.getWorkspaceMembers
);

router.delete(
  "/:workspaceId/members/:userId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN),
  WorkspaceController.removeMember
);

router.get(
  "/:workspaceId/export",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN),
  WorkspaceController.exportWorkspaceData
);

export const WorkspaceRoutes = router;
