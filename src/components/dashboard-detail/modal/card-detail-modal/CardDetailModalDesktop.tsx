import { useState } from 'react';
import Icons from '@/assets/icons';
import Avatar from '@/components/common/avatar/Avatar';
import Comment from '@/components/common/Comment';
import Title from '@/components/common/Title';
import Dropdown from '@/components/dashboard/dropdown/Dropdown';
import Tag from '@/components/dashboard/Tag';
import CardStatusBadge from '@/components/dashboard-detail/card/CardStatusBadge';
import type { CardDetailModalContentProps } from '@/components/dashboard-detail/modal/card-detail-modal/CardDetailModal';
import CommentList from '@/components/dashboard-detail/modal/card-detail-modal/CommentList';
import { DUE_DATE } from '@/constants/requestCardData';
import { getProfileColorForId } from '@/utils/avatar';

export default function CardDetailModalDesktop({
  columnTitle,
  cardData,
  commentList,
  comment,
  setComment,
  handleCommentSubmit,
  handleCommentEdit,
  handleCommentDelete,
  handleCardEdit,
  handleCardDelete,
  closeModal,
}: CardDetailModalContentProps) {
  const [isImageError, setIsImageError] = useState(false);

  if (!cardData) {
    return null;
  }

  const { title, tags, description, imageUrl, assignee, dueDate } = cardData;

  return (
    <div className='mx-[32px] hidden w-full max-w-[730px] items-start gap-[14px] rounded-[8px] bg-gray-0 py-[30px] pr-[28px] pl-[18px] sm:flex'>
      <div className='scrollbar-hidden relative h-[calc(100dvh-450px)] grow overflow-y-auto'>
        <Title size={'2xl'} weight={'bold'} className='mb-[24px]'>
          {title}
        </Title>
        <div className='flex items-center gap-[20px]'>
          <CardStatusBadge title={columnTitle} />
          <div className='h-[20px] w-0 border-r border-gray-300' />
          <div className='flex gap-[6px]'>
            {tags
              .filter((t) => t.trim() !== '')
              .map((t, idx) => (
                <Tag key={t + idx} color={getProfileColorForId(idx)}>
                  {t}
                </Tag>
              ))}
          </div>
        </div>
        <p className='mt-[16px] mb-[8px] min-h-[80px] p-[10px]'>{description}</p>
        {imageUrl && !isImageError && (
          <img
            className='h-[260px] w-full rounded-[6px] object-cover'
            src={imageUrl}
            alt={title + '이미지'}
            onError={() => setIsImageError(true)}
          />
        )}
        <Comment.Root
          className='mt-[16px]'
          value={comment}
          onChange={setComment}
          onSubmit={handleCommentSubmit}>
          <Comment.Title>댓글</Comment.Title>
          <Comment.Field />
          <Comment.Submit />
        </Comment.Root>
        {commentList.data && (
          <CommentList
            data={commentList.data}
            lastItemRef={commentList.lastItemRef}
            onEdit={handleCommentEdit}
            onDelete={handleCommentDelete}
          />
        )}
        <div className='pointer-events-none sticky bottom-0 left-0 h-[40px] w-full bg-gradient-to-t from-gray-0 to-transparent' />
      </div>
      <div className='flex flex-col items-end'>
        <div className='mb-[24px] flex items-center gap-[24px] pr-[10px]'>
          <Dropdown>
            <Dropdown.Trigger ariaLabel='카드 상세' className='flex items-center gap-[12px]'>
              <Icons.KebabMore />
            </Dropdown.Trigger>
            <Dropdown.List className='border border-gray-300'>
              <Dropdown.Item onClick={handleCardEdit}>수정하기</Dropdown.Item>
              <Dropdown.Item onClick={handleCardDelete}>삭제하기</Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
          <button className='cursor-pointer' onClick={closeModal} aria-label='모달 닫기'>
            <Icons.Close width={32} height={32} />
          </button>
        </div>
        <div className='sticky flex h-[155px] min-w-[200px] flex-col justify-center gap-[16px] rounded-[8px] border border-gray-300 px-[16px]'>
          <div className='flex flex-col gap-[8px]'>
            <span className='font-xs-semibold'>담당자</span>
            <div className='flex items-center gap-[8px]'>
              <Avatar size='m' user={assignee}>
                <Avatar.Img />
                <Avatar.Fallback />
              </Avatar>
              {assignee.nickname}
            </div>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <span className='font-xs-semibold'>마감일</span>
            <span className='font-md-regular text-gray-700'>
              {dueDate === DUE_DATE ? '마감일을 정해주세요.' : dueDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
