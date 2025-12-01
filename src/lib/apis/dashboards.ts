import type { AxiosResponse } from 'axios';
import type { ColorHex } from '@/constants/color';
import { api } from '@/lib/axios';
import type { Dashboard } from '@/types/dashboardsData';

interface CreateDashboardType {
  title: string;
  color: ColorHex;
}
export interface ChangeDashboardParams {
  title: string;
  color: string;
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

/** 대시보드 상세 조회 함수 */
export const getDashboardDetail = async (dashboardId: string) => {
  const res = await api.get(`/dashboards/${dashboardId}`);
  return res.data;
};

/** 대시보드 수정 함수 */
export const changeDashboard = async (
  dashboardId: number,
  data: ChangeDashboardParams
): Promise<AxiosResponse<Dashboard>> => {
  const res = await api.put(`/dashboards/${dashboardId}`, data);

  return res;
};
