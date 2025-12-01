import { api } from '@/lib/axios';
import type { InvitationParams, DashboardInvitationResponse } from '@/types/invitations';
/** 대시보드 초대 함수 */
export const inviteDashboard = async (dashboardId: string, reqBody: { email: string }) => {
  const res = await api.post(`/dashboards/${dashboardId}/invitations`, reqBody);
  return res.data;
};

/** 초대받은 대시보드 목록 조회 함수 */
export const getMyInvitations = async (params: InvitationParams) => {
  const res = await api.get(`/invitations`, { params });
  return res.data;
};

/** 초대받은 대시보드 수락, 거절 함수 */
export const responseInvtitation = async (
  invitationId: string,
  reqBody: { inviteAccepted: boolean }
) => {
  const res = await api.put(`/invitations/${invitationId}`, reqBody);
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

/** 대시보드 초대 취소 함수 */
export interface DeleteInvitationParams {
  dashboardId: number;
  invitationId: number;
}

export const deleteInvitationdata = async (dashboardId: number, invitationId: number) => {
  const res = await api.delete(`/dashboards/${dashboardId}/invitations/${invitationId}`);

  return res;
};
