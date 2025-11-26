import { cva } from 'class-variance-authority';
import { useContext } from 'react';
import { AvatarContext } from '@/context/avatarContext';
import { getMonogram, getProfileColorForId } from '@/utils/avatar';

const AvatarFallbackStyle = cva(
  'flex items-center justify-center w-full h-full text-gray-0 select-none',
  {
    variants: {
      color: {
        orange: 'bg-profile-orange',
        blue: 'bg-profile-blue',
        green: 'bg-profile-green',
        pink: 'bg-profile-pink',
        purple: 'bg-profile-purple',
      },
    },
  }
);

export default function AvatarFallback() {
  const { nickname, id } = useContext(AvatarContext);
  const color = getProfileColorForId(id);

  return <div className={AvatarFallbackStyle({ color })}>{getMonogram(nickname)}</div>;
}
