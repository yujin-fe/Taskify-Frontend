import { api } from '@/lib/axios';

interface GetCommentListParams {
  size: number;
  cursorId?: null | number;
  columnId: number;
  cardId: number;
}

export interface CreateCommentType {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

/** 댓글 조회 api */
export const getCommentList = async (params: GetCommentListParams) => {
  const res = await api.get('/comments', {
    params,
  });
  return res.data;
};

/** 댓글 생성 api */
export const createComment = async (reqBody: CreateCommentType) => {
  const res = await api.post('/comments', reqBody);
  return res;
};

/** 댓글 수정 api */
export const updateComment = async (commentId: number, reqBody: { content: string }) => {
  const res = await api.put(`/comments/${commentId}`, reqBody);
  return res;
};

/** 댓글 삭제 api */
export const deleteComment = async (commentId: number) => {
  const res = await api.delete(`/comments/${commentId}`);
  return res;
};
