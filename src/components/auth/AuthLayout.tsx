import { Outlet } from 'react-router';

/**
 * ### AuthLayout
 * - 라우터 설정에 이미 적용되어 있어서 적용하실 필요 없습니다!
 * - Login, Signup에 공통으로 적용되는 레이아웃 컴포넌트입니다.
 */
export default function AuthLayout() {
  return (
    <div className='min-h-[100dvh] bg-base px-[12px] py-[80px] sm:py-[160px]'>
      <main className='mx-auto flex w-full max-w-[560px] flex-col items-center'>
        <Outlet />
      </main>
    </div>
  );
}
