import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { TypeService } from '../../../../prisma/generated/prisma/enums.js';

export class CreateAppointmentDto {
  @IsString()
  @IsUUID('all')
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsUUID('all')
  @IsNotEmpty()
  vetId: string;

  @IsString()
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
