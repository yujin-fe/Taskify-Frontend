import { useNavigate } from 'react-router';
import Avatar from '@/components/common/avatar/Avatar';
import Dropdown from '@/components/dashboard/dropdown/Dropdown';
import useAuthContext from '@/hooks/useAuthContext';
import type { UserMe } from '@/types/userMe';

interface HeaderUserInfoProps {
  user: UserMe | null;
}

export default function HeaderUserInfo({ user }: HeaderUserInfoProps) {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleMyPage = () => {
    navigate('/mypage');
  };

  const handleMyDashboard = () => {
    navigate('/mydashboard');
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <div className='flex items-center gap-2'>
      <Dropdown>
        <Dropdown.Trigger className='flex items-center gap-[12px]'>
          <Avatar size='m' user={user}>
            <Avatar.Img />
            <Avatar.Fallback />
          </Avatar>
          <span className='hidden font-lg-medium text-gray-700 md:inline'>{user.nickname}</span>
        </Dropdown.Trigger>
        <Dropdown.List className='border border-gray-300'>
          <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          <Dropdown.Item onClick={handleMyPage}>내 정보</Dropdown.Item>
          <Dropdown.Item onClick={handleMyDashboard}>내 대시보드</Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </div>
  );
}
