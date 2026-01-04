import { Role } from '../enums/auth.enum';

export type AuthState = {
  isLoggedIn: boolean;
  userId: string | undefined;
  role: Role | undefined;
};
