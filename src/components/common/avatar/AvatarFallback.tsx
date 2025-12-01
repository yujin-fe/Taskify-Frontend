import { cva } from 'class-variance-authority';
import { useContext } from 'react';
import { AvatarContext } from '@/context/avatarContext';
import { getMonogram, getProfileColorForId } from '@/utils/avatar';

const AvatarFallbackStyle = cva(
  'font-sm-medium sm:font-md-regular flex items-center justify-center w-full h-full text-gray-0 select-none',
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
  const { user } = useContext(AvatarContext);
  const idForColor = 'userId' in user ? user.userId : user.id;
  const color = getProfileColorForId(idForColor ?? 0);

  return <div className={AvatarFallbackStyle({ color })}>{getMonogram(user.nickname)}</div>;
}
