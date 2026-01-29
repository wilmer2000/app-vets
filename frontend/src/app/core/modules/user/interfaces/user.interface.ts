export interface User {
  userId: string;
  isActive: string;
  role: string;
  email: string;
  password: boolean;
  name: string;
  lastname: string;
  createdAt: string;
  contact: Contact;
  address: Address;
}

export interface Address {
  street?: string;
  city?: string;
  country?: string;
}

export interface Contact {
  phone?: string;
  email?: string;
}

export interface UpdateUser {
  role?: string;
  isActive?: boolean;
  name?: string;
  lastname?: string;
  phone?: string;
  address?: Address;
}
