import { cva, type VariantProps } from 'class-variance-authority';
import { Link, useParams } from 'react-router';
import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';
const DashboardColor = cva('w-2 h-2 rounded-full', {
  variants: {
    color: {
      orange: 'bg-orange-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
    },
  },
  defaultVariants: {
    color: 'orange',
  },
});

interface DashboardNameProps extends VariantProps<typeof DashboardColor> {
  children: string;
  createdByMe?: boolean;
  dashboardId: string;
}

export default function DashboardName({
  color,
  children,
  createdByMe = false,
  dashboardId,
}: DashboardNameProps) {
  const params = useParams();
  const isCurrent = params.id === dashboardId;
  return (
    <li>
      <Link
        to={`/dashboard/${dashboardId}`}
        className={cn(
          'flex items-center justify-start gap-4 bg-gray-0 px-3 py-2 max-md:px-2.5 max-md:py-[7px]',
          isCurrent && 'rounded-sm bg-purple-500/8 p-3 max-md:px-2.5 max-md:py-2'
        )}>
        <div className={cn(DashboardColor({ color }))} />
        <div className='flex items-center gap-1.5'>
          <span className='font-2lg-medium text-gray-500'>{children}</span>
          {createdByMe && <Icons.Crown className='text-crown' />}
        </div>
      </Link>
    </li>
  );
}
