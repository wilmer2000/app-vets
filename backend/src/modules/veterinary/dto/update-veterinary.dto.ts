import { PartialType } from '@nestjs/mapped-types';
import { CreateVeterinaryDto } from './create-veterinary.dto.js';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVeterinaryDto extends PartialType(CreateVeterinaryDto) {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  description: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  phone: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  street: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  city: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  country: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  businessHours: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
