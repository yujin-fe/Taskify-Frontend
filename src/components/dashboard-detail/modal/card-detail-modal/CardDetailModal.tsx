import { useState } from 'react';
import ModalPortal from '@/components/common/modal/ModalPortal';
import CardDetailModalDesktop from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalDesktop';
import CardDetailModalMobile from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalMobile';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getCommentList } from '@/lib/apis/comments';
import type { CommentListResponse } from '@/types/comment';

export interface CardDetailModalContentProps {
  comment: string;
  commentListData: CommentListResponse | null;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleCommentSubmit: () => void;
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
  const [comment, setComment] = useState('');

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
        cards: [...prev.comments, ...next.comments],
      };
    },
  });

  const handleCommentSubmit = () => {
    console.log('TODO: 댓글 등록');
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
        <CardDetailModalDesktop
          commentListData={commentList.data}
          comment={comment}
          setComment={setComment}
          handleCommentSubmit={handleCommentSubmit}
          closeModal={closeModal}
          handleCardEdit={handleCardEdit}
          handleCardDelete={handleCardDelete}
        />
        <CardDetailModalMobile
          commentListData={commentList.data}
          comment={comment}
          setComment={setComment}
          handleCommentSubmit={handleCommentSubmit}
          closeModal={closeModal}
          handleCardEdit={handleCardEdit}
          handleCardDelete={handleCardDelete}
        />
      </div>
    </ModalPortal>
  );
}
