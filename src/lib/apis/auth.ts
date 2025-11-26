import { api } from '@/lib/axios';

interface RequestLoginType {
  email: string;
  password: string;
}

export const requestLogin = async (loginInfo: RequestLoginType) => {
  const res = await api.post('/auth/login', loginInfo);
  return res.data;
};
