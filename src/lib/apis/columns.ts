import { api } from '@/lib/axios';
import type { ColumnsResponse } from '@/types/column';

export interface CreateColumnType {
  title: string;
  dashboardId: number;
}

export interface ChangeColumnType {
  title: string;
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

/** 컬럼 수정 api */
export const changeColumn = async (columnId: number, reqBody: ChangeColumnType) => {
  const res = await api.put(`/columns/${columnId}`, reqBody);
  return res;
};

/** 컬럼 삭제 api */
export const deleteColumn = async (columnId: number) => {
  const res = await api.delete(`/columns/${columnId}`);
  return res;
};
