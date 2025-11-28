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

export const requestLogin = async (loginInfo: RequestLoginType) => {
  const res = await api.post('/auth/login', loginInfo);
  return res.data;
};

export const requestSignup = async (signupInfo: RequestSignupType) => {
  const res = await api.post('/users', signupInfo);
  return res.data;
};
