"use client";

import { useEffect } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Workspace } from "@/types/workspace";
import { useStore } from "@/store/useStore";
import { WorkspaceService } from "@/services/workspace.service";
import { setCurrentWorkspace } from "@/lib/workspace";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function WorkspaceSwitcher() {
  const {
    workspaces,
    currentWorkspace,
    setWorkspaces,
    setCurrentWorkspace: setStoreWorkspace,
  } = useStore();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const response = await WorkspaceService.getWorkspaces();
      if (response.success && response.data) {
        setWorkspaces(response.data);
        if (!currentWorkspace && response.data.length > 0) {
          setStoreWorkspace(response.data[0]);
          await setCurrentWorkspace(response.data[0]);
        }
      }
    };
    fetchWorkspaces();
  }, [setWorkspaces, setStoreWorkspace, currentWorkspace]);

  const handleWorkspaceSelect = async (workspace: Workspace) => {
    setStoreWorkspace(workspace);
    await setCurrentWorkspace(workspace);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-48 justify-between">
          {currentWorkspace ? currentWorkspace.name : "Select Workspace"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => handleWorkspaceSelect(workspace)}
            className={currentWorkspace?.id === workspace.id ? "bg-accent" : ""}
          >
            {workspace.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
