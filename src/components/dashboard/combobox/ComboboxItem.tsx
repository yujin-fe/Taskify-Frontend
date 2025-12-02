import Icons from '@/assets/icons';
import type {
  UserComboboxValue,
  StatusComboboxValue,
} from '@/components/dashboard/combobox/Combobox';
import useComboboxContext from '@/hooks/useComboboxContext';

export interface ComboboxItemProps {
  children: React.ReactNode;
  value: UserComboboxValue | StatusComboboxValue;
}

export default function ComboboxItem({ children, value }: ComboboxItemProps) {
  const { selectedValue, setSelectedValue, setIsOpen, setSearchQuery } = useComboboxContext();

  const isSelected = selectedValue?.id !== undefined && selectedValue.id === value.id;

  const handleListClick = () => {
    if (isSelected) {
      setSelectedValue(null);
    } else {
      setSelectedValue(value);
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
