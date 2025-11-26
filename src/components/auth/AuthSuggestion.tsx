import { Link } from 'react-router';

interface AuthSuggestionProps {
  message: string;
  linkText: string;
  to: string;
}

/**
 * ### AuthSuggestion
 * - 로그인/회원가입 페이지 하단에 표시되는 안내 문구 컴포넌트입니다.
 * - 예: "회원이 아니신가요? 회원가입하기"
 *
 * @example
 * <AuthSuggestion
 *   message="이미 회원이신가요?"
 *   linkText="로그인하기"
 *   to="/login"
 * />
 */
export default function AuthSuggestion({ message, linkText, to }: AuthSuggestionProps) {
  return (
    <div className='flex gap-[8px] text-gray-700'>
      <span>{message}</span>
      <Link className='text-primary underline underline-offset-3' to={to}>
        {linkText}
      </Link>
    </div>
  );
}
