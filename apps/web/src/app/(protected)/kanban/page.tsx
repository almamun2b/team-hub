import { ActionItemService } from "@/services/actionItem.service";
import { KanbanBoard } from "@/components/modules/kanban/KanbanBoard";
import { CreateActionItemForm } from "@/components/modules/kanban/CreateActionItemForm";
import { getCurrentWorkspace } from "@/lib/workspace";

export default async function KanbanPage() {
  const currentWorkspace = await getCurrentWorkspace();
  const workspaceId = currentWorkspace?.id;

  if (!workspaceId) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Select or create a workspace to manage action items.
      </div>
    );
  }

  const response = await ActionItemService.getActionItems(workspaceId);
  const actionItems = response.success ? response.data || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <CreateActionItemForm workspaceId={workspaceId} />
      </div>
      <KanbanBoard actionItems={actionItems} />
    </div>
  );
}
