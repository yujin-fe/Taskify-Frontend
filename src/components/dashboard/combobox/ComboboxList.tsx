import React from 'react';
import type { ComboboxItemProps } from '@/components/dashboard/combobox/ComboboxItem';
import useComboboxContext from '@/hooks/useComboboxContext';
import { matchSearch } from '@/utils/combobox';

export default function ComboboxList({ children }: { children: React.ReactNode }) {
  const { isOpen, searchQuery } = useComboboxContext();

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) {
      return true;
    }
    const itemValue = (child.props as ComboboxItemProps).value || '';
    return matchSearch(itemValue, searchQuery);
  });

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      role='menu'
      className='absolute top-[calc(100%+8px)] left-0 z-1000 w-full rounded-md border border-gray-300 bg-gray-0'>
      {filteredChildren.length > 0 ? (
        <>{filteredChildren}</>
      ) : (
        <li className='px-4 py-3 text-center font-md-regular text-gray-500'>
          검색 결과가 없습니다.
        </li>
      )}
    </ul>
  );
}
