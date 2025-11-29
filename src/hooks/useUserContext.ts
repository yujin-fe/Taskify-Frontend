import { useContext } from 'react';
import { UserContext } from '@/context/userContext';

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UserProvider 안에서 사용하세요.');
  }

  return context;
};

export default useUserContext;
