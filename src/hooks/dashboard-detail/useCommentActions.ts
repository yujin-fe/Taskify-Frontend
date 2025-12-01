import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useMutation from '@/hooks/useMutation';
import {
  updateComment as updateCommentApi,
  createComment,
  deleteComment as deleteCommentApi,
  getCommentList,
  type CreateCommentType,
} from '@/lib/apis/comments';
import type { Comment, CommentListResponse } from '@/types/comment';

const COMMENT_LIST_SIZE = 5;

const useCommentActions = (
  cardId: number,
  columnId: number,
  dashboardId: number,
  resetCommentInput: () => void
) => {
  const commentList = useInfiniteScroll<
    CommentListResponse,
    { size: number; cardId: number; columnId: number }
  >({
    fetchFn: (params) => getCommentList(params),
    params: { size: COMMENT_LIST_SIZE, columnId, cardId },
    onSuccess: (prev, next) => {
      if (!prev) {
        return next;
      }
      return {
        ...next,
        comments: [...prev.comments, ...next.comments],
      };
    },
  });

  const createMutation = useMutation<Comment, CreateCommentType>({
    mutationFn: (reqBody: CreateCommentType) => createComment(reqBody),
    onSuccess: (newComment) => {
      resetCommentInput();

      commentList.setData((prev): CommentListResponse | null => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          comments: [newComment!, ...prev.comments],
        };
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      updateCommentApi(id, { content }),

    onSuccess: (updated) => {
      commentList.setData((prev) => {
        if (!prev) {
          return prev;
        }
        return {
          ...prev,
          comments: prev.comments.map((c) =>
            c.id === updated.id ? { ...c, content: updated.content } : c
          ),
        };
      });
    },
  });

  const deleteMutation = useMutation<void, { id: number }>({
    mutationFn: ({ id }) => deleteCommentApi(id),
    onSuccess: (_, variables) => {
      const deletedId = variables.id;

      commentList.setData((prev) => {
        if (!prev) {
          return prev;
        }
        return {
          ...prev,
          comments: prev.comments.filter((c) => c.id !== deletedId),
        };
      });
    },
  });

  const submitComment = (content: string) => {
    return createMutation.mutate({
      cardId,
      columnId,
      dashboardId,
      content,
    });
  };

  const updateComment = (id: number, comment: string) => {
    updateMutation.mutate({ id, content: comment });
  };

  const deleteComment = (id: number) => {
    deleteMutation.mutate({ id });
  };

  return {
    commentList,
    submitComment,
    updateComment,
    deleteComment,
  };
};

export default useCommentActions;
