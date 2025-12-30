import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '../../../../prisma/generated/prisma/enums.js';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsBoolean()
  isActive: boolean;
}
