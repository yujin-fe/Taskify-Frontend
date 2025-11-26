import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('AuthContext 안에서 사용하세요.');
  }

  return context;
};

export default useAuthContext;
