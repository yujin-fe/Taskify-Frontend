import { api } from '@/lib/axios';

/** 대시보드 초대 함수 */
export const inviteDashboard = async (dashboardId: string, reqBody: { email: string }) => {
  const res = await api.post(`/dashboards/${dashboardId}/invitations`, reqBody);
  return res.data;
};
