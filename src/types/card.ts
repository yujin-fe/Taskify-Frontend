export type Assignee = {
  profileImageUrl: string | null;
  nickname: string;
  id?: number;
  userId?: number;
};

export interface CardDetailResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string | null;
  assignee: Assignee;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardsResponse {
  cards: CardDetailResponse[];
  totalCount: number;
  cursorId: null | number;
}

export interface CardInitialValueType {
  assigneeUser: Assignee | null;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string | null;
}
