import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { Specialty } from '../../../../prisma/generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVetUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  pets: string[];

  @ApiProperty()
  @IsEnum(Specialty)
  @IsOptional()
  specialty: Specialty;
}
