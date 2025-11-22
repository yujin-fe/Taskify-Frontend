import Icons from '@/assets/icons';

interface DropdownMenuCheckItemProps {
  children: React.ReactNode;
  selected: boolean;
}

export default function DropdownMenuCheckItem({ children, selected }: DropdownMenuCheckItemProps) {
  return (
    <li className='dropdown-menu-item-base relative flex h-12 items-center gap-2 pl-[46px] hover:bg-gray-200'>
      {selected && <Icons.Check width={22} height={22} className='absolute left-4 text-gray-500' />}
      {children}
    </li>
  );
}
