import { PartialType } from '@nestjs/mapped-types';
import { CreateVeterinaryDto } from './create-veterinary.dto.js';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateVeterinaryDto extends PartialType(CreateVeterinaryDto) {
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  description: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  phone: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  street: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  city: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  country: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  businessHours: string;

  @IsBoolean()
  isActive: boolean;
}
