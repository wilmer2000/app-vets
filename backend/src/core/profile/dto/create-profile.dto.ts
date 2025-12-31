import { Specialty } from '@prisma/client';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsEnum(Specialty)
  specialty: Specialty;

  @IsOptional()
  @IsArray()
  pets: string[];
}
