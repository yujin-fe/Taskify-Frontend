export interface Author {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: Author;
}

export interface CommentListResponse {
  cursorId: number | null;
  comments: Comment[];
}
