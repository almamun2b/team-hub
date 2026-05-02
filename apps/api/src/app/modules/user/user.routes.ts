import express from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/fileUploader";

const router = express.Router();

router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  UserController.getMyProfile
);

router.patch(
  "/update-me",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  UserController.updateMyProfile,
);

export const UserRoutes = router;
