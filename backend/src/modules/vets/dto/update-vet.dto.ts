import { PartialType } from '@nestjs/mapped-types';
import { CreateVetDto } from './create-vet.dto.js';
import { IsOptional, IsString } from 'class-validator';

export class UpdateVetDto extends PartialType(CreateVetDto) {
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
}
