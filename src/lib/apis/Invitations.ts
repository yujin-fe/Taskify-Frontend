import { api } from '@/lib/axios';
import type { InvitationParams, DashboardInvitationResponse } from '@/types/invitations';
/** 대시보드 초대 함수 */
export const inviteDashboard = async (dashboardId: string, reqBody: { email: string }) => {
  const res = await api.post(`/dashboards/${dashboardId}/invitations`, reqBody);
  return res.data;
};
export const getMyInvitations = async (params: InvitationParams) => {
  const res = await api.get(`/invitations`, { params });
  return res.data;
};

/** 대시보드 초대 불러오기 함수 */
export const getInvitationList = async (params: {
  dashboardId: string;
  page?: number;
  size?: number;
}): Promise<DashboardInvitationResponse> => {
  const { dashboardId, ...queryParams } = params;
  const res = await api.get(`/dashboards/${dashboardId}/invitations`, { params: queryParams });

  return res.data;
};
