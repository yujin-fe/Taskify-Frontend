import { createContext } from 'react';
import type { Assignee } from '@/types/card';
import type { Author } from '@/types/comment';
import type { Member } from '@/types/members';
import type { UserMe } from '@/types/userMe';

interface AvatarContextType {
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserMe | Assignee | Member | Author;
}

export const AvatarContext = createContext({} as AvatarContextType);
