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
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }): boolean =>
    typeof value === 'string' ? value === 'true' : value,
  )
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
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
