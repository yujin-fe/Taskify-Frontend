import type { ColorHex } from '@/constants/color';
import { api } from '@/lib/axios';

interface CreateDashboardType {
  title: string;
  color: ColorHex;
}

export const createDashboard = async (reqBody: CreateDashboardType) => {
  const res = await api.post('/dashboards', reqBody);
  return res.data;
};

export const getDashboards = async (params: {
  navigationMethod: 'pagination' | 'infiniteScroll';
  page: number;
  size: number;
  cursorId: number | null;
}) => {
  const res = await api.get('/dashboards/', { params });
  return res.data;
};
