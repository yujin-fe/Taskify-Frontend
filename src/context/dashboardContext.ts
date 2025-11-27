import { createContext } from 'react';
import { type DashboardsResponse } from '@/types/dashboardsData';

interface DashboardContextType {
  dashboardsData: DashboardsResponse;
}
export const DashboardContext = createContext({
  dashboardsData: { dashboards: [], totalCount: 0, cursorId: 0 },
} as DashboardContextType);
