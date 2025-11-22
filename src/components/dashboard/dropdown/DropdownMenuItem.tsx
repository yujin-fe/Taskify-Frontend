import { useContext } from 'react';
import { DropdownMenuContext } from '@/context/dropdownMenuContext';

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function DropdownMenuItem({ children, onClick }: DropdownMenuItemProps) {
  const { handleToggleOpen } = useContext(DropdownMenuContext);

  const handleClickMenuItem = () => {
    handleToggleOpen();
    onClick();
  };

  return (
    <li
      role='menuitem'
      tabIndex={0}
      className='dropdown-menu-item-base py-1 text-center font-md-regular hover:bg-violet-500-8 hover:text-violet-500'
      onClick={handleClickMenuItem}>
      {children}
    </li>
  );
}
