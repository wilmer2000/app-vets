import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateVeterinaryDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  description: string;

  @IsString()
  phone: string;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  businessHours: string;

  @IsBoolean()
  isActive: boolean;
}
