import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Icons from '@/assets/icons';
import AuthForm from '@/components/auth/AuthForm';
import AuthIntro from '@/components/auth/AuthIntro';
import AuthSuggestion from '@/components/auth/AuthSuggestion';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import useAuthForm from '@/hooks/useAuthForm';
import useBaseModal from '@/hooks/useBaseModal';
import { requestSignup } from '@/lib/apis/auth';

type SignupFormType = 'email' | 'nickname' | 'password' | 'confirmPassword';

const signupInitialValue: Record<SignupFormType, string> = {
  email: '',
  password: '',
  nickname: '',
  confirmPassword: '',
};

export default function Signup() {
  const {
    authForm,
    setAuthForm,
    handleChange,
    showPassword,
    handleShowPasswordToggle,
    handleBlur,
    error,
    disabled,
  } = useAuthForm(signupInitialValue);

  const { isOpen, handleModalClose, handleModalOpen } = useBaseModal();
  const navigate = useNavigate();
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const handleSubmit = async () => {
    const formData = {
      email: authForm.email,
      password: authForm.password,
      nickname: authForm.nickname,
    };
    try {
      await requestSignup(formData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiErrorMsg(error.response?.data?.message ?? '오류가 발생했습니다.');
      }
    } finally {
      handleModalOpen();
      setAuthForm(signupInitialValue);
      setIsChecked(false);
    }
  };
  return (
    <>
      <AuthIntro comment='첫 방문을 환영합니다!' />
      <AuthForm onSubmit={handleSubmit}>
        <Input
          value={authForm.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={!!error.email}>
          <Input.Label>이메일</Input.Label>
          <Input.Group>
            <Input.Field
              name='email'
              type='email'
              placeholder='이메일을 입력해 주세요'
              autoComplete='email'
            />
          </Input.Group>
          <Input.ErrorMessage>{error.email}</Input.ErrorMessage>
        </Input>
        <Input
          value={authForm.nickname}
          onChange={handleChange('nickname')}
          onBlur={handleBlur('nickname')}
          error={!!error.nickname}>
          <Input.Label>닉네임</Input.Label>
          <Input.Group>
            <Input.Field
              name='nickname'
              type='text'
              placeholder='닉네임을 입력해 주세요'
              autoComplete='nickname'
            />
          </Input.Group>
          <Input.ErrorMessage>{error.nickname}</Input.ErrorMessage>
        </Input>
        <Input
          value={authForm.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          error={!!error.password}>
          <Input.Label>비밀번호</Input.Label>
          <Input.Group>
            <Input.Field
              name='password'
              type={showPassword.password ? 'text' : 'password'}
              placeholder='비밀번호를 입력해 주세요'
              autoComplete='off'
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
          value={authForm.confirmPassword}
          onChange={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword', authForm.password)}
          error={!!error.confirmPassword}>
          <Input.Label>비밀번호 확인</Input.Label>
          <Input.Group>
            <Input.Field
              name='confirmPassword'
              type={showPassword.confirmPassword ? 'text' : 'password'}
              placeholder='비밀번호를 한번 더 입력해 주세요'
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
        <label className='flex cursor-pointer items-center gap-2 font-lg-regular text-gray-700'>
          <input
            type='checkbox'
            className='peer sr-only'
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          {isChecked ? <Icons.Checkbox /> : <Icons.EmptyCheckbox />}
          이용약관에 동의합니다.
        </label>
        <Button disabled={disabled || !isChecked} className='sm:mt-2' type='submit'>
          가입하기
        </Button>
      </AuthForm>
      <AuthSuggestion message='이미 회원이신가요?' to='/login' linkText='로그인하기' />
      {isOpen && (
        <BaseModalFrame
          setOnModal={() => {
            handleModalClose();
            if (!apiErrorMsg) {
              navigate('/login', { replace: true });
            }
            return;
          }}>
          {apiErrorMsg || '가입이 완료되었습니다!'}
        </BaseModalFrame>
      )}
    </>
  );
}
