import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { WorkspaceRoutes } from "../modules/workspace/workspace.routes";
import { GoalRoutes } from "../modules/goal/goal.routes";
import { AnnouncementRoutes } from "../modules/announcement/announcement.routes";
import { ActionItemRoutes } from "../modules/actionItem/actionItem.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/workspaces",
    route: WorkspaceRoutes,
  },
  {
    path: "/goals",
    route: GoalRoutes,
  },
  {
    path: "/announcements",
    route: AnnouncementRoutes,
  },
  {
    path: "/action-items",
    route: ActionItemRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
