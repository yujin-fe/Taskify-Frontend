import { useContext } from 'react';
import { ColumnListContext } from '@/context/columnListContext';

export const useColumnListContext = () => {
  const context = useContext(ColumnListContext);

  if (!context) {
    throw new Error('ColumnListContext 안에서 사용하세요.');
  }

  return context;
};
