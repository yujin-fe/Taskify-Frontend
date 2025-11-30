import Icons from '@/assets/icons';
import useComboboxContext from '@/hooks/useComboboxContext';
import type { Assignee } from '@/types/card';

export interface ComboboxItemProps {
  children: React.ReactNode;
  value: Assignee;
}

export default function ComboboxItem({ children, value }: ComboboxItemProps) {
  const { selectedValue, setSelectedValue, setIsOpen, setSearchQuery, setSelectedNode } =
    useComboboxContext();

  const isSelected = selectedValue?.id === value.id || selectedValue?.userId === value.userId;

  const handleListClick = () => {
    if (isSelected) {
      setSelectedValue(null);
      setSelectedNode(null);
    } else {
      setSelectedValue(value);
      setSelectedNode(children);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <li
      role='menuitem'
      tabIndex={0}
      className='relative flex h-12 dropdown-menu-item-base items-center gap-2 pl-[46px] hover:bg-gray-100'
      onClick={handleListClick}>
      {isSelected && (
        <Icons.Check width={22} height={22} className='absolute left-4 text-gray-500' />
      )}
      {children}
    </li>
  );
}
