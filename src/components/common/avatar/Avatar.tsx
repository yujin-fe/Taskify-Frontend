import React, { useState } from 'react';
import AvatarFallback from '@/components/common/avatar/AvatarFallback';
import AvatarImg from '@/components/common/avatar/AvatarImg';
import { AvatarContext } from '@/context/avatarContext';
import type { Assignee } from '@/types/card';
import type { Author } from '@/types/comment';
import type { Member } from '@/types/members';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';

interface AvatarProps {
  children: React.ReactNode;
  size: 's' | 'm';
  user: UserMe | Assignee | Member | Author;
}

/**
 * @example
 * <Avatar size="s" user={user} key={user.id}>
 *  <Avatar.Img />
 *  <Avatar.Fallback />
 * </Avatar>
 */

export default function Avatar({ children, size, user }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const AvatarStyle = cn('pointer-events-none rounded-full overflow-hidden shrink-0', {
    'w-[24px] h-[24px] ': size === 's',
    'w-[38px] h-[38px] border-2 border-gray-0': size === 'm',
  });
  //children 중 AvatarImg 태그
  const img = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AvatarImg
  );
  //children 중 AvatarFallback 태그
  const fallback = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AvatarFallback
  );
  return (
    <AvatarContext value={{ user, setImageError }}>
      <div className={AvatarStyle}>{user.profileImageUrl && !imageError ? img : fallback}</div>
    </AvatarContext>
  );
}

Avatar.Img = AvatarImg;

Avatar.Fallback = AvatarFallback;
