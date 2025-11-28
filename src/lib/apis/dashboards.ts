import type { ColorHex } from '@/constants/color';
import { api } from '@/lib/axios';

interface CreateDashboardType {
  title: string;
  color: ColorHex;
}

/** 대시보드 생성 함수 */
export const createDashboard = async (reqBody: CreateDashboardType) => {
  const res = await api.post('/dashboards', reqBody);
  return res.data;
};

/** 대시보드 목록 조회 함수 */
export const getDashboards = async (params: {
  navigationMethod: 'pagination' | 'infiniteScroll';
  page: number;
  size: number;
  cursorId: number | null;
}) => {
  const res = await api.get('/dashboards/', { params });
  return res.data;
};
