import AuthProvider from '@/components/auth/AuthProvider';
import UserProvider from '@/components/mypage/UserProvider';
import Router from '@/router/Router';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
