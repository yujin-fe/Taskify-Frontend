import { useState } from 'react';
import { useParams } from 'react-router';
import ModalPortal from '@/components/common/modal/ModalPortal';
import CardDetailModalDesktop from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalDesktop';
import CardDetailModalMobile from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalMobile';
import useCardDetail from '@/hooks/dashboard-detail/useCardDetail';
import useCommentActions from '@/hooks/dashboard-detail/useCommentActions';
import useMutation from '@/hooks/useMutation';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import { deleteCard } from '@/lib/apis/cards';
import type { CardDetailResponse } from '@/types/card';
import type { CommentListResponse } from '@/types/comment';
import type { InfiniteScrollReturn } from '@/types/infiniteScroll';

export interface CardDetailModalContentProps {
  cardData: CardDetailResponse | null;
  columnTitle: string;
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
  columnTitle: string;
  cardId: number;
  closeModal: () => void;
  onDeleteCard: (id: number) => void;
}

export default function CardDetailModal({
  closeModal,
  columnTitle,
  columnId,
  cardId,
  onDeleteCard,
}: CardDetailModal) {
  const { dashboardId } = useParams();
  const [comment, setComment] = useState('');
  const isDesktop = useResponsiveValue({
    mobile: false,
    desktop: true,
  });

  const cardDetailQuery = useCardDetail(cardId);
  const { commentList, submitComment, updateComment, deleteComment } = useCommentActions(
    cardId,
    columnId,
    Number(dashboardId),
    () => setComment('')
  );

  const deleteCardMutation = useMutation<void, number>({
    mutationFn: (cardId) => deleteCard(cardId),

    onSuccess: (_, deletedId) => {
      onDeleteCard(deletedId);
    },
  });

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      return;
    }
    await submitComment(comment);
  };

  const handleCommentEdit = (commentId: number, newContent: string) => {
    updateComment(commentId, newContent);
  };

  const handleCommentDelete = async (commentId: number) => {
    deleteComment(commentId);
  };

  const handleCardEdit = () => {
    console.log('TODO: 할 일 수정 모달 연결, 이 모달은 꺼져야함');
  };

  const handleCardDelete = async () => {
    await deleteCardMutation.mutate(cardId);
    closeModal();
  };

  return (
    <ModalPortal>
      <div className='modal-dimmed'>
        {isDesktop ? (
          <CardDetailModalDesktop
            columnTitle={columnTitle}
            cardData={cardDetailQuery.data}
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
            columnTitle={columnTitle}
            cardData={cardDetailQuery.data}
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
