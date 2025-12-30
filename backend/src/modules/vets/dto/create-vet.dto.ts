import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Role, Specialty } from '../../../../prisma/generated/prisma/client.js';
import { Transform } from 'class-transformer';

export class CreateVetDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsNotEmpty()
  @IsEnum(Specialty)
  specialty: Specialty;

  @IsBoolean()
  isActive: boolean;
}
