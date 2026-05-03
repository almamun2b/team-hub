import { GoalService } from "@/services/goal.service";
import { GoalList } from "@/components/modules/goals/GoalList";
import { CreateGoalForm } from "@/components/modules/goals/CreateGoalForm";
import { getCurrentWorkspace } from "@/lib/workspace";

export default async function GoalsPage() {
  const currentWorkspace = await getCurrentWorkspace();
  const workspaceId = currentWorkspace?.id;

  if (!workspaceId) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Select or create a workspace to manage goals.
      </div>
    );
  }

  const response = await GoalService.getGoals(workspaceId);
  const goals = response.success ? response.data || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Goals</h1>
        <CreateGoalForm workspaceId={workspaceId} />
      </div>
      <GoalList goals={goals} />
    </div>
  );
}
