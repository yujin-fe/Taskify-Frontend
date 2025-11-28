import { api } from '@/lib/axios';

/** 내 정보 조회 함수 */
export const getUsersMe = async () => {
  const res = await api.get('/users/me');
  return res.data;
};
