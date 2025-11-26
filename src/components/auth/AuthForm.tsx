interface AuthFormProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

/**
 * ### AuthForm
 * - 로그인/회원가입 등의 폼을 감싸는 컴포넌트입니다.
 * - 제출 시 기본 이벤트를 막고 `onSubmit` 콜백을 호출합니다.
 * - `noValidate`가 적용되어 기본 HTML 폼 유효성 검사를 비활성화합니다.
 *
 * @example
 * <AuthForm onSubmit={() => console.log('폼 제출!')}>
 *   <Input ...>
 *   <Button ..>
 * </AuthForm>
 */
export default function AuthForm({ onSubmit, children }: AuthFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className='mb-[24px] flex w-full flex-col gap-[8px] sm:gap-[16px]'
      onSubmit={handleSubmit}
      noValidate>
      {children}
    </form>
  );
}
