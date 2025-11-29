import BackButton from '@/components/dashboard/BackButton';
import PasswordChangeForm from '@/components/mypage/PasswordChangeForm';
import ProfileEditForm from '@/components/mypage/ProfileEditForm';

export default function Mypage() {
  return (
    <div className='px-[12px] py-[16px] sm:p-[20px]'>
      <BackButton />
      <div className='mt-[10px] flex flex-col gap-[16px] sm:mt-[20px] sm:gap-[24px] md:mt-[34px]'>
        <ProfileEditForm />
        <PasswordChangeForm />
      </div>
    </div>
  );
}
