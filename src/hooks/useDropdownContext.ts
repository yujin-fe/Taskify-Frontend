import { useContext } from 'react';
import DropdownContext from '@/context/dropdownContext';

const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('DropdownContext 안에서 사용하세요.');
  }

  return context;
};

export default useDropdownContext;
