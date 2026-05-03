import { getNotificationsAction } from "@/actions/notification.actions";
import { NotificationsPage } from "@/components/modules/notification/NotificationsPage";
import { redirect } from "next/navigation";

export default async function Page() {
  const result = await getNotificationsAction();
  
  if (!result?.success) {
    redirect("/dashboard");
  }

  const notifications = result.data?.notifications || [];
  const unreadCount = result.data?.unreadCount || 0;

  return <NotificationsPage notifications={notifications} unreadCount={unreadCount} />;
}
