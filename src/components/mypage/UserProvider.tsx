import { useState } from 'react';
import { UserContext } from '@/context/userContext';
import useQuery from '@/hooks/useQuery';
import { getUsersMe } from '@/lib/apis/users';
import type { UserMe } from '@/types/userMe';

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery<UserMe>({ fetchFn: getUsersMe });
  const [userUpdateProfile, setUserUpdateProfile] = useState<UserMe | null>(null);

  const userProfile = userUpdateProfile ?? data;

  return (
    <UserContext
      value={{ userProfile, setUserProfile: setUserUpdateProfile, userDataLoading: isLoading }}>
      {children}
    </UserContext>
  );
}
