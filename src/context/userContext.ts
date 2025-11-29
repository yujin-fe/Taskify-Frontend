import { createContext } from 'react';
import type { UserMe } from '@/types/userMe';

interface UserContextType {
  userProfile: UserMe | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserMe | null>>;
  userDataLoading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);
