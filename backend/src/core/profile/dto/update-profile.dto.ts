import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressUserDto } from '../../user/dtos/address-user.dto.js';
import { Specialty } from '../../../../prisma/generated/prisma/enums.js';


export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @Type(() => AddressUserDto)
  address?: AddressUserDto;

  @IsOptional()
  @IsArray()
  pets?: string[];

  @IsOptional()
  @IsEnum(Specialty)
  specialty: Specialty;
}
