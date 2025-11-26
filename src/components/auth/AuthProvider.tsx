import { useState } from 'react';
import { AuthContext } from '@/context/authContext';
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/token';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAccessToken());

  const login = (token: string) => {
    setToken(token);
    setAccessToken(token);
  };

  const logout = () => {
    setToken(null);
    removeAccessToken();
  };

  return (
    <AuthContext
      value={{
        isLoggedIn: !!token,
        accessToken: token,
        login,
        logout,
      }}>
      {children}
    </AuthContext>
  );
}
