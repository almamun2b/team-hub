import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { ActionItemController } from "./actionItem.controller";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  ActionItemController.createActionItem
);

router.get(
  "/workspace/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  ActionItemController.getWorkspaceActionItems
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  ActionItemController.updateActionItem
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  ActionItemController.deleteActionItem
);

export const ActionItemRoutes = router;
