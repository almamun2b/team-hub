"use client";

import { Announcement } from "@/types/announcement";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pin, MessageSquare, Heart } from "lucide-react";
import { useState } from "react";
import {
  createCommentAction,
  createReactionAction,
  deleteAnnouncementAction,
  updateAnnouncementAction,
} from "@/actions/announcement.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/shared/RichTextEditor";

interface AnnouncementFeedProps {
  announcements: Announcement[];
}

export function AnnouncementFeed({ announcements }: AnnouncementFeedProps) {
  return (
    <div className="space-y-4">
      {announcements.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No announcements yet</h3>
          <p className="text-muted-foreground">Create your first announcement to get started.</p>
        </div>
      ) : (
        announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))
      )}
    </div>
  );
}

function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const router = useRouter();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [title, setTitle] = useState(announcement.title);
  const [content, setContent] = useState(announcement.content);

  const handleReaction = async (emoji: string) => {
    const result = await createReactionAction(announcement.id, emoji, announcement.workspaceId);
    if (result.success) {
      toast.success("Reaction added!");
      router.refresh();
    } else {
      toast.error("Failed to add reaction");
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    const result = await createCommentAction(announcement.id, {
      content: commentText,
      workspaceId: announcement.workspaceId,
    });
    if (result.success) {
      toast.success("Comment added!");
      setCommentText("");
      router.refresh();
    } else {
      toast.error("Failed to add comment");
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("workspaceId", announcement.workspaceId);
    formData.append("title", title);
    formData.append("content", content);
    const result = await updateAnnouncementAction(announcement.id, {}, formData);
    if (!result?.success) {
      toast.error(result?.error || "Failed to update announcement");
      return;
    }
    toast.success("Announcement updated");
    setOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    const result = await deleteAnnouncementAction({
      announcementId: announcement.id,
      workspaceId: announcement.workspaceId,
    });
    if (!result?.success) {
      toast.error(result?.error || "Failed to delete announcement");
      return;
    }
    setDeleteOpen(false);
    toast.success("Announcement deleted");
    router.refresh();
  };

  return (
    <Card className={announcement.isPinned ? "border-primary" : ""}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={announcement.author.avatar} />
              <AvatarFallback>{announcement.author.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{announcement.author.fullName}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(announcement.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {announcement.isPinned && (
            <Badge variant="secondary">
              <Pin className="h-3 w-3 mr-1" />
              Pinned
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleReaction("👍")}
            className="flex items-center gap-1"
          >
            <Heart className="h-4 w-4" />
            {announcement.reactions.length}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            {announcement.comments.length}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <RichTextEditor value={content} onChange={setContent} />
                <Button onClick={handleUpdate} className="w-full">Update Announcement</Button>
              </div>
            </DialogContent>
          </Dialog>
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this announcement? This action cannot be undone.
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

        {showComments && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={2}
              />
              <Button onClick={handleComment}>Post</Button>
            </div>

            <div className="space-y-3">
              {announcement.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>{comment.user.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.user.fullName}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
