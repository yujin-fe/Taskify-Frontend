import { Navigate, Outlet } from 'react-router';
import useAuthContext from '@/hooks/useAuthContext';

export default function PublicRoute() {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) {
    return <Navigate to='/mydashboard' replace />;
  }

  return <Outlet />;
}
