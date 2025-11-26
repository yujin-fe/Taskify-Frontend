import Avatar from '@/components/common/avatar/Avatar';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';

const AVATAR_MAX = {
  mobile: 2,
  tablet: 3,
  desktop: 4,
};

interface AvatarGroupProps {
  users: UserMe[];
  size?: 'm';
  className?: string;
}

export default function AvatarGroup({ users, size = 'm', className }: AvatarGroupProps) {
  const maxToShow = useResponsiveValue({
    mobile: AVATAR_MAX.mobile,
    tablet: AVATAR_MAX.tablet,
    desktop: AVATAR_MAX.desktop,
  });

  const visibleUsers = users.slice(0, maxToShow);
  const rest = users.length - visibleUsers.length;

  return (
    <div
      className={cn('flex items-center', size === 'm' ? '-space-x-3' : '-space-x-3.5', className)}>
      {visibleUsers.map((user) => (
        <Avatar key={user.id} size={size} user={user}>
          <Avatar.Img />
          <Avatar.Fallback />
        </Avatar>
      ))}

      {rest > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full font-lg-medium',
            'border-2 border-gray-0 bg-profile-pink-100 text-pink-500',
            size === 'm' ? 'h-[38px] w-[38px] font-lg-medium' : 'h-[24px] w-[24px] font-sm-medium'
          )}>
          +{rest}
        </div>
      )}
    </div>
  );
}
