import { useState } from 'react';
import ModalPortal from '@/components/common/modal/ModalPortal';
import CardDetailModalDesktop from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalDesktop';
import CardDetailModalMobile from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModalMobile';

export interface CardDetailModalContentProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleCommentSubmit: () => void;
  handleCardEdit: () => void;
  handleCardDelete: () => void;
  closeModal: () => void;
}

interface CardDetailModal {
  closeModal: () => void;
}

export default function CardDetailModal({ closeModal }: CardDetailModal) {
  const [comment, setComment] = useState('');

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
          comment={comment}
          setComment={setComment}
          handleCommentSubmit={handleCommentSubmit}
          closeModal={closeModal}
          handleCardEdit={handleCardEdit}
          handleCardDelete={handleCardDelete}
        />
        <CardDetailModalMobile
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
