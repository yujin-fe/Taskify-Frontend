import { useState } from 'react';
import Avatar from '@/components/common/avatar/Avatar';
import type { CommentListResponse } from '@/types/comment';
import { formatDateForServer } from '@/utils/formatDateTime';

interface CommentListProps {
  avatarSize?: 's' | 'm';
  data: CommentListResponse;
  lastItemRef: React.RefObject<HTMLLIElement | null>;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

const commentButtonStyle = 'cursor-pointer text-[10px] text-gray-400 underline sm:text-[12px]';

export default function CommentList({
  avatarSize = 'm',
  data,
  lastItemRef,
  onEdit,
  onDelete,
}: CommentListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditValue(content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const submitEdit = (id: number) => {
    if (!editValue.trim()) {
      return;
    }

    onEdit(id, editValue);
    cancelEdit();
  };

  if (data.comments.length === 0) {
    return (
      <div className='mt-[16px] flex h-[60px] w-full items-center justify-center rounded-[8px] bg-base font-md-medium text-gray-500'>
        아직 댓글이 없어요
      </div>
    );
  }

  return (
    <ul className='mt-[16px] flex flex-col gap-[20px] sm:mt-[24px]'>
      {data.comments.map((comment, index) => {
        const isLast = index === data.comments.length - 1;
        const isEditing = editingId === comment.id;

        return (
          <li
            key={comment.id}
            ref={isLast ? lastItemRef : null}
            className='flex gap-[8px] sm:gap-[12px]'>
            <Avatar size={avatarSize} user={comment.author}>
              <Avatar.Img />
              <Avatar.Fallback />
            </Avatar>

            <div className='flex w-full flex-col'>
              <div className='flex items-center gap-[8px]'>
                <span className='font-xs-semibold sm:font-md-semibold'>
                  {comment.author.nickname}
                </span>
                <span className='text-[10px] text-gray-400 sm:font-xs-regular'>
                  {formatDateForServer(comment.updatedAt)}
                </span>
              </div>

              {!isEditing ? (
                <>
                  <p className='font-xs-regular sm:font-md-regular'>{comment.content}</p>
                  <div className='mt-[8px] flex gap-[8px] sm:mt-[10px]'>
                    <button
                      type='button'
                      className={commentButtonStyle}
                      onClick={() => startEdit(comment.id, comment.content)}>
                      수정
                    </button>
                    <button
                      type='button'
                      className={commentButtonStyle}
                      onClick={() => onDelete(comment.id)}>
                      삭제
                    </button>
                  </div>
                </>
              ) : (
                <div className='mt-[8px] flex flex-col gap-[8px]'>
                  <textarea
                    className='resize-none rounded border border-gray-300 p-2 text-sm outline-0 focus:border focus:border-primary'
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    aria-label='댓글 수정'
                  />
                  <div className='flex gap-[8px]'>
                    <button
                      type='button'
                      className={commentButtonStyle}
                      onClick={() => submitEdit(comment.id)}>
                      저장
                    </button>
                    <button type='button' className={commentButtonStyle} onClick={cancelEdit}>
                      취소
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
