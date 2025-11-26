import { useState } from 'react';
import Icons from '@/assets/icons';
import AuthForm from '@/components/auth/AuthForm';
import AuthIntro from '@/components/auth/AuthIntro';
import AuthSuggestion from '@/components/auth/AuthSuggestion';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';

interface LoginDataType {
  email: string;
  password: string;
}

export default function Login() {
  // TODO: 회원가입과 공통되는 로직 useAuthForm 훅으로 분리
  // TODO: 로그인 유효성 검사 구현
  // TODO: 로그인 API 연결 + 에러 처리
  const [loginData, setLoginData] = useState({} as LoginDataType);

  const handlePasswordView = () => {
    console.log('password 보임');
  };

  const handleChange = () => {
    setLoginData({ email: '흠흠', password: '흠흠' });
    console.log('onChange 이벤트');
  };

  const handleBlur = () => {
    console.log('onBlur 이벤트');
  };

  const handleSubmit = () => {
    console.log('폼 제출!');
  };

  return (
    <>
      <AuthIntro comment='오늘도 만나서 반가워요!' />
      <AuthForm onSubmit={handleSubmit}>
        <Input value={loginData.email} onChange={handleChange} onBlur={handleBlur}>
          <Input.Label>이메일</Input.Label>
          <Input.Group>
            <Input.Field
              name='email'
              type='email'
              placeholder='이메일을 입력해 주세요'
              autoComplete='email'
            />
          </Input.Group>
          <Input.ErrorMessage>에러메세지</Input.ErrorMessage>
        </Input>
        <Input value={loginData.email} onChange={handleChange} onBlur={handleBlur}>
          <Input.Label>비밀번호</Input.Label>
          <Input.Group>
            <Input.Field
              name='password'
              type='password'
              placeholder='비밀번호를 입력해 주세요'
              autoComplete='current-password'
            />
            <Input.SuffixButton onClick={handlePasswordView} ariaLabel='비밀번호 보기'>
              <Icons.PasswordHidden />
            </Input.SuffixButton>
          </Input.Group>
          <Input.ErrorMessage>에러메세지</Input.ErrorMessage>
        </Input>
        <Button className='sm:mt-[8px]' type='submit'>
          로그인
        </Button>
      </AuthForm>
      <AuthSuggestion message='회원이 아니신가요?' to='/signup' linkText='회원가입하기' />
    </>
  );
}
