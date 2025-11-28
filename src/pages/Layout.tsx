import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import SideBar from '@/components/dashboard/SideBar';
import { MOBILECOUNT, TABLETCOUNT, DESKTOPCOUNT } from '@/constants/sidebar';
import { DashboardContext } from '@/context/dashboardContext';
import { usePagination } from '@/hooks/usePagination';
import { useResponsiveValue } from '@/hooks/useResponsiveValue';
import { getDashboards } from '@/lib/apis/dashboards';
import { type DashboardsResponse } from '@/types/dashboardsData';
import { cn } from '@/utils/cn';

export default function Layout() {
  //TODO: 로컬스토리지에서 관리
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dashboardsData, setDashboardsData] = useState({
    dashboards: [],
    totalCount: 0,
    cursorId: 0,
  } as DashboardsResponse);

  const size = useResponsiveValue({
    mobile: MOBILECOUNT,
    tablet: TABLETCOUNT,
    desktop: DESKTOPCOUNT,
  });
  const { totalCount, cursorId } = dashboardsData;
  const pageCount = Math.ceil(totalCount / size);

  const { currentPage, handlePrev, handleNext, isPrevDisabled, isNextDisabled } =
    usePagination(pageCount);

  const params = {
    navigationMethod: 'pagination',
    page: currentPage,
    size,
    cursorId,
  };

  //TODO: useQuery hook 생성되면 교체
  useEffect(() => {
    const getDashboardsData = async () => {
      const data = await getDashboards(params);
      setDashboardsData(data);
    };
    getDashboardsData();
  }, [size, currentPage]);

  return (
    <DashboardContext value={{ dashboardsData }}>
      <div>
        <SideBar
          isCollapsed={isCollapsed}
          onClickSidebarIcon={() => setIsCollapsed(!isCollapsed)}
          handlePrev={handlePrev}
          handleNext={handleNext}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
        />
        <div className={cn(isCollapsed ? 'pl-[67px]' : 'pl-[67px] md:pl-[300px]')}>
          {/* header는 테스트용 코드입니다 */}
          <header className='fixed top-0 h-[70px] w-full bg-gray-0'>헤더</header>
          <main className='min-h-dvh bg-base pt-[70px]'>
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardContext>
  );
}
