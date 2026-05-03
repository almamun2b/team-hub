"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createGoalAction } from "@/actions/goal.actions";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const createGoalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().min(1, "Due date is required"),
});

type CreateGoalFormData = z.infer<typeof createGoalSchema>;

interface CreateGoalFormProps {
  workspaceId: string;
}

export function CreateGoalForm({ workspaceId }: CreateGoalFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateGoalFormData>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  const onSubmit = async (data: CreateGoalFormData) => {
    const formData = new FormData();
    formData.append("workspaceId", workspaceId);
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("dueDate", data.dueDate || "");

    const result = await createGoalAction({ success: false }, formData);
    if (result?.success) {
      toast.success("Goal created successfully!");
      setOpen(false);
      form.reset();
      router.refresh();
      return;
    }
    toast.error(result?.error || "Failed to create goal");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter goal title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your goal"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Goal
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
