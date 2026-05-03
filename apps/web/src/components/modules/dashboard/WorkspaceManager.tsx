"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  createWorkspaceInlineAction,
  deleteWorkspaceAction,
  updateWorkspaceAction,
} from "@/actions/workspace.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { WorkspaceService } from "@/services/workspace.service";
import { setCurrentWorkspace } from "@/lib/workspace";
import { useStore } from "@/store/useStore";
import { Workspace } from "@/types/workspace";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";


interface WorkspaceManagerProps {
  initialWorkspaces: Workspace[];
}

export function WorkspaceManager({ initialWorkspaces }: WorkspaceManagerProps) {
  const router = useRouter();
  const {
    currentWorkspace,
    setCurrentWorkspace: setStoreWorkspace,
    setWorkspaces,
  } = useStore();
  const [workspaces, setLocalWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createAccentColor, setCreateAccentColor] = useState("#3B82F6");

  const syncWorkspaces = async () => {
    const fresh = await WorkspaceService.getWorkspaces();
    if (fresh.success && fresh.data) {
      setLocalWorkspaces(fresh.data);
      setWorkspaces(fresh.data);
      if (fresh.data.length > 0 && !currentWorkspace) {
        setStoreWorkspace(fresh.data[0]);
        await setCurrentWorkspace(fresh.data[0]);
      }
    }
  };

  const handleCreate = async () => {
    if (!createName.trim()) {
      toast.error("Workspace name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", createName);
    formData.append("description", createDescription);
    formData.append("accentColor", createAccentColor);
    const result = await createWorkspaceInlineAction({}, formData);
    if (!result?.success || !result.data) {
      toast.error(result?.error || "Failed to create workspace");
      return;
    }

    toast.success("Workspace created");
    setCreateOpen(false);
    setCreateName("");
    setCreateDescription("");
    setCreateAccentColor("#3B82F6");
    const nextWorkspaces = [result.data, ...workspaces];
    setLocalWorkspaces(nextWorkspaces);
    setWorkspaces(nextWorkspaces);
    setStoreWorkspace(result.data);
    await setCurrentWorkspace(result.data);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Workspaces</h1>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create Workspace</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Workspace</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder="Workspace title"
              />
                <Textarea
                  value={createDescription}
                  onChange={(e) => setCreateDescription(e.target.value)}
                  placeholder="Workspace description"
                />
                <Input
                  type="color"
                  value={createAccentColor}
                  onChange={(e) => setCreateAccentColor(e.target.value)}
                />
                <Button onClick={handleCreate} className="w-full">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {workspaces.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            workspace={workspace}
            onWorkspaceUpdated={(updated) => {
              const next = workspaces.map((w) => (w.id === updated.id ? updated : w));
              setLocalWorkspaces(next);
              setWorkspaces(next);
              if (currentWorkspace?.id === updated.id) {
                setStoreWorkspace(updated);
                setCurrentWorkspace(updated);
              }
            }}
            onWorkspaceDeleted={(workspaceId) => {
              const next = workspaces.filter((w) => w.id !== workspaceId);
              setLocalWorkspaces(next);
              setWorkspaces(next);
              if (currentWorkspace?.id === workspaceId) {
                const fallback = next[0] || null;
                setStoreWorkspace(fallback);
                if (fallback) {
                  setCurrentWorkspace(fallback);
                }
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WorkspaceCard({
  workspace,
  onWorkspaceUpdated,
  onWorkspaceDeleted,
}: {
  workspace: Workspace;
  onWorkspaceUpdated: (workspace: Workspace) => void;
  onWorkspaceDeleted: (workspaceId: string) => void;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(workspace.name);
  const [description, setDescription] = useState(workspace.description || "");
  const [accentColor, setAccentColor] = useState(workspace.accentColor || "#3B82F6");

  const currentUserRole = workspace.members.find(member => member.userId === user?.id)?.role;

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("accentColor", accentColor);
    const result = await updateWorkspaceAction(workspace.id, {}, formData);
    if (!result?.success) {
      toast.error(result?.error || "Failed to update workspace");
      return;
    }
    onWorkspaceUpdated({
      ...workspace,
      name,
      description,
      accentColor,
    });
    toast.success("Workspace updated");
    setOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    const result = await deleteWorkspaceAction({ workspaceId: workspace.id });
    if (!result?.success) {
      toast.error(result?.error || "Failed to delete workspace");
      return;
    }
    onWorkspaceDeleted(workspace.id);
    toast.success("Workspace deleted");
    setDeleteOpen(false);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{workspace.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{workspace.description || "No description"}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs">Accent</span>
          <div className="h-5 w-5 rounded border" style={{ backgroundColor: workspace.accentColor }} />
        </div>
        {currentUserRole && (
          <div className="flex items-center gap-2">
            <span className="text-xs">Your Role:</span>
            <Badge variant={currentUserRole === "ADMIN" ? "default" : "secondary"} className="text-xs">
              {currentUserRole.toLowerCase()}
            </Badge>
          </div>
        )}
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Workspace</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
                <Input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                <Button onClick={handleUpdate} className="w-full">Update Workspace</Button>
              </div>
            </DialogContent>
          </Dialog>
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Workspace</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete `{workspace.name}`? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
