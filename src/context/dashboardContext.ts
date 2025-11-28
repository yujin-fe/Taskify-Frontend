import { createContext } from 'react';
import { type DashboardsResponse } from '@/types/dashboardsData';

interface DashboardContextType {
  dashboardsData: DashboardsResponse | null;
  isLoading: boolean;
}
export const DashboardContext = createContext({
  dashboardsData: null,
  isLoading: true,
} as DashboardContextType);
