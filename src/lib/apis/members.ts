import { api } from '@/lib/axios';
export interface GetMemberListParams {
  dashboardId: string;
  page?: number;
  size?: number;
}
export interface DeleteMemberParams {
  memberId: number;
}
/** 멤버 조회 api */
export const getMemberList = async (params: GetMemberListParams) => {
  const apiParams = {
    page: params.page ?? 1,
    size: params.size ?? 20,
    dashboardId: params.dashboardId,
  };
  const res = await api.get('/members', {
    params: apiParams,
  });
  return res.data;
};
/** 멤버 삭제 api */
export const deleteMemberdata = async (memberId: number) => {
  const res = await api.delete(`/members/${memberId}`);

  return res;
};
