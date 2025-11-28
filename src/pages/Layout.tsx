import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import DashboardCreateModal from '@/components/dashboard/modal/DashboardCreateModal';
import SideBar from '@/components/dashboard/SideBar';
import { NEW_DASHBOARD } from '@/constants/modalName';
import { MOBILECOUNT, TABLETCOUNT, DESKTOPCOUNT } from '@/constants/sidebar';
import { DashboardContext } from '@/context/dashboardContext';
import { useModal } from '@/hooks/useModal';
import { usePagination } from '@/hooks/usePagination';
import useQuery from '@/hooks/useQuery';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import { getDashboards } from '@/lib/apis/dashboards';
import { type DashboardsResponse } from '@/types/dashboardsData';
import { cn } from '@/utils/cn';

export default function Layout() {
  const { isOpen } = useModal(NEW_DASHBOARD);
  const size = useResponsiveValue({
    mobile: MOBILECOUNT,
    tablet: TABLETCOUNT,
    desktop: DESKTOPCOUNT,
  });

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const collapsed = localStorage.getItem('sidebar-collapsed');
    return collapsed && JSON.parse(collapsed);
  });

  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();

  const params: parmasType = {
    navigationMethod: 'pagination',
    page: currentPage,
    size,
    cursorId: null,
  };
  interface parmasType {
    navigationMethod: 'pagination' | 'infiniteScroll';
    page: number;
    size: number;
    cursorId: number | null;
  }

  const { data: dashboardsData } = useQuery<DashboardsResponse>({
    fetchFn: () => getDashboards(params),
    params,
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  if (!dashboardsData) {
    return null;
  }
  const { totalCount } = dashboardsData;
  const pageCount = Math.ceil(totalCount / size);

  return (
    <>
      <DashboardContext value={{ dashboardsData }}>
        <SideBar
          isCollapsed={isCollapsed}
          onClickSidebarIcon={() => setIsCollapsed(!isCollapsed)}
          handlePrev={handlePrev}
          handleNext={handleNext}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={pageCount === currentPage}
        />
        <div className={cn(isCollapsed ? 'pl-[67px]' : 'pl-[67px] md:pl-[300px]')}>
          {/* header는 테스트용 코드입니다 */}
          <header className='fixed top-0 h-[70px] w-full bg-gray-0'>헤더</header>
          <main className='min-h-dvh bg-base pt-[70px]'>
            <Outlet />
          </main>
        </div>
      </DashboardContext>
      {isOpen && <DashboardCreateModal />}
    </>
  );
}
