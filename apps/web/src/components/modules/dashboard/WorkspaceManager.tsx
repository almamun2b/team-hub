"use client";

import {
  createWorkspaceInlineAction,
  deleteWorkspaceAction,
  inviteMemberAction,
  updateWorkspaceAction,
} from "@/actions/workspace.actions";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { setCurrentWorkspace } from "@/lib/workspace";
import { searchUsers } from "@/services/user/searchUsers";
import { WorkspaceService } from "@/services/workspace.service";
import { useStore } from "@/store/useStore";
import { User } from "@/types/auth";
import { Workspace, WorkspaceRole } from "@/types/workspace";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  const [localWorkspaces, setLocalWorkspaces] =
    useState<Workspace[]>(initialWorkspaces);
  const displayedWorkspaces =
    localWorkspaces.length > 0 ? localWorkspaces : initialWorkspaces;
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createAccentColor, setCreateAccentColor] = useState("#3B82F6");

  useEffect(() => {
    setWorkspaces(initialWorkspaces);

    if (initialWorkspaces.length > 0 && !currentWorkspace) {
      setStoreWorkspace(initialWorkspaces[0]);
      setCurrentWorkspace(initialWorkspaces[0]);
    }
  }, [currentWorkspace, initialWorkspaces, setStoreWorkspace, setWorkspaces]);

  const refreshWorkspaces = async () => {
    const response = await WorkspaceService.getWorkspaces();
    if (!response.success || !response.data) return;

    setLocalWorkspaces(response.data);
    setWorkspaces(response.data);
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
    const nextWorkspaces = [result.data, ...displayedWorkspaces];
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
              <Button onClick={handleCreate} className="w-full">
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {displayedWorkspaces.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            workspace={workspace}
            onWorkspaceUpdated={(updated) => {
              const next = displayedWorkspaces.map((w) =>
                w.id === updated.id ? updated : w,
              );
              setLocalWorkspaces(next);
              setWorkspaces(next);
              if (currentWorkspace?.id === updated.id) {
                setStoreWorkspace(updated);
                setCurrentWorkspace(updated);
              }
            }}
            onWorkspaceDeleted={(workspaceId) => {
              const next = displayedWorkspaces.filter(
                (w) => w.id !== workspaceId,
              );
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
            onWorkspaceMembersChanged={refreshWorkspaces}
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
  onWorkspaceMembersChanged,
}: {
  workspace: Workspace;
  onWorkspaceUpdated: (workspace: Workspace) => void;
  onWorkspaceDeleted: (workspaceId: string) => void;
  onWorkspaceMembersChanged: () => Promise<void>;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(workspace.name);
  const [description, setDescription] = useState(workspace.description || "");
  const [accentColor, setAccentColor] = useState(
    workspace.accentColor || "#3B82F6",
  );
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSearchQuery, setInviteSearchQuery] = useState("");
  const [inviteSearchResults, setInviteSearchResults] = useState<User[]>([]);
  const [selectedInviteUser, setSelectedInviteUser] = useState<User | null>(
    null,
  );
  const [isInviteSearching, setIsInviteSearching] = useState(false);
  const [showInviteSuggestions, setShowInviteSuggestions] = useState(false);
  const [inviteRole, setInviteRole] = useState<WorkspaceRole>("MEMBER");
  const [isInviting, setIsInviting] = useState(false);

  const workspaceMembers = Array.isArray(workspace.members)
    ? workspace.members
    : [];
  const currentUserRole = workspaceMembers.find(
    (member) => member.userId === user?.id,
  )?.role;
  const canManageWorkspace = currentUserRole === "ADMIN";

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

  const handleInvite = async () => {
    const emailToInvite = selectedInviteUser?.email || inviteEmail;
    if (!emailToInvite.trim()) {
      toast.error("Email is required");
      return;
    }

    setIsInviting(true);
    const formData = new FormData();
    formData.append("email", emailToInvite);
    formData.append("role", inviteRole);

    const result = await inviteMemberAction(workspace.id, {}, formData);
    setIsInviting(false);

    if (!result?.success) {
      toast.error(result?.error || "Failed to invite member");
      return;
    }

    toast.success("Member invited");
    setInviteEmail("");
    setInviteSearchQuery("");
    setInviteSearchResults([]);
    setSelectedInviteUser(null);
    setInviteRole("MEMBER");
    setInviteOpen(false);
    await onWorkspaceMembersChanged();
    router.refresh();
  };

  useEffect(() => {
    if (inviteSearchQuery.trim().length < 2) {
      return;
    }

    const timer = window.setTimeout(async () => {
      setIsInviteSearching(true);
      const response = await searchUsers(inviteSearchQuery.trim());
      setIsInviteSearching(false);

      if (response?.success && response.data) {
        setInviteSearchResults(response.data);
      } else {
        setInviteSearchResults([]);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [inviteSearchQuery]);

  const handleInviteSearchChange = (value: string) => {
    setInviteSearchQuery(value);
    setInviteEmail(value);
    setSelectedInviteUser(null);
    setShowInviteSuggestions(true);

    if (value.trim().length < 2) {
      setInviteSearchResults([]);
    }
  };

  const handleSelectInviteUser = (user: User) => {
    setSelectedInviteUser(user);
    setInviteSearchQuery(`${user.fullName} <${user.email}>`);
    setInviteEmail(user.email);
    setShowInviteSuggestions(false);
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
        <p className="text-sm text-muted-foreground">
          {workspace.description || "No description"}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs">Accent</span>
          <div
            className="h-5 w-5 rounded border"
            style={{ backgroundColor: workspace.accentColor }}
          />
        </div>
        {currentUserRole && (
          <div className="flex items-center gap-2">
            <span className="text-xs">Your Role:</span>
            <Badge
              variant={currentUserRole === "ADMIN" ? "default" : "secondary"}
              className="text-xs"
            >
              {currentUserRole.toLowerCase()}
            </Badge>
          </div>
        )}
        <div className="flex gap-2">
          {canManageWorkspace && (
            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2 relative">
                    <Label htmlFor={`invite-search-${workspace.id}`}>
                      Search user
                    </Label>
                    <Input
                      id={`invite-search-${workspace.id}`}
                      type="text"
                      value={inviteSearchQuery}
                      onChange={(e) => handleInviteSearchChange(e.target.value)}
                      onFocus={() => setShowInviteSuggestions(true)}
                      placeholder="Search by name or email"
                      autoComplete="off"
                    />
                    {showInviteSuggestions &&
                      inviteSearchQuery.trim().length >= 2 && (
                        <div className="absolute z-20 mt-2 max-h-52 w-full overflow-auto rounded-md border bg-popover shadow-lg">
                          {isInviteSearching ? (
                            <div className="p-2 text-sm text-muted-foreground">
                              Searching...
                            </div>
                          ) : inviteSearchResults.length > 0 ? (
                            inviteSearchResults.map((user) => (
                              <button
                                key={user.id}
                                type="button"
                                onMouseDown={() => handleSelectInviteUser(user)}
                                className="flex w-full flex-col gap-1 px-3 py-2 text-left text-sm hover:bg-accent/10"
                              >
                                <span className="font-medium">
                                  {user.fullName}
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                  {user.email}
                                </span>
                              </button>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">
                              No users found
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`invite-email-${workspace.id}`}>
                      Email
                    </Label>
                    <Input
                      id={`invite-email-${workspace.id}`}
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => {
                        setInviteEmail(e.target.value);
                        setInviteSearchQuery(e.target.value);
                        setSelectedInviteUser(null);
                      }}
                      placeholder="teammate@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select
                      value={inviteRole}
                      onValueChange={(value) =>
                        setInviteRole(value as WorkspaceRole)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MEMBER">Member</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleInvite}
                    className="w-full"
                    disabled={isInviting}
                  >
                    {isInviting ? "Inviting..." : "Send Invite"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Workspace</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
                <Input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                />
                <Button onClick={handleUpdate} className="w-full">
                  Update Workspace
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Workspace</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete `{workspace.name}`? This
                  action cannot be undone.
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
