import { useState } from 'react';
import { useParams } from 'react-router';
import ModalPortal from '@/components/common/modal/ModalPortal';
import CardDetailModalDesktop from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalDesktop';
import CardDetailModalMobile from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalMobile';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useMutation from '@/hooks/useMutation';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import {
  updateComment,
  createComment,
  deleteComment,
  getCommentList,
  type CreateCommentType,
} from '@/lib/apis/comments';
import type { Comment, CommentListResponse } from '@/types/comment';
import type { InfiniteScrollReturn } from '@/types/infiniteScroll';

export interface CardDetailModalContentProps {
  comment: string;
  commentList: InfiniteScrollReturn<CommentListResponse>;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleCommentSubmit: () => void;
  handleCommentEdit: (commentId: number, newContent: string) => void;
  handleCommentDelete: (commentId: number) => void;
  handleCardEdit: () => void;
  handleCardDelete: () => void;
  closeModal: () => void;
}

interface CardDetailModal {
  columnId: number;
  cardId: number;
  closeModal: () => void;
}

const COMMENT_LIST_SIZE = 5;

export default function CardDetailModal({ closeModal, columnId, cardId }: CardDetailModal) {
  const { dashboardId } = useParams();
  const [comment, setComment] = useState('');
  const isDesktop = useResponsiveValue({
    mobile: false,
    desktop: true,
  });

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

  const createCommentMutation = useMutation<Comment, CreateCommentType>({
    mutationFn: (reqBody: CreateCommentType) => createComment(reqBody),
    onSuccess: (newComment) => {
      setComment('');

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

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      updateComment(id, { content }),

    onSuccess: (newData) => {
      commentList.setData((prev) => {
        if (!prev) {
          return prev;
        }
        return {
          ...prev,
          comments: prev.comments.map((c) =>
            c.id === newData.id ? { ...c, content: newData.content } : c
          ),
        };
      });
    },
  });

  const deleteCommentMutation = useMutation<void, { id: number }>({
    mutationFn: ({ id }) => deleteComment(id),
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

  const handleCommentSubmit = async () => {
    if (!dashboardId) {
      return;
    }

    if (!comment.trim()) {
      return;
    }

    const reqBody = { content: comment, cardId, columnId, dashboardId: Number(dashboardId) };
    await createCommentMutation.mutate(reqBody);
  };

  const handleCommentEdit = async (commentId: number, newContent: string) => {
    await updateCommentMutation.mutate({ id: commentId, content: newContent });
  };

  const handleCommentDelete = async (commentId: number) => {
    await deleteCommentMutation.mutate({ id: commentId });
  };

  const handleCardEdit = () => {
    console.log('TODO: 할 일 수정 모달 연결, 이 모달은 꺼져야함');
  };

  const handleCardDelete = () => {
    console.log('TODO: 카드 삭제 api 연결');
  };

  return (
    <ModalPortal>
      <div className='modal-dimmed'>
        {isDesktop ? (
          <CardDetailModalDesktop
            commentList={commentList}
            comment={comment}
            setComment={setComment}
            handleCommentSubmit={handleCommentSubmit}
            handleCommentEdit={handleCommentEdit}
            handleCommentDelete={handleCommentDelete}
            closeModal={closeModal}
            handleCardEdit={handleCardEdit}
            handleCardDelete={handleCardDelete}
          />
        ) : (
          <CardDetailModalMobile
            commentList={commentList}
            comment={comment}
            setComment={setComment}
            handleCommentSubmit={handleCommentSubmit}
            handleCommentEdit={handleCommentEdit}
            handleCommentDelete={handleCommentDelete}
            closeModal={closeModal}
            handleCardEdit={handleCardEdit}
            handleCardDelete={handleCardDelete}
          />
        )}
      </div>
    </ModalPortal>
  );
}
