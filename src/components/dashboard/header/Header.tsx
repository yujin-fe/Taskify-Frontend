import { useLocation } from 'react-router';
import Icons from '@/assets/icons';
import AvatarGroup from '@/components/common/avatar/AvatarGroup';
import Title from '@/components/common/Title';
import HeaderUserInfo from '@/components/dashboard/header/HeaderUserInfo';
import SettingButton from '@/components/dashboard/header/SettingButton';
import InviteButton from '@/components/dashboard/InviteButton';
import HeaderSkeleton from '@/components/skeleton/HeaderSkeleton';
import { INVITE } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';
import useQuery from '@/hooks/useQuery';
import { getDashboardDetail } from '@/lib/apis/dashboards';
import { getMemberList } from '@/lib/apis/members';
import { getUsersMe } from '@/lib/apis/users';
import type { Dashboard } from '@/types/dashboardsData';
import type { MembersResponse } from '@/types/members';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';

/** 타이틀 함수 */
const getBasicTitle = (pathname: string) => {
  if (pathname.startsWith('/mydashboard')) {
    return '내 대시보드';
  }
  if (pathname.startsWith('/mypage')) {
    return '계정관리';
  }
  return null;
};

interface HeaderProps {
  isCollapsed: boolean;
}

export default function Header({ isCollapsed }: HeaderProps) {
  const { handleModalOpen } = useModal(INVITE);
  const location = useLocation();
  const pathname = location.pathname;

  const title = getBasicTitle(pathname);
  const isDashboardDetail = /^\/dashboard\/\d+/.test(pathname);
  const dashboardId = isDashboardDetail ? pathname.split('/')[2] : undefined;

  const { data: userData, isLoading: userDataLoading } = useQuery<UserMe>({ fetchFn: getUsersMe });

  const { data: dashboardData, isLoading: dashboardDataLoading } = useQuery<Dashboard>({
    fetchFn: () =>
      dashboardId && isDashboardDetail ? getDashboardDetail(dashboardId) : Promise.resolve(null),
    params: { dashboardId },
  });
  const { data: memberData, isLoading: memberDataLoading } = useQuery<MembersResponse>({
    fetchFn: () =>
      dashboardId && isDashboardDetail ? getMemberList(dashboardId) : Promise.resolve(null),
    params: { dashboardId },
  });

  /** 버튼 렌더링 조건 */
  const shouldViewButtons = !pathname.includes('/mydashboard') && !pathname.includes('/mypage');

  const isLoading = userDataLoading || dashboardDataLoading || memberDataLoading;

  if (isLoading) {
    return (
      <HeaderSkeleton
        isCollapsed={isCollapsed}
        isDashboardDetail={isDashboardDetail}
        shouldViewButtons={shouldViewButtons}
      />
    );
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full bg-gray-0 px-[8px] md:pr-[24px] lg:pr-[40px]',
        isCollapsed ? 'pl-[65px]' : 'md:pl-[300px]'
      )}>
      <div className='flex h-[60px] items-center justify-between pl-[16px] sm:h-[70px] md:pl-[40px]'>
        <Title size={'xl'} weight={'bold'} className='hidden items-center gap-[8px] sm:flex'>
          {title || dashboardData?.title}
          {dashboardData?.createdByMe && <Icons.Crown className='text-crown' />}
        </Title>

        {shouldViewButtons && (
          <div className='mr-[16px] ml-auto flex gap-[16px] sm:mr-[32px] md:mr-[40px]'>
            <SettingButton />
            <InviteButton onClick={handleModalOpen} />
          </div>
        )}

        {isDashboardDetail && <AvatarGroup users={memberData?.members} />}

        {shouldViewButtons && (
          <div className='mx-[16px] h-[38px] border-r border-gray-300 sm:mx-[24px] md:mx-[32px]' />
        )}
        <HeaderUserInfo user={userData} />
      </div>
    </header>
  );
}
