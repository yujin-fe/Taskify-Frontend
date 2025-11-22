import { createContext } from 'react';
import type { UserMe } from '@/types/userMe';
interface AvatarContextType extends UserMe {
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AvatarContext = createContext({} as AvatarContextType);
