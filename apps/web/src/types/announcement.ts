export interface Reaction {
  id: string;
  emoji: string;
  userId: string;
  user: {
    id: string;
    fullName: string;
    avatar?: string;
  };
  announcementId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  announcementId: string;
  userId: string;
  user: {
    id: string;
    fullName: string;
    avatar?: string;
  };
  mentions: string[]; // user ids
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  workspaceId: string;
  authorId: string;
  author: {
    id: string;
    fullName: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  reactions: Reaction[];
}

export interface CreateAnnouncementPayload {
  workspaceId: string;
  title: string;
  content: string;
}

export interface UpdateAnnouncementPayload {
  title?: string;
  content?: string;
}

export interface CreateCommentPayload {
  content: string;
}

export interface CreateReactionPayload {
  emoji: string;
}
