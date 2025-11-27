import { Link, useParams } from 'react-router';
import Icons from '@/assets/icons';
import Button from '@/components/common/Button';

export default function SettingButton() {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  return (
    <Button
      as={Link}
      to={`/dashboard/${dashboardId}/edit`}
      theme='outlined'
      size='lg'
      className='h-[30px] w-[49px] gap-2 sm:h-[40px] sm:w-[88px]'>
      <Icons.Setting className='hidden h-[20px] w-[20px] sm:block' aria-hidden />
      <span className='font-lg-medium text-gray-500'>관리</span>
    </Button>
  );
}
