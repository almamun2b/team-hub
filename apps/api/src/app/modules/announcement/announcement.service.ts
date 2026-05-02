import prisma from "../../../shared/prisma";
import { ActivityServices } from "../activity/activity.service";
import { NotificationServices } from "../notification/notification.service";

const createAnnouncement = async (userId: string, payload: any) => {
  const result = await prisma.announcement.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  // Log Activity
  await ActivityServices.createActivity({
    type: "ANNOUNCEMENT_POSTED",
    content: `New announcement: ${result.title}`,
    userId,
    workspaceId: result.workspaceId,
  });

  // Notify all workspace members
  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId: result.workspaceId, userId: { not: userId } },
  });

  for (const member of members) {
    await NotificationServices.createNotification({
      userId: member.userId,
      type: "ANNOUNCEMENT",
      title: "New Announcement",
      message: `A new announcement has been posted: ${result.title}`,
      link: `/workspaces/${result.workspaceId}/announcements/${result.id}`,
    });
  }

  return result;
};

const getWorkspaceAnnouncements = async (workspaceId: string) => {
  const result = await prisma.announcement.findMany({
    where: { workspaceId },
    orderBy: [
      { isPinned: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      comments: {
        include: {
          user: {
            select: { id: true, fullName: true, avatar: true },
          },
        },
      },
      reactions: {
        include: {
          user: {
            select: { id: true, fullName: true, avatar: true },
          },
        },
      },
    },
  });

  return result;
};

const togglePin = async (id: string, isPinned: boolean) => {
  const result = await prisma.announcement.update({
    where: { id },
    data: { isPinned },
  });

  return result;
};

const addComment = async (userId: string, announcementId: string, content: string) => {
  const result = await prisma.comment.create({
    data: {
      content,
      announcementId,
      userId,
    },
  });

  // @Mention parsing logic
  const mentionRegex = /@(\w+)/g;
  const mentions = content.match(mentionRegex);

  if (mentions) {
    for (const mention of mentions) {
      const email = mention.substring(1); // Remove '@'
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        await NotificationServices.createNotification({
          userId: user.id,
          type: "MENTION",
          title: "New Mention",
          message: `You were mentioned in a comment!`,
          link: `/announcements/${announcementId}`,
        });
      }
    }
  }

  return result;
};

const addReaction = async (userId: string, announcementId: string, emoji: string) => {
  const result = await prisma.reaction.upsert({
    where: {
      announcementId_userId_emoji: {
        announcementId,
        userId,
        emoji,
      },
    },
    update: {},
    create: {
      announcementId,
      userId,
      emoji,
    },
  });

  return result;
};

const updateAnnouncement = async (id: string, payload: any) => {
  const result = await prisma.announcement.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteAnnouncement = async (id: string) => {
  const result = await prisma.announcement.delete({
    where: { id },
  });

  return result;
};

export const AnnouncementServices = {
  createAnnouncement,
  getWorkspaceAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  togglePin,
  addComment,
  addReaction,
};
