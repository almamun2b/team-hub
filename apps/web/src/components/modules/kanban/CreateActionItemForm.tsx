"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { createActionItemAction } from "@/actions/actionItem.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const createActionItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  assigneeId: z.string().optional(),
  dueDate: z.string().optional(),
});

type CreateActionItemFormData = z.infer<typeof createActionItemSchema>;

interface CreateActionItemFormProps {
  workspaceId: string;
}

export function CreateActionItemForm({ workspaceId }: CreateActionItemFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateActionItemFormData>({
    resolver: zodResolver(createActionItemSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      assigneeId: "",
      dueDate: "",
    },
  });

  const handleSubmit = async (data: CreateActionItemFormData) => {
    const formData = new FormData();
    formData.append("workspaceId", workspaceId);
    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    formData.append("priority", data.priority);
    if (data.assigneeId) formData.append("assigneeId", data.assigneeId);
    if (data.dueDate) formData.append("dueDate", data.dueDate);

    const result = await createActionItemAction({ success: false }, formData);
    if (result?.success) {
      toast.success("Action item created successfully!");
      setOpen(false);
      form.reset();
      router.refresh();
      return;
    }
    toast.error(result?.error || "Failed to create action item");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Action Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              {...form.register("title")}
              placeholder="Enter task title"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              {...form.register("description")}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Priority</label>
            <Select
              value={form.watch("priority")}
              onValueChange={(value) => form.setValue("priority", value as "LOW" | "MEDIUM" | "HIGH")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Due Date</label>
            <Input
              type="date"
              {...form.register("dueDate")}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
