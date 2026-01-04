import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { Specialty } from '../../../../prisma/generated/prisma/enums.js';
import { CreateVetUserDto } from './create-vet-user.dto.js';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVetUserDto extends PartialType(CreateVetUserDto) {
  @ApiProperty()
  @IsEnum(Specialty)
  @IsOptional()
  specialty: Specialty;
}
