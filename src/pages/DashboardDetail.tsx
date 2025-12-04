import { useParams } from 'react-router';
import ColumnListProvider from '@/components/dashboard-detail/ColumnListProvider';
import DashboardDetailContent from '@/components/dashboard-detail/DashboardDetailContent';

export default function DashboardDetail() {
  const { dashboardId } = useParams<{ dashboardId: string }>();

  if (!dashboardId) {
    return null;
  }

  return (
    <ColumnListProvider dashboardId={dashboardId}>
      <DashboardDetailContent />
    </ColumnListProvider>
  );
}
