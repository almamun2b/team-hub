import { UserRole } from "@prisma/client";
import express from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = express.Router();

router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  UserController.getMyProfile,
);

router.get(
  "/search",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  UserController.searchUsers,
);

router.patch(
  "/update-me",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  UserController.updateMyProfile,
);

export const UserRoutes = router;
