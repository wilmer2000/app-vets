import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryUserDto extends OmitType(CreateUserDto, ['password']) {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;
}
