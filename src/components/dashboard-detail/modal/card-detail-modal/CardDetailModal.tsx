import { useState } from 'react';
import { useParams } from 'react-router';
import ModalPortal from '@/components/common/modal/ModalPortal';
import CardDetailModalDesktop from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalDesktop';
import CardDetailModalMobile from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalMobile';
import ChangeCardModal from '@/components/dashboard-detail/modal/ChangeCardModal';
import useCardDetail from '@/hooks/dashboard-detail/useCardDetail';
import useCommentActions from '@/hooks/dashboard-detail/useCommentActions';
import useUpdateCard from '@/hooks/dashboard-detail/useUpdateCard';
import { useModal } from '@/hooks/useModal';
import useMutation from '@/hooks/useMutation';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import useUserContext from '@/hooks/useUserContext';
import { deleteCard } from '@/lib/apis/cards';
import type { CardDetailResponse, CardEditFormValue } from '@/types/card';
import type { ColumnsResponse } from '@/types/column';
import type { CommentListResponse } from '@/types/comment';
import type { InfiniteScrollReturn } from '@/types/infiniteScroll';
import type { MembersResponse } from '@/types/members';
import { updateCardRequestBody } from '@/utils/card/updateCardRequestBody';
import { uploadCardImage } from '@/utils/card/uploadCardImage';

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

interface CardDetailModalProps {
  columnId: number;
  columnTitle: string;
  cardId: number;
  closeModal: () => void;
  onDeleteCard: (id: number) => void;
  onUpdateCard: (updated: CardDetailResponse) => void;
  memberData: MembersResponse;
  columnListData: ColumnsResponse | null;
}

export default function CardDetailModal({
  columnId,
  columnTitle,
  cardId,
  closeModal,
  onDeleteCard,
  onUpdateCard,
  memberData,
  columnListData,
}: CardDetailModalProps) {
  const { dashboardId } = useParams();
  const { userProfile } = useUserContext();
  const [comment, setComment] = useState('');
  const isDesktop = useResponsiveValue({ mobile: false, desktop: true });
  const editModal = useModal(`editCard_${cardId}`);
  const detailModal = useModal(`cardDetail_${cardId}`);

  const cardDetailQuery = useCardDetail(cardId);
  const { commentList, submitComment, updateComment, deleteComment } = useCommentActions(
    cardId,
    columnId,
    Number(dashboardId),
    () => setComment('')
  );

  const deleteCardMutation = useMutation({
    mutationFn: (id: number) => deleteCard(id),
    onSuccess: (_, deletedId) => onDeleteCard(deletedId),
  });

  const updateCardMutation = useUpdateCard({
    onSuccess: (updated) => {
      onUpdateCard(updated);
      editModal.handleModalCloseAll();
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
    detailModal.handleModalCloseAll();
    editModal.handleModalOpen();
  };

  const handleCardDelete = async () => {
    await deleteCardMutation.mutate(cardId);
    closeModal();
  };

  const handleSubmitUpdateCard = async (
    formValue: CardEditFormValue,
    imageFile: File | null
  ): Promise<void> => {
    const uploadedImageUrl = await uploadCardImage(formValue.columnId, imageFile);

    const nextImageUrl = uploadedImageUrl ?? cardDetailQuery.data?.imageUrl ?? null;

    const body = updateCardRequestBody(
      formValue,
      cardDetailQuery.data,
      nextImageUrl,
      userProfile?.id
    );

    await updateCardMutation.mutate({ id: cardId, body });
  };

  const currentColumnId = cardDetailQuery.data?.columnId ?? columnId;
  const currentColumnTitle =
    columnListData?.data.find((col) => col.id === currentColumnId)?.title ?? columnTitle;

  return (
    <>
      {detailModal.isOpen && (
        <ModalPortal>
          <div className='modal-dimmed'>
            {isDesktop ? (
              <CardDetailModalDesktop
                columnTitle={currentColumnTitle}
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
                columnTitle={currentColumnTitle}
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
      )}

      {editModal.isOpen && cardDetailQuery.data && (
        <ChangeCardModal
          modalName={`editCard_${cardId}`}
          memberData={memberData}
          columnListData={columnListData}
          initialValue={{
            columnId,
            assigneeUser: cardDetailQuery.data.assignee,
            title: cardDetailQuery.data.title,
            description: cardDetailQuery.data.description,
            dueDate: cardDetailQuery.data.dueDate,
            tags: cardDetailQuery.data.tags,
            imageUrl: cardDetailQuery.data.imageUrl,
          }}
          onSubmit={handleSubmitUpdateCard}
          serverErrorMessage={updateCardMutation.error}
        />
      )}
    </>
  );
}
