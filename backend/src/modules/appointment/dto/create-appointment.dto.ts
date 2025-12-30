import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { TypeService } from '../../../../prisma/generated/prisma/enums.js';

export class CreateAppointmentDto {
  @IsArray()
  @IsUUID('all')
  @IsNotEmpty()
  ownerId: string;

  @IsArray()
  @IsUUID('all')
  @IsNotEmpty()
  vetId: string;

  @IsArray()
  @IsUUID('all')
  @IsNotEmpty()
  veterinaryId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  pets: string[];

  @IsISO8601()
  @IsNotEmpty()
  startTime: string;

  @IsISO8601()
  @IsNotEmpty()
  endTime: string;

  @IsEnum(TypeService)
  @IsNotEmpty()
  service: TypeService;
}
