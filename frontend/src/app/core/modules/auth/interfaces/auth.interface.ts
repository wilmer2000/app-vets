import { Role } from '../enums/auth.enum';

export type AuthState = {
  isLoggedIn: boolean;
  role: Role | undefined;
};
