import { api } from '@/lib/axios';
import type { ColumnsResponse } from '@/types/column';

/** 컬럼 목록 조회 함수 */
export const getColumnList = async (dashboardId: string): Promise<ColumnsResponse> => {
  const res = await api.get(`/columns?dashboardId=${dashboardId}`);
  return res.data;
};
