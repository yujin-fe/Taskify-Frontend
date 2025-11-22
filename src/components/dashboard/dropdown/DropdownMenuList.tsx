import { useContext } from 'react';
import { DropdownMenuContext } from '@/context/dropdownMenuContext';

export default function DropdownMenuList({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(DropdownMenuContext);

  return (
    isOpen && (
      <ul className='absolute top-[calc(100%+8px)] right-0 z-1000 flex w-[93px] flex-col justify-center rounded-md bg-gray-0 px-1.5 py-1.75 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]'>
        {children}
      </ul>
    )
  );
}
