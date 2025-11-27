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
import useAuthContext from '@/hooks/useAuthContext';
import useAuthForm from '@/hooks/useAuthForm';
import useBaseModal from '@/hooks/useBaseModal';
import { requestLogin } from '@/lib/apis/auth';

type LoginFormType = 'email' | 'password';

const loginInitialValue: Record<LoginFormType, string> = {
  email: '',
  password: '',
};

export default function Login() {
  const {
    authForm,
    setAuthForm,
    handleChange,
    showPassword,
    handleShowPasswordToggle,
    handleBlur,
    error,
    disabled,
  } = useAuthForm(loginInitialValue);
  const { login } = useAuthContext();
  const { isOpen, handleModalClose, handleModalOpen } = useBaseModal();
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // TODO: useMutation 훅 구현 시 적용하기
    const formData = { email: authForm.email, password: authForm.password };
    try {
      const data = await requestLogin(formData);
      login(data.accessToken);
      navigate('/mydashboard', { replace: true });
      setAuthForm(loginInitialValue);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiErrorMsg(error.response?.data?.message ?? '오류가 발생했습니다.');
        handleModalOpen();
      }
    } finally {
      setAuthForm((prev) => ({ ...prev, password: '' }));
    }
  };

  return (
    <>
      <AuthIntro comment='오늘도 만나서 반가워요!' />
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
        <Button disabled={disabled} className='sm:mt-[8px]' type='submit'>
          로그인
        </Button>
      </AuthForm>
      <AuthSuggestion message='회원이 아니신가요?' to='/signup' linkText='회원가입하기' />
      {isOpen && (
        <BaseModalFrame setOnModal={() => handleModalClose()}>{apiErrorMsg}</BaseModalFrame>
      )}
    </>
  );
}
