import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { NotificationController } from "./notification.controller";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  NotificationController.getMyNotifications
);

router.patch(
  "/:id/read",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  NotificationController.markAsRead
);

router.patch(
  "/read-all",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  NotificationController.markAllAsRead
);

export const NotificationRoutes = router;
