import prisma from "../../../shared/prisma";

const createAnnouncement = async (userId: string, payload: any) => {
  const result = await prisma.announcement.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

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
      reactions: true,
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

export const AnnouncementServices = {
  createAnnouncement,
  getWorkspaceAnnouncements,
  togglePin,
  addComment,
  addReaction,
};
