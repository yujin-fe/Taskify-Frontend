import Icons from '@/assets/icons';
import { Logo } from '@/components/common/Logo';
import PageNation from '@/components/common/PageNation';
import DashboardName from '@/components/dashboard/DashboardName';
import type { Dashboard } from '@/types/dashboardsData';
import { cn } from '@/utils/cn';

//TODO: 레이아웃 페이지에서 dashboardsResponse 조회
const dashboards: Dashboard[] = [
  {
    id: 1,
    title: 'string',
    color: 'orange',
    createdAt: '2025-11-26T06:20:05.527Z',
    updatedAt: '2025-11-26T06:20:05.527Z',
    createdByMe: true,
    userId: 1,
  },
  {
    id: 2,
    title: 'hi',
    color: 'green',
    createdAt: '2025-11-26T06:20:05.527Z',
    updatedAt: '2025-11-26T06:20:05.527Z',
    createdByMe: true,
    userId: 2,
  },
  {
    id: 3,
    title: 'today',
    color: 'purple',
    createdAt: '2025-11-26T06:20:05.527Z',
    updatedAt: '2025-11-26T06:20:05.527Z',
    createdByMe: false,
    userId: 3,
  },
];

export default function SideBar({
  isCollapsed,
  onClickSidebarIcon,
}: {
  isCollapsed: boolean;
  onClickSidebarIcon: () => void;
}) {
  //TODO: 페이지네이션 구현
  const onNext = () => {
    console.log('다음페이지로 이동');
  };
  const onPrev = () => {
    console.log('이전페이지로 이동');
  };
  return (
    <div
      className={cn(
        'fixed top-0 left-0 flex h-screen flex-col bg-gray-0 px-2 py-5',
        isCollapsed ? 'w-[67px] items-center gap-3.5' : 'w-[300px] gap-14'
      )}>
      <div className='group flex h-7 justify-between'>
        <Logo
          size={isCollapsed ? 'Small' : 'Medium'}
          color='primary'
          className={cn(isCollapsed && 'group-hover:hidden')}
        />
        <button onClick={onClickSidebarIcon}>
          <Icons.Sidebar
            className={cn(
              'cursor-pointer text-gray-500',
              isCollapsed && 'hidden group-hover:block'
            )}
          />
        </button>
      </div>
      <div className={cn('flex flex-col gap-8', isCollapsed && 'gap-3.5')}>
        <div className={cn('flex flex-col gap-4', isCollapsed && 'gap-3.5')}>
          <div className='flex items-center justify-between'>
            <span className={cn('font-xs-semibold text-gray-500', isCollapsed && 'hidden')}>
              Dash Board
            </span>
            <button className={cn('cursor-pointer', isCollapsed && 'mx-auto')}>
              <Icons.AddDashboard className='text-gray-500' />
            </button>
          </div>
          <ul className={cn('flex flex-col gap-2', isCollapsed && 'gap-3.5')}>
            {dashboards.map((dashboard) => (
              <DashboardName
                key={dashboard.id}
                color={dashboard.color}
                createdByMe={dashboard.createdByMe}
                dashboardId={dashboard.id.toString()}
                isCollapsed={isCollapsed}>
                {dashboard.title}
              </DashboardName>
            ))}
          </ul>
        </div>
        {!isCollapsed && <PageNation onPrev={onPrev} onNext={onNext} />}
      </div>
    </div>
  );
}
