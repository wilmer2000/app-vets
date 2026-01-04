export interface User {
  email: string;
  password?: string;
  role?: string;
  isActive?: boolean;
  name?: string;
  lastname?: string;
  phone?: string;
}

export interface UpdateUser {
  role?: string;
  isActive?: boolean;
  name?: string;
  lastname?: string;
  phone?: string;
}
