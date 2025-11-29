import { Link } from 'react-router';
import Icons from '@/assets/icons';
import Skeleton from '@/components/skeleton/Skeleton';
import { COLOR_PALETTE } from '@/constants/color';
import { DashboardColor } from '@/styles/components/dashboardColor';
import { type Dashboard } from '@/types/dashboardsData';
import { cn } from '@/utils/cn';
interface DashboardNameCardProps {
  dashboard: Dashboard;
  isLoading: boolean;
}

export default function DashboardNameCard({ dashboard, isLoading }: DashboardNameCardProps) {
  const { color, createdByMe, title, id: dashboardId } = dashboard;
  const colorName = COLOR_PALETTE.find((colorItem) => colorItem.hexCode === color)?.color;
  return (
    <li>
      {isLoading ? (
        <Skeleton className='name-card-base h-[58px] justify-start gap-4 px-5 py-5.5 sm:h-[70px]' />
      ) : (
        <Link
          to={`/dashboard/${dashboardId}`}
          className='name-card-base h-[58px] justify-start gap-4 px-5 py-5.5 sm:h-[70px]'>
          <div className={cn(DashboardColor({ colorName }))} />
          <div className='flex flex-1 items-center gap-2'>
            <span className='font-lg-semibold text-gray-700'>{title}</span>
            {createdByMe && <Icons.Crown className='text-crown' />}
          </div>
          <Icons.ArrowRight />
        </Link>
      )}
    </li>
  );
}
