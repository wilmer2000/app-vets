import { IsNotEmpty } from 'class-validator';
import { TypeService } from '../../../../prisma/generated/prisma/enums.js';

export class CreateAppointmentDto {
  @IsNotEmpty()
  ownerId: string;

  @IsNotEmpty()
  veterinaryId: string;

  @IsNotEmpty()
  startTime: string;

  @IsNotEmpty()
  endTime: string;

  @IsNotEmpty()
  service: TypeService;
}
