import { useNavigate } from 'react-router';
import Icons from '@/assets/icons';

export default function BackButton({ to }: { to?: string }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type='button'
      className='flex cursor-pointer items-center gap-[8px] font-md-medium text-gray-700 md:font-lg-medium'
      onClick={handleClick}>
      <Icons.ArrowLeft />
      돌아가기
    </button>
  );
}
