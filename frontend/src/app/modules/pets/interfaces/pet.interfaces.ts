import { PetSex } from '../enums/pet.enum';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  sex: PetSex;
  ownerId: string;
  veterinaryId: string | null;
  appointmentId: string | null;
}

export interface UpdatePet {
  name: string;
  breed: string;
}
