import { useContext } from 'react';
import { AvatarContext } from '@/context/avatarContext';

export default function AvatarImg() {
  const { user, setImageError } = useContext(AvatarContext);
  if (!user.profileImageUrl) {
    return null;
  }
  return (
    <img
      className='h-full w-full object-cover'
      src={user.profileImageUrl}
      alt={`${user.nickname}님의 프로필`}
      onError={() => setImageError(true)}
    />
  );
}
