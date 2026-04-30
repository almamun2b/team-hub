import express from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  UserController.getMyProfile
);

router.patch(
  "/update-me",
  auth(UserRole.ADMIN, UserRole.MEMBER, UserRole.SUPER_ADMIN),
  UserController.updateMyProfile
);

export const UserRoutes = router;
