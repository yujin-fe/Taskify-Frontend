import Icons from '@/assets/icons';
import AuthForm from '@/components/auth/AuthForm';
import AuthIntro from '@/components/auth/AuthIntro';
import AuthSuggestion from '@/components/auth/AuthSuggestion';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import useAuthForm from '@/hooks/useAuthForm';

type LoginFormType = 'email' | 'password';

const loginInitialValue: Record<LoginFormType, string> = {
  email: '',
  password: '',
};

export default function Login() {
  const {
    authForm,
    handleChange,
    showPassword,
    handleShowPasswordToggle,
    handleBlur,
    error,
    disabled,
  } = useAuthForm(loginInitialValue);

  const handleSubmit = () => {
    // TODO: 로그인 API 연결 + API 에러 처리
    console.log('로그인!');
    console.log(authForm.email, authForm.password);
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
    </>
  );
}
