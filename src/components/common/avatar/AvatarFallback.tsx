import { cva } from 'class-variance-authority';
import { useContext } from 'react';
import { AvatarContext } from '@/context/avatarContext';
import { getMonogram, getProfileColorForId } from '@/utils/avatar';

const AvatarFallbackStyle = cva('flex items-center justify-center w-full h-full text-gray-0', {
  variants: {
    color: {
      orange: 'bg-orange-500/80',
      blue: 'bg-blue-500/80',
      green: 'bg-green-500/80',
      pink: 'bg-pink-500/80',
      purple: 'bg-purple-500/80',
    },
  },
});

export default function AvatarFallback() {
  const { nickname, id } = useContext(AvatarContext);
  const color = getProfileColorForId(id);

  return <div className={AvatarFallbackStyle({ color })}>{getMonogram(nickname)}</div>;
}
