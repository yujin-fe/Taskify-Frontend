import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Header from '@/components/dashboard/header/Header';
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
    return collapsed ? JSON.parse(collapsed) : false;
  });

  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();

  interface GetDashboardsparams {
    navigationMethod: 'pagination' | 'infiniteScroll';
    page: number;
    size: number;
    cursorId: number | null;
  }
  const params: GetDashboardsparams = {
    navigationMethod: 'pagination',
    page: currentPage,
    size,
    cursorId: null,
  };

  const { data: dashboardsData, isLoading } = useQuery<DashboardsResponse>({
    fetchFn: () => getDashboards(params),
    params,
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  return (
    <>
      <DashboardContext value={{ dashboardsData, isLoading }}>
        <SideBar
          isCollapsed={isCollapsed}
          onClickSidebarIcon={() => setIsCollapsed(!isCollapsed)}
          handlePrev={handlePrev}
          handleNext={handleNext}
          isPrevDisabled={isPrevDisabled}
          size={size}
          currentPage={currentPage}
        />
        <Header isCollapsed={isCollapsed} />
        <div className={cn(isCollapsed ? 'pl-[67px]' : 'pl-[67px] md:pl-[300px]')}>
          <main className='min-h-dvh bg-base pt-[70px]'>
            <Outlet />
          </main>
        </div>
      </DashboardContext>
      {isOpen && <DashboardCreateModal />}
    </>
  );
}
