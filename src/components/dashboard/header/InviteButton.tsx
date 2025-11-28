import Icons from '@/assets/icons';
import Button from '@/components/common/Button';

interface InviteButtonProps {
  onClick?: () => void; //TODO: 추후 모달 열기 핸들러
}

export default function InviteButton({ onClick }: InviteButtonProps) {
  return (
    <Button
      theme='outlined'
      type='button'
      onClick={onClick}
      className='flex h-[30px] w-[73px] items-center gap-2 sm:h-[40px] sm:w-[116px]'>
      <div className='hidden h-[16px] w-[16px] items-center justify-center rounded border-2 border-gray-500 sm:flex'>
        <Icons.Plus className='h-[14px] w-[14px] text-gray-500' aria-hidden />
      </div>

      <span className='font-lg-medium text-gray-500'>초대하기</span>
    </Button>
  );
}
