import { useState } from 'react';
import { Outlet } from 'react-router';
import SideBar from '@/components/dashboard/SideBar';
import { cn } from '@/utils/cn';

export default function Layout() {
  //TODO: 로컬스토리지에서 관리
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <SideBar isCollapsed={isCollapsed} onClickSidebarIcon={() => setIsCollapsed(!isCollapsed)} />
      <div className={cn(isCollapsed ? 'pl-[67px]' : 'pl-[300px]')}>
        {/* header는 테스트용 코드입니다 */}
        <header className='fixed top-0 h-[70px] w-full bg-gray-0'>헤더</header>
        <main className='min-h-dvh bg-base pt-[70px]'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
