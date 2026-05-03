import { getCurrentWorkspace } from "@/lib/workspace";
import { AnalyticsSection } from "@/components/modules/dashboard/AnalyticsSection";

export default async function AnalyticsPage() {
  const currentWorkspace = await getCurrentWorkspace();

  if (!currentWorkspace?.id) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Select or create a workspace to view analytics.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <AnalyticsSection workspaceId={currentWorkspace.id} />
    </div>
  );
}
