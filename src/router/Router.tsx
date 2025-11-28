import { BrowserRouter, Route, Routes } from 'react-router';
import AuthLayout from '@/pages/AuthLayout';
import DashboardDetail from '@/pages/DashboardDetail';
import DashboardEdit from '@/pages/DashboardEdit';
import DetailLayout from '@/pages/DetailLayout';
import Home from '@/pages/Home';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import MyDashboard from '@/pages/MyDashboard';
import Mypage from '@/pages/Mypage';
import Signup from '@/pages/Signup';
import ProtectedRoute from '@/router/ProtectedRoute';
import PublicRoute from '@/router/PublicRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/mydashboard' element={<MyDashboard />} />
            <Route element={<DetailLayout />}>
              <Route path='/dashboard/:dashboardId' element={<DashboardDetail />} />
              <Route path='/dashboard/:dashboardId/edit' element={<DashboardEdit />} />
            </Route>
            <Route path='/mypage' element={<Mypage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
