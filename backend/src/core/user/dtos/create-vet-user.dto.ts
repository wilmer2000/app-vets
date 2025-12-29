import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { Specialty } from '../../../../prisma/generated/prisma/enums.js';

export class CreateVetUserDto extends PartialType(CreateUserDto) {
  @IsArray()
  @IsOptional()
  pets: string[];

  @IsEnum(Specialty)
  @IsOptional()
  specialty: Specialty;
}
