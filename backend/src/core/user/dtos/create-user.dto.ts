import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Role } from '../../../../prisma/generated/prisma/enums.js';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AddressUserDto } from './address-user.dto.js';
import { ContactUserDto } from './contact-user.dto.js';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value === 'true' : value,
  )
  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  lastname?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactUserDto)
  contact?: ContactUserDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressUserDto)
  address?: AddressUserDto;
}
