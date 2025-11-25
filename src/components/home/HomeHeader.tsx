import { Link } from 'react-router';
import logos from '@/assets/logos';

const linkStyle = 'rounded-[4px] py-1.5 px-2 md:px-3 md:py-2 hover:bg-gray-700';

export default function HomeHeader() {
  return (
    <header className='sticky top-0 w-full bg-gray-900'>
      <div className='mx-auto flex h-[70px] max-w-[1760px] items-center justify-between'>
        <h1>
          <Link to='/' aria-label='Taskify 홈으로 이동'>
            <picture>
              <source width={24} media='(max-width: 639px)' srcSet={logos.smallUrl} />
              <img width={121} src={logos.mediumUrl} alt='Taskify logo' />
            </picture>
          </Link>
        </h1>
        <nav className='mr-[-8px] flex gap-[8px] text-gray-0 sm:mr-[-12px] sm:gap-[12px]'>
          <Link to='/login' className={linkStyle}>
            로그인
          </Link>
          <Link to='/signup' className={linkStyle}>
            회원가입
          </Link>
        </nav>
      </div>
    </header>
  );
}
