import AuthIntro from '@/components/auth/AuthIntro';
import AuthSuggestion from '@/components/auth/AuthSuggestion';

export default function Login() {
  return (
    <>
      <AuthIntro comment='오늘도 만나서 반가워요!' />
      {/* TODO: Form 구현 예정 */}
      <AuthSuggestion message='회원이 아니신가요?' to='/signup' linkText='회원가입하기' />
    </>
  );
}
