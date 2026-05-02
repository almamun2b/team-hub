import { UserRole, WorkspaceRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import checkWorkspaceRole from "../../middlewares/checkWorkspaceRole";
import { AnalyticsController } from "./analytics.controller";

const router = express.Router();

router.get(
  "/summary/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  AnalyticsController.getWorkspaceSummary
);

router.get(
  "/goals-chart/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  AnalyticsController.getGoalsChartData
);

export const AnalyticsRoutes = router;
