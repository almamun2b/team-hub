"use client";

import { deleteActionItemAction, updateActionItemAction } from "@/actions/actionItem.actions";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ActionItem } from "@/types/actionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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


interface KanbanCardProps {
  item: ActionItem;
}

export function KanbanCard({ item }: KanbanCardProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [priority, setPriority] = useState(item.priority);
  const [status, setStatus] = useState(item.status);
  const [dueDate, setDueDate] = useState(
    item.dueDate ? new Date(item.dueDate).toISOString().slice(0, 10) : ""
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("workspaceId", item.workspaceId);
    formData.append("title", title);
    formData.append("priority", priority);
    formData.append("status", status);
    if (dueDate) formData.append("dueDate", dueDate);

    const result = await updateActionItemAction(item.id, {}, formData);
    if (!result?.success) {
      toast.error(result?.error || "Failed to update action item");
      return;
    }
    toast.success("Action item updated");
    setOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    const result = await deleteActionItemAction({
      actionItemId: item.id,
      workspaceId: item.workspaceId,
    });
    if (!result?.success) {
      toast.error(result?.error || "Failed to delete action item");
      return;
    }
    setDeleteOpen(false);
    toast.success("Action item deleted");
    router.refresh();
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {item.description && (
          <p className="text-xs text-muted-foreground">{item.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Badge
              variant={
                item.priority === "HIGH" ? "destructive" :
                item.priority === "MEDIUM" ? "default" : "secondary"
              }
              className="text-xs"
            >
              {item.priority}
            </Badge>
          </div>
          {item.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={item.assignee.avatar} />
              <AvatarFallback className="text-xs">
                {item.assignee.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        {item.dueDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(item.dueDate).toLocaleDateString()}
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Action Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Select value={priority} onValueChange={(v) => setPriority(v as ActionItem["priority"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={status} onValueChange={(v) => setStatus(v as ActionItem["status"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODO">To Do</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <Button onClick={handleUpdate} className="w-full">Update Action Item</Button>
              </div>
            </DialogContent>
          </Dialog>
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Action Item</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{item.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    type="button"
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={handleDelete}
                  >
                    Confirm Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
