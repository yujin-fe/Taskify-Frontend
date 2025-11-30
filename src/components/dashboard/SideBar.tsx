import { useContext } from 'react';
import Icons from '@/assets/icons';
import { Logo } from '@/components/common/Logo';
import PageNation from '@/components/common/PageNation';
import DashboardName from '@/components/dashboard/DashboardName';
import DashboardSideBarSkeleton from '@/components/skeleton/DashboardSideBarSkeleton';
import { NEW_DASHBOARD } from '@/constants/modalName';
import { DashboardContext } from '@/context/dashboardContext';
import { useModal } from '@/hooks/useModal';
import { cn } from '@/utils/cn';

interface SideBarProps {
  isCollapsed: boolean;
  onClickSidebarIcon: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  isPrevDisabled: boolean;
  size: number;
  currentPage: number;
}

export default function SideBar({
  isCollapsed,
  onClickSidebarIcon,
  handleNext,
  handlePrev,
  isPrevDisabled,
  size,
  currentPage,
}: SideBarProps) {
  const { dashboardsData, isLoading } = useContext(DashboardContext);
  const { handleModalOpen } = useModal(NEW_DASHBOARD);

  if (!dashboardsData) {
    return null;
  }
  const { totalCount } = dashboardsData;
  const pageCount = Math.ceil(totalCount / size);
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-1 z-20 flex h-screen flex-col bg-gray-0 px-2 py-5',
        isCollapsed ? 'w-[67px] items-center gap-3.5' : 'w-[300px] gap-14'
      )}>
      <div className='group flex h-7 justify-between'>
        <Logo
          size={isCollapsed ? 'Small' : 'Medium'}
          color='primary'
          className={cn(isCollapsed && 'group-hover:hidden')}
        />
        <button
          type='button'
          onClick={onClickSidebarIcon}
          className={cn(
            'flex h-8 w-9 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100',
            isCollapsed && 'hidden group-hover:flex group-hover:h-8 group-hover:w-9'
          )}>
          <Icons.Sidebar className='text-gray-500' />
        </button>
      </div>
      {isLoading ? (
        <DashboardSideBarSkeleton isCollapsed={isCollapsed} length={size} />
      ) : (
        <div className={cn('flex flex-col gap-8', isCollapsed && 'gap-3.5')}>
          <div className={cn('flex flex-col gap-4', isCollapsed && 'gap-3.5')}>
            <div className='flex items-center justify-between'>
              <span className={cn('font-xs-semibold text-gray-500', isCollapsed && 'hidden')}>
                Dash Board
              </span>
              <button
                aria-label='대시보드 생성'
                onClick={handleModalOpen}
                className={cn('cursor-pointer', isCollapsed && 'mx-auto')}>
                <Icons.AddDashboard className='text-gray-500' />
              </button>
            </div>
            <ul
              className={cn(
                'flex h-[292px] flex-col gap-2 sm:h-[378px] md:h-[492px]',
                isCollapsed && 'h-[540px] gap-3.5'
              )}>
              {dashboardsData.dashboards?.map((dashboard) => (
                <DashboardName key={dashboard.id} isCollapsed={isCollapsed} dashboard={dashboard}>
                  {dashboard.title}
                </DashboardName>
              ))}
            </ul>
          </div>
          {!isCollapsed && totalCount !== 0 && (
            <PageNation
              onPrev={handlePrev}
              onNext={handleNext}
              prevDisabled={isPrevDisabled}
              nextDisabled={currentPage >= pageCount}
            />
          )}
        </div>
      )}
    </aside>
  );
}
