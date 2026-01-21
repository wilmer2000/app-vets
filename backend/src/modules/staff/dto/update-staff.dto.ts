import { ApiProperty } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto.js';
import { IsEnum, IsOptional } from 'class-validator';
import { Specialty } from '../../../../prisma/generated/prisma/enums.js';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateStaffDto extends OmitType(CreateStaffDto, ['email']) {
  @ApiProperty()
  @IsOptional()
  @IsEnum(Specialty)
  specialty: Specialty;
}
