import { Status } from '../../../../prisma/generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsString()
  endTime: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty()
  @IsString()
  entityId: string;

  @ApiProperty()
  @IsString()
  clientId: string;

  @ApiProperty()
  @IsString()
  staffId?: string;

  @ApiProperty()
  @IsString()
  serviceId: string;
}
