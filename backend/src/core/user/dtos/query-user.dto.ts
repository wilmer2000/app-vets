import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../../../../prisma/generated/prisma/enums.js';

export class QueryUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
