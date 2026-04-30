import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { GoalController } from "./goal.controller";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  GoalController.createGoal
);

router.get(
  "/workspace/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  GoalController.getWorkspaceGoals
);

router.patch(
  "/:goalId/status",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  GoalController.updateGoalStatus
);

router.post(
  "/:goalId/milestones",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  GoalController.addMilestone
);

router.patch(
  "/milestones/:milestoneId/progress",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  GoalController.updateMilestoneProgress
);

export const GoalRoutes = router;
