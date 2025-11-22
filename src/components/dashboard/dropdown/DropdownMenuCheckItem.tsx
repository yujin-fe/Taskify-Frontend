import { useContext } from 'react';
import Icons from '@/assets/icons';
import { DropdownMenuContext } from '@/context/dropdownMenuContext';

interface DropdownMenuCheckItemProps {
  children: React.ReactNode;
  value: string;
}

export default function DropdownMenuCheckItem({ children, value }: DropdownMenuCheckItemProps) {
  const { value: selectedValue, onValueChange, handleToggleOpen } = useContext(DropdownMenuContext);

  const handleListClick = () => {
    onValueChange?.(value);
    handleToggleOpen();
  };

  return (
    <li
      className='relative flex h-12 dropdown-menu-item-base items-center gap-2 pl-[46px] hover:bg-gray-200'
      onClick={handleListClick}>
      {selectedValue === value && (
        <Icons.Check width={22} height={22} className='absolute left-4 text-gray-500' />
      )}
      {children}
    </li>
  );
}
