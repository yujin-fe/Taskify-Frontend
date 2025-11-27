import { Navigate, Outlet } from 'react-router';
import useAuthContext from '@/hooks/useAuthContext';

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
