import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDto extends OmitType(CreateUserDto, ['password']) {
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;
}
