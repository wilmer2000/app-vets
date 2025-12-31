import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../../../../prisma/generated/prisma/enums.js';
import { Transform } from 'class-transformer';

export class QueryUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @Transform(({ value }) => value.trim() === 'true')
  @IsBoolean()
  isActive: boolean;
}
