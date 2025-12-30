import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateVeterinaryDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  description: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  street: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  city: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  country: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  businessHours: string;

  @IsBoolean()
  isActive: boolean;
}
