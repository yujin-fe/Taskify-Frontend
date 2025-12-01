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

export default function CardDetailModalMobile({
  columnTitle,
  cardData,
  comment,
  commentList,
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
    <div className='mx-[24px] flex w-full flex-col rounded-[8px] bg-gray-0 p-[16px] sm:hidden'>
      <div className='mb-[16px] ml-auto flex items-center gap-[16px]'>
        <Dropdown>
          <Dropdown.Trigger ariaLabel='카드 상세' className='flex items-center gap-[12px]'>
            <Icons.KebabMore width={20} height={20} />
          </Dropdown.Trigger>
          <Dropdown.List className='border border-gray-300'>
            <Dropdown.Item onClick={handleCardEdit}>수정하기</Dropdown.Item>
            <Dropdown.Item onClick={handleCardDelete}>삭제하기</Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
        <button className='cursor-pointer' onClick={closeModal} aria-label='모달 닫기'>
          <Icons.Close width={24} height={24} />
        </button>
      </div>
      <div className='scrollbar-hidden relative max-h-[calc(100dvh-300px)] grow overflow-y-auto'>
        <Title size={'xl'} weight={'bold'} className='mb-[8px]'>
          {title}
        </Title>
        <div className='flex h-[64px] gap-[62px] rounded-[8px] border border-gray-300 px-[16px] py-[9px]'>
          <div className='flex flex-col'>
            <span className='font-xs-semibold'>담당자</span>
            <div className='flex items-center gap-[8px] font-xs-regular'>
              <Avatar size='s' user={assignee}>
                <Avatar.Img />
                <Avatar.Fallback />
              </Avatar>
              {assignee.nickname}
            </div>
          </div>
          <div className='flex flex-col justify-between'>
            <span className='font-xs-semibold'>마감일</span>
            <span className='font-xs-regular text-gray-700'>
              {dueDate === DUE_DATE ? '마감일을 정해주세요.' : dueDate}
            </span>
          </div>
        </div>
        <div className='mt-[16px] flex flex-wrap items-center gap-[12px]'>
          <CardStatusBadge title={columnTitle} />
          <div className='h-[20px] w-0 border-r border-gray-300' />
          <div className='flex gap-[8px]'>
            {tags
              .filter((t) => t.trim() !== '')
              .map((t, idx) => (
                <Tag key={t + idx} color={getProfileColorForId(idx)}>
                  {t}
                </Tag>
              ))}
          </div>
        </div>
        <p className='mt-[16px] mb-[32px] min-h-[60px] font-xs-regular'>{description}</p>

        {imageUrl && !isImageError && (
          <img
            height={168}
            className='w-full rounded-[6px] object-cover'
            src={imageUrl}
            alt={title + '이미지'}
            onError={() => setIsImageError(true)}
          />
        )}

        <Comment.Root
          className='mt-[24px]'
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
            avatarSize={'s'}
          />
        )}
        <div className='pointer-events-none sticky bottom-0 left-0 h-[40px] w-full bg-gradient-to-t from-gray-0 to-transparent' />
      </div>
    </div>
  );
}
