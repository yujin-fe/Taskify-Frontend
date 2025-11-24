import { useContext } from 'react';
import { InputContext } from '@/context/inputContext';

const useInputContext = () => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error('InputContext 안에서 사용하세요.');
  }

  return context;
};

export default useInputContext;
