import { CreateAppointmentDto } from './create-appointment.dto.js';
import { OmitType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateAppointmentDto extends OmitType(CreateAppointmentDto, [
  'veterinaryId',
  'ownerId',
]) {
  @IsEnum(Status)
  status: Status;
}
