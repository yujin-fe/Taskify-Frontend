import Icons from '@/assets/icons';
import Button from '@/components/common/Button';

interface InviteButtonProps {
  type?: 'header' | 'items';
  onClick?: () => void; //TODO: 추후 모달 열기 핸들러
}

export default function InviteButton({ onClick, type = 'header' }: InviteButtonProps) {
  // 'items' 타입 버튼의 경우
  if (type === 'items') {
    return (
      <Button
        theme='primary'
        type='button'
        onClick={onClick}
        className='h-[26px] w-[86px] flex-none rounded-[4px] font-xs-medium sm:h-[32px] sm:w-[105px] sm:font-md-medium'>
        <span className='flex items-center gap-[6px] sm:gap-[8px]'>
          <Icons.AddDashboard
            className='h-[14px] w-[14px] sm:h-[16px] sm:w-[16px]'
            aria-hidden='true'
          />
          초대하기
        </span>
      </Button>
    );
  }
  return (
    <Button
      theme='outlined'
      type='button'
      onClick={onClick}
      className='flex h-[30px] w-[73px] items-center gap-2 sm:h-[40px] sm:w-[116px]'>
      <div className='hidden h-[16px] w-[16px] items-center justify-center rounded border-2 border-gray-500 sm:flex'>
        <Icons.Plus className='h-[14px] w-[14px] text-gray-500' aria-hidden='true' />
      </div>
      <span className='font-lg-medium text-gray-500'>초대하기</span>
    </Button>
  );
}
