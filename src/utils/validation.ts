import { EMAIL_REGEX, PASSWORD_MIN_LEN, NICKNAME_MAX_LEN } from '@/constants/authRegex';

export const validateEmail = (value: string) => {
  return EMAIL_REGEX.test(value) ? '' : '이메일 형식으로 작성해 주세요.';
};

export const validatePassword = (value: string) => {
  return value.length >= PASSWORD_MIN_LEN ? '' : `${PASSWORD_MIN_LEN}자 이상 입력해 주세요.`;
};

export const validateNewPassword = (value: string) => {
  return value.length >= PASSWORD_MIN_LEN
    ? ''
    : `새 비밀번호는 ${PASSWORD_MIN_LEN}자 이상 입력해 주세요.`;
};

export const validateNickname = (value: string) => {
  return value.length <= NICKNAME_MAX_LEN ? '' : `${NICKNAME_MAX_LEN}자 이하로 작성해주세요.`;
};

export const validators: Record<string, (v: string) => string> = {
  email: validateEmail,
  password: validatePassword,
  newPassword: validateNewPassword,
  nickname: validateNickname,
};
