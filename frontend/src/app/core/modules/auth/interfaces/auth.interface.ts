import { Role } from '../enums/auth.enum';
import { User } from '../../user/interfaces/user.interface';

export type AuthState = {
  isLoggedIn: boolean;
  userId: string | undefined;
  role: Role | undefined;
};
