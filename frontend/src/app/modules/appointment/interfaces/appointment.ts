import { Status } from '../enums/appointment.enum';

export interface Appointment {
  ownerId: string;
  vetId: string;
  veterinaryId: string;
  pets: string[];
  startTime: string;
  endTime: string;
  service: string;
}

export interface UpdateAppointment {
  pets: string[];
  startTime: string;
  endTime: string;
  service: string;
  status: Status;
}
