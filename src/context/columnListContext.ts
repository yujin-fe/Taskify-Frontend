import type { AxiosResponse } from 'axios';
import { createContext } from 'react';
import type { UpdateColumnVariables, CreateColumnType } from '@/lib/apis/columns';
import type { ColumnsData } from '@/types/column';

interface ColumnListContextType {
  columnList: ColumnsData[] | [];
  isLoading: boolean;
  createColumn: (body: CreateColumnType) => Promise<AxiosResponse<ColumnsData>>;
  updateColumn: (vars: UpdateColumnVariables) => Promise<AxiosResponse<ColumnsData>>;
  deleteColumn: (columnId: number) => Promise<AxiosResponse<void>>;
}

export const ColumnListContext = createContext<ColumnListContextType | null>(null);
