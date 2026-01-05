export interface Pet {
  id: string;
  name: string;
  breed: string;
  ownerId: string;
  veterinaryId: string | null;
  appointmentId: string | null;
}

export interface UpdatePet {
  name: string;
  breed: string;
}
