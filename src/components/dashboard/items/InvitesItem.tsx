import Button from '@/components/common/Button';

interface InvitesItemContentProps {
  email: string;
}

export const InvitesItemContent = ({ email }: InvitesItemContentProps) => {
  return (
    <div className='flex flex-grow items-center'>
      <span className='font-md-regular text-gray-700 sm:font-lg-regular'>{email}</span>
    </div>
  );
};

interface InvitesItemActionProps {
  userId: number;
  onCancel?: (userId: number) => void;
}

export const InvitesItemAction = ({ userId, onCancel }: InvitesItemActionProps) => {
  const handleCancelClick = () => {
    onCancel?.(userId);
  };

  return (
    <div className='ml-4 flex-shrink-0 flex-grow-0'>
      <Button
        theme='secondary'
        size='sm'
        type='button'
        onClick={handleCancelClick}
        className='w-[52px] flex-shrink-0 flex-grow-0 bg-gray-0 px-[9px] font-xs-medium whitespace-nowrap sm:w-[84px] sm:font-md-medium'>
        취소
      </Button>
    </div>
  );
};
