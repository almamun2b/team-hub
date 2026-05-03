"use client";

import { createWorkspaceAction } from "@/actions/workspace.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";

const initialState = { error: "" };

export default function CreateWorkspacePage() {
  const [state, formAction, isPending] = useActionState(
    createWorkspaceAction,
    initialState
  );

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Create Workspace</h1>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input name="name" placeholder="Workspace name" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            rows={4}
            placeholder="What is this workspace for?"
          />
        </div>
        {state?.error ? <p className="text-sm text-red-500">{state.error}</p> : null}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Workspace"}
        </Button>
      </form>
    </div>
  );
}
