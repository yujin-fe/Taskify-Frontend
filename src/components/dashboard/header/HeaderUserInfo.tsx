import Avatar from '@/components/common/avatar/Avatar';
import Dropdown from '@/components/dashboard/dropdown/Dropdown';
import useAuthContext from '@/hooks/useAuthContext';
import type { UserMe } from '@/types/userMe';

interface HeaderUserInfoProps {
  user: UserMe | null;
}

export default function HeaderUserInfo({ user }: HeaderUserInfoProps) {
  const { isLoggedIn, logout } = useAuthContext();

  const handleMyPage = () => {};

  const handleLogout = () => {
    logout();
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className='flex items-center gap-2'>
      <Dropdown>
        <Dropdown.Trigger className='rounded-full px-1 py-1'>
          <Avatar size='m' user={user}>
            <Avatar.Img />
            <Avatar.Fallback />
          </Avatar>
        </Dropdown.Trigger>

        <Dropdown.List>
          <Dropdown.Item onClick={handleMyPage}>내 정보</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
        </Dropdown.List>
      </Dropdown>

      <span className='hidden font-lg-medium text-gray-900 md:inline'>{user.nickname}</span>
    </div>
  );
}
