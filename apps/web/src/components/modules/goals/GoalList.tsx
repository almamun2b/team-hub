"use client";

import {
  createMilestoneAction,
  deleteGoalAction,
  updateGoalAction,
  updateMilestoneAction,
} from "@/actions/goal.actions";
import { Goal } from "@/types/goal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface GoalListProps {
  goals: Goal[];
}

export function GoalList({ goals }: GoalListProps) {
  if (goals.length === 0) {
    return (
      <div className="text-center py-8">
        <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No goals yet</h3>
        <p className="text-muted-foreground">Create your first goal to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}

function GoalCard({ goal }: { goal: Goal }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description || "");
  const [status, setStatus] = useState(goal.status);
  const [dueDate, setDueDate] = useState(
    goal.dueDate ? new Date(goal.dueDate).toISOString().slice(0, 10) : ""
  );
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [milestoneProgress, setMilestoneProgress] = useState("0");
  const [addMilestoneOpen, setAddMilestoneOpen] = useState(false);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("workspaceId", goal.workspaceId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    if (dueDate) formData.append("dueDate", dueDate);

    const result = await updateGoalAction(goal.id, {}, formData);
    if (!result?.success) {
      toast.error(result?.error || "Failed to update goal");
      return;
    }

    toast.success("Goal updated");
    setOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    const ok = window.confirm("Delete this goal?");
    if (!ok) return;
    const result = await deleteGoalAction({ goalId: goal.id, workspaceId: goal.workspaceId });
    if (!result?.success) {
      toast.error(result?.error || "Failed to delete goal");
      return;
    }
    toast.success("Goal deleted");
    router.refresh();
  };

  const handleCreateMilestone = async () => {
    if (!milestoneTitle.trim()) {
      toast.error("Milestone title is required");
      return;
    }

    const formData = new FormData();
    formData.append("workspaceId", goal.workspaceId);
    formData.append("title", milestoneTitle);
    formData.append("progress", milestoneProgress);

    const result = await createMilestoneAction(goal.id, {}, formData);
    if (!result?.success) {
      toast.error(result?.error || "Failed to create milestone");
      return;
    }

    toast.success("Milestone added");
    setMilestoneTitle("");
    setMilestoneProgress("0");
    setAddMilestoneOpen(false);
    router.refresh();
  };

  const handleUpdateMilestone = async (milestoneId: string, nextTitle: string, nextProgress: number) => {
    const formData = new FormData();
    formData.append("workspaceId", goal.workspaceId);
    formData.append("title", nextTitle);
    formData.append("progress", String(nextProgress));

    const result = await updateMilestoneAction(milestoneId, {}, formData);
    if (!result?.success) {
      toast.error(result?.error || "Failed to update milestone");
      return;
    }

    toast.success("Milestone updated");
    router.refresh();
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{goal.title}</span>
          <Badge variant={goal.status === "DONE" ? "default" : "secondary"}>
            {goal.status.replace("_", " ")}
          </Badge>
        </CardTitle>
        {goal.description && <p className="text-sm text-muted-foreground">{goal.description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={goal.owner.avatar} />
            <AvatarFallback>{goal.owner.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{goal.owner.fullName}</span>
        </div>

        {goal.dueDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Due {new Date(goal.dueDate).toLocaleDateString()}
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Milestones</h4>
          {goal.milestones.length === 0 ? (
            <p className="text-xs text-muted-foreground">No milestones yet.</p>
          ) : (
            goal.milestones.map((milestone) => (
              <MilestoneRow
                key={milestone.id}
                milestone={milestone}
                onSave={handleUpdateMilestone}
              />
            ))
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <Dialog open={addMilestoneOpen} onOpenChange={setAddMilestoneOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary">Add Milestone</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Milestone</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  placeholder="Milestone title"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={milestoneProgress}
                  onChange={(e) => setMilestoneProgress(e.target.value)}
                  placeholder="Progress %"
                />
                <Button onClick={handleCreateMilestone} className="w-full">Create Milestone</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
                <Select value={status} onValueChange={(v) => setStatus(v as Goal["status"])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <Button onClick={handleUpdate} className="w-full">Update Goal</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm" variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MilestoneRow({
  milestone,
  onSave,
}: {
  milestone: Goal["milestones"][number];
  onSave: (id: string, title: string, progress: number) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(milestone.title);
  const [progress, setProgress] = useState(String(milestone.progress));

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{milestone.title}</span>
        <div className="flex items-center gap-2">
          <span>{milestone.progress}%</span>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Milestone</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                />
                <Button
                  onClick={async () => {
                    await onSave(milestone.id, title, Number(progress));
                    setOpen(false);
                  }}
                  className="w-full"
                >
                  Save Milestone
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Progress value={milestone.progress} className="h-2" />
    </div>
  );
}
