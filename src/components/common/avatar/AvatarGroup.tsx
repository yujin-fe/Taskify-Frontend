import Avatar from '@/components/common/avatar/Avatar';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import type { Member } from '@/types/members';
import { cn } from '@/utils/cn';

const AVATAR_MAX = {
  mobile: 2,
  tablet: 3,
  desktop: 4,
};

interface AvatarGroupProps {
  users: Member[] | undefined;
  className?: string;
}

export default function AvatarGroup({ users, className }: AvatarGroupProps) {
  const maxToShow = useResponsiveValue({
    mobile: AVATAR_MAX.mobile,
    tablet: AVATAR_MAX.tablet,
    desktop: AVATAR_MAX.desktop,
  });

  if (!users) {
    return null;
  }

  const visibleUsers = users.slice(0, maxToShow);
  const rest = users.length - visibleUsers.length;

  return (
    <div className={cn('flex items-center', '-space-x-2.5', className)}>
      {visibleUsers.map((user) => (
        <Avatar key={user.id} size='m' user={user}>
          <Avatar.Img />
          <Avatar.Fallback />
        </Avatar>
      ))}

      {rest > 0 && (
        <div
          className={cn(
            'flex h-[38px] w-[38px] items-center justify-center rounded-full font-lg-medium',
            'border-2 border-gray-0 bg-profile-pink-100 text-pink-500'
          )}>
          +{rest}
        </div>
      )}
    </div>
  );
}
