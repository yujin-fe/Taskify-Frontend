import useDropdownContext from '@/hooks/useDropdownContext';

interface DropdownItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function DropdownItem({ children, onClick }: DropdownItemProps) {
  const { setIsOpen } = useDropdownContext();

  const handleClickMenuItem = () => {
    setIsOpen(false);
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
