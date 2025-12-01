import { cva, type VariantProps } from 'class-variance-authority';
import { Link, useParams } from 'react-router';
import Icons from '@/assets/icons';
import { COLOR_PALETTE } from '@/constants/color';
import { DashboardColor } from '@/styles/components/dashboardColor';
import type { Dashboard } from '@/types/dashboardsData';
import { cn } from '@/utils/cn';

const DashboardLinkStyle = cva('flex hover:bg-gray-100 rounded-sm', {
  variants: {
    isCollapsed: {
      true: 'justify-center p-4',
      false: 'items-center justify-start gap-4 bg-gray-0 px-3 py-2 max-sm:px-2.5 max-sm:py-[7px]',
    },
    isCurrent: {
      true: 'bg-purple-500/8 p-3 max-md:px-2.5 hover:bg-purple-500/8',
    },
  },
  compoundVariants: [
    {
      isCollapsed: true,
      isCurrent: true,
      className: 'bg-purple-500/8 p-4',
    },
    {
      isCollapsed: false,
      isCurrent: true,
      className: 'bg-purple-500/8 px-3 py-2',
    },
  ],
});

interface DashboardNameProps extends VariantProps<typeof DashboardColor> {
  children: string;
  isCollapsed: boolean;
  dashboard: Dashboard;
}

export default function DashboardName({ children, isCollapsed, dashboard }: DashboardNameProps) {
  const { id, color, createdByMe } = dashboard;
  const params = useParams();
  const isCurrent = params.dashboardId === id.toString();
  const colorName = COLOR_PALETTE.find((colorItem) => colorItem.hexCode === color)?.color;
  return (
    <li>
      <Link to={`/dashboard/${id}`} className={cn(DashboardLinkStyle({ isCollapsed, isCurrent }))}>
        <div className={cn(DashboardColor({ colorName }))} />
        {!isCollapsed && (
          <div className='flex items-center gap-1.5'>
            <span className={'font-2lg-medium text-gray-500'}>{children}</span>
            {createdByMe && <Icons.Crown className='text-crown' />}
          </div>
        )}
      </Link>
    </li>
  );
}
