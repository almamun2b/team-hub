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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createAnnouncementAction } from "@/actions/announcement.actions";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/shared/RichTextEditor";

const createAnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type CreateAnnouncementFormData = z.infer<typeof createAnnouncementSchema>;

interface CreateAnnouncementFormProps {
  workspaceId: string;
}

export function CreateAnnouncementForm({ workspaceId }: CreateAnnouncementFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateAnnouncementFormData>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: CreateAnnouncementFormData) => {
    const formData = new FormData();
    formData.append("workspaceId", workspaceId);
    formData.append("title", data.title);
    formData.append("content", data.content);

    const result = await createAnnouncementAction({ success: false }, formData);
    if (result?.success) {
      toast.success("Announcement created successfully!");
      setOpen(false);
      form.reset();
      router.refresh();
      return;
    }
    toast.error(result?.error || "Failed to create announcement");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Announcement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Announcement</DialogTitle>
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
                    <Textarea
                      placeholder="Give this announcement a short title"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write your announcement..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Announcement
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
