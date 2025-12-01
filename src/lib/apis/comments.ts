import { api } from '@/lib/axios';

interface GetCommentListParams {
  size: number;
  cursorId?: null | number;
  columnId: number;
  cardId: number;
}

/** 댓글 조회 api */
export const getCommentList = async (params: GetCommentListParams) => {
  const res = await api.get('/comments', {
    params,
  });
  return res.data;
};
