import { api } from '@/lib/axios';
import type { ColumnsResponse } from '@/types/column';

export interface CreateColumnType {
  title: string;
  dashboardId: number;
}

/** 컬럼 목록 조회 api */
export const getColumnList = async (dashboardId: string): Promise<ColumnsResponse> => {
  const res = await api.get(`/columns?dashboardId=${dashboardId}`);
  return res.data;
};

/** 컬럼 생성 api */
export const createColumn = async (reqBody: CreateColumnType) => {
  const res = await api.post('/columns', reqBody);
  return res;
};
