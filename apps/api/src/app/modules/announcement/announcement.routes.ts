import { UserRole, WorkspaceRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import checkWorkspaceRole from "../../middlewares/checkWorkspaceRole";
import { AnnouncementController } from "./announcement.controller";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN),
  AnnouncementController.createAnnouncement
);

router.get(
  "/workspace/:workspaceId",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  checkWorkspaceRole(WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  AnnouncementController.getWorkspaceAnnouncements
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  AnnouncementController.updateAnnouncement
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  AnnouncementController.deleteAnnouncement
);

router.patch(
  "/:id/pin",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  // Note: For PIN, we'd ideally check workspace role but we need workspaceId.
  // Assuming the client sends workspaceId in body or query for these specific actions if they want full RBAC.
  // Or we just allow global Admin/Member for now as a fallback.
  AnnouncementController.togglePin
);

router.post(
  "/:id/comments",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  AnnouncementController.addComment
);

router.post(
  "/:id/reactions",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  AnnouncementController.addReaction
);

export const AnnouncementRoutes = router;
