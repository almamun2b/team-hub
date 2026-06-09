"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setCurrentWorkspace } from "@/lib/workspace";
import { WorkspaceService } from "@/services/workspace.service";
import { useStore } from "@/store/useStore";
import { Workspace } from "@/types/workspace";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

interface WorkspaceSwitcherProps {
  initialWorkspaces?: Workspace[];
  initialCurrentWorkspace?: Workspace | null;
}

export function WorkspaceSwitcher({
  initialWorkspaces = [],
  initialCurrentWorkspace = null,
}: WorkspaceSwitcherProps) {
  const {
    workspaces,
    currentWorkspace,
    setWorkspaces,
    setCurrentWorkspace: setStoreWorkspace,
  } = useStore();
  const availableWorkspaces =
    workspaces.length > 0 ? workspaces : initialWorkspaces;
  const selectedWorkspace = currentWorkspace || initialCurrentWorkspace;

  useEffect(() => {
    if (initialWorkspaces.length > 0) {
      setWorkspaces(initialWorkspaces);
    }

    if (!currentWorkspace) {
      const fallbackWorkspace = initialCurrentWorkspace || initialWorkspaces[0];
      if (fallbackWorkspace) {
        setStoreWorkspace(fallbackWorkspace);
      }
    }
  }, [
    currentWorkspace,
    initialCurrentWorkspace,
    initialWorkspaces,
    setStoreWorkspace,
    setWorkspaces,
  ]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const response = await WorkspaceService.getWorkspaces();
      if (response.success && response.data) {
        setWorkspaces(response.data);
        if (!currentWorkspace && response.data.length > 0) {
          const fallbackWorkspace = initialCurrentWorkspace || response.data[0];
          setStoreWorkspace(fallbackWorkspace);
          await setCurrentWorkspace(fallbackWorkspace);
        }
      }
    };
    fetchWorkspaces();
  }, [
    currentWorkspace,
    initialCurrentWorkspace,
    setStoreWorkspace,
    setWorkspaces,
  ]);

  const handleWorkspaceSelect = async (workspace: Workspace) => {
    setStoreWorkspace(workspace);
    await setCurrentWorkspace(workspace);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-48 justify-between">
          {selectedWorkspace ? selectedWorkspace.name : "Select Workspace"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {availableWorkspaces.length === 0 ? (
          <DropdownMenuItem disabled>No workspaces found</DropdownMenuItem>
        ) : (
          availableWorkspaces.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              onClick={() => handleWorkspaceSelect(workspace)}
              className={
                selectedWorkspace?.id === workspace.id ? "bg-accent" : ""
              }
            >
              {workspace.name}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
