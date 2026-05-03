import { AnnouncementService } from "@/services/announcement.service";
import { AnnouncementFeed } from "@/components/modules/announcements/AnnouncementFeed";
import { CreateAnnouncementForm } from "@/components/modules/announcements/CreateAnnouncementForm";
import { getCurrentWorkspace } from "@/lib/workspace";

export default async function AnnouncementsPage() {
  const currentWorkspace = await getCurrentWorkspace();
  const workspaceId = currentWorkspace?.id;

  if (!workspaceId) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Select or create a workspace to view announcements.
      </div>
    );
  }

  const response = await AnnouncementService.getAnnouncements(workspaceId);
  const announcements = response.success ? response.data || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <CreateAnnouncementForm workspaceId={workspaceId} />
      </div>
      <AnnouncementFeed announcements={announcements} />
    </div>
  );
}
