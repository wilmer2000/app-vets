import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TypeService } from '../../../../prisma/generated/prisma/enums.js';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  veterinaryId: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  vetId: string;

  @IsNotEmpty()
  @IsEnum(TypeService)
  service: TypeService;
}
