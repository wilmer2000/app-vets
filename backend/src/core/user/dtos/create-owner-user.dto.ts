import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { IsArray, IsOptional } from 'class-validator';

export class CreateOwnerUserDto {
  @IsArray()
  pets: string[];
}
