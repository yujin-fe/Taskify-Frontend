import axios from 'axios';
import { useState } from 'react';
import Icons from '@/assets/icons';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import Title from '@/components/common/Title';
import DashboardBody from '@/components/dashboard/table/DashboardBody';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import useAuthForm from '@/hooks/useAuthForm';
import useBaseModal from '@/hooks/useBaseModal';
import { changePassword } from '@/lib/apis/auth';

type PasswordChangeFormType = 'newPassword' | 'password' | 'confirmPassword';

const InitialValue: Record<PasswordChangeFormType, string> = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

export default function PasswordChangeForm() {
  const {
    authForm,
    setAuthForm,
    handleChange,
    showPassword,
    handleShowPasswordToggle,
    handleBlur,
    error,
    disabled,
  } = useAuthForm(InitialValue, 'newPassword');
  const { isOpen, handleModalClose, handleModalOpen } = useBaseModal();
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: useMutation 훅 구현 시 적용하기
    const { password, newPassword } = authForm;
    const reqbody = { password, newPassword };
    try {
      await changePassword(reqbody);
      setApiErrorMsg('');
      setSuccessMsg('비밀번호가 변경되었습니다.');
      handleModalOpen();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSuccessMsg('');
        setApiErrorMsg(error.response?.data?.message ?? '오류가 발생했습니다.');
        handleModalOpen();
      }
    } finally {
      setAuthForm(InitialValue);
    }
  };

  return (
    <>
      <DashboardContainer type={'ChangePassword'}>
        <DashboardHeader>
          <Title as='h3' weight={'bold'} className='text-lg sm:text-2xl'>
            비밀번호 변경
          </Title>
        </DashboardHeader>
        <DashboardBody className='mt-[40px] sm:mt-[24px]'>
          <form onSubmit={handleSubmit} noValidate className='flex w-full flex-col gap-[16px]'>
            <Input
              value={authForm.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              error={!!error.password}>
              <Input.Label className='mypage-label'>현재 비밀번호</Input.Label>
              <Input.Group>
                <Input.Field
                  name='password'
                  type={showPassword.password ? 'text' : 'password'}
                  placeholder='비밀번호 입력'
                  autoComplete='current-password'
                />
                <Input.SuffixButton
                  onClick={() => handleShowPasswordToggle('password')}
                  ariaLabel={showPassword.password ? '비밀번호 숨기기' : '비밀번호 보기'}>
                  {showPassword.password ? <Icons.PasswordShow /> : <Icons.PasswordHidden />}
                </Input.SuffixButton>
              </Input.Group>
              <Input.ErrorMessage>{error.password}</Input.ErrorMessage>
            </Input>
            <Input
              value={authForm.newPassword}
              onChange={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              error={!!error.newPassword}>
              <Input.Label className='mypage-label'>새 비밀번호</Input.Label>
              <Input.Group>
                <Input.Field
                  name='newPassword'
                  type={showPassword.newPassword ? 'text' : 'password'}
                  placeholder='새 비밀번호 입력'
                  autoComplete='new-password'
                />
                <Input.SuffixButton
                  onClick={() => handleShowPasswordToggle('newPassword')}
                  ariaLabel={showPassword.newPassword ? '비밀번호 숨기기' : '비밀번호 보기'}>
                  {showPassword.newPassword ? <Icons.PasswordShow /> : <Icons.PasswordHidden />}
                </Input.SuffixButton>
              </Input.Group>
              <Input.ErrorMessage>{error.newPassword}</Input.ErrorMessage>
            </Input>
            <Input
              value={authForm.confirmPassword}
              onChange={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword', authForm.newPassword)}
              error={!!error.confirmPassword}>
              <Input.Label className='mypage-label'>새 비밀번호 확인</Input.Label>
              <Input.Group>
                <Input.Field
                  name='confirmPassword'
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  placeholder='새 비밀번호 입력'
                  autoComplete='off'
                />
                <Input.SuffixButton
                  onClick={() => handleShowPasswordToggle('confirmPassword')}
                  ariaLabel={showPassword.confirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}>
                  {showPassword.confirmPassword ? <Icons.PasswordShow /> : <Icons.PasswordHidden />}
                </Input.SuffixButton>
              </Input.Group>
              <Input.ErrorMessage>{error.confirmPassword}</Input.ErrorMessage>
            </Input>
            <Button disabled={disabled} className='mt-[8px]' type='submit'>
              변경
            </Button>
          </form>
        </DashboardBody>
      </DashboardContainer>
      {isOpen && (
        <BaseModalFrame setOnModal={() => handleModalClose()}>
          {apiErrorMsg || successMsg}
        </BaseModalFrame>
      )}
    </>
  );
}
