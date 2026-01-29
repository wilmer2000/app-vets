export interface User {
  userId: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  name: string;
  lastname: string;
  phone: string;
  createdAt: string;
  address: Address;
  ownerProfile?: OwnerProfile;
  vetProfile?: VetProfile;
}

export interface Address {
  street?: string;
  city?: string;
  country?: string;
}

export interface VetProfile {
  specialty?: any;
  appointments: any[];
}

export interface OwnerProfile {
  id: string;
  pets: any[];
  appointments: any[];
  veterinary: any;
}

export interface UpdateUser {
  role?: string;
  isActive?: boolean;
  name?: string;
  lastname?: string;
  phone?: string;
  address?: Address;
}
