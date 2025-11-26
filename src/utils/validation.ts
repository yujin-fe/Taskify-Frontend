import { EMAIL_REGEX, PASSWORD_MIN_LEN } from '@/constants/authRegex';

const validateEmail = (value: string) => {
  return EMAIL_REGEX.test(value) ? '' : '이메일 형식으로 작성해 주세요.';
};

const validatePassword = (value: string) => {
  return value.length >= PASSWORD_MIN_LEN ? '' : `${PASSWORD_MIN_LEN}자 이상 입력해 주세요.`;
};

// TODO: 회원가입 구현 시 닉네임 검증 함수 구현 및 validators에 연결

export const validators: Record<string, (v: string) => string> = {
  email: validateEmail,
  password: validatePassword,
};
