import { useContext } from 'react';
import { AvatarContext } from '@/context/avatarContext';

export default function AvatarImg() {
  const { profileImageUrl, nickname, setImageError } = useContext(AvatarContext);
  if (!profileImageUrl) {
    return null;
  }
  return (
    <img
      className='h-full w-full object-cover'
      src={profileImageUrl}
      alt={`${nickname}님의 프로필`}
      onError={() => setImageError(true)}
    />
  );
}
