import { CreatePetDto } from './create-pet.dto.js';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PetSex } from '../../../../prisma/generated/prisma/enums.js';

export class UpdatePetDto extends OmitType(CreatePetDto, ['clientId']) {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  breed: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PetSex)
  sex: PetSex;
}
