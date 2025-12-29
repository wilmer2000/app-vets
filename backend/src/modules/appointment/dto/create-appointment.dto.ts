import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TypeService } from '../../../../prisma/generated/prisma/enums.js';
import { User } from '../../../../prisma/generated/prisma/client.js';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsArray()
  participants: User[] = [];

  @IsNotEmpty()
  @IsArray()
  pets: string[] = [];

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  veterinaryId: string;

  @IsNotEmpty()
  @IsEnum(TypeService)
  service: TypeService;
}
