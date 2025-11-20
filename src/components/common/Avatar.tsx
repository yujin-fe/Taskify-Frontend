import clsx from 'clsx';
import AvatarFallback from '@/components/common/AvatarFallback';

interface AvatarProps {
  profileImgUrl: string | null;
  userName: string;
  size: 's' | 'm';
  userId: number;
}

export default function Avatar({ profileImgUrl, userName, userId, size }: AvatarProps) {
  const AvatarStyle = clsx('rounded-full overflow-hidden', {
    'w-[24px] h-[24px] ': size === 's',
    'w-[38px] h-[38px] border-2 border-gray-0': size === 'm',
  });
  return (
    <div className={AvatarStyle}>
      {profileImgUrl ? (
        <img
          className='h-full w-full object-cover'
          src={profileImgUrl}
          alt={`${userName}님의 프로필`}
        />
      ) : (
        <AvatarFallback id={userId} nickname={userName} />
      )}
    </div>
  );
}
