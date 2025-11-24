import { useContext } from 'react';
import ComboboxContext from '@/context/comboboxContext';

const useComboboxContext = () => {
  const context = useContext(ComboboxContext);

  if (!context) {
    throw new Error('ComboboxContext 안에서 사용하세요.');
  }

  return context;
};

export default useComboboxContext;
