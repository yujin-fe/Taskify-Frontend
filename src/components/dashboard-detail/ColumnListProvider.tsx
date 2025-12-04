import type { AxiosResponse } from 'axios';
import { ColumnListContext } from '@/context/columnListContext';
import useQuery from '@/hooks/useQuery';
import {
  updateColumn,
  createColumn,
  deleteColumn,
  getColumnList,
  type UpdateColumnVariables,
  type CreateColumnType,
} from '@/lib/apis/columns';
import type { ColumnsData, ColumnsResponse } from '@/types/column';

interface ColumnListProviderProps {
  dashboardId: string;
  children: React.ReactNode;
}

export default function ColumnListProvider({ dashboardId, children }: ColumnListProviderProps) {
  const columnQuery = useQuery<ColumnsResponse>({
    fetchFn: () => getColumnList(dashboardId || ''),
    params: { dashboardId },
  });

  const createColumnFn = async (reqBody: CreateColumnType): Promise<AxiosResponse<ColumnsData>> => {
    const res = await createColumn(reqBody);

    if (!res.data) {
      return res;
    }

    columnQuery.setData((prev) => {
      if (!prev) {
        return { result: 'SUCCESS', data: [res.data] };
      }
      return { ...prev, data: [...prev.data, res.data] };
    });

    return res;
  };

  const updateColumnFn = async ({
    columnId,
    body,
  }: UpdateColumnVariables): Promise<AxiosResponse<ColumnsData>> => {
    const res = await updateColumn(columnId, body);

    columnQuery.setData((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        data: prev.data.map((col) => {
          if (col.id === res.data.id) {
            return { ...col, title: res.data.title, updatedAt: res.data.updatedAt };
          }
          return col;
        }),
      };
    });

    return res;
  };

  const deleteColumnFn = async (columnId: number): Promise<AxiosResponse<void>> => {
    const res = await deleteColumn(columnId);
    columnQuery.refetch();
    return res;
  };

  const value = {
    columnList: columnQuery.data?.data ?? [],
    isLoading: columnQuery.isLoading,
    createColumn: createColumnFn,
    updateColumn: updateColumnFn,
    deleteColumn: deleteColumnFn,
  };

  return <ColumnListContext value={value}>{children}</ColumnListContext>;
}
