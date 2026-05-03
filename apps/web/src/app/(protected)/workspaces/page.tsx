import { WorkspaceService } from "@/services/workspace.service";
import { WorkspaceManager } from "@/components/modules/dashboard/WorkspaceManager";

export default async function WorkspacesPage() {
  const response = await WorkspaceService.getWorkspaces();
  const workspaces = response.success ? response.data || [] : [];

  return (
    <WorkspaceManager initialWorkspaces={workspaces} />
  );
}
