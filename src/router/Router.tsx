import { BrowserRouter, Route, Routes } from 'react-router';
import AuthLayout from '@/pages/AuthLayout';
import DashboardDetail from '@/pages/DashboardDetail';
import DashboardEdit from '@/pages/DashboardEdit';
import Home from '@/pages/Home';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import MyDashboard from '@/pages/MyDashboard';
import Mypage from '@/pages/Mypage';
import Signup from '@/pages/Signup';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        {/* 레이아웃 컴포넌트 연결 */}
        <Route element={<Layout />}>
          <Route path='/mydashboard' element={<MyDashboard />} />
          <Route path='/dashboard/:dashboardId' element={<DashboardDetail />} />
          <Route path='/dashboard/:dashboardId/edit' element={<DashboardEdit />} />
          <Route path='/mypage' element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
