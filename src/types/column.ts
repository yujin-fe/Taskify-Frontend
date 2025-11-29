interface ColumnsData {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnsResponse {
  result: 'SUCCESS';
  data: ColumnsData[];
}
