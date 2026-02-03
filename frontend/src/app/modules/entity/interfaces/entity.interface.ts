import { Address, Contact } from '../../../shared/interfaces/shared.interface';

export interface Entity {
  entityId: string;
  isActive: boolean;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  clients: any[];
  staff: any[];
  services: any[];
  appointments: any[];
  contact: Contact;
  address: Address;
  configuration: Configuration;
}

export interface Configuration {
  logo: string;
  color1: string;
  color2: string;
}

export interface UpdateEntity {
  isActive?: boolean;
  name?: string;
  description?: string;
  contact?: Contact;
  address?: Address;
  configuration?: Configuration;
}
