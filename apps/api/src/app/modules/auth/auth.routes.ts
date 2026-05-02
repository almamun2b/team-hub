import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { UserController } from "../user/user.controller";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logoutUser);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MEMBER),
  UserController.getMyProfile
);

router.patch(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MEMBER),
  fileUploader.upload.single("file"),
  UserController.updateMyProfile
);

export const AuthRoutes = router;
