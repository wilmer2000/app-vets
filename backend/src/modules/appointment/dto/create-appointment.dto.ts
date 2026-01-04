import { IsArray, IsEnum, IsISO8601, IsUUID } from 'class-validator';
import { TypeService } from '../../../../prisma/generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsUUID('all')
  ownerId: string;

  @ApiProperty()
  @IsUUID('all')
  vetId: string;

  @ApiProperty()
  @IsUUID('all')
  veterinaryId: string;

  @ApiProperty()
  @IsArray()
  @IsUUID('all', { each: true })
  pets: string[];

  @ApiProperty()
  @IsISO8601()
  startTime: string;

  @ApiProperty()
  @IsISO8601()
  endTime: string;

  @ApiProperty()
  @IsEnum(TypeService)
  service: TypeService;
}
