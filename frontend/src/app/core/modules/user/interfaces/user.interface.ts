export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  name: string;
  lastname: string;
  phone: string;
  address: Address;
  ownerProfile?: OwnerProfile;
  vetProfile?: VetProfile;
}

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface OwnerProfile {
  specialty: any;
  appointments: any[];
}

export interface VetProfile {
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
}
