import { Role } from '../../../../prisma/generated/prisma/enums.js';

export interface UserPayload {
  sub: string;
  email: string;
  role: Role;
}

export interface LoginResponse {
  access_token: string;
}
