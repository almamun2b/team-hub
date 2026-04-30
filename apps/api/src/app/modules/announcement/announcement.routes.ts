import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { AnnouncementController } from "./announcement.controller";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), // Only admins can create
  AnnouncementController.createAnnouncement
);

router.get(
  "/workspace/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  AnnouncementController.getWorkspaceAnnouncements
);

router.patch(
  "/:id/pin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AnnouncementController.togglePin
);

router.post(
  "/:announcementId/comments",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  AnnouncementController.addComment
);

router.post(
  "/:announcementId/reactions",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  AnnouncementController.addReaction
);

export const AnnouncementRoutes = router;
