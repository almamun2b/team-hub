import { UserRole, WorkspaceRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import checkWorkspaceRole from "../../middlewares/checkWorkspaceRole";
import { GoalController } from "./goal.controller";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  GoalController.createGoal
);

router.get(
  "/workspace/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  GoalController.getWorkspaceGoals
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  // For update/delete, we usually check workspace role but we need the workspaceId.
  // Since it's a PATCH /:id, we might need a more complex check or just rely on global role if simplicity is preferred.
  // For now, I'll stick to global auth for these until I implement a way to lookup workspaceId from GoalId.
  GoalController.updateGoal
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  GoalController.deleteGoal,
);

router.post(
  "/:id/milestones",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  GoalController.addMilestone
);

router.patch(
  "/:id/milestones",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  GoalController.updateMilestone,
);

export const GoalRoutes = router;
