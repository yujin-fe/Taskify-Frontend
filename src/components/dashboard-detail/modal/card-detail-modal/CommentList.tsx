import Avatar from '@/components/common/avatar/Avatar';

interface CommentListProps {
  avatarSize?: 's' | 'm';
}

const commentListButtonStyle =
  'cursor-pointer text-[10px] text-gray-400 underline underline-offset-2 sm:text-[12px]';

export default function CommentList({ avatarSize = 'm' }: CommentListProps) {
  const handleCommentEdit = () => {
    console.log('TODO: 댓글 수정 구현');
  };

  const handleCommentDelete = () => {
    console.log('TODO: 댓글 삭제 구현');
  };

  return (
    <ul className='mt-[16px] flex flex-col gap-[20px] sm:mt-[24px]'>
      <li className='flex gap-[8px] sm:gap-[12px]'>
        <Avatar size={avatarSize} user={{ userId: 123, nickname: '야호', profileImageUrl: null }}>
          <Avatar.Img />
          <Avatar.Fallback />
        </Avatar>
        <div className='flex flex-col'>
          <div className='flex items-center gap-[8px]'>
            <span className='font-xs-semibold leading-[14px] sm:font-md-semibold sm:leading-[17px]'>
              정만철
            </span>
            <span className='text-[10px] text-gray-400 sm:font-xs-regular'>2022.12.27 14:00</span>
          </div>
          <p className='font-xs-regular sm:font-md-regular'>오늘안에 CCC 까지 만들 수 있을까요?</p>
          <div className='mt-[8px] flex gap-[8px] sm:mt-[10px]'>
            <button type='button' className={commentListButtonStyle} onClick={handleCommentEdit}>
              수정
            </button>
            <button type='button' className={commentListButtonStyle} onClick={handleCommentDelete}>
              삭제
            </button>
          </div>
        </div>
      </li>
      <li className='flex gap-[8px] sm:gap-[12px]'>
        <Avatar size={avatarSize} user={{ userId: 123, nickname: '야호', profileImageUrl: null }}>
          <Avatar.Img />
          <Avatar.Fallback />
        </Avatar>
        <div className='flex flex-col'>
          <div className='flex items-center gap-[8px]'>
            <span className='font-xs-semibold leading-[14px] sm:font-md-semibold sm:leading-[17px]'>
              정만철
            </span>
            <span className='text-[10px] text-gray-400 sm:font-xs-regular'>2022.12.27 14:00</span>
          </div>
          <p className='font-xs-regular sm:font-md-regular'>오늘안에 CCC 까지 만들 수 있을까요?</p>
          <div className='mt-[8px] flex gap-[8px] sm:mt-[10px]'>
            <button type='button' className={commentListButtonStyle} onClick={handleCommentEdit}>
              수정
            </button>
            <button type='button' className={commentListButtonStyle} onClick={handleCommentDelete}>
              삭제
            </button>
          </div>
        </div>
      </li>
    </ul>
  );
}
