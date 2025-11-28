import { api } from '@/lib/axios';

interface RequestLoginType {
  email: string;
  password: string;
}

interface RequestSignupType {
  email: string;
  password: string;
  nickname: string;
}

interface ChangePasswordType {
  password: string;
  newPassword: string;
}

/** 로그인 api */
export const requestLogin = async (loginInfo: RequestLoginType) => {
  const res = await api.post('/auth/login', loginInfo);
  return res.data;
};

/** 회원가입 api */
export const requestSignup = async (signupInfo: RequestSignupType) => {
  const res = await api.post('/users', signupInfo);
  return res.data;
};

/** 비밀번호 변경 api */
export const changePassword = async (changePasswordInfo: ChangePasswordType) => {
  const res = await api.put('/auth/password', changePasswordInfo);
  return res.data;
};
