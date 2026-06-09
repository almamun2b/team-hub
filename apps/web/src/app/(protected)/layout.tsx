import { getMeAction } from "@/actions/auth.actions";
import { getNotificationsAction } from "@/actions/notification.actions";
import { WorkspaceService } from "@/services/workspace.service";
import { getCurrentWorkspace } from "@/lib/workspace";
import { redirect } from "next/navigation";
import CommonBreadcrumb from "@/components/modules/dashboard/CommonBreadcrumb";
import { AppSidebar } from "@/components/modules/dashboard/app-sidebar";
import { WorkspaceSwitcher } from "@/components/shared/workspace-switcher";
import { NotificationCenter } from "@/components/modules/notification/NotificationCenter";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getMeAction();
  if (!userInfo?.success || !userInfo.data) {
    redirect("/login");
  }

  const notificationsData = await getNotificationsAction();
  const notifications = notificationsData?.data?.notifications || [];
  const unreadCount = notificationsData?.data?.unreadCount || 0;
  const workspacesData = await WorkspaceService.getWorkspaces();
  const workspaces = workspacesData?.success ? workspacesData.data || [] : [];
  const currentWorkspace = await getCurrentWorkspace();

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo.data} />
      <SidebarInset>
        <header className="sticky top-0 bg-background flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b z-20">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <CommonBreadcrumb />
            </div>
            <div className="flex items-center gap-2">
              <NotificationCenter initialNotifications={notifications} unreadCount={unreadCount} />
              <WorkspaceSwitcher
                initialWorkspaces={workspaces}
                initialCurrentWorkspace={currentWorkspace}
              />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
