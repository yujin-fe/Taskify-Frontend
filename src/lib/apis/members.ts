import { api } from '@/lib/axios';

/** 대시보드 멤버 목록 조회 */
export const getMemberList = async (dashboardId: string) => {
  const res = await api.get(`/members?page=1&size=20&dashboardId=${dashboardId}`);
  return res.data;
};
