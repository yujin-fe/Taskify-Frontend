import Avatar from '@/components/common/avatar/Avatar';
import type { CommentListResponse } from '@/types/comment';

interface CommentListProps {
  avatarSize?: 's' | 'm';
  data: CommentListResponse;
}

const commentListButtonStyle =
  'cursor-pointer text-[10px] text-gray-400 underline underline-offset-2 sm:text-[12px]';

export default function CommentList({ avatarSize = 'm', data }: CommentListProps) {
  const handleCommentEdit = () => {
    console.log('TODO: 댓글 수정 구현');
  };

  const handleCommentDelete = () => {
    console.log('TODO: 댓글 삭제 구현');
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
      {data.comments.map((comment) => (
        <li key={comment.id} className='flex gap-[8px] sm:gap-[12px]'>
          <Avatar size={avatarSize} user={comment.author}>
            <Avatar.Img />
            <Avatar.Fallback />
          </Avatar>
          <div className='flex flex-col'>
            <div className='flex items-center gap-[8px]'>
              <span className='font-xs-semibold leading-[14px] sm:font-md-semibold sm:leading-[17px]'>
                {comment.author.nickname}
              </span>
              <span className='text-[10px] text-gray-400 sm:font-xs-regular'>
                {comment.updatedAt}
              </span>
            </div>
            <p className='font-xs-regular sm:font-md-regular'>{comment.content}</p>
            <div className='mt-[8px] flex gap-[8px] sm:mt-[10px]'>
              <button type='button' className={commentListButtonStyle} onClick={handleCommentEdit}>
                수정
              </button>
              <button
                type='button'
                className={commentListButtonStyle}
                onClick={handleCommentDelete}>
                삭제
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
